import { getActiveProfile } from "./profile";

const ACTIVITY_KEY = "musculoprevent-activity";

export function readActivity(profileId = getActiveProfile().archiveId ?? "guest") {
  try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) ?? "[]").filter((item) => (item.profileId ?? "guest") === profileId); } catch { return []; }
}

export function recordExercise(exercise, session = {}) {
  const allActivity = (() => { try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) ?? "[]"); } catch { return []; } })();
  const profile = getActiveProfile();
  const profileId = profile.archiveId ?? "guest";
  const activity = [...allActivity, { id: exercise.id, zone: exercise.zone, minutes: Number(exercise.duration) || 0, profileId, profileName: profile.firstName || "Profil invité", sessionId: session.id ?? null, sessionStartedAt: session.startedAt ?? null, sessionContext: session.context ?? null, completedAt: new Date().toISOString() }].slice(-500);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
  window.dispatchEvent(new Event("musculoprevent-activity-updated"));
}

export function weeklySummary(activity = readActivity(), locale = "fr-FR") {
  const now = new Date();
  const start = new Date(now); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const week = activity.filter(({ completedAt }) => new Date(completedAt) >= start);
  const days = new Set(week.map(({ completedAt }) => new Date(completedAt).toDateString()));
  const weekDays = Array.from({ length: 7 }, (_, index) => { const day = new Date(start); day.setDate(start.getDate() + index); return { label: day.toLocaleDateString(locale, { weekday: "short" }), active: days.has(day.toDateString()) }; });
  const zones = week.reduce((totals, item) => {
    if (!item.zone) return totals;
    totals[item.zone] = (totals[item.zone] ?? 0) + 1;
    return totals;
  }, {});
  const topZone = Object.entries(zones).sort(([, first], [, second]) => second - first)[0] ?? null;
  const latest = [...activity].sort((first, second) => new Date(second.completedAt) - new Date(first.completedAt))[0] ?? null;
  return {
    exercises: week.length,
    minutes: week.reduce((total, item) => total + item.minutes, 0),
    days: days.size,
    weekDays,
    topZone: topZone ? { id: topZone[0], count: topZone[1] } : null,
    latest,
  };
}
