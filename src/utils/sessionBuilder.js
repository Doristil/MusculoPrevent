const levelRanks = { "Débutant": 0, "Intermédiaire": 1, "Confirmé": 2 };

export function exercisesForLevel(exercises, profileLevel) {
  const allowedRank = levelRanks[profileLevel];
  // Sans profil choisi, la bibliothèque reste entièrement consultable.
  if (allowedRank === undefined) return exercises;
  return exercises.filter((exercise) => (levelRanks[exercise.level] ?? 0) <= allowedRank);
}

export function adjustedSets(exercise, seriesDelta = 0) {
  return Math.max(1, Math.min(6, (Number(exercise.sets) || 1) + seriesDelta));
}

export function estimatedExerciseMinutes(exercise, settings = {}) {
  const { seriesDelta = 0, restSeconds = 20 } = settings;
  return (Number(exercise.duration) || 0) + Math.max(0, adjustedSets(exercise, seriesDelta) - 1) * restSeconds / 60;
}

export function buildTimedSession(exercises, targetMinutes, selectedZones = [], settings = {}) {
  const candidates = [...exercises].sort((left, right) => {
    const categoryRank = (exercise) => exercise.category === "Étirement" ? 0 : 1;
    return categoryRank(left) - categoryRank(right) || estimatedExerciseMinutes(right, settings) - estimatedExerciseMinutes(left, settings);
  });
  const selected = [];
  let total = 0;
  const zoneCounts = Object.fromEntries(selectedZones.map((zone) => [zone, 0]));

  const stretches = candidates.filter((exercise) => exercise.category === "Étirement");
  const strengthening = candidates.filter((exercise) => exercise.category === "Renforcement");
  const requiredPair = stretches.flatMap((stretch) => strengthening.map((strength) => ({
    stretch,
    strength,
    total: estimatedExerciseMinutes(stretch, settings) + estimatedExerciseMinutes(strength, settings),
  }))).filter((pair) => pair.total <= targetMinutes + 1)
    .sort((left, right) => right.total - left.total)[0];

  // Une séance complète commence toujours par une mobilité puis inclut du renforcement.
  // S'il n'existe pas les deux catégories dans le filtre, on conserve la meilleure séance possible.
  if (requiredPair) {
    [requiredPair.stretch, requiredPair.strength].forEach((exercise) => {
      candidates.splice(candidates.indexOf(exercise), 1);
      selected.push(exercise);
      total += estimatedExerciseMinutes(exercise, settings);
      zoneCounts[exercise.zone] = (zoneCounts[exercise.zone] ?? 0) + 1;
    });
  } else {
    const firstStretchIndex = candidates.findIndex((exercise) => exercise.category === "Étirement" && estimatedExerciseMinutes(exercise, settings) <= targetMinutes);
    if (firstStretchIndex >= 0) {
      const firstStretch = candidates.splice(firstStretchIndex, 1)[0];
      selected.push(firstStretch);
      total += estimatedExerciseMinutes(firstStretch, settings);
      zoneCounts[firstStretch.zone] = (zoneCounts[firstStretch.zone] ?? 0) + 1;
    }
  }

  while (candidates.length) {
    const eligible = candidates
      .map((exercise, index) => ({ exercise, index }))
      .filter(({ exercise }) => total + estimatedExerciseMinutes(exercise, settings) <= targetMinutes + 1);
    if (!eligible.length) break;
    eligible.sort((left, right) => {
      const leftCount = zoneCounts[left.exercise.zone] ?? 0;
      const rightCount = zoneCounts[right.exercise.zone] ?? 0;
      const categoryCount = (category) => selected.filter((exercise) => exercise.category === category).length;
      const leftCategoryCount = categoryCount(left.exercise.category);
      const rightCategoryCount = categoryCount(right.exercise.category);
      const leftCategoryRank = left.exercise.category === "Étirement" ? 0 : 1;
      const rightCategoryRank = right.exercise.category === "Étirement" ? 0 : 1;
      // À mesure que la séance s'allonge, les deux catégories restent équilibrées.
      return leftCategoryCount - rightCategoryCount
        || leftCount - rightCount
        || leftCategoryRank - rightCategoryRank
        || estimatedExerciseMinutes(right.exercise, settings) - estimatedExerciseMinutes(left.exercise, settings);
    });
    const next = candidates.splice(eligible[0].index, 1)[0];
    const estimate = estimatedExerciseMinutes(next, settings);
    if (selected.length && total + estimate > targetMinutes + 2) continue;
    selected.push(next);
    total += estimate;
    zoneCounts[next.zone] = (zoneCounts[next.zone] ?? 0) + 1;
  }

  const orderedExercises = selected.sort((left, right) => {
    const leftRank = left.category === "Étirement" ? 0 : 1;
    const rightRank = right.category === "Étirement" ? 0 : 1;
    return leftRank - rightRank;
  });

  return { exercises: orderedExercises, estimatedMinutes: Math.round(total) };
}
