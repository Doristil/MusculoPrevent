import { ArrowLeft, Moon, Sun, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import { getActiveProfile, readProfileArchive, saveProfile } from "../utils/profile";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("musculoprevent-theme") ?? "light");
  const [profile, setProfile] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(readProfileArchive);
  const languages = [["fr", "FR", "Français"], ["en", "EN", "English"]];

  const goTo = (path) => {
    navigate(path);
  };
  const goBack = () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate("/");
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("musculoprevent-theme", theme);
  }, [theme]);

  useEffect(() => {
    const refreshProfiles = () => { setProfile(getActiveProfile()); setProfiles(readProfileArchive()); };
    window.addEventListener("musculoprevent-profile-updated", refreshProfiles);
    return () => window.removeEventListener("musculoprevent-profile-updated", refreshProfiles);
  }, []);

  const chooseProfile = (archiveId) => {
    const nextProfile = profiles.find((item) => item.archiveId === archiveId);
    if (!nextProfile) return;
    saveProfile(nextProfile);
    setProfile(nextProfile);
  };

  return (
    <header className="header">
      <div className="header-shell">
        <div className="header-leading">
          {location.pathname !== "/" && <button className="header-back-button" type="button" onClick={goBack} aria-label={t("back")}><ArrowLeft size={18} /><span>{t("back")}</span></button>}
        </div>

        <button className="header-brand" type="button" onClick={() => goTo("/")} aria-label={t("brandHome")}>
          <span className="header-brand-mark" aria-hidden="true" />
          <span>MusculoPrevent</span>
        </button>

        <div className="header-actions">
          {profiles.length ? <label className="header-profile-switcher"><UserRound size={15} /><select value={profile.archiveId ?? ""} onChange={(event) => chooseProfile(event.target.value)} aria-label={t("profileSwitcher")}><option value="" disabled>{t("profile")}</option>{profiles.map((item) => <option key={item.archiveId} value={item.archiveId}>{item.firstName || t("unnamedProfile")}</option>)}</select></label> : <button className="header-add-profile" type="button" onClick={() => goTo("/job")}><UserRound size={15} /><span>{t("profile")}</span></button>}
          <button className="theme-toggle" type="button" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? t("themeLight") : t("themeDark")}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="language-picker">
            <button className="header-language" type="button" onClick={() => setIsLanguageOpen((open) => !open)} aria-expanded={isLanguageOpen} aria-label={t("languageSwitcher")}>{languages.find(([code]) => code === language)?.[1] ?? "EN"}</button>
            {isLanguageOpen && <div className="language-menu">{languages.map(([code, short, name]) => <button key={code} className={language === code ? "is-active" : ""} type="button" onClick={() => { setLanguage(code); setIsLanguageOpen(false); }}><span>{short}</span>{name}</button>)}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
