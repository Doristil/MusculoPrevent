import { CalendarDays, Clock3, Dumbbell, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readActivity, weeklySummary } from "../utils/activity";
import { getActiveProfile, readProfileArchive, saveProfile } from "../utils/profile";
import { useTranslation } from "../context/LanguageContext";
import "./Progress.css";

export default function Progress() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [summary, setSummary] = useState(() => weeklySummary(undefined, language === "en" ? "en-US" : "fr-FR"));
  const [profile, setProfile] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(readProfileArchive);
  useEffect(() => { const refresh = () => { setProfile(getActiveProfile()); setProfiles(readProfileArchive()); setSummary(weeklySummary(readActivity(), language === "en" ? "en-US" : "fr-FR")); }; window.addEventListener("musculoprevent-activity-updated", refresh); window.addEventListener("musculoprevent-profile-updated", refresh); return () => { window.removeEventListener("musculoprevent-activity-updated", refresh); window.removeEventListener("musculoprevent-profile-updated", refresh); }; }, [language]);
  const chooseProfile = (archiveId) => {
    const nextProfile = profiles.find((item) => item.archiveId === archiveId);
    if (!nextProfile) return;
    saveProfile(nextProfile);
    setProfile(nextProfile);
    setSummary(weeklySummary(readActivity(nextProfile.archiveId), language === "en" ? "en-US" : "fr-FR"));
  };
  return <section className="progress-page">
    <p className="page-eyebrow">{t("progressEyebrow")}</p><h1>{t("progressTitle")}</h1><p className="progress-intro">{t("progressIntro")}</p>{profiles.length > 0 && <label className="progress-profile"><span>{t("trackedProfile")}</span><span className="progress-profile-avatar" aria-hidden="true">{(profile.firstName || "?").trim().slice(0, 1).toUpperCase()}</span><select value={profile.archiveId ?? ""} onChange={(event) => chooseProfile(event.target.value)}><option value="" disabled>{t("chooseProfile")}</option>{profiles.map((item) => <option key={item.archiveId} value={item.archiveId}>{item.firstName || t("unnamedProfile")}</option>)}</select></label>}
    <div className="progress-summary"><div><span>{t("thisWeek")}</span><strong>{summary.exercises} {t("exercises")}</strong><p>{summary.minutes} {t("totalMinutes")}</p></div><TrendingUp size={28} /></div>
    <div className="progress-stats"><article><Dumbbell size={19} /><strong>{summary.exercises}</strong><span>{t("exercises")}</span></article><article><Clock3 size={19} /><strong>{summary.minutes}</strong><span>{t("minutes")}</span></article><article><CalendarDays size={19} /><strong>{summary.days}</strong><span>{t("activeDays")}</span></article></div>
    <section className="progress-week"><h2>{t("thisWeek")}</h2><div className="week-days">{summary.weekDays.map(({ label, active }) => <div key={label}><span className={active ? "is-active" : ""} />{label}</div>)}</div></section>
    {(summary.topZone || summary.latest) && <section className="progress-insights" aria-label={t("activityDetails")}>
      {summary.topZone && <article><MapPin size={18} aria-hidden="true" /><div><span>{t("priorityArea")}</span><strong>{t(`bodyZone_${summary.topZone.id}`)} · {summary.topZone.count} {t("exercises")}</strong></div></article>}
      {summary.latest && <article><Clock3 size={18} aria-hidden="true" /><div><span>{t("lastActivity")}</span><strong>{t(`bodyZone_${summary.latest.zone}`)} · {new Date(summary.latest.completedAt).toLocaleDateString(language === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "short" })}</strong></div></article>}
    </section>}
    {summary.exercises === 0 && <div className="progress-empty"><h2>{t("startAtYourPace")}</h2><p>{t("progressEmpty")}</p><button type="button" onClick={() => navigate("/body-zone")}>{t("chooseArea")}</button></div>}
  </section>;
}
