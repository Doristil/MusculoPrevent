import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ClipboardList, ListChecks, Sparkles } from "lucide-react";
import { getExerciseScope } from "../utils/exerciseScope";
import { useTranslation } from "../context/LanguageContext";
import { localizedBodyZone, localizedJob } from "../utils/localize";
import jobs from "../data/jobs";
import bodyZones from "../data/bodyZones";
import "./SessionChoice.css";

const copy = {
  fr: {
    eyebrow: "Votre sélection", title: "Comment souhaitez-vous continuer ?", subtitle: "Choisissez un seul mode pour garder votre parcours simple et lisible.",
    adapted: "Programme adapté", adaptedText: "Une séance équilibrée, générée selon votre sélection et votre niveau.",
    custom: "Faire mon programme", customText: "Composez votre séance en choisissant vous-même les exercices.",
    list: "Liste des exercices", listText: "Consultez chaque exercice et sa fiche détaillée à votre rythme.",
  },
  en: {
    eyebrow: "Your selection", title: "How would you like to continue?", subtitle: "Choose one mode to keep your journey simple and easy to follow.",
    adapted: "Adapted programme", adaptedText: "A balanced session generated for your selection and level.",
    custom: "Build my programme", customText: "Create your session by choosing the exercises yourself.",
    list: "Exercise list", listText: "Browse every exercise and its detailed guide at your own pace.",
  },
};

export default function SessionChoice() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { scope: routeScope, value } = useParams();
  const scope = routeScope === "body" ? "zone" : routeScope;
  const labels = copy[language] ?? copy.fr;
  const { selectedZones } = getExerciseScope(scope, value);
  const context = routeScope === "job"
    ? localizedJob(jobs.find((job) => String(job.id) === String(value)), t)
    : selectedZones.map((zone) => localizedBodyZone(bodyZones.find((item) => item.exerciseZones.includes(zone)), t)).filter(Boolean).join(", ");
  const options = [
    { id: "adapted", icon: Sparkles, title: labels.adapted, text: labels.adaptedText },
    { id: "custom", icon: ClipboardList, title: labels.custom, text: labels.customText },
    { id: "list", icon: ListChecks, title: labels.list, text: labels.listText },
  ];

  return <section className="session-choice-page">
    <p className="page-eyebrow">{labels.eyebrow}</p>
    <h1>{labels.title}</h1>
    {context && <p className="session-choice-context">{context}</p>}
    <p className="session-choice-intro">{labels.subtitle}</p>
    <div className="session-choice-options">
      {options.map(({ id, icon: Icon, title, text }) => <button key={id} type="button" className="session-choice-card" onClick={() => navigate(`/exercises/${routeScope}/${value}?mode=${id}`)}>
        <span className="session-choice-icon"><Icon size={22} strokeWidth={1.7} /></span>
        <span className="session-choice-copy"><strong>{title}</strong><small>{text}</small></span>
        <ArrowRight className="session-choice-arrow" size={20} />
      </button>)}
    </div>
  </section>;
}
