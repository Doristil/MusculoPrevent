import "./BodyZone.css";
import { useState } from "react";
import bodyZones from "../data/bodyZones";
import { useNavigate } from "react-router-dom";
import BodyMap from "../components/BodyMap";
import { useTranslation } from "../i18n";

function BodyZone() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSlugs, setSelectedSlugs] = useState([]);

  const toggleZone = (zone) => {
    setSelectedSlugs((current) => current.includes(zone.slug)
      ? current.filter((slug) => slug !== zone.slug)
      : [...current, zone.slug]);
  };
  const selectedZones = bodyZones.filter((zone) => selectedSlugs.includes(zone.slug));

  return (
      <section className="zone-page">

        <p className="page-eyebrow">{t("zoneSearch")}</p>
        <h1 className="body-title">{t("zoneQuestion")}</h1>

        <p className="body-subtitle">
          {t("zoneMultiHelp")}
        </p>

        <BodyMap zones={bodyZones} selectedSlugs={selectedSlugs} onSelect={toggleZone} />

        <div className="zone-selection-actions">
          <p>{selectedZones.length ? t("selectedZoneCount", { count: selectedZones.length }) : t("zoneHelp")}</p>
          <button type="button" disabled={!selectedSlugs.length} onClick={() => navigate(`/exercises/zones/${selectedSlugs.join(",")}`)}>
            {t("viewAdaptedSessions")}
          </button>
        </div>

      </section>
  );
}

export default BodyZone;
