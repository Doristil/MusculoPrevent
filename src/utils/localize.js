const zoneKeys = {
  "Mains et poignets": "exerciseZone_handsWrists",
  Bras: "exerciseZone_arms",
  "Épaules": "exerciseZone_shoulders",
  "Trapèzes": "exerciseZone_trapezius",
  Dos: "exerciseZone_back",
  Lombaires: "exerciseZone_lowerBack",
  "Ceinture abdominale": "exerciseZone_core",
  Fessiers: "exerciseZone_glutes",
  Cuisses: "exerciseZone_thighs",
  Mollets: "exerciseZone_calves",
};

const bodyZoneKeys = {
  "main-poignet": "bodyZone_handsWrists",
  "avant-bras": "bodyZone_forearms",
  bras: "bodyZone_arms",
  epaules: "bodyZone_shoulders",
  trapezes: "bodyZone_trapezius",
  dos: "bodyZone_back",
  lombaires: "bodyZone_lowerBack",
  abdominaux: "bodyZone_abdominals",
  pectoraux: "bodyZone_chest",
  jambes: "bodyZone_legs",
  mollets: "bodyZone_calves",
};

export function localizedExerciseZone(name, t) {
  return t(zoneKeys[name] ?? name);
}

export function localizedBodyZone(zone, t) {
  return zone ? t(bodyZoneKeys[zone.slug] ?? zone.name) : t("unknownJob");
}

export function localizedJob(job, t) {
  return job ? t(`job_${job.id}`) : t("unknownJob");
}

export function localizedLevel(level, t) {
  return t({ "Débutant": "levelBeginner", "Intermédiaire": "levelIntermediate", "Confirmé": "levelAdvanced" }[level] ?? level);
}
