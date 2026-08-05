import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = await fs.readFile(path.join(root, ".env.local"), "utf8").catch(() => "");
const key = env.match(/^DEEPL_API_KEY=(.+)$/m)?.[1]?.trim();
if (!key) throw new Error("Ajoutez votre clé dans client/.env.local avant de lancer la traduction.");

const { default: exercises } = await import(path.join(root, "src/data/exercises.js"));
const targets = { en: "EN", es: "ES", pt: "PT-PT", it: "IT", zh: "ZH", ar: "AR", ru: "RU", uk: "UK", id: "ID", tr: "TR", hi: "HI" };
const fields = ["name", "description", "objective", "interest", "muscles", "equipment", "difficulty", "position", "subgroup"];

async function translateBatch(texts, targetLang) {
  const body = new URLSearchParams({ target_lang: targetLang, source_lang: "FR" });
  texts.forEach((text) => body.append("text", text));
  const endpoint = key.endsWith(":fx") ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
  const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `DeepL-Auth-Key ${key}`, "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!response.ok) throw new Error(`DeepL: ${response.status} ${await response.text()}`);
  return (await response.json()).translations.map(({ text }) => text);
}

async function translate(texts, targetLang) {
  const translated = [];
  for (let index = 0; index < texts.length; index += 40) {
    translated.push(...await translateBatch(texts.slice(index, index + 40), targetLang));
    if (index + 40 < texts.length) await new Promise((resolve) => setTimeout(resolve, 900));
  }
  return translated;
}

const output = {};
for (const [locale, target] of Object.entries(targets)) {
  const sources = [];
  const assignments = [];
  for (const exercise of exercises) for (const field of fields) {
    const original = exercise[field];
    const values = Array.isArray(original) ? original : original ? [original] : [];
    values.forEach((value, itemIndex) => { sources.push(value); assignments.push([exercise.id, field, itemIndex, Array.isArray(original)]); });
  }
  const translated = await translate(sources, target);
  output[locale] = {};
  assignments.forEach(([id, field, itemIndex, isArray], index) => {
    output[locale][id] ??= {};
    if (isArray) { output[locale][id][field] ??= []; output[locale][id][field][itemIndex] = translated[index]; }
    else output[locale][id][field] = translated[index];
  });
}

const destination = path.join(root, "src/data/catalogTranslations.js");
await fs.writeFile(destination, `// Généré automatiquement avec DeepL.\nexport default ${JSON.stringify(output, null, 2)};\n`);
console.log("Catalogue traduit :", destination);
