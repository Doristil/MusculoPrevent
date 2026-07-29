import { useParams, useNavigate } from "react-router-dom";
import exercises from "../data/exercises";
import jobs from "../data/jobs";
import "./Exercises.css";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function Exercises() {
  const { job, zone } = useParams();
  const navigate = useNavigate();

  let filteredExercises = [];

  // Recherche par zone musculaire
  if (zone) {
    filteredExercises = exercises.filter(
      (exercise) => slugify(exercise.zone) === zone
    );
  }

  // Recherche par métier
  if (job) {
    const selectedJob = jobs.find(
      (j) => slugify(j.name) === job
    );

    if (selectedJob) {
      filteredExercises = exercises
        .filter((exercise) =>
          selectedJob.muscles.some(
            (muscle) =>
              slugify(muscle.zone) === slugify(exercise.zone)
          )
        )
        .sort((a, b) => {
          const priorityA =
            selectedJob.muscles.find(
              (m) => slugify(m.zone) === slugify(a.zone)
            )?.priority || 0;

          const priorityB =
            selectedJob.muscles.find(
              (m) => slugify(m.zone) === slugify(b.zone)
            )?.priority || 0;

          return priorityB - priorityA;
        });
    }
  }

  return (
    <div className="exercises-page">

      <h2 className="page-title">
        Exercices recommandés
      </h2>

      <p className="page-subtitle">
        Cliquez sur un exercice pour consulter sa fiche détaillée.
      </p>

      <div className="exercise-grid">

        {filteredExercises.length === 0 ? (
          <p>Aucun exercice trouvé.</p>
        ) : (
          filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="card exercise-card"
              onClick={() =>
                navigate(`/exercise/${exercise.id}`)
              }
            >
              <img
                src={`/images/exercises/${exercise.photo}`}
                alt={exercise.nom}
                className="exercise-image"
              />

              <div className="exercise-content">

                <span className="badge">
                  {exercise.zone}
                </span>

                <h3>{exercise.nom}</h3>

                <p>{exercise.description}</p>

                <div className="exercise-footer">

                  <span>
                    {exercise.niveau}
                  </span>

                  <span>
                    {exercise.objectif}
                  </span>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}