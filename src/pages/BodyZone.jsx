import "./BodyZone.css";
import { useEffect, useState } from "react";
import bodyZones from "../data/bodyZones";
import { useNavigate } from "react-router-dom";
import BodyMap from "../components/BodyMap";
import { useTranslation } from "../context/LanguageContext";
import { getActiveProfile } from "../utils/profile";

function BodyZone() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSlugs, setSelectedSlugs] = useState([]);
  const [sex, setSex] = useState(() => getActiveProfile().sex ?? "male");

  useEffect(() => {
    const refreshProfile = () => setSex(getActiveProfile().sex ?? "male");
    window.addEventListener("musculoprevent-profile-updated", refreshProfile);
    return () => window.removeEventListener("musculoprevent-profile-updated", refreshProfile);
  }, []);

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

        <BodyMap zones={bodyZones} selectedSlugs={selectedSlugs} onSelect={toggleZone} sex={sex} />

        <div className="zone-selection-actions">
          <p>{selectedZones.length ? t("selectedZoneCount", { count: selectedZones.length }) : t("zoneHelp")}</p>
          <button type="button" disabled={!selectedSlugs.length} onClick={() => navigate(`/selection/zones/${selectedSlugs.join(",")}`)}>
            {t("viewAdaptedSessions")}
          </button>
        </div>

      </section>
  );
}

export default BodyZone;
