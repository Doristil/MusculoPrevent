// Les photos restent dans public : elles ne gonflent pas le JavaScript chargé par l'app.
const PHOTO_DIRECTORY = "/images/exercises/Photos%20avec%20noms%20logiciel%20";

const numberedPhotoCounts = {
  AB003: 2, AB004: 2, AB005: 2, AB006: 2,
  BR001: 2, BR002: 2, BR003: 2, BR005: 4,
  CU002: 2, CU003: 2, CU005: 4, CU006: 3,
  DO002: 2, DO003: 2, DO005: 2, DO006: 3, DO007: 2, DO008: 2,
  EP002: 2, EP003: 2, EP004: 2, EP006: 2, EP007: 2,
  FE001: 2, FE002: 2, FE004: 2, FE005: 2, FE006: 2, FE007: 2,
  LO001: 2, LO002: 2, LO003: 2, LO004: 2, LO005: 2,
  MO001: 2, MO003: 2, MO004: 2,
  MP001: 2, MP003: 3, MP004: 2, MP005: 2, MP006: 4,
  TR001: 2, TR002: 2, TR003: 2,
};

const singlePhotos = new Set([
  "AB001", "AB002", "BR004", "CU001", "CU004", "CU007", "DO001", "DO004",
  "EP001", "EP005", "FE003", "LO006", "MO002", "MP002", "MP003",
]);

// Les images très lourdes ont été redimensionnées puis converties en JPEG.
// Les visuels utilisés par l'application sont normalisés en PNG afin de préserver
// l'anonymisation et une même restitution sur chaque appareil.
const extensionFor = () => "png";

export function getExercisePhotoSources(id) {
  const files = [];
  if (singlePhotos.has(id)) files.push(id);

  for (let number = 1; number <= (numberedPhotoCounts[id] ?? 0); number += 1) {
    files.push(`${id}-${number}`);
  }

  return files.map((file) => `${PHOTO_DIRECTORY}/${file}.${extensionFor(file)}`);
}
