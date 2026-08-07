import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import "./Home.css";

function Home() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
      <section className="home-hero">
        <div className="home-content">
          <p className="home-eyebrow">{t("homeEyebrow")}</p>

          <h1>{t("homeTitle")}</h1>

          <p className="home-description">
            {t("homeDescription")}
          </p>

          <div className="home-actions">
            <button className="home-start" onClick={() => navigate("/search")}>
              {t("start")} <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
  );
}

export default Home;
