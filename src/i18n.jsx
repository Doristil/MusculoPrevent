import { createContext, useContext, useEffect, useMemo, useState } from "react";
import uiTranslations from "./data/uiTranslations";

const translations = {
  fr: {
    homeEyebrow: "Prévention TMS · Métiers de la mer", homeTitle: "Votre prévention, adaptée à votre poste.", homeDescription: "Retrouvez des exercices simples et ciblés pour préserver votre mobilité et mieux préparer votre corps aux sollicitations du bord.", start: "Commencer", exercisesAvailable: "{count} exercices disponibles",
    menu: "Menu", openMenu: "Ouvrir le menu", home: "Accueil", profile: "Mon profil", findExercises: "Trouver des exercices",
    library: "Bibliothèque d’exercices", howStart: "Comment souhaitez-vous commencer ?", choosePath: "Choisissez le parcours qui vous convient pour accéder à des exercices ciblés.", byJob: "Par poste", byJobTitle: "Selon votre métier", byJobText: "Trouver les exercices selon votre fonction à bord.", byZone: "Par zone", byZoneTitle: "Choisir une zone musculaire", byZoneText: "Accéder aux exercices adaptés à la zone que vous souhaitez travailler.",
    zoneSearch: "Recherche par zone", zoneQuestion: "Quelle zone souhaitez-vous travailler ?", zoneHelp: "Touchez une zone sur le schéma ou choisissez-la dans la liste.",
    step: "Étape 1 sur 2", yourProfile: "Votre profil", profileIntro: "Il affine les exercices proposés. Vous pourrez le modifier plus tard.", profileSaved: "Profil enregistré", profileArchive: "Profils enregistrés", profileArchiveHelp: "Choisissez un profil pour le reprendre", newProfile: "Nouveau profil", unnamedProfile: "Profil sans nom", deleteProfile: "Supprimer ce profil", deleteActiveProfile: "Supprimer le profil actif", skipRest: "Passer la pause", required: "À compléter", adaptedSession: "Séance adaptée", adaptedSessionHelp: "Choisissez votre temps disponible", sessionProgress: "Progression", progress: "Suivi", completedExercises: "exercices sur {total}", completedSets: "séries sur {total}", completedReps: "répétitions sur {total}", remaining: "Il reste", exercises: "exercices", firstName: "Prénom", firstNamePlaceholder: "Votre prénom", age: "Âge", agePlaceholder: "Votre âge", level: "Niveau", job: "Métier", continue: "Continuer", skipStep: "Passer cette étape", resetProfile: "Réinitialiser le profil", tooYoung: "Trop jeune", tooOld: "Trop vieux",
  },
  en: {
    homeEyebrow: "MSD prevention · Maritime professions", homeTitle: "Prevention tailored to your role.", homeDescription: "Find simple, targeted exercises to maintain mobility and prepare your body for the demands of working onboard.", start: "Get started", exercisesAvailable: "{count} exercises available",
    menu: "Menu", openMenu: "Open menu", home: "Home", profile: "My profile", findExercises: "Find exercises",
    library: "Exercise library", howStart: "How would you like to begin?", choosePath: "Choose the route that suits you to access targeted exercises.", byJob: "By role", byJobTitle: "By your profession", byJobText: "Find exercises for your onboard role.", byZone: "By area", byZoneTitle: "Choose a muscle group", byZoneText: "Access exercises suited to the area you want to work.",
    zoneSearch: "Search by area", zoneQuestion: "Which area would you like to work?", zoneHelp: "Select an area on the diagram or choose it from the list.",
    step: "Step 1 of 2", yourProfile: "Your profile", profileIntro: "It helps tailor the exercises. You can update it later.", profileSaved: "Profile saved", profileArchive: "Saved profiles", profileArchiveHelp: "Choose a profile to use it again", newProfile: "New profile", unnamedProfile: "Unnamed profile", deleteProfile: "Delete this profile", deleteActiveProfile: "Delete active profile", skipRest: "Skip rest", required: "Required", adaptedSession: "Adapted session", adaptedSessionHelp: "Choose the time you have available", sessionProgress: "Session progress", progress: "Progress", completedExercises: "exercises of {total}", completedSets: "sets of {total}", completedReps: "repetitions of {total}", remaining: "Remaining", exercises: "exercises", firstName: "First name", firstNamePlaceholder: "Your first name", age: "Age", agePlaceholder: "Your age", level: "Level", job: "Role", continue: "Continue", skipStep: "Skip this step", resetProfile: "Reset profile", tooYoung: "Too young", tooOld: "Too old",
  },
  es: {
    homeEyebrow: "Prevención de TME · Oficios marítimos", homeTitle: "Prevención adaptada a su puesto.", homeDescription: "Encuentre ejercicios sencillos y específicos para mantener su movilidad y preparar su cuerpo para las exigencias a bordo.", start: "Empezar", exercisesAvailable: "{count} ejercicios disponibles",
    menu: "Menú", openMenu: "Abrir el menú", home: "Inicio", profile: "Mi perfil", findExercises: "Buscar ejercicios",
    library: "Biblioteca de ejercicios", howStart: "¿Cómo desea empezar?", choosePath: "Elija el recorrido que le convenga para acceder a ejercicios específicos.", byJob: "Por puesto", byJobTitle: "Según su profesión", byJobText: "Encuentre ejercicios según su función a bordo.", byZone: "Por zona", byZoneTitle: "Elegir un grupo muscular", byZoneText: "Acceda a ejercicios adaptados a la zona que desea trabajar.",
    zoneSearch: "Búsqueda por zona", zoneQuestion: "¿Qué zona desea trabajar?", zoneHelp: "Toque una zona en el esquema o elíjala en la lista.",
    step: "Paso 1 de 2", yourProfile: "Su perfil", profileIntro: "Ayuda a adaptar los ejercicios. Podrá modificarlo más tarde.", profileSaved: "Perfil guardado", profileArchive: "Perfiles guardados", profileArchiveHelp: "Elija un perfil para volver a usarlo", unnamedProfile: "Perfil sin nombre", deleteProfile: "Eliminar este perfil", firstName: "Nombre", firstNamePlaceholder: "Su nombre", age: "Edad", agePlaceholder: "Su edad", level: "Nivel", job: "Profesión", continue: "Continuar", skipStep: "Omitir este paso", resetProfile: "Restablecer perfil", tooYoung: "Demasiado joven", tooOld: "Demasiado mayor",
  },
  zh: {
    homeEyebrow: "肌肉骨骼疾病预防 · 海事职业", homeTitle: "为您的岗位量身定制的预防方案。", homeDescription: "通过简单、有针对性的练习，保持身体灵活，帮助您适应船上工作的身体负荷。", start: "开始", exercisesAvailable: "可用练习 {count} 个",
    menu: "菜单", openMenu: "打开菜单", home: "首页", profile: "我的资料", findExercises: "查找练习",
    library: "练习库", howStart: "您想如何开始？", choosePath: "选择适合您的方式，获取针对性的练习。", byJob: "按岗位", byJobTitle: "按您的职业", byJobText: "查找与您船上岗位相匹配的练习。", byZone: "按部位", byZoneTitle: "选择肌肉部位", byZoneText: "查看适合您想训练部位的练习。",
    zoneSearch: "按部位查找", zoneQuestion: "您想训练哪个部位？", zoneHelp: "点击图中的部位，或从列表中选择。",
    step: "第 1 步，共 2 步", yourProfile: "您的资料", profileIntro: "这有助于推荐适合您的练习。您以后可以修改。", profileSaved: "资料已保存", profileArchive: "已保存的资料", profileArchiveHelp: "选择资料以再次使用", unnamedProfile: "未命名资料", deleteProfile: "删除此资料", firstName: "名字", firstNamePlaceholder: "您的名字", age: "年龄", agePlaceholder: "您的年龄", level: "水平", job: "岗位", continue: "继续", skipStep: "跳过此步骤", resetProfile: "重置资料", tooYoung: "年龄过小", tooOld: "年龄过大",
  },
};

