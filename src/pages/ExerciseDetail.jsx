import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import exercises from "../data/exercises";
import { exerciseHref, getExerciseScope } from "../utils/exerciseScope";
import { localizedExerciseZone } from "../utils/localize";
import catalogTranslations from "../data/catalogTranslations";
import { getExercisePhotoSources } from "../data/exercisePhotos";
import { useTranslation } from "../context/LanguageContext";
import { recordExercise } from "../utils/activity";
import { ChevronLeft, ChevronRight, Clock3, Dumbbell } from "lucide-react";
import "./ExerciseDetail.css";

function getHoldSeconds(hold) {
  if (hold === null || hold === undefined || hold === "") return null;
  const match = String(hold).match(/\d+/);
  return match ? Number(match[0]) : null;
}

function getRepCount(reps) {
  const match = String(reps ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function ExerciseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isPreview = query.get("preview") === "1";
  const isSessionIntro = query.get("intro") === "1";
  const scope = query.get("scope") ?? "all";
  const value = query.get("value") ?? "all";
  const scopeData = useMemo(() => getExerciseScope(scope, value), [scope, value]);
  const sessionIds = useMemo(() => query.get("session")?.split(",").filter(Boolean) ?? [], [query]);
  const { exercises: scopeExercises, returnTo } = scopeData;
  // Une fiche est ouverte depuis une liste déjà filtrée. On conserve donc
  // l'historique de navigation pour revenir exactement à cet écran, plutôt
  // que de reconstruire une bibliothèque générale à partir de l'URL.
  const returnToPreviousPage = useCallback(() => {
    const historyIndex = Number(window.history.state?.idx ?? 0);
    if (historyIndex > 0) {
      navigate(-1);
      return;
    }
    navigate(returnTo, { replace: true });
  }, [navigate, returnTo]);
  const scopedExercises = sessionIds.length ? sessionIds.map((sessionId) => scopeExercises.find((item) => item.id === sessionId)).filter(Boolean) : scopeExercises;
  const exercise = exercises.find((item) => item.id === id);
  const translatedExercise = catalogTranslations[language]?.[id] ?? {};
  const currentIndex = scopedExercises.findIndex((item) => item.id === id);
  const holdSeconds = getHoldSeconds(exercise?.hold);
  const isTimed = holdSeconds !== null;
  const selectedRestDuration = Math.min(90, Math.max(5, Number(query.get("rest")) || 20));
  // Certaines fiches du référentiel imposent une récupération spécifique.
  const restDuration = Math.min(90, Math.max(5, Number(exercise?.restSeconds) || selectedRestDuration));
  const seriesDelta = Math.min(2, Math.max(-1, Number(query.get("seriesDelta")) || 0));
  const exerciseSets = Math.max(1, Math.min(6, (Number(exercise?.sets) || 1) + seriesDelta));
  const sessionSettings = useMemo(() => ({ restSeconds: restDuration, seriesDelta }), [restDuration, seriesDelta]);
  const sessionKey = `musculoprevent-session:${scope}:${value}:${restDuration}:${seriesDelta}`;
  const [series, setSeries] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(holdSeconds ?? 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [restSeconds, setRestSeconds] = useState(null);
  const [pendingStep, setPendingStep] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [sessionStartedAt] = useState(() => {
    const now = Date.now();
    const stored = Number(window.sessionStorage.getItem(sessionKey));
    if (currentIndex === 0 || !stored) window.sessionStorage.setItem(sessionKey, String(now));
    return currentIndex === 0 || !stored ? now : stored;
  });
  const [sessionId] = useState(() => {
    const key = `${sessionKey}:id`;
    const stored = window.sessionStorage.getItem(key);
    if (currentIndex === 0 || !stored) {
      const id = typeof globalThis.crypto?.randomUUID === "function" ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(key, id);
      return id;
    }
    return stored;
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(() => Math.max(0, Math.floor((Date.now() - sessionStartedAt) / 1000)));

  useEffect(() => {
    setSeries(1);
    setSecondsLeft(holdSeconds ?? 0);
    setIsPaused(false);
    setIsFinished(false);
    setRestSeconds(null);
    setPendingStep(null);
    setActivePhotoIndex(0);
  }, [id, holdSeconds]);

  useEffect(() => {
    if (isPreview || isSessionIntro) return undefined;
    const timer = window.setInterval(() => setElapsedSeconds(Math.max(0, Math.floor((Date.now() - sessionStartedAt) / 1000))), 1000);
    return () => window.clearInterval(timer);
  }, [isPreview, isSessionIntro, sessionStartedAt]);

  const goToExercise = useCallback((index) => {
    const nextExercise = scopedExercises[index];
    if (nextExercise) {
      navigate(exerciseHref(nextExercise.id, scope, value, sessionIds, sessionSettings), { replace: true });
    } else {
      setIsFinished(true);
    }
  }, [navigate, scope, scopedExercises, sessionIds, sessionSettings, value]);

  const startRest = useCallback((nextStep) => {
    setPendingStep(nextStep);
    setRestSeconds(restDuration);
    setIsPaused(false);
  }, [restDuration]);

  const finishRest = useCallback(() => {
    if (pendingStep === "next-series") {
      setSeries((currentSeries) => currentSeries + 1);
      setSecondsLeft(holdSeconds ?? 0);
    } else if (pendingStep === "next-exercise") {
      goToExercise(currentIndex + 1);
    }
    setPendingStep(null);
    setRestSeconds(null);
  }, [currentIndex, goToExercise, holdSeconds, pendingStep]);

  const completeSeries = useCallback(() => {
    if (series < exerciseSets) {
      startRest("next-series");
      return;
    }

    if (scopedExercises[currentIndex + 1]) {
      recordExercise(exercise, { id: sessionId, startedAt: new Date(sessionStartedAt).toISOString(), context: `${scope}:${value}` });
      startRest("next-exercise");
      return;
    }

    recordExercise(exercise, { id: sessionId, startedAt: new Date(sessionStartedAt).toISOString(), context: `${scope}:${value}` });
    setIsFinished(true);
  }, [currentIndex, exercise, exerciseSets, scopedExercises, series, sessionId, sessionStartedAt, scope, startRest, value]);

  useEffect(() => {
    if (isPreview || isSessionIntro || !isTimed || isPaused || isFinished || restSeconds !== null) return undefined;

    if (secondsLeft === 0) {
      const completionTimer = window.setTimeout(completeSeries, 500);
      return () => window.clearTimeout(completionTimer);
    }

    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [completeSeries, isPaused, isPreview, isSessionIntro, isTimed, isFinished, restSeconds, secondsLeft]);

  useEffect(() => {
    if (isPreview || isSessionIntro || restSeconds === null || isPaused || isFinished) return undefined;

    if (restSeconds === 0) {
      const nextStepTimer = window.setTimeout(finishRest, 500);

      return () => window.clearTimeout(nextStepTimer);
    }

    const timer = window.setTimeout(() => setRestSeconds((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [finishRest, isFinished, isPaused, isPreview, isSessionIntro, restSeconds]);

  if (!exercise || currentIndex === -1) {
    return <main className="exercise-player exercise-player-message"><h1>{t("unknownExercise")}</h1><button onClick={() => navigate(returnTo, { replace: true })}>{t("back")}</button></main>;
  }

  if (isPreview || isSessionIntro) {
    const localized = { ...exercise, ...translatedExercise };
    const startUrl = exerciseHref(exercise.id, scope, value, sessionIds.length ? sessionIds : [exercise.id], sessionSettings);
    const totalExercises = scopedExercises.length || 1;
    const photoSources = getExercisePhotoSources(exercise.id);
    const equipment = localized.equipment || exercise.equipment;
    const requiresEquipment = !/^(aucun|none)(\b|\s|$)/i.test(String(equipment).trim());

    return (
      <section className="exercise-preview-page">
        <div className="exercise-preview-heading">
          <p className="exercise-preview-eyebrow">{isSessionIntro ? t("sessionReady") : t("exerciseDetails")}</p>
          <span>{localizedExerciseZone(exercise.zone, t)} · {exercise.category === "Renforcement" ? t("strengthening") : t("stretching")}</span>
          <h1>{localized.name}</h1>
          {isSessionIntro && <p className="exercise-preview-intro">{t("sessionReadyHelp", { count: totalExercises })}</p>}
        </div>

        <section className="exercise-preview-card">
          {photoSources.length ? (
            <div className={`exercise-preview-photos ${photoSources.length === 1 ? "is-single" : ""}`}>
              {photoSources.map((source, index) => (
                <figure className="exercise-preview-photo" key={source}>
                  <img src={source} alt={`${localized.name} — ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
                  {photoSources.length > 1 && <figcaption>{index + 1} / {photoSources.length}</figcaption>}
                </figure>
              ))}
            </div>
          ) : <div className="exercise-preview-zone" aria-hidden="true"><span>{localizedExerciseZone(exercise.zone, t)}</span></div>}
          <div className="exercise-preview-stats">
            <span><b>{exerciseSets}</b>{t("sets")}</span>
            <span><b>{exercise.reps}</b>{t("repetitions")}</span>
            <span><b>{holdSeconds ? `${holdSeconds}s` : "—"}</b>{t("hold")}</span>
          </div>
          <div className={`exercise-preview-equipment ${requiresEquipment ? "has-equipment" : ""}`}>
            <Dumbbell size={19} aria-hidden="true" />
            <div>
              <span>{t("equipmentToPrepare")}</span>
              <strong>{equipment}</strong>
            </div>
            <small>{requiresEquipment ? t("bringIfNeeded") : t("noEquipmentRequired")}</small>
          </div>
          <div className="exercise-preview-tags">
            <span>{localized.position}</span><span>{localized.duration} min</span><span>{localized.difficulty}</span>
          </div>
          <div className="exercise-preview-copy">
            <h2>{t("execution")}</h2><p>{localized.description}</p>
            <h2>{t("targetMuscles")}</h2><p>{Array.isArray(localized.muscles) ? localized.muscles.join(" · ") : localized.muscles}</p>
            <aside><strong>{t("maritimeBenefit")}</strong><p>{localized.interest}</p></aside>
          </div>
        </section>

        <div className="exercise-preview-actions">
          <button className="exercise-preview-back" type="button" onClick={returnToPreviousPage}>{t("backToList")}</button>
          <button className="exercise-preview-start" type="button" onClick={() => navigate(startUrl)}>{isSessionIntro ? t("startSession") : t("startExercise")}</button>
        </div>
      </section>
    );
  }

  if (isFinished) {
    return (
      <main className="exercise-player exercise-player-message">
        <p className="exercise-overline">{t("selectionComplete")}</p>
        <h1>{t("completed")}</h1>
        <button className="player-primary-button" onClick={() => navigate(returnTo, { replace: true })}>{t("backToList")}</button>
      </main>
    );
  }

  const isResting = restSeconds !== null;
  const displayedSeconds = isResting ? restSeconds : secondsLeft;
  const displayedDuration = isResting ? restDuration : holdSeconds;
  const progress = (isResting || isTimed) && displayedDuration ? ((displayedDuration - displayedSeconds) / displayedDuration) * 100 : 0;
  const hasPrevious = currentIndex > 0;
  const setsFor = (item) => Math.max(1, Math.min(6, (Number(item.sets) || 1) + seriesDelta));
  const totalSets = scopedExercises.reduce((total, item) => total + setsFor(item), 0);
  const completedSetsBefore = scopedExercises.slice(0, currentIndex).reduce((total, item) => total + setsFor(item), 0);
  const completedCurrentSets = Math.min(exerciseSets, isResting ? series : series - 1);
  const completedSets = completedSetsBefore + completedCurrentSets;
  const totalReps = scopedExercises.reduce((total, item) => total + (getRepCount(item.reps) * setsFor(item)), 0);
  const completedRepsBefore = scopedExercises.slice(0, currentIndex).reduce((total, item) => total + (getRepCount(item.reps) * setsFor(item)), 0);
  const completedReps = completedRepsBefore + (getRepCount(exercise.reps) * completedCurrentSets);
  const completedExercises = Math.min(scopedExercises.length, currentIndex + (isResting && pendingStep === "next-exercise" ? 1 : 0));
  const playerPhotoSources = getExercisePhotoSources(exercise.id);

  return (
    <main className="exercise-player">
      <aside className={`player-progress-panel ${isProgressOpen ? "is-open" : ""}`} aria-label={t("sessionProgress")}>
        <button className="player-progress-toggle" type="button" onClick={() => setIsProgressOpen((open) => !open)} aria-expanded={isProgressOpen}>
          {isProgressOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}<span>{t("progress")}</span>
        </button>
        <div className="player-progress-content">
          <p>{t("sessionProgress")}</p>
          <strong className="player-session-time"><Clock3 size={17} />{formatDuration(elapsedSeconds)}</strong>
          <div className="player-progress-stats"><span><b>{completedExercises}</b>{t("completedExercises", { total: scopedExercises.length })}</span><span><b>{completedSets}</b>{t("completedSets", { total: totalSets })}</span><span><b>{completedReps}</b>{t("completedReps", { total: totalReps })}</span></div>
          <div className="player-progress-remaining"><span>{t("remaining")}</span><strong>{Math.max(0, scopedExercises.length - completedExercises)} {t("exercises")}</strong></div>
        </div>
      </aside>
      <header className="player-header">
        <button className="player-close" aria-label={t("closeExercise")} onClick={() => navigate(returnTo, { replace: true })}>×</button>
        <span>{t("currentExercise")}</span>
        <button className="player-home" type="button" onClick={() => navigate("/")}>{t("mainMenu")}</button>
      </header>

      <section className="player-content">
        <p className="exercise-overline">{isResting ? t("recovery") : `${localizedExerciseZone(exercise.zone, t)} · ${t("series", { current: series, total: exerciseSets })}`}</p>
        <h1>{isResting ? t("restTitle", { count: restDuration }) : translatedExercise.name ?? exercise.name}</h1>
        {!isResting && <p className="player-safety-note">{t("safetyNote")}</p>}

        <div className={`player-workspace ${playerPhotoSources.length && !isResting ? "has-photos" : ""}`}>
          <div className="timer-area">
            <div className={`timer-ring ${(isTimed || isResting) ? "" : "timer-ring-manual"}`} style={{ "--progress": `${progress}%` }}>
              <svg className="timer-svg" viewBox="0 0 100 100" aria-hidden="true">
                <circle className="timer-track" cx="50" cy="50" r="45" />
                <circle
                  className="timer-progress"
                  cx="50"
                  cy="50"
                  r="45"
                  style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                />
              </svg>
              <div className="timer-center">
                {(isTimed || isResting) ? <strong>{displayedSeconds}</strong> : <strong>{exercise.reps}</strong>}
                <span>{(isTimed || isResting) ? t("seconds", { count: displayedDuration }) : t("repetitions")}</span>
              </div>
            </div>
            <p className="timer-label">{isResting ? t("recovery") : isTimed ? t("hold") : t("repsToDo")}</p>
            <div className="series-dots" aria-label={t("seriesAria", { current: series, total: exerciseSets })}>
              {Array.from({ length: exerciseSets }, (_, index) => <span key={index} className={index < series ? "series-dot-active" : ""} />)}
            </div>
          </div>

          {!isResting && playerPhotoSources.length > 0 && (
            <aside className="player-photo-panel" aria-label="Photos d'exécution">
              <div className="player-photo-main">
                <img src={playerPhotoSources[activePhotoIndex]} alt={`${translatedExercise.name ?? exercise.name} — ${activePhotoIndex + 1}`} />
              </div>
              {playerPhotoSources.length > 1 && (
                <div className="player-photo-thumbnails">
                  {playerPhotoSources.map((source, index) => (
                    <button key={source} type="button" className={index === activePhotoIndex ? "is-active" : ""} onClick={() => setActivePhotoIndex(index)} aria-label={`Afficher la photo ${index + 1}`}>
                      <img src={source} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </aside>
          )}
        </div>

        <p className="player-instruction">{isResting ? t("nextStarts") : translatedExercise.description ?? exercise.description}</p>

        <div className="player-actions">
          {(isTimed || isResting) && <button className="player-secondary-button" onClick={() => setIsPaused((paused) => !paused)}>{isPaused ? t("resume") : t("pause")}</button>}
          {!isResting && <button className="player-primary-button" onClick={completeSeries}>{t("validate")}</button>}
          {isResting && <button className="player-primary-button" onClick={finishRest}>{t("skipRest")}</button>}
        </div>

        {!isResting && <div className="player-navigation">
          {hasPrevious && <button onClick={() => goToExercise(currentIndex - 1)}>{t("previousExercise")}</button>}
          <button onClick={() => goToExercise(currentIndex + 1)}>{t("skipExercise")}</button>
        </div>}
      </section>
    </main>
  );
}
