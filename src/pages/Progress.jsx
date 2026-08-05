import { CalendarDays, Clock3, Dumbbell, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readActivity, weeklySummary } from "../utils/activity";
import { getActiveProfile, readProfileArchive, saveProfile } from "../utils/profile";
import "./Progress.css";

export default function Progress() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(() => weeklySummary());
  const [profile, setProfile] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(readProfileArchive);
  useEffect(() => { const refresh = () => { setProfile(getActiveProfile()); setProfiles(readProfileArchive()); setSummary(weeklySummary(readActivity())); }; window.addEventListener("musculoprevent-activity-updated", refresh); window.addEventListener("musculoprevent-profile-updated", refresh); return () => { window.removeEventListener("musculoprevent-activity-updated", refresh); window.removeEventListener("musculoprevent-profile-updated", refresh); }; }, []);
  const chooseProfile = (archiveId) => {
    const nextProfile = profiles.find((item) => item.archiveId === archiveId);
    if (!nextProfile) return;
    saveProfile(nextProfile);
    setProfile(nextProfile);
    setSummary(weeklySummary(readActivity(nextProfile.archiveId)));
  };
  return <section className="progress-page">
    <p className="page-eyebrow">Suivi prévention</p><h1>Votre régularité</h1><p className="progress-intro">Un suivi simple pour garder un rythme adapté à vos quarts et à votre récupération.</p>{profiles.length > 0 && <label className="progress-profile"><span>Profil suivi</span><span className="progress-profile-avatar" aria-hidden="true">{(profile.firstName || "?").trim().slice(0, 1).toUpperCase()}</span><select value={profile.archiveId ?? ""} onChange={(event) => chooseProfile(event.target.value)}><option value="" disabled>Choisir un profil</option>{profiles.map((item) => <option key={item.archiveId} value={item.archiveId}>{item.firstName || "Profil enregistré"}</option>)}</select></label>}
    <div className="progress-summary"><div><span>Cette semaine</span><strong>{summary.exercises} exercices</strong><p>{summary.minutes} min au total</p></div><TrendingUp size={28} /></div>
    <div className="progress-stats"><article><Dumbbell size={19} /><strong>{summary.exercises}</strong><span>Exercices</span></article><article><Clock3 size={19} /><strong>{summary.minutes}</strong><span>Minutes</span></article><article><CalendarDays size={19} /><strong>{summary.days}</strong><span>Jours actifs</span></article></div>
    <section className="progress-week"><h2>Cette semaine</h2><div className="week-days">{summary.weekDays.map(({ label, active }) => <div key={label}><span className={active ? "is-active" : ""} />{label}</div>)}</div></section>
    {summary.exercises === 0 && <div className="progress-empty"><h2>Commencez à votre rythme</h2><p>Vos exercices validés apparaîtront ici.</p><button type="button" onClick={() => navigate("/body-zone")}>Choisir une zone</button></div>}
  </section>;
}