const playerFrench = { painNav:"Douleurs", painEyebrow:"Prévention ciblée", painTitle:"Qu’est-ce qui vous gêne pendant l’effort ?", painIntro:"Sélectionnez la contrainte rencontrée pour prioriser les zones à renforcer et mobiliser.", painWarning:"Une douleur aiguë, inhabituelle ou persistante nécessite l’arrêt de l’exercice et l’avis d’un professionnel de santé.", pain_lifting_title:"Porter, tirer ou manutentionner", pain_lifting_text:"Tensions du dos ou des lombaires lors des efforts de charge.", pain_repetitive_title:"Gestes répétitifs ou outils vibrants", pain_repetitive_text:"Inconfort aux mains, poignets, avant-bras ou épaules.", pain_overhead_title:"Travail bras levés", pain_overhead_text:"Tensions des épaules, trapèzes ou haut du dos.", pain_stability_title:"Équilibre et mouvements du navire", pain_stability_text:"Fatigue des jambes et du gainage liée au roulis, aux escaliers ou au pont.", zone_lombaires:"Lombaires", zone_dos:"Dos", zone_jambes:"Jambes", "zone_main-poignet":"Main et poignet", "zone_avant-bras":"Avant-bras", zone_epaules:"Épaules", zone_trapezes:"Trapèzes", zone_mollets:"Mollets", zone_abdominaux:"Abdominaux", exercisesTitle:"Exercices — {context}", exercisesAvailable:"{count} exercices disponibles", goToZone:"Aller à une zone", filters:"Filtres", noEquipment:"Sans matériel", shortFormat:"Format court", strengthening:"Renforcement", stretching:"Étirement", unknownExercise:"Exercice introuvable", back:"Retour", selectionComplete:"Sélection terminée", completed:"Bravo, vous avez terminé vos exercices.", backToList:"Retour à la liste", currentExercise:"Exercice en cours", closeExercise:"Fermer l’exercice", mainMenu:"Menu principal", recovery:"Récupération", restTitle:"Prenez 20 secondes de pause", series:"série {current} sur {total}", seconds:"sur {count} s", repetitions:"répétitions", hold:"Maintien", repsToDo:"Répétitions à effectuer", nextStarts:"La prochaine série démarrera automatiquement à la fin du compte à rebours.", pause:"Pause", resume:"Reprendre", validate:"Valider", previousExercise:"Exercice précédent", skipExercise:"Passer cet exercice" };

const LanguageContext = createContext(null);
const validLanguages = ["fr", "en"];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const stored = window.localStorage.getItem("musculoprevent-language");
    return validLanguages.includes(stored) ? stored : "fr";
  });
  const setLanguage = (nextLanguage) => setLanguageState(validLanguages.includes(nextLanguage) ? nextLanguage : "fr");

  useEffect(() => {
    window.localStorage.setItem("musculoprevent-language", language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key, variables = {}) => (uiTranslations[language]?.[key] ?? (translations[language] ?? translations.en)[key] ?? playerFrench[key] ?? translations.en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? ""),
  }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  return useContext(LanguageContext);
}
