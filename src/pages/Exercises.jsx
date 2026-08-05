import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { exerciseHref, getExerciseScope } from "../utils/exerciseScope";
import catalogTranslations from "../data/catalogTranslations";
import { useTranslation } from "../i18n";
import { buildTimedSession, exercisesForLevel } from "../utils/sessionBuilder";
import { getActiveProfile } from "../utils/profile";
import "./Exercises.css";

export default function Exercises() {

  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const [withoutEquipment, setWithoutEquipment] = useState(false);
  const [shortFormat, setShortFormat] = useState(false);
  const [profile, setProfile] = useState(getActiveProfile);
  const { job: jobId, zone: zoneSlug } = useParams();
  const scope = jobId ? "job" : "zone";
  const value = jobId ?? zoneSlug;
  const { context, selectedZones, exercises: filteredExercises } = getExerciseScope(scope, value);
  const categories = ["Étirement", "Renforcement"];
  useEffect(() => {
    const updateProfile = () => setProfile(getActiveProfile());
    window.addEventListener("musculoprevent-profile-updated", updateProfile);
    return () => window.removeEventListener("musculoprevent-profile-updated", updateProfile);
  }, []);
  const levelExercises = exercisesForLevel(filteredExercises, profile.level);
  const availableExercises = levelExercises.filter((exercise) => (
    !withoutEquipment || /^(Aucun|Élastique \(optionnel\))/i.test(exercise.equipment)
  ) && (!shortFormat || exercise.duration <= 4));
  const zoneAnchor = (zone) => `zone-${zone.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
  const sections = selectedZones.map((zone) => ({
    zone,
    categories: categories.map((category) => ({
      category,
        exercises: availableExercises.filter(
        (exercise) => exercise.zone === zone && exercise.category === category
      ),
    })).filter((group) => group.exercises.length > 0),
  })).filter((section) => section.categories.length > 0);
  const startTimedSession = (session) => {
    if (session.exercises.length) navigate(exerciseHref(session.exercises[0].id, scope, value, session.exercises.map((exercise) => exercise.id)));
  };
  const sessionOptions = [15, 20, 30].map((minutes) => ({ minutes, session: buildTimedSession(availableExercises, minutes) })).filter(({ minutes, session }) => minutes !== 30 || session.estimatedMinutes > 20);
  const levelLabel = { "Débutant": language === "en" ? "Beginner" : "Débutant", "Intermédiaire": language === "en" ? "Intermediate" : "Intermédiaire", "Confirmé": language === "en" ? "Advanced" : "Confirmé" }[profile.level];

  return (

    <div className="exercises-page">

      <h1 className="page-title">
        {t("exercisesTitle", { context })}
      </h1>

      <p className="page-subtitle">
        {t("exercisesAvailable", { count: availableExercises.length })}
      </p>

      <section className="session-picker" aria-label={t("adaptedSession")}>
        <div className="session-picker-heading">
          <p>{t("adaptedSession")}</p>
          <span>{t("adaptedSessionHelp")}{levelLabel ? ` · ${levelLabel}` : ""}</span>
        </div>
        <div className="session-picker-actions">{sessionOptions.map(({ minutes, session }) => (
          <article className="session-option" key={minutes}>
            <div className="session-option-top"><p>{language === "en" ? "GENERATED FOR YOU" : "GÉNÉRÉE POUR VOUS"}</p><span>{minutes} min</span></div>
            <h2>{session.exercises.length} {t("exercises")}</h2>
            <span className="session-option-duration">≈ {session.estimatedMinutes} min</span>
            <ul>
              {session.exercises.map((exercise) => {
                const localizedExercise = { ...exercise, ...(catalogTranslations[language]?.[exercise.id] ?? {}) };
                return <li key={exercise.id}><strong>{localizedExercise.name}</strong><span>{localizedExercise.zone}</span></li>;
              })}
            </ul>
            <button type="button" disabled={!session.exercises.length} onClick={() => startTimedSession(session)}>{t("start")}</button>
          </article>
        ))}</div>
      </section>

      <div className="exercise-filters" aria-label={t("filters")}>
        <span>{t("filters")}</span>
        <button className={withoutEquipment ? "is-active" : ""} type="button" onClick={() => setWithoutEquipment((active) => !active)} aria-pressed={withoutEquipment}>{t("noEquipment")}</button>
        <button className={shortFormat ? "is-active" : ""} type="button" onClick={() => setShortFormat((active) => !active)} aria-pressed={shortFormat}>{t("shortFormat")} · ≤ 4 min</button>
      </div>

      {jobId && (
        <nav className="zone-menu" aria-label="Accès rapide aux zones musculaires">
          <span className="zone-menu-label">{t("goToZone")}</span>
          <div className="zone-menu-links">
            {selectedZones.map((zone) => (
              <button key={zone} type="button" onClick={() => document.getElementById(zoneAnchor(zone))?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                {zone}
              </button>
            ))}
          </div>
        </nav>
      )}

      {sections.map((section) => (
        <section className="exercise-zone" id={zoneAnchor(section.zone)} key={section.zone}>
          <h2 className="exercise-zone-title">{section.zone}</h2>

          {section.categories.map((group) => (
            <div className="exercise-category" key={group.category}>
              <h3 className="exercise-category-title">{group.category === "Renforcement" ? t("strengthening") : t("stretching")}</h3>

              <div className="exercise-grid">
                {group.exercises.map((exercise) => (
                  (() => {
                    const translated = catalogTranslations[language]?.[exercise.id] ?? {};
                    const localizedExercise = { ...exercise, ...translated };
                    return (
                  <article
                    key={exercise.id}
                    className="exercise-card"
                    onClick={() => navigate(exerciseHref(exercise.id, scope, value, [exercise.id]))}
                  >
                    <div className="exercise-image-placeholder" aria-hidden="true">{localizedExercise.zone}</div>

                    <div className="exercise-content">
                      <span className="badge">{exercise.category === "Renforcement" ? t("strengthening") : t("stretching")}</span>
                      <h4>{localizedExercise.name}</h4>
                      <p>{localizedExercise.description}</p>

                      <div className="exercise-footer">
                        <span>{localizedExercise.level}</span>
                        <span>{localizedExercise.objective}</span>
                      </div>
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

    </div>

  );

}
