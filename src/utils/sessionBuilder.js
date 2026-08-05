const exerciseLimits = { 15: 4, 20: 5, 30: 7 };
const levelRanks = { "Débutant": 0, "Intermédiaire": 1, "Confirmé": 2 };

export function exercisesForLevel(exercises, profileLevel) {
  const allowedRank = levelRanks[profileLevel];
  // Sans profil choisi, la bibliothèque reste entièrement consultable.
  if (allowedRank === undefined) return exercises;
  return exercises.filter((exercise) => (levelRanks[exercise.level] ?? 0) <= allowedRank);
}

export function estimatedExerciseMinutes(exercise) {
  return (Number(exercise.duration) || 0) + Math.max(0, (Number(exercise.sets) || 1) - 1) / 3;
}

export function buildTimedSession(exercises, targetMinutes) {
  const limit = exerciseLimits[targetMinutes] ?? 5;
  const candidates = [...exercises].sort((left, right) => estimatedExerciseMinutes(right) - estimatedExerciseMinutes(left));
  const selected = [];
  let total = 0;

  const firstStretchIndex = candidates.findIndex((exercise) => exercise.category === "Étirement" && estimatedExerciseMinutes(exercise) <= targetMinutes);
  if (firstStretchIndex >= 0) {
    const firstStretch = candidates.splice(firstStretchIndex, 1)[0];
    selected.push(firstStretch);
    total += estimatedExerciseMinutes(firstStretch);
  }

  while (candidates.length && selected.length < limit) {
    const index = candidates.findIndex((exercise) => total + estimatedExerciseMinutes(exercise) <= targetMinutes + 1 && selected.at(-1)?.zone !== exercise.zone);
    const next = candidates.splice(index >= 0 ? index : 0, 1)[0];
    const estimate = estimatedExerciseMinutes(next);
    if (selected.length && total + estimate > targetMinutes + 2) continue;
    selected.push(next);
    total += estimate;
  }

  const orderedExercises = selected.sort((left, right) => {
    const leftRank = left.category === "Étirement" ? 0 : 1;
    const rightRank = right.category === "Étirement" ? 0 : 1;
    return leftRank - rightRank;
  });

  return { exercises: orderedExercises, estimatedMinutes: Math.round(total) };
}
