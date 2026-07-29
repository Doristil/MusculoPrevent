import "./SearchMode.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function SearchMode() {

    const navigate = useNavigate();

    return (

        <>
            <Header />

            <div className="card search-card">

                <h1>Choisir un mode de recherche</h1>

                <p>
                    Comment souhaitez-vous rechercher vos exercices ?
                </p>

                <div className="cards">

                    <div
                        className="card-choice"
                        onClick={() => navigate("/job")}
                    >

                        <div className="icon">⚓</div>

                        <h2>Par poste</h2>

                        <p>
                            Trouver les exercices selon votre fonction
                            à bord.
                        </p>

                    </div>

                    <div
                        className="card-choice"
                        onClick={() => navigate("/body-zone")}
                    >

                        <div className="icon">💪</div>

                        <h2>Par zone musculaire</h2>

                        <p>
                            Trouver les exercices selon la zone
                            du corps à renforcer.
                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

export default SearchMode;