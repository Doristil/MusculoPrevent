import "./BodyZone.css";
import bodyZones from "../data/bodyZones";
import { useNavigate } from "react-router-dom";
import BodyMap from "../components/BodyMap";
import { useTranslation } from "../i18n";

function BodyZone() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
      <section className="zone-page">

        <p className="page-eyebrow">{t("zoneSearch")}</p>
        <h1 className="body-title">{t("zoneQuestion")}</h1>

        <p className="body-subtitle">
          {t("zoneHelp")}
        </p>

        <BodyMap zones={bodyZones} onSelect={(zone) => navigate(`/exercises/body/${zone.slug}`)} />

      </section>
  );
}

export default BodyZone;
