const PROFILE_STORAGE_KEY = "musculoPrevent.profile";
const PROFILE_ARCHIVE_STORAGE_KEY = "musculoPrevent.profileArchive";

export const emptyProfile = {
  firstName: "",
  age: "",
  level: "",
  jobId: null,
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
