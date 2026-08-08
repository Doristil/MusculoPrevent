import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { exerciseHref, getExerciseScope } from "../utils/exerciseScope";
import catalogTranslations from "../data/catalogTranslations";
import { useTranslation } from "../context/LanguageContext";
import { buildTimedSession, exercisesForLevel } from "../utils/sessionBuilder";
import { getActiveProfile } from "../utils/profile";
import jobs from "../data/jobs";
import bodyZones from "../data/bodyZones";
import { localizedBodyZone, localizedExerciseZone, localizedJob, localizedLevel } from "../utils/localize";
import { Grid2X2, List } from "lucide-react";
import "./Exercises.css";

export default function Exercises() {

  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const [withoutEquipment, setWithoutEquipment] = useState(false);
  const [shortFormat, setShortFormat] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [displayMode, setDisplayMode] = useState("grid");
  const [profile, setProfile] = useState(getActiveProfile);
  const [customExerciseIds, setCustomExerciseIds] = useState([]);
  const [sessionProfile, setSessionProfile] = useState("balanced");
  const [searchParams] = useSearchParams();
  const { job: jobId, zone: zoneSlug, zones: zonesSlug } = useParams();
  const scope = jobId ? "job" : zonesSlug ? "zones" : "zone";
  const value = jobId ?? zonesSlug ?? zoneSlug;
  const mode = searchParams.get("mode") ?? "list";
  const showAdapted = mode === "adapted";
  const showCustom = mode === "custom";
  const showList = mode === "list" || mode === "custom";
  const { selectedZones, exercises: filteredExercises } = getExerciseScope(scope, value);
  const selectedZonesKey = selectedZones.join("|");
  const context = jobId
    ? `${t("job")}: ${localizedJob(jobs.find((job) => String(job.id) === String(jobId)), t)}`
    : zonesSlug
      ? `${t("sessionZones")}: ${zonesSlug.split(",").map((slug) => localizedBodyZone(bodyZones.find((zone) => zone.slug === slug), t)).join(", ")}`
      : `${t("byZone")}: ${localizedBodyZone(bodyZones.find((zone) => zone.slug === zoneSlug), t)}`;
  const [sessionZones, setSessionZones] = useState(selectedZones);
  const categories = ["Étirement", "Renforcement"];
  const sessionProfiles = {
    gentle: { restSeconds: 40, seriesDelta: -1 },
    balanced: { restSeconds: 20, seriesDelta: 0 },
    challenge: { restSeconds: 10, seriesDelta: 1 },
  };
  const sessionSettings = sessionProfiles[sessionProfile];
  useEffect(() => {
    const updateProfile = () => setProfile(getActiveProfile());
    window.addEventListener("musculoprevent-profile-updated", updateProfile);
    return () => window.removeEventListener("musculoprevent-profile-updated", updateProfile);
  }, []);
  useEffect(() => {
    setSessionZones(selectedZonesKey ? selectedZonesKey.split("|") : []);
  }, [selectedZonesKey]);
  const levelExercises = exercisesForLevel(filteredExercises, profile.level);
  const availableExercises = levelExercises.filter((exercise) => (
    !withoutEquipment || /^(Aucun|Élastique \(optionnel\))/i.test(exercise.equipment)
  ) && (!shortFormat || exercise.duration <= 4));
  const displayedExercises = availableExercises.filter((exercise) => categoryFilter === "all" || exercise.category === categoryFilter);
  const sessionExercises = availableExercises.filter((exercise) => sessionZones.includes(exercise.zone));
  const zoneAnchor = (zone) => `zone-${zone.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
  const sections = selectedZones.map((zone) => ({
    zone,
    categories: categories.map((category) => ({
      category,
        exercises: displayedExercises.filter(
        (exercise) => exercise.zone === zone && exercise.category === category
      ),
    })).filter((group) => group.exercises.length > 0),
  })).filter((section) => section.categories.length > 0);
  const startTimedSession = (session) => {
    if (session.exercises.length) navigate(`${exerciseHref(session.exercises[0].id, scope, value, session.exercises.map((exercise) => exercise.id), sessionSettings)}&intro=1`);
  };
  const sessionDurations = [15, 20, 30];
  if (sessionZones.length >= 3) sessionDurations.push(45);
  if (sessionZones.length >= 5) sessionDurations.push(60);
  const sessionOptions = sessionDurations
    .map((minutes) => ({ minutes, session: buildTimedSession(sessionExercises, minutes, sessionZones, sessionSettings) }))
    .filter(({ minutes, session }) => {
      if (minutes === 30) return session.estimatedMinutes > 20;
      if (minutes === 45) return session.estimatedMinutes > 30;
      if (minutes === 60) return session.estimatedMinutes > 45;
      return true;
    });
  const levelLabel = localizedLevel(profile.level, t);
  const toggleSessionZone = (zone) => setSessionZones((current) => current.includes(zone) ? current.filter((item) => item !== zone) : [...current, zone]);
  const toggleCustomExercise = (exerciseId) => setCustomExerciseIds((current) => current.includes(exerciseId) ? current.filter((id) => id !== exerciseId) : [...current, exerciseId]);
  const customExercises = filteredExercises.filter((exercise) => customExerciseIds.includes(exercise.id));
  const startCustomSession = () => {
    if (customExercises.length) navigate(`${exerciseHref(customExercises[0].id, scope, value, customExercises.map((exercise) => exercise.id), sessionSettings)}&intro=1`);
  };

  return (

    <div className="exercises-page">

      <h1 className="page-title">
        {t("exercisesTitle", { context })}
      </h1>

      <p className="page-subtitle">
        {t("exercisesAvailable", { count: displayedExercises.length })}
      </p>

      <div className="exercise-filters exercise-filters-top" aria-label={t("filters")}>
        <span>{t("filters")}</span>
        <button className={categoryFilter === "all" ? "is-active" : ""} type="button" onClick={() => setCategoryFilter("all")} aria-pressed={categoryFilter === "all"}>{t("allExercises")}</button>
        <button className={categoryFilter === "Étirement" ? "is-active" : ""} type="button" onClick={() => setCategoryFilter("Étirement")} aria-pressed={categoryFilter === "Étirement"}>{t("stretching")}</button>
        <button className={categoryFilter === "Renforcement" ? "is-active" : ""} type="button" onClick={() => setCategoryFilter("Renforcement")} aria-pressed={categoryFilter === "Renforcement"}>{t("strengthening")}</button>
        <button className={withoutEquipment ? "is-active" : ""} type="button" onClick={() => setWithoutEquipment((active) => !active)} aria-pressed={withoutEquipment}>{t("noEquipment")}</button>
        <button className={shortFormat ? "is-active" : ""} type="button" onClick={() => setShortFormat((active) => !active)} aria-pressed={shortFormat}>{t("shortFormat")} · ≤ 4 min</button>
        <div className="exercise-view-toggle" role="group" aria-label={t("exerciseView") }>
          <button className={displayMode === "grid" ? "is-active" : ""} type="button" onClick={() => setDisplayMode("grid")} aria-label={t("cardView")} aria-pressed={displayMode === "grid"}><Grid2X2 size={16} /></button>
          <button className={displayMode === "list" ? "is-active" : ""} type="button" onClick={() => setDisplayMode("list")} aria-label={t("listView")} aria-pressed={displayMode === "list"}><List size={17} /></button>
        </div>
      </div>

      {showAdapted && <section className="session-complexity" aria-label={t("sessionComplexity")}>
        <div className="session-complexity-heading">
          <p>{t("sessionComplexity")}</p>
          <span>{t("sessionComplexityHelp")}</span>
        </div>
        <div className="session-complexity-options">
          {Object.keys(sessionProfiles).map((option) => (
            <button key={option} type="button" className={sessionProfile === option ? "is-active" : ""} onClick={() => setSessionProfile(option)} aria-pressed={sessionProfile === option}>
              <strong>{t(`sessionProfile_${option}`)}</strong>
              <span>{t(`sessionProfile_${option}Help`)}</span>
            </button>
          ))}
        </div>
      </section>}

      {showCustom && <section className="custom-session-builder" aria-label={t("customSession")}>
        <div>
          <p>{t("customSession")}</p>
          <span>{t("customSessionHelp")}</span>
        </div>
        <div className="custom-session-actions">
          <strong>{t("selectedExercises", { count: customExercises.length })}</strong>
          {customExercises.length > 0 && <button className="custom-session-clear" type="button" onClick={() => setCustomExerciseIds([])}>{t("clearSelection")}</button>}
          <button className="custom-session-start" type="button" disabled={!customExercises.length} onClick={startCustomSession}>{t("startCustomSession")}</button>
        </div>
      </section>}

      {showAdapted && <section className="session-picker" aria-label={t("adaptedSession")}>
        <div className="session-picker-heading">
          <p>{t("adaptedSession")}</p>
          <span>{t("adaptedSessionHelp")}{levelLabel ? ` · ${levelLabel}` : ""}</span>
        </div>
        <div className="session-zone-picker">
          <div>
            <strong>{t("sessionZones")}</strong>
            <span>{t("sessionZonesHelp")}</span>
          </div>
          <div className="session-zone-chips">
            {selectedZones.map((zone) => <button key={zone} className={sessionZones.includes(zone) ? "is-active" : ""} type="button" onClick={() => toggleSessionZone(zone)} aria-pressed={sessionZones.includes(zone)}>{localizedExerciseZone(zone, t)}</button>)}
            <button className="session-zone-reset" type="button" onClick={() => setSessionZones(selectedZones)}>{t("allZones")}</button>
          </div>
        </div>
        <div className="session-picker-actions" role="list">{sessionOptions.map(({ minutes, session }) => (
          <article className="session-option" key={minutes} role="listitem">
            <div className="session-option-top"><p>{t("generatedForYou")}</p><span>{minutes} min</span></div>
            <h2>{session.exercises.length} {t("exercises")}</h2>
            <span className="session-option-duration">≈ {session.estimatedMinutes} min</span>
            <ul>
              {session.exercises.slice(0, 3).map((exercise) => {
                const localizedExercise = { ...exercise, ...(catalogTranslations[language]?.[exercise.id] ?? {}) };
                return <li key={exercise.id}><strong>{localizedExercise.name}</strong><span>{localizedExerciseZone(exercise.zone, t)}</span></li>;
              })}
              {session.exercises.length > 3 && <li className="session-option-more">+ {session.exercises.length - 3}</li>}
            </ul>
            <button type="button" disabled={!session.exercises.length} onClick={() => startTimedSession(session)}>{t("start")}</button>
          </article>
        ))}</div>
      </section>}

      {showList && jobId && (
        <nav className="zone-menu" aria-label={t("quickZoneAccess")}>
          <span className="zone-menu-label">{t("goToZone")}</span>
          <div className="zone-menu-links">
            {selectedZones.map((zone) => (
              <button key={zone} type="button" onClick={() => document.getElementById(zoneAnchor(zone))?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                {localizedExerciseZone(zone, t)}
              </button>
            ))}
          </div>
        </nav>
      )}

      {showList && <>
      <div className="exercise-list-heading">
        <p>{t("exerciseListEyebrow")}</p>
        <h2>{t("exerciseListTitle")}</h2>
      </div>

      {sections.map((section) => (
        <section className="exercise-zone" id={zoneAnchor(section.zone)} key={section.zone}>
          <h2 className="exercise-zone-title">{localizedExerciseZone(section.zone, t)}</h2>

          {section.categories.map((group) => (
            <div className="exercise-category" key={group.category}>
              <h3 className="exercise-category-title">{group.category === "Renforcement" ? t("strengthening") : t("stretching")}</h3>

              <div className={`exercise-grid ${displayMode === "list" ? "is-list" : ""}`}>
                {group.exercises.map((exercise) => (
                  (() => {
                    const translated = catalogTranslations[language]?.[exercise.id] ?? {};
                    const localizedExercise = { ...exercise, ...translated };
                    return (
                  <article
                    key={exercise.id}
                    className={`exercise-card ${customExerciseIds.includes(exercise.id) ? "is-selected" : ""}`}
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate(`${exerciseHref(exercise.id, scope, value, [exercise.id])}&preview=1`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`${exerciseHref(exercise.id, scope, value, [exercise.id])}&preview=1`);
                      }
                    }}
                  >
                    <div className="exercise-image-placeholder" aria-hidden="true">{localizedExerciseZone(exercise.zone, t)}</div>

                    <div className="exercise-content">
                      <span className="badge">{exercise.category === "Renforcement" ? t("strengthening") : t("stretching")}</span>
                      <h4>{localizedExercise.name}</h4>
                      <p>{localizedExercise.description}</p>

                      <div className="exercise-footer">
                        <span>{localizedLevel(exercise.level, t)}</span>
                        <span>{localizedExercise.objective}</span>
                      </div>
                      <button className="exercise-select-button" type="button" aria-pressed={customExerciseIds.includes(exercise.id)} onClick={(event) => { event.stopPropagation(); toggleCustomExercise(exercise.id); }}>
                        {customExerciseIds.includes(exercise.id) ? t("removeExercise") : t("selectExercise")}
                      </button>
                      <button className="exercise-details-button" type="button" onClick={(event) => { event.stopPropagation(); navigate(`${exerciseHref(exercise.id, scope, value, [exercise.id])}&preview=1`); }}>{t("viewExerciseDetails")}</button>
                    </div>
                  </article>
                    );
                  })()
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
      </>}

    </div>

  );

}
