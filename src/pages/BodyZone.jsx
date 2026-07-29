import Header from "../components/Header";
import "./BodyZone.css";
import bodyZones from "../data/bodyZones";
import { useNavigate } from "react-router-dom";

function BodyZone() {

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="card zone-card">

        <h1 className="body-title">
          Choisissez une zone musculaire
        </h1>

        <p className="body-subtitle">
          Sélectionnez la région du corps que vous souhaitez renforcer.
        </p>

        <div className="body-grid">

          {bodyZones.map((zone) => (

            <div
              key={zone.id}
              className="body-card"
              onClick={() => navigate("/exercises")}
            >

              <div className="body-icon">
                {zone.icon}
              </div>

              <h2>{zone.name}</h2>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}

export default BodyZone;
