import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import exercises from "../data/exercises";
import { displayZoneName, exerciseHref, getExerciseScope } from "../utils/exerciseScope";
import catalogTranslations from "../data/catalogTranslations";
import { useTranslation } from "../i18n";
import { recordExercise } from "../utils/activity";
import { ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
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

const REST_DURATION = 20;

export default function ExerciseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const scope = query.get("scope") ?? "all";
  const value = query.get("value") ?? "all";
  const scopeData = useMemo(() => getExerciseScope(scope, value), [scope, value]);
  const sessionIds = useMemo(() => query.get("session")?.split(",").filter(Boolean) ?? [], [query]);
  const { exercises: scopeExercises, returnTo } = scopeData;
  const scopedExercises = sessionIds.length ? sessionIds.map((sessionId) => scopeExercises.find((item) => item.id === sessionId)).filter(Boolean) : scopeExercises;
  const exercise = exercises.find((item) => item.id === id);
  const translatedExercise = catalogTranslations[language]?.[id] ?? {};
  const currentIndex = scopedExercises.findIndex((item) => item.id === id);
  const holdSeconds = getHoldSeconds(exercise?.hold);
  const isTimed = holdSeconds !== null;
  const sessionKey = `musculoprevent-session:${scope}:${value}`;
  const [series, setSeries] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(holdSeconds ?? 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [restSeconds, setRestSeconds] = useState(null);
  const [pendingStep, setPendingStep] = useState(null);
  const [isProgressOpen, setIsProgressOpen] = useState(true);
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
  }, [id, holdSeconds]);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsedSeconds(Math.max(0, Math.floor((Date.now() - sessionStartedAt) / 1000))), 1000);
    return () => window.clearInterval(timer);
  }, [sessionStartedAt]);

  const goToExercise = useCallback((index) => {
    const nextExercise = scopedExercises[index];
    if (nextExercise) {
      navigate(exerciseHref(nextExercise.id, scope, value, sessionIds), { replace: true });
    } else {
      setIsFinished(true);
    }
  }, [navigate, scope, scopedExercises, sessionIds, value]);

  const startRest = useCallback((nextStep) => {
    setPendingStep(nextStep);
    setRestSeconds(REST_DURATION);
    setIsPaused(false);
  }, []);

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
    if (series < exercise.sets) {
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
  }, [currentIndex, exercise, scopedExercises, series, sessionId, sessionStartedAt, scope, startRest, value]);

  useEffect(() => {
    if (!isTimed || isPaused || isFinished || restSeconds !== null) return undefined;

    if (secondsLeft === 0) {
      const completionTimer = window.setTimeout(completeSeries, 500);
      return () => window.clearTimeout(completionTimer);
    }

    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [completeSeries, isPaused, isTimed, isFinished, restSeconds, secondsLeft]);

  useEffect(() => {
    if (restSeconds === null || isPaused || isFinished) return undefined;

    if (restSeconds === 0) {
      const nextStepTimer = window.setTimeout(finishRest, 500);

      return () => window.clearTimeout(nextStepTimer);
    }

    const timer = window.setTimeout(() => setRestSeconds((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [finishRest, isFinished, isPaused, restSeconds]);

  if (!exercise || currentIndex === -1) {
    return <main className="exercise-player exercise-player-message"><h1>{t("unknownExercise")}</h1><button onClick={() => navigate(returnTo, { replace: true })}>{t("back")}</button></main>;
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
  const displayedDuration = isResting ? REST_DURATION : holdSeconds;
  const progress = (isResting || isTimed) && displayedDuration ? ((displayedDuration - displayedSeconds) / displayedDuration) * 100 : 0;
  const hasPrevious = currentIndex > 0;
  const totalSets = scopedExercises.reduce((total, item) => total + item.sets, 0);
  const completedSetsBefore = scopedExercises.slice(0, currentIndex).reduce((total, item) => total + item.sets, 0);
  const completedCurrentSets = Math.min(exercise.sets, isResting ? series : series - 1);
  const completedSets = completedSetsBefore + completedCurrentSets;
  const totalReps = scopedExercises.reduce((total, item) => total + (getRepCount(item.reps) * item.sets), 0);
  const completedRepsBefore = scopedExercises.slice(0, currentIndex).reduce((total, item) => total + (getRepCount(item.reps) * item.sets), 0);
  const completedReps = completedRepsBefore + (getRepCount(exercise.reps) * completedCurrentSets);
  const completedExercises = Math.min(scopedExercises.length, currentIndex + (isResting && pendingStep === "next-exercise" ? 1 : 0));

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
        <p className="exercise-overline">{isResting ? t("recovery") : `${displayZoneName(exercise.zone)} · ${t("series", { current: series, total: exercise.sets })}`}</p>
        <h1>{isResting ? t("restTitle") : translatedExercise.name ?? exercise.name}</h1>
        {!isResting && <p className="player-safety-note">Prévention : restez dans une amplitude confortable et arrêtez l’exercice en cas de douleur.</p>}

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
          <div className="series-dots" aria-label={`Série ${series} sur ${exercise.sets}`}>
            {Array.from({ length: exercise.sets }, (_, index) => <span key={index} className={index < series ? "series-dot-active" : ""} />)}
          </div>
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
