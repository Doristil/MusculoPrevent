import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const key = (await fs.readFile(path.join(root, ".env.local"), "utf8")).match(/^DEEPL_API_KEY=(.+)$/m)?.[1]?.trim();
if (!key) throw new Error("Ajoutez votre clé DeepL dans .env.local.");
const source = { exercisesTitle:"Exercices — {context}", exercisesAvailable:"{count} exercices disponibles", goToZone:"Aller à une zone", filters:"Filtres", noEquipment:"Sans matériel", shortFormat:"Format court", painNav:"Douleurs", painEyebrow:"Prévention ciblée", painTitle:"Qu’est-ce qui vous gêne pendant l’effort ?", painIntro:"Sélectionnez la contrainte rencontrée pour prioriser les zones à renforcer et mobiliser.", painWarning:"Une douleur aiguë, inhabituelle ou persistante nécessite l’arrêt de l’exercice et l’avis d’un professionnel de santé.", pain_lifting_title:"Porter, tirer ou manutentionner", pain_lifting_text:"Tensions du dos ou des lombaires lors des efforts de charge.", pain_repetitive_title:"Gestes répétitifs ou outils vibrants", pain_repetitive_text:"Inconfort aux mains, poignets, avant-bras ou épaules.", pain_overhead_title:"Travail bras levés", pain_overhead_text:"Tensions des épaules, trapèzes ou haut du dos.", pain_stability_title:"Équilibre et mouvements du navire", pain_stability_text:"Fatigue des jambes et du gainage liée au roulis, aux escaliers ou au pont.", zone_lombaires:"Lombaires", zone_dos:"Dos", zone_jambes:"Jambes", "zone_main-poignet":"Main et poignet", "zone_avant-bras":"Avant-bras", zone_epaules:"Épaules", zone_trapezes:"Trapèzes", zone_mollets:"Mollets", zone_abdominaux:"Abdominaux", strengthening:"Renforcement", stretching:"Étirement", unknownExercise:"Exercice introuvable", back:"Retour", selectionComplete:"Sélection terminée", completed:"Bravo, vous avez terminé vos exercices.", backToList:"Retour à la liste", currentExercise:"Exercice en cours", closeExercise:"Fermer l’exercice", mainMenu:"Menu principal", recovery:"Récupération", restTitle:"Prenez 20 secondes de pause", series:"série {current} sur {total}", seconds:"sur {count} s", repetitions:"répétitions", hold:"Maintien", repsToDo:"Répétitions à effectuer", nextStarts:"La prochaine série démarrera automatiquement à la fin du compte à rebours.", pause:"Pause", resume:"Reprendre", validate:"Valider", previousExercise:"Exercice précédent", skipExercise:"Passer cet exercice" };
const targets = { en:"EN", es:"ES", pt:"PT-PT", it:"IT", zh:"ZH", ar:"AR", ru:"RU", uk:"UK", id:"ID", tr:"TR", hi:"HI" };
const endpoint = key.endsWith(":fx") ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
const output = {};
for (const [locale, target] of Object.entries(targets)) {
  const body = new URLSearchParams({ target_lang: target, source_lang:"FR" });
  Object.values(source).forEach((text) => body.append("text", text));
  const response = await fetch(endpoint, { method:"POST", headers:{ Authorization:`DeepL-Auth-Key ${key}`, "Content-Type":"application/x-www-form-urlencoded" }, body });
  if (!response.ok) throw new Error(`DeepL: ${response.status}`);
  const translated = (await response.json()).translations.map(({ text }) => text);
  output[locale] = Object.fromEntries(Object.keys(source).map((name, index) => [name, translated[index]]));
}
await fs.writeFile(path.join(root, "src/data/uiTranslations.js"), `// Généré automatiquement avec DeepL.\nexport default ${JSON.stringify(output, null, 2)};\n`);
