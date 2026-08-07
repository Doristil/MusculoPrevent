# Données applicatives

Ce dossier rassemble les données utilisées à l'exécution. Le mémoire Word
validé est le référentiel unique du catalogue d'exercices.

| Fichier | Rôle |
| --- | --- |
| `exercises.js` | Catalogue actif et ordre de présentation des exercices. |
| `referenceOverrides.js` | Transcription des corrections et compléments issus du mémoire Word. Ces valeurs prévalent toujours. |
| `exercisePhotos.js` | Association déterministe entre un code exercice et ses images. |
| `bodyZones.js` | Zones sélectionnables sur le schéma corporel. |
| `jobs.js` | Postes à bord et zones associées. |
| `catalogTranslations.js` | Traductions des fiches d'exercices. |
| `uiTranslations.js` | Traductions de l'interface. |

## Règle de mise à jour

Avant toute modification d'une fiche, vérifier la version présentée dans le
mémoire Word. Le CSV historique ne doit jamais être utilisé pour créer,
compléter ou corriger une donnée applicative.

Les identifiants (`MP001`, `EP001`, etc.) sont stables : ils permettent de
préserver les liens vers les photos, les routes et le suivi utilisateur.
