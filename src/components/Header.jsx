import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import jobs from "../data/jobs";
import { localizedJob } from "../utils/localize";
import { getActiveProfile } from "../utils/profile";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(getActiveProfile);
  const job = jobs.find((item) => item.id === profile.jobId);

  useEffect(() => {
    const refreshProfile = () => setProfile(getActiveProfile());
    window.addEventListener("musculoprevent-profile-updated", refreshProfile);
    return () => window.removeEventListener("musculoprevent-profile-updated", refreshProfile);
  }, []);

  return (
    <header className="header">
      <div className="header-shell header-shell-simple">
        <button className="header-brand" type="button" onClick={() => navigate("/")} aria-label={t("brandHome")}>
          <span className="header-brand-mark" aria-hidden="true" />
          <span>MusculoPrevent</span>
        </button>

        <div className="header-person" aria-label={t("profile")}>
          <span className="header-person-initial" aria-hidden="true">{(profile.firstName || "?").trim().charAt(0).toUpperCase()}</span>
          <span className="header-person-copy">
            <strong>{profile.firstName || t("profile")}</strong>
            {job && <small>{localizedJob(job, t)}</small>}
          </span>
        </div>
      </div>
    </header>
  );
}
