const exercises = [

{
  id: "MP001",
  zone: "Mains et poignets",
  subgroup: "Poignet",
  category: "Étirement",
  name: "Étirement des muscles fléchisseurs du poignet et des doigts",
  muscles: [
    "Fléchisseur radial du carpe",
    "Fléchisseur ulnaire du carpe",
    "Fléchisseurs des doigts"
  ],
  objective: "Mobilité / Prévention TMS",
  level: "Débutant",
  sets: 1,
  reps: "5-6",
  hold: 6,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 2,
  description: "Effectuer une flexion du poignet puis étirer progressivement les doigts. Maintenir la position sans douleur.",
  interest: "Diminue les tensions liées aux manipulations répétées des cordages, outils et équipements de bord et contribue à prévenir les tendinopathies.",
  photo: "MP001.jpg"
},

{
  id: "MP002",
  zone: "Mains et poignets",
  subgroup: "Doigts",
  category: "Étirement",
  name: "Étirement des muscles des doigts",
  muscles: [
    "Fléchisseurs des doigts"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "5-6",
  hold: 6,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 2,
  description: "Croiser les doigts puis pousser les paumes vers l'avant.",
  interest: "Favorise la mobilité des doigts et réduit les raideurs lors des travaux manuels.",
  photo: "MP002.jpg"
},

{
  id: "MP003",
  zone: "Mains et poignets",
  subgroup: "Poignet",
  category: "Étirement",
  name: "Étirement des extenseurs du poignet",
  muscles: [
    "Extenseurs du carpe"
  ],
  objective: "Mobilité / Prévention TMS",
  level: "Débutant",
  sets: 1,
  reps: "5-6",
  hold: 6,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 2,
  description: "Croiser les poignets puis réaliser un mouvement circulaire contrôlé.",
  interest: "Améliore la souplesse des extenseurs et participe à la prévention de l'épicondylite.",
  photo: "MP003.jpg"
},

{
  id: "MP004",
  zone: "Mains et poignets",
  subgroup: "Poignet",
  category: "Renforcement",
  name: "Renforcement isométrique des fléchisseurs du poignet",
  muscles: [
    "Fléchisseurs du poignet"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 2,
  reps: "6",
  hold: 6,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Pousser la paume contre les doigts de la main opposée en contraction statique.",
  interest: "Développe la force de préhension utile lors de la manutention et des opérations de traction.",
  photo: "MP004.jpg"
},

{
  id: "MP005",
  zone: "Mains et poignets",
  subgroup: "Main",
  category: "Renforcement",
  name: "Renforcement isométrique des mains avec circumduction",
  muscles: [
    "Muscles intrinsèques de la main"
  ],
  objective: "Force / Mobilité",
  level: "Intermédiaire",
  sets: 2,
  reps: "5-6",
  hold: 8,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 4,
  description: "Croiser les doigts, serrer fortement puis effectuer des mouvements circulaires des poignets.",
  interest: "Renforce la stabilité du poignet et améliore la mobilité des structures musculo-tendineuses.",
  photo: "MP005.jpg"
},

{
  id: "MP006",
  zone: "Mains et poignets",
  subgroup: "Avant-bras",
  category: "Renforcement",
  name: "Wrist Curl",
  muscles: [
    "Fléchisseurs du poignet"
  ],
  objective: "Force / Endurance",
  level: "Confirmé",
  sets: 3,
  reps: "12-15",
  hold: null,
  equipment: "Haltère ou barre",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Réaliser une flexion contrôlée du poignet avec une charge puis revenir lentement.",
  interest: "Développe la force de préhension et l'endurance des avant-bras pour les opérations de levage et de traction.",
  photo: "MP006.jpg"
},

{
  id: "BR001",
  zone: "Bras",
  subgroup: "Biceps",
  category: "Étirement",
  name: "Étirement des biceps",
  muscles: [
    "Biceps brachial"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Assis",
  duration: 3,
  description: "Éloigner progressivement les mains des fesses en gardant le dos droit et les épaules basses.",
  interest: "Favorise l'ouverture de la ceinture scapulaire et réduit les tensions liées aux mouvements de traction répétés à bord.",
  photo: "BR001.jpg"
},

{
  id: "BR002",
  zone: "Bras",
  subgroup: "Triceps",
  category: "Étirement",
  name: "Étirement des triceps par automanipulation",
  muscles: [
    "Triceps brachial"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "3-4",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout ou assis",
  duration: 3,
  description: "Fléchir un bras derrière la tête puis exercer une traction douce avec l'autre main.",
  interest: "Améliore la mobilité du coude et de l'épaule tout en limitant les tensions liées aux efforts de poussée.",
  photo: "BR002.jpg"
},

{
  id: "BR003",
  zone: "Bras",
  subgroup: "Avant-bras / Biceps",
  category: "Renforcement",
  name: "Renforcement des avant-bras et biceps",
  muscles: [
    "Biceps brachial"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 2,
  reps: "8-10",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 4,
  description: "Effectuer une flexion des avant-bras en serrant fortement les poings puis revenir lentement.",
  interest: "Améliore la force de traction et la préhension utiles lors de la manutention, des cordages et du levage.",
  photo: "BR003.jpg"
},

{
  id: "BR004",
  zone: "Bras",
  subgroup: "Épaule",
  category: "Renforcement",
  name: "Contraction des rotateurs externes",
  muscles: [
    "Sous-épineux",
    "Petit rond"
  ],
  objective: "Stabilité",
  level: "Intermédiaire",
  sets: 2,
  reps: "8-10",
  hold: 6,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 4,
  description: "Coudes au corps, effectuer une rotation externe contrôlée et maintenir la contraction.",
  interest: "Renforce les stabilisateurs de l'épaule et contribue à prévenir les blessures liées aux gestes répétitifs.",
  photo: "BR004.jpg"
},

{
  id: "BR005",
  zone: "Bras",
  subgroup: "Triceps / Pectoraux",
  category: "Renforcement",
  name: "Renforcement des triceps et des pectoraux",
  muscles: [
    "Triceps brachial",
    "Grand pectoral"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 2,
  reps: "6-8",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Au sol",
  duration: 5,
  description: "En appui sur les genoux et les mains, réaliser des flexions puis extensions des bras en gardant le dos aligné.",
  interest: "Développe la force de poussée nécessaire aux opérations de levage, de manutention et d'utilisation des leviers à bord.",
  photo: "BR005.jpg"
},{
  id: "EP001",
  zone: "Épaules",
  subgroup: "Deltoïde",
  category: "Étirement",
  name: "Étirement des deltoïdes",
  muscles: [
    "Deltoïde antérieur",
    "Deltoïde moyen",
    "Deltoïde postérieur"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Amener un bras tendu devant la poitrine et exercer une légère traction avec l'autre bras.",
  interest: "Améliore la mobilité de l'épaule et diminue les tensions liées aux mouvements répétitifs de manutention.",
  photo: "EP001.jpg"
},

{
  id: "EP002",
  zone: "Épaules",
  subgroup: "Coiffe des rotateurs",
  category: "Étirement",
  name: "Étirement de la coiffe des rotateurs",
  muscles: [
    "Sous-épineux",
    "Petit rond"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Effectuer une rotation interne douce du bras à l'aide de l'autre main.",
  interest: "Préserve la mobilité de l'épaule et réduit le risque de blessures lors des efforts en hauteur.",
  photo: "EP002.jpg"
},

{
  id: "EP003",
  zone: "Épaules",
  subgroup: "Deltoïde moyen",
  category: "Renforcement",
  name: "Élévations latérales",
  muscles: [
    "Deltoïde moyen"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "10-12",
  hold: null,
  equipment: "Haltères ou bouteilles",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Lever les bras latéralement jusqu'à l'horizontale puis redescendre lentement.",
  interest: "Renforce les épaules et améliore la stabilité lors du port de charges.",
  photo: "EP003.jpg"
},

{
  id: "EP004",
  zone: "Épaules",
  subgroup: "Coiffe des rotateurs",
  category: "Renforcement",
  name: "Rotation externe avec élastique",
  muscles: [
    "Sous-épineux",
    "Petit rond"
  ],
  objective: "Stabilité",
  level: "Débutant",
  sets: 2,
  reps: "10-15",
  hold: null,
  equipment: "Élastique",
  difficulty: "Facile",
  position: "Debout",
  duration: 4,
  description: "Coude collé au corps, effectuer une rotation externe contrôlée contre la résistance.",
  interest: "Renforce les muscles stabilisateurs de l'épaule et prévient les TMS.",
  photo: "EP004.jpg"
},

{
  id: "EP005",
  zone: "Épaules",
  subgroup: "Deltoïde antérieur",
  category: "Renforcement",
  name: "Développé épaules",
  muscles: [
    "Deltoïde antérieur",
    "Triceps brachial"
  ],
  objective: "Force",
  level: "Confirmé",
  sets: 3,
  reps: "8-10",
  hold: null,
  equipment: "Haltères",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Pousser les haltères au-dessus de la tête puis revenir lentement.",
  interest: "Améliore la capacité de levage au-dessus des épaules.",
  photo: "EP005.jpg"
},

{
  id: "EP006",
  zone: "Épaules",
  subgroup: "Deltoïde antérieur",
  category: "Renforcement",
  name: "Élévations frontales",
  muscles: [
    "Deltoïde antérieur"
  ],
  objective: "Endurance",
  level: "Intermédiaire",
  sets: 3,
  reps: "12-15",
  hold: null,
  equipment: "Haltères",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Lever les bras devant soi jusqu'à l'horizontale puis redescendre de manière contrôlée.",
  interest: "Améliore l'endurance musculaire des épaules lors des gestes répétitifs.",
  photo: "EP006.jpg"
},

{
  id: "EP007",
  zone: "Épaules",
  subgroup: "Scapula",
  category: "Renforcement",
  name: "Pompes scapulaires",
  muscles: [
    "Dentelé antérieur"
  ],
  objective: "Stabilité",
  level: "Débutant",
  sets: 2,
  reps: "10-15",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Au sol",
  duration: 4,
  description: "En position de pompe, mobiliser uniquement les omoplates sans fléchir les coudes.",
  interest: "Favorise une meilleure stabilité scapulaire et réduit les douleurs d'épaule.",
  photo: "EP007.jpg"
},

{
  id: "TR001",
  zone: "Trapèzes",
  subgroup: "Trapèze supérieur",
  category: "Étirement",
  name: "Étirement du deltoïde, du trapèze et du cou",
  muscles: [
    "Trapèze supérieur",
    "Deltoïde postérieur"
  ],
  objective: "Mobilité / Prévention TMS",
  level: "Débutant",
  sets: 1,
  reps: "5-6",
  hold: 15,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Un bras dans le dos, saisir le poignet avec l'autre main et tirer doucement vers le bas et l'extérieur.",
  interest: "Réduit les tensions du cou et des épaules liées au travail répétitif.",
  photo: "TR001.jpg"
},

{
  id: "TR002",
  zone: "Trapèzes",
  subgroup: "Trapèze supérieur",
  category: "Renforcement",
  name: "Haussement d'épaules",
  muscles: [
    "Trapèze supérieur"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "10-12",
  hold: null,
  equipment: "Haltères ou sac lesté",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Hausser les épaules verticalement puis revenir lentement.",
  interest: "Développe la stabilité des épaules et du cou.",
  photo: "TR002.jpg"
},

{
  id: "TR003",
  zone: "Trapèzes",
  subgroup: "Trapèze supérieur",
  category: "Renforcement",
  name: "Tirage vertical",
  muscles: [
    "Trapèze supérieur",
    "Deltoïde"
  ],
  objective: "Force",
  level: "Confirmé",
  sets: 3,
  reps: "8-10",
  hold: null,
  equipment: "Barre ou sac lesté",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 6,
  description: "Tirer la charge le long du corps jusqu'au menton puis redescendre lentement.",
  interest: "Développe la puissance de traction et la stabilité des épaules.",
  photo: "TR003.jpg"
},{
  id: "DO001",
  zone: "Dos",
  subgroup: "Grand dorsal",
  category: "Étirement",
  name: "Étirement du grand dorsal",
  muscles: [
    "Grand dorsal"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "5",
  hold: 15,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Bras tendus au-dessus de la tête, pousser les mains vers l'avant et s'étirer progressivement.",
  interest: "Améliore la mobilité des épaules et réduit les tensions liées aux mouvements de traction et de levage.",
  photo: "DO001.jpg"
},

{
  id: "DO002",
  zone: "Dos",
  subgroup: "Dos global",
  category: "Renforcement",
  name: "Contraction des muscles du dos",
  muscles: [
    "Trapèzes",
    "Rhomboïdes",
    "Grand dorsal"
  ],
  objective: "Endurance musculaire",
  level: "Débutant",
  sets: 2,
  reps: "5-6",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Lever les bras en inspirant puis les redescendre en contrôlant le mouvement.",
  interest: "Renforce les muscles posturaux sollicités lors du port de charges.",
  photo: "DO002.jpg"
},

{
  id: "DO003",
  zone: "Dos",
  subgroup: "Spinaux",
  category: "Renforcement",
  name: "Renforcement musculaire des spinaux",
  muscles: [
    "Érecteurs du rachis"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 2,
  reps: "6",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 4,
  description: "Allongé sur le ventre, décoller légèrement le buste puis revenir lentement.",
  interest: "Prévient les lombalgies, améliore la posture et soutient les efforts de levage.",
  photo: "DO003.jpg"
},

{
  id: "DO004",
  zone: "Dos",
  subgroup: "Haut du dos",
  category: "Renforcement",
  name: "Renforcement du haut du dos",
  muscles: [
    "Trapèze moyen",
    "Rhomboïdes",
    "Deltoïde postérieur",
    "Sus-épineux",
    "Sous-épineux"
  ],
  objective: "Stabilité",
  level: "Intermédiaire",
  sets: 2,
  reps: "6-8",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Allongé sur le ventre, décoller les bras en rapprochant les omoplates.",
  interest: "Améliore la stabilité scapulaire, la posture et la résistance lors des opérations de traction.",
  photo: "DO004.jpg"
},

{
  id: "DO005",
  zone: "Dos",
  subgroup: "Grand dorsal",
  category: "Renforcement",
  name: "Contraction et étirement du grand dorsal",
  muscles: [
    "Grand dorsal"
  ],
  objective: "Mobilité / Force",
  level: "Débutant",
  sets: 3,
  reps: "3-5",
  hold: 10,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Réaliser une contraction isométrique puis un étirement contrôlé de chaque côté.",
  interest: "Favorise la mobilité des épaules et réduit les tensions accumulées.",
  photo: "DO005.jpg"
},

{
  id: "DO006",
  zone: "Dos",
  subgroup: "Bas du dos",
  category: "Renforcement",
  name: "Renforcement des muscles du bas du dos",
  muscles: [
    "Érecteurs du rachis",
    "Trapèze moyen"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 2,
  reps: "6-8",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Même position que l'exercice précédent avec un léger décollage du front et des bras.",
  interest: "Renforce les muscles stabilisateurs du rachis et améliore la résistance aux contraintes mécaniques rencontrées à bord.",
  photo: "DO006.jpg"
}, {
  id: "LO001",
  zone: "Lombaires",
  subgroup: "Mobilité",
  category: "Étirement",
  name: "Étirement latéral pour le dos",
  muscles: [
    "Carré des lombes"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "10",
  hold: 5,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Lever un bras au-dessus de la tête puis incliner le buste du côté opposé en recherchant un étirement progressif.",
  interest: "Améliore la mobilité latérale du tronc et réduit les tensions lombaires liées aux postures prolongées et aux manutentions.",
  photo: "LO001.jpg"
},

{
  id: "LO002",
  zone: "Lombaires",
  subgroup: "Rotation",
  category: "Étirement",
  name: "Étirement du bas du dos assis",
  muscles: [
    "Lombaires"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 1,
  reps: "10",
  hold: null,
  equipment: "Chaise",
  difficulty: "Facile",
  position: "Assis",
  duration: 3,
  description: "Assis, jambes croisées, effectuer une rotation douce du tronc en maintenant le bassin stable.",
  interest: "Favorise la mobilité du rachis lombaire et diminue les raideurs après les longues périodes de station assise ou debout.",
  photo: "LO002.jpg"
},

{
  id: "LO003",
  zone: "Lombaires",
  subgroup: "Lombaires",
  category: "Étirement",
  name: "Étirement du bas du dos couché",
  muscles: [
    "Érecteurs du rachis"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 3,
  reps: "1",
  hold: 30,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 4,
  description: "Ramener les genoux vers la poitrine puis maintenir la position avant de relâcher progressivement.",
  interest: "Relâche les tensions lombaires après les efforts de manutention et améliore la mobilité du bassin.",
  photo: "LO003.jpg"
},

{
  id: "LO004",
  zone: "Lombaires",
  subgroup: "Lombaires",
  category: "Étirement",
  name: "Étirement lombaire en flexion",
  muscles: [
    "Lombaires",
    "Fessiers"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Basculer les deux genoux d'un côté tout en gardant les épaules en contact avec le sol.",
  interest: "Améliore la mobilité du rachis lombaire et diminue les contraintes liées aux rotations du tronc.",
  photo: "LO004.jpg"
},

{
  id: "LO005",
  zone: "Lombaires",
  subgroup: "Gainage",
  category: "Renforcement",
  name: "Gainage lombaire",
  muscles: [
    "Érecteurs du rachis",
    "Multifides"
  ],
  objective: "Stabilité",
  level: "Débutant",
  sets: 3,
  reps: "20-30 s",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Quatre appuis",
  duration: 4,
  description: "Tendre simultanément un bras et la jambe opposée en maintenant le bassin stable.",
  interest: "Renforce les muscles stabilisateurs du rachis et améliore l'équilibre sur un navire en mouvement.",
  photo: "LO005.jpg"
},

{
  id: "LO006",
  zone: "Lombaires",
  subgroup: "Lombaires",
  category: "Renforcement",
  name: "Extension lombaire",
  muscles: [
    "Érecteurs du rachis"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "8-10",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Décoller légèrement le thorax du sol puis revenir lentement en contrôlant le mouvement.",
  interest: "Renforce les muscles postérieurs du tronc et contribue à prévenir les lombalgies liées au travail physique.",
  photo: "LO006.jpg"
},{
  id: "AB001",
  zone: "Ceinture abdominale",
  subgroup: "Grand droit",
  category: "Étirement",
  name: "Autograndissement avec contraction isométrique",
  muscles: [
    "Grand droit"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3",
  hold: 10,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Allongé sur le dos, bras tendus derrière la tête et jambes tendues. S'étirer en poussant simultanément les mains et les pieds.",
  interest: "Favorise l'alignement du rachis, améliore la mobilité globale et réduit les tensions liées aux postures prolongées.",
  photo: "AB001.jpg"
},

{
  id: "AB002",
  zone: "Ceinture abdominale",
  subgroup: "Grand droit",
  category: "Étirement",
  name: "Étirement du grand droit",
  muscles: [
    "Grand droit"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 3,
  reps: "3-4",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Ventral",
  duration: 3,
  description: "En appui sur les coudes, redresser progressivement le buste sans décoller le bassin.",
  interest: "Améliore la souplesse de la chaîne antérieure et compense les postures fléchies fréquentes à bord.",
  photo: "AB002.jpg"
},

{
  id: "AB003",
  zone: "Ceinture abdominale",
  subgroup: "Obliques",
  category: "Étirement",
  name: "Étirement des obliques",
  muscles: [
    "Obliques interne et externe"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "5",
  hold: 30,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Laisser tomber les jambes d'un côté tout en gardant les épaules au sol.",
  interest: "Améliore la mobilité en rotation du tronc et réduit les tensions lombaires.",
  photo: "AB003.jpg"
},

{
  id: "AB004",
  zone: "Ceinture abdominale",
  subgroup: "Chaîne antérieure",
  category: "Étirement",
  name: "Étirement grand droit / grand dorsal / pectoraux",
  muscles: [
    "Grand droit",
    "Grand dorsal"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "8",
  hold: 8,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Ventral",
  duration: 4,
  description: "Depuis la position d'extension, lever un bras en diagonale tout en contrôlant la respiration.",
  interest: "Favorise la mobilité du tronc et des épaules lors des tâches répétitives.",
  photo: "AB004.jpg"
},

{
  id: "AB005",
  zone: "Ceinture abdominale",
  subgroup: "Grand droit",
  category: "Renforcement",
  name: "Crunch",
  muscles: [
    "Grand droit"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 3,
  reps: "8-12",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 4,
  description: "Relever légèrement les épaules en expirant sans tirer sur la nuque.",
  interest: "Renforce la sangle abdominale et améliore la stabilité du tronc lors des manutentions.",
  photo: "AB005.jpg"
},

{
  id: "AB006",
  zone: "Ceinture abdominale",
  subgroup: "Fléchisseurs de hanche",
  category: "Renforcement",
  name: "Relevé de jambe et buste",
  muscles: [
    "Fléchisseurs de hanche",
    "Grand droit"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "6-8",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Une jambe tendue vers le plafond, relever le buste vers celle-ci puis alterner.",
  interest: "Améliore le contrôle du bassin et la stabilité du tronc lors des déplacements à bord.",
  photo: "AB006.jpg"
},

{
  id: "AB007",
  zone: "Ceinture abdominale",
  subgroup: "Obliques",
  category: "Renforcement",
  name: "Flexions latérales alternées",
  muscles: [
    "Obliques"
  ],
  objective: "Endurance",
  level: "Débutant",
  sets: 4,
  reps: "6-8",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 5,
  description: "Buste relevé, toucher alternativement le pied droit puis le pied gauche avec la main correspondante.",
  interest: "Renforce les obliques, améliore la stabilité du tronc et limite les contraintes lombaires lors des efforts asymétriques.",
  photo: "AB007.jpg"
},{
  id: "FE001",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Étirement",
  name: "Étirement des fessiers et contraction des fléchisseurs en isométrique",
  muscles: [
    "Grand fessier"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 10,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Étirement des fessiers associé à une contraction isométrique des fléchisseurs de hanche.",
  interest: "Améliore la mobilité du bassin et réduit les tensions liées aux manutentions et aux postures prolongées.",
  photo: "FE001.jpg"
},

{
  id: "FE002",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Étirement",
  name: "Étirement des fessiers",
  muscles: [
    "Grand fessier"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Ramener un genou vers la poitrine puis vers l'épaule opposée.",
  interest: "Améliore la souplesse des fessiers et réduit les contraintes sur les lombaires.",
  photo: "FE002.jpg"
},

{
  id: "FE003",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Étirement",
  name: "Étirement des fessiers et du droit antérieur",
  muscles: [
    "Grand fessier"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Associer un étirement des fessiers et du droit antérieur de la cuisse.",
  interest: "Favorise la mobilité de la hanche et diminue les tensions lors des déplacements à bord.",
  photo: "FE003.jpg"
},

{
  id: "FE004",
  zone: "Fessiers",
  subgroup: "Petit fessier",
  category: "Étirement",
  name: "Étirement des petits fessiers et tenseur du fascia lata",
  muscles: [
    "Petit fessier"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Étirement contrôlé des petits fessiers selon la méthode C.R.E post-inhibition.",
  interest: "Améliore la stabilité du bassin et réduit les tensions de la hanche.",
  photo: "FE004.jpg"
},

{
  id: "FE005",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Renforcement",
  name: "Renforcement musculaire des fessiers",
  muscles: [
    "Grand fessier"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 3,
  reps: "10-12",
  hold: null,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 4,
  description: "Élever le bassin en contractant les fessiers puis revenir lentement.",
  interest: "Améliore la stabilité du bassin et la puissance lors des manutentions.",
  photo: "FE005.jpg"
},

{
  id: "FE006",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Renforcement",
  name: "Renforcement des fessiers et des fléchisseurs",
  muscles: [
    "Grand fessier"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "8-10",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Associer une extension de hanche et une sollicitation des fléchisseurs.",
  interest: "Renforce les muscles assurant la stabilité du bassin lors des déplacements et montées d'escaliers.",
  photo: "FE006.jpg"
},

{
  id: "FE007",
  zone: "Fessiers",
  subgroup: "Grand fessier",
  category: "Renforcement",
  name: "Extension de hanche",
  muscles: [
    "Grand fessier"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "10-12",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Quatre appuis",
  duration: 4,
  description: "À quatre pattes, tendre une jambe vers l'arrière en extension de hanche.",
  interest: "Développe la puissance des membres inférieurs et limite les contraintes lombaires lors des efforts.",
  photo: "FE007.jpg"
},{
  id: "CU001",
  zone: "Cuisses",
  subgroup: "Ischio-jambiers",
  category: "Étirement",
  name: "Étirement des ischio-jambiers",
  muscles: [
    "Ischio-jambiers"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Tendre une jambe devant soi et incliner le buste en gardant le dos droit.",
  interest: "Améliore la souplesse de la chaîne postérieure et réduit les tensions lors des manutentions et déplacements.",
  photo: "CU001.jpg"
},

{
  id: "CU002",
  zone: "Cuisses",
  subgroup: "Abducteurs",
  category: "Étirement",
  name: "Étirement des abducteurs et du petit fessier",
  muscles: [
    "Abducteurs"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Allongé",
  duration: 3,
  description: "Croiser une jambe puis amener doucement le genou vers le côté opposé.",
  interest: "Améliore la mobilité de la hanche et la stabilité lors des déplacements.",
  photo: "CU002.jpg"
},

{
  id: "CU003",
  zone: "Cuisses",
  subgroup: "Abducteurs",
  category: "Étirement",
  name: "Étirement des abducteurs",
  muscles: [
    "Adducteurs",
    "Abducteurs"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Assis",
  duration: 3,
  description: "Écarter progressivement les jambes en gardant le dos droit.",
  interest: "Réduit les tensions de la hanche et améliore l'amplitude des mouvements.",
  photo: "CU003.jpg"
},

{
  id: "CU004",
  zone: "Cuisses",
  subgroup: "Quadriceps",
  category: "Étirement",
  name: "Étirement des quadriceps par automanipulation",
  muscles: [
    "Quadriceps"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "3-5",
  hold: 20,
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "Attraper la cheville derrière soi et rapprocher le talon de la fesse.",
  interest: "Améliore la souplesse des quadriceps et facilite les déplacements et manutentions.",
  photo: "CU004.jpg"
},

{
  id: "CU005",
  zone: "Cuisses",
  subgroup: "Psoas",
  category: "Renforcement",
  name: "Renforcement des fessiers et des psoas",
  muscles: [
    "Psoas",
    "Grand fessier"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "8-12",
  hold: null,
  equipment: "Aucun",
  difficulty: "Moyenne",
  position: "Allongé",
  duration: 4,
  description: "Associer une flexion de hanche à une contraction des fessiers.",
  interest: "Renforce la stabilité du bassin et améliore le port de charges.",
  photo: "CU005.jpg"
},

{
  id: "CU006",
  zone: "Cuisses",
  subgroup: "Abducteurs",
  category: "Renforcement",
  name: "Renforcement des abducteurs",
  muscles: [
    "Moyen fessier"
  ],
  objective: "Force",
  level: "Intermédiaire",
  sets: 3,
  reps: "10-15",
  hold: null,
  equipment: "Élastique (optionnel)",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 4,
  description: "Écarter la jambe latéralement puis revenir lentement.",
  interest: "Améliore la stabilité du bassin et l'équilibre sur un navire en mouvement.",
  photo: "CU006.jpg"
},

{
  id: "CU007",
  zone: "Cuisses",
  subgroup: "Quadriceps",
  category: "Renforcement",
  name: "Renforcement des quadriceps en régime excentrique",
  muscles: [
    "Quadriceps"
  ],
  objective: "Force",
  level: "Confirmé",
  sets: 3,
  reps: "8-10",
  hold: null,
  equipment: "Aucun ou charge légère",
  difficulty: "Moyenne",
  position: "Debout",
  duration: 5,
  description: "Effectuer une descente lente et contrôlée avant de revenir à la position initiale.",
  interest: "Renforce les quadriceps et améliore le contrôle des membres inférieurs lors des déplacements et manutentions.",
  photo: "CU007.jpg"
},{
  id: "MO001",
  zone: "Mollets",
  subgroup: "Triceps sural",
  category: "Étirement",
  name: "Étirement des mollets",
  muscles: [
    "Jumeaux"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "5-6",
  hold: "10-15",
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 3,
  description: "En appui sur un talon, ramener les orteils vers le tibia et maintenir l'étirement.",
  interest: "Améliore la mobilité de la cheville, facilite les déplacements et réduit les tensions musculaires des mollets.",
  photo: "MO001.jpg"
},

{
  id: "MO002",
  zone: "Mollets",
  subgroup: "Triceps sural",
  category: "Étirement",
  name: "Étirement des mollets : jumeaux, jambier postérieur et long péronier latéral",
  muscles: [
    "Jumeaux",
    "Jambier postérieur"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "5-6",
  hold: "10-15",
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Quatre appuis",
  duration: 3,
  description: "Depuis la position à quatre appuis, tendre une jambe en arrière et pousser le talon vers le sol.",
  interest: "Favorise la mobilité de la cheville et améliore la stabilité lors des déplacements sur un navire en mouvement.",
  photo: "MO002.jpg"
},

{
  id: "MO003",
  zone: "Mollets",
  subgroup: "Mollet antérieur",
  category: "Étirement",
  name: "Étirement du mollet par contraction du mollet antérieur",
  muscles: [
    "Jambier antérieur"
  ],
  objective: "Mobilité",
  level: "Débutant",
  sets: 2,
  reps: "6-8",
  hold: "10",
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Quatre appuis",
  duration: 3,
  description: "À quatre appuis, porter progressivement le poids du corps vers l'arrière tout en maintenant la cheville en flexion.",
  interest: "Améliore la mobilité de la cheville, favorise l'équilibre et réduit les tensions de la chaîne postérieure.",
  photo: "MO003.jpg"
},

{
  id: "MO004",
  zone: "Mollets",
  subgroup: "Triceps sural",
  category: "Renforcement",
  name: "Renforcement musculaire des mollets",
  muscles: [
    "Jumeaux",
    "Soléaire"
  ],
  objective: "Force",
  level: "Débutant",
  sets: 3,
  reps: "8-12",
  hold: "10-15",
  equipment: "Aucun",
  difficulty: "Facile",
  position: "Debout",
  duration: 4,
  description: "Se mettre sur la pointe des pieds, maintenir quelques secondes puis redescendre lentement.",
  interest: "Renforce les muscles du mollet, améliore la stabilité de la cheville, l'équilibre et les déplacements sur un navire en mouvement.",
  photo: "MO004.jpg"
}

];

export default exercises;