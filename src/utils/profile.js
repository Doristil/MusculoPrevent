const PROFILE_STORAGE_KEY = "musculoPrevent.profile";
const PROFILE_ARCHIVE_STORAGE_KEY = "musculoPrevent.profileArchive";
const ACTIVITY_STORAGE_KEY = "musculoprevent-activity";

export const emptyProfile = {
  firstName: "",
  age: "",
  level: "",
  jobId: null,
  sex: "male",
};

export function readProfile() {
  if (typeof window === "undefined") return emptyProfile;

  try {
    const savedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return savedProfile ? { ...emptyProfile, ...JSON.parse(savedProfile) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
}

export function saveProfile(profile) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("musculoprevent-profile-updated"));
}

export function clearProfile() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  window.dispatchEvent(new Event("musculoprevent-profile-updated"));
}

export function readProfileArchive() {
  if (typeof window === "undefined") return [];
  try {
    const archive = JSON.parse(window.localStorage.getItem(PROFILE_ARCHIVE_STORAGE_KEY) ?? "[]");
    return Array.isArray(archive) ? archive : [];
  } catch {
    return [];
  }
}

export function archiveProfile(profile) {
  if (typeof window === "undefined" || !profile.jobId) return profile;
  const archive = readProfileArchive();
  const id = profile.archiveId ?? (typeof globalThis.crypto?.randomUUID === "function" ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const entry = { ...emptyProfile, ...profile, archiveId: id, savedAt: new Date().toISOString() };
  const nextArchive = [entry, ...archive.filter((item) => item.archiveId !== id)];
  window.localStorage.setItem(PROFILE_ARCHIVE_STORAGE_KEY, JSON.stringify(nextArchive));
  saveProfile(entry);
  return entry;
}

export function getActiveProfile() {
  const profile = readProfile();
  return profile.jobId && !profile.archiveId ? archiveProfile(profile) : profile;
}

export function removeArchivedProfile(archiveId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_ARCHIVE_STORAGE_KEY, JSON.stringify(readProfileArchive().filter((item) => item.archiveId !== archiveId)));
  window.dispatchEvent(new Event("musculoprevent-profile-updated"));
}

export function exportLocalBackup() {
  if (typeof window === "undefined") return "";
  return JSON.stringify({
    format: "musculoprevent-backup",
    version: 1,
    createdAt: new Date().toISOString(),
    profile: readProfile(),
    profiles: readProfileArchive(),
    activity: (() => { try { return JSON.parse(window.localStorage.getItem(ACTIVITY_STORAGE_KEY) ?? "[]"); } catch { return []; } })(),
  }, null, 2);
}

export function importLocalBackup(content) {
  if (typeof window === "undefined") return false;
  try {
    const backup = JSON.parse(content);
    if (backup?.format !== "musculoprevent-backup" || !Array.isArray(backup.profiles) || !Array.isArray(backup.activity)) return false;
    const nextProfile = { ...emptyProfile, ...(backup.profile ?? backup.profiles[0] ?? {}) };
    window.localStorage.setItem(PROFILE_ARCHIVE_STORAGE_KEY, JSON.stringify(backup.profiles));
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
    window.localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(backup.activity));
    window.dispatchEvent(new Event("musculoprevent-profile-updated"));
    window.dispatchEvent(new Event("musculoprevent-activity-updated"));
    return true;
  } catch {
    return false;
  }
}
