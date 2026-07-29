import { useParams, useNavigate } from "react-router-dom";
import exercises from "../data/exercises";
import "./ExerciseDetail.css";

export default function ExerciseDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const exercise = exercises.find(
        e => e.id === id
    );

    if (!exercise) {

        return <h2>Exercice introuvable.</h2>;

    }

    return (

        <div className="exercise-detail">

            <button
                className="btn-secondary"
                onClick={() => navigate(-1)}
            >
                ← Retour
            </button>

            <div className="detail-card">

                <img
                    src={`/images/exercises/${exercise.photo}`}
                    alt={exercise.nom}
                    className="detail-image"
                />

                <div className="detail-content">

                    <span className="badge">
                        {exercise.zone}
                    </span>

                    <h1>
                        {exercise.nom}
                    </h1>

                    <p className="description">
                        {exercise.description}
                    </p>

                    <div className="info-grid">

                        <div className="info-box">
                            <h4>Niveau</h4>
                            <p>{exercise.niveau}</p>
                        </div>

                        <div className="info-box">
                            <h4>Objectif</h4>
                            <p>{exercise.objectif}</p>
                        </div>

                        <div className="info-box">
                            <h4>Matériel</h4>
                            <p>{exercise.materiel}</p>
                        </div>

                        <div className="info-box">
                            <h4>Difficulté</h4>
                            <p>{exercise.difficulte}</p>
                        </div>

                        <div className="info-box">
                            <h4>Séries</h4>
                            <p>{exercise.series}</p>
                        </div>

                        <div className="info-box">
                            <h4>Répétitions</h4>
                            <p>{exercise.repetitions}</p>
                        </div>

                        <div className="info-box">
                            <h4>Maintien</h4>
                            <p>{exercise.maintien}</p>
                        </div>

                        <div className="info-box">
                            <h4>Temps</h4>
                            <p>{exercise.temps}</p>
                        </div>

                    </div>

                    <div className="section">

                        <h3>Muscles sollicités</h3>

                        <div className="muscles">

                            {exercise.muscles.map((muscle) => (

                                <span
                                    key={muscle}
                                    className="badge"
                                >
                                    {muscle}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="section">

                        <h3>Pourquoi faire cet exercice ?</h3>

                        <p>

                            {exercise.interet}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}