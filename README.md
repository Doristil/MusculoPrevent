# MusculoPrevent

Application web progressive de prévention des troubles musculo-squelettiques
(TMS), pensée pour les métiers de la marine marchande.

Elle permet à un marin de créer ou reprendre un profil, de sélectionner une ou
plusieurs zones musculaires, de consulter les fiches d'exercices et de suivre
des séances adaptées à son niveau et à son temps disponible.

## Référentiel scientifique et éditorial

Le **mémoire Word validé pour la présentation** est l'unique source de vérité
des exercices : intitulés, zones travaillées, consignes, séries, répétitions,
maintien, matériel et intérêt à bord.

Le fichier CSV historique est isolé dans [`archive/legacy`](./archive/legacy)
à des fins de traçabilité uniquement. Il n'est ni importé, ni utilisé par
l'application.

## Structure du projet

```text
client/
├── public/                 # ressources servies telles quelles (PWA, icônes, photos)
│   └── images/exercises/   # photos anonymisées, nommées avec le code de la fiche
├── src/
│   ├── components/         # composants réutilisables : en-tête, navigation, carte corporelle
│   ├── data/               # catalogue issu du mémoire, zones, postes et traductions
│   ├── pages/              # écrans de l'application
│   ├── styles/             # styles partagés : boutons, cartes, badges
│   ├── utils/              # logique métier : profils, séances, filtres, suivi
│   ├── App.jsx             # routes et structure globale
│   └── i18n.jsx            # fournisseur de langue et libellés de l'interface
├── scripts/                # outils ponctuels : anonymisation et traductions
├── archive/legacy/         # données historiques non utilisées à l'exécution
└── docs/                   # documentation de maintenance
```

Consultez [`src/data/README.md`](./src/data/README.md) pour le rôle des
fichiers du catalogue et [`public/images/exercises/README.md`](./public/images/exercises/README.md)
pour l'ajout de photos.

## Démarrer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Puis ouvrez l'adresse affichée par Vite, généralement
`http://localhost:5173`.

## Vérifications avant publication

```bash
npm run lint
npm run build
```

## Technologies

- React 19
- Vite 8
- React Router
- Lucide (icônes)
- Progressive Web App : manifeste et service worker locaux

## Données personnelles

Les profils et le suivi sont enregistrés localement dans le navigateur de
l'appareil. Aucune donnée de profil n'est envoyée à un serveur par
l'application actuelle.
