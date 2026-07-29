import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="card home-card">

        <div className="card">

          <h1>⚓ MusculoPrevent</h1>

          <h2>
            Prévention des Troubles Musculo-Squelettiques
          </h2>

          <p>
            Application permettant de créer un programme de
            renforcement musculaire personnalisé selon le poste
            occupé à bord d'un navire.
          </p>

          <button onClick={() => navigate("/search")}>
            Commencer
          </button>

        </div>

      </div>
    </>
  );
}

export default Home;

