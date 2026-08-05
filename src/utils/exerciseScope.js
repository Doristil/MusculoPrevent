import exercises from "../data/exercises";
import jobs from "../data/jobs";
import bodyZones from "../data/bodyZones";

export function matchesBodyZone(exercise, bodyZone) {
  if (!bodyZone) return false;
  if (!bodyZone.muscleKeywords) return bodyZone.exerciseZones.includes(exercise.zone);
  const muscles = (exercise.muscles ?? []).join(" ").toLocaleLowerCase("fr");
  return bodyZone.muscleKeywords.some((keyword) => muscles.includes(keyword));
}

export function getExerciseScope(scope, value) {
  if (scope === "job") {
    const job = jobs.find((item) => String(item.id) === String(value));
    const selectedZones = job?.zones ?? [];

    return {
      context: job ? `Poste : ${job.name}` : "Poste inconnu",
      selectedZones,
      exercises: exercises.filter((exercise) => selectedZones.includes(exercise.zone)),
      returnTo: job ? `/exercises/job/${job.id}` : "/search",
    };
  }

  if (scope === "zone") {
    const bodyZone = bodyZones.find((item) => item.slug === value);
    const scopedExercises = exercises.filter((exercise) => matchesBodyZone(exercise, bodyZone));
    const selectedZones = [...new Set(scopedExercises.map((exercise) => exercise.zone))];

    return {
      context: bodyZone ? `Zone : ${bodyZone.name}` : "Zone inconnue",
      selectedZones,
      exercises: scopedExercises,
      returnTo: bodyZone ? `/exercises/body/${bodyZone.slug}` : "/search",
    };
  }

  return {
    context: "Tous les exercices",
    selectedZones: [...new Set(exercises.map((exercise) => exercise.zone))],
    exercises,
    returnTo: "/search",
  };
}

export function exerciseHref(id, scope, value, sessionIds = []) {
  const query = new URLSearchParams({ scope, value });
  if (sessionIds.length) query.set("session", sessionIds.join(","));
  return `/exercise/${id}?${query.toString()}`;
}

export function displayZoneName(exerciseZone) {
  const bodyZone = bodyZones.find(
    (zone) => zone.exerciseZones.length === 1 && zone.exerciseZones[0] === exerciseZone
  );

  return bodyZone?.name ?? exerciseZone;
}
