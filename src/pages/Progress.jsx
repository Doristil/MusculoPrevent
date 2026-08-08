import { CalendarDays, Clock3, Dumbbell, Lightbulb, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readActivity, weeklySummary } from "../utils/activity";
import { getActiveProfile, readProfileArchive, saveProfile } from "../utils/profile";
import { useTranslation } from "../context/LanguageContext";
import { localizedExerciseZone } from "../utils/localize";
import jobs from "../data/jobs";
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
  const insightLabels = language === "en"
    ? { topZone: "Most worked area", latest: "Most recent exercise" }
    : { topZone: "Zone la plus travaillée", latest: "Dernier exercice" };
  const job = jobs.find((item) => item.id === Number(profile.jobId));
  const advice = useMemo(() => {
    if (!job) return null;

    const counts = summary.zoneCounts ?? {};
    const priorityZones = job.zones;
    const highest = priorityZones.reduce((best, zone) => (counts[zone] ?? 0) > (counts[best] ?? 0) ? zone : best, priorityZones[0]);
    const lowest = priorityZones.reduce((best, zone) => (counts[zone] ?? 0) < (counts[best] ?? 0) ? zone : best, priorityZones[0]);
    const highestCount = counts[highest] ?? 0;
    const lowestCount = counts[lowest] ?? 0;
    const priorityNames = priorityZones.slice(0, 2).map((zone) => localizedExerciseZone(zone, t)).join(language === "en" ? " and " : " et ");

    if (summary.exercises === 0) {
      return language === "en"
        ? `For your role, start by alternating exercises for ${priorityNames}. This will establish a balanced prevention routine.`
        : `Pour votre poste, commencez par alterner des exercices pour ${priorityNames}. Vous poserez ainsi une base de prévention équilibrée.`;
    }

    if (highestCount - lowestCount >= 2) {
      const highestName = localizedExerciseZone(highest, t);
      const lowestName = localizedExerciseZone(lowest, t);
      return language === "en"
        ? `This week, ${highestName} has been worked the most (${highestCount} exercises). To balance the demands of your role, give priority to ${lowestName} next.`
        : `Cette semaine, la zone ${highestName} a été la plus travaillée (${highestCount} exercices). Pour équilibrer les sollicitations de votre poste, privilégiez ${lowestName} lors de votre prochaine séance.`;
    }

    return language === "en"
      ? `Your priority areas are being worked evenly this week. Keep alternating the areas linked to your role.`
      : `Vos zones prioritaires sont travaillées de manière homogène cette semaine. Continuez à alterner les zones liées à votre poste.`;
  }, [job, language, summary.exercises, summary.zoneCounts, t]);
  return <section className="progress-page">
    <p className="page-eyebrow">{t("progressEyebrow")}</p><h1>{t("progressTitle")}</h1><p className="progress-intro">{t("progressIntro")}</p>{profiles.length > 0 && <label className="progress-profile"><span>{t("trackedProfile")}</span><span className="progress-profile-avatar" aria-hidden="true">{(profile.firstName || "?").trim().slice(0, 1).toUpperCase()}</span><select value={profile.archiveId ?? ""} onChange={(event) => chooseProfile(event.target.value)}><option value="" disabled>{t("chooseProfile")}</option>{profiles.map((item) => <option key={item.archiveId} value={item.archiveId}>{item.firstName || t("unnamedProfile")}</option>)}</select></label>}
    <div className="progress-summary"><div><span>{t("thisWeek")}</span><strong>{summary.exercises} {t("exercises")}</strong><p>{summary.minutes} {t("totalMinutes")}</p></div><TrendingUp size={28} /></div>
    <div className="progress-stats"><article><Dumbbell size={19} /><strong>{summary.exercises}</strong><span>{t("exercises")}</span></article><article><Clock3 size={19} /><strong>{summary.minutes}</strong><span>{t("minutes")}</span></article><article><CalendarDays size={19} /><strong>{summary.days}</strong><span>{t("activeDays")}</span></article></div>
    <section className="progress-week"><h2>{t("thisWeek")}</h2><div className="week-days">{summary.weekDays.map(({ label, active }) => <div key={label}><span className={active ? "is-active" : ""} />{label}</div>)}</div></section>
    {(summary.topZone || summary.latest) && <section className="progress-insights" aria-label={t("activityDetails")}>
      {summary.topZone && <article><MapPin size={18} aria-hidden="true" /><div><span>{insightLabels.topZone}</span><strong>{localizedExerciseZone(summary.topZone.id, t)} · {summary.topZone.count} {t("exercises")}</strong></div></article>}
      {summary.latest && <article><Clock3 size={18} aria-hidden="true" /><div><span>{insightLabels.latest}</span><strong>{localizedExerciseZone(summary.latest.zone, t)} · {new Date(summary.latest.completedAt).toLocaleDateString(language === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "short" })}</strong></div></article>}
    </section>}
    {advice && <section className="progress-advice" aria-label={language === "en" ? "Advice" : "Conseils"}>
      <Lightbulb size={21} aria-hidden="true" />
      <div><span>{language === "en" ? "Advice" : "Conseil"}</span><h2>{language === "en" ? "Keep your prevention balanced" : "Gardez une prévention équilibrée"}</h2><p>{advice}</p></div>
      <button type="button" onClick={() => navigate(`/exercises/job/${job.id}`)}>{language === "en" ? "View exercises" : "Voir les exercices"}</button>
    </section>}
    {summary.exercises === 0 && <div className="progress-empty"><h2>{t("startAtYourPace")}</h2><p>{t("progressEmpty")}</p><button type="button" onClick={() => navigate("/body-zone")}>{t("chooseArea")}</button></div>}
  </section>;
}
