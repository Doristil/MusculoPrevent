import { useState } from "react";
import exercises from "../data/exercises";
import { matchesBodyZone } from "../utils/exerciseScope";
import "./BodyMap.css";

// Les tracés suivent directement le dessin du corps : ils restent donc parfaitement alignés
// à toutes les tailles d'écran, contrairement aux anciens calques positionnés sur une image.
const shapes = {
  epaules: ["M112 111c-20 2-31 15-31 32 4 8 12 14 23 17l16-19 5-25z", "M188 111c20 2 31 15 31 32-4 8-12 14-23 17l-16-19-5-25z", "M412 111c-20 2-31 15-31 32 4 8 12 14 23 17l16-19 5-25z", "M488 111c20 2 31 15 31 32-4 8-12 14-23 17l-16-19-5-25z"],
  bras: ["M95 149c-11 17-12 42-5 64l17-2c8-18 9-39 4-58z", "M205 149c11 17 12 42 5 64l-17-2c-8-18-9-39-4-58z", "M395 149c-11 17-12 42-5 64l17-2c8-18 9-39 4-58z", "M505 149c11 17 12 42 5 64l-17-2c-8-18-9-39-4-58z"],
  "avant-bras": ["M90 211c-8 21-10 47-5 68l15 6c8-21 11-45 7-68z", "M210 211c8 21 10 47 5 68l-15 6c-8-21-11-45-7-68z", "M390 211c-8 21-10 47-5 68l15 6c8-21 11-45 7-68z", "M510 211c8 21 10 47 5 68l-15 6c-8-21-11-45-7-68z"],
  "main-poignet": ["M84 278c-5 11-4 29 2 40l12 7 6-11-2-30z", "M216 278c5 11 4 29-2 40l-12 7-6-11 2-30z", "M384 278c-5 11-4 29 2 40l12 7 6-11-2-30z", "M516 278c5 11 4 29-2 40l-12 7-6-11 2-30z"],
  abdominaux: ["M126 171c7-4 15-5 22-2v25h-23z", "M152 169c7-3 15-2 22 2l1 23h-23z", "M125 199h23v27h-24c-1-9-1-18 1-27z", "M152 199h23c2 9 2 18 1 27h-24z", "M125 230h23v31h-21c-2-10-3-20-2-31z", "M152 230h23c1 11 0 21-2 31h-21z"],
  pectoraux: ["M112 142c10-10 25-13 37-7v25c-14 0-28-5-37-15z", "M188 142c-10-10-25-13-37-7v25c14 0 28-5 37-15z"],
  jambes: ["M118 282c-13 32-13 75 1 111l25-1 4-106c-11-5-20-6-30-4z", "M182 282c13 32 13 75-1 111l-25-1-4-106c11-5 20-6 30-4z", "M418 282c-13 32-13 75 1 111l25-1 4-106c-11-5-20-6-30-4z", "M482 282c13 32 13 75-1 111l-25-1-4-106c11-5 20-6 30-4z"],
  trapezes: ["M450 92c-14 4-28 13-38 27 8 10 18 19 29 29 4 5 7 10 9 16z", "M450 92c14 4 28 13 38 27-8 10-18 19-29 29-4 5-7 10-9 16z"],
  dos: ["M410 173c11 8 25 13 40 15 15-2 29-7 40-15l8 91c-14 13-30 19-48 20-18-1-34-7-48-20z"],
  lombaires: ["M414 262c12 12 24 17 36 18 12-1 24-6 36-18l5 43c-13 13-27 19-41 19-14 0-28-6-41-19z"],
  mollets: ["M121 392c-7 29-7 66 0 103l18 6c10-30 9-66 1-106z", "M179 392c7 29 7 66 0 103l-18 6c-10-30-9-66-1-106z", "M421 392c-7 29-7 66 0 103l18 6c10-30 9-66 1-106z", "M479 392c7 29 7 66 0 103l-18 6c-10-30-9-66-1-106z"],
};
const backOnlyZones = new Set(["trapezes", "dos", "lombaires"]);
const splitFaceBackZones = new Set(["epaules", "bras", "avant-bras", "main-poignet", "jambes", "mollets"]);

function BaseBody({ x, back = false }) {
  return <g className="body-base" transform={`translate(${x} 0)`}>
    <ellipse className="body-head" cx="150" cy="46" rx="22" ry="29" />
    {!back ? <g className="merchant-cap" transform="translate(0 -13)"><path className="cap-crown" d="M122 37c3-17 53-17 56 0l-2 13c-9 5-43 5-52 0z" /><path className="cap-band" d="M124 49c10 4 42 4 52 0v9c-12 4-40 4-52 0z" /><path className="cap-gold cap-gold-one" d="M126 51c12 3 36 3 48 0" /><path className="cap-gold cap-gold-two" d="M126 55c12 3 36 3 48 0" /><path className="cap-visor" d="M126 58c14 5 34 5 48 0 1 6-8 10-24 10s-25-4-24-10z" /><circle className="cap-badge" cx="150" cy="43" r="6" /><path className="cap-anchor" d="M150 39v7m-3-3h6m-7 2c1 4 8 4 10 0m-10 0c-2 0-3-2-3-3m10 3c2 0 3-2 3-3" /></g> : <g className="merchant-cap" transform="translate(0 -13)"><path className="cap-crown" d="M122 37c3-17 53-17 56 0l-2 19c-13 4-39 4-52 0z" /><path className="cap-band" d="M124 49c10 4 42 4 52 0v9c-12 4-40 4-52 0z" /><path className="cap-gold cap-gold-one" d="M126 51c12 3 36 3 48 0" /><path className="cap-gold cap-gold-two" d="M126 55c12 3 36 3 48 0" /></g>}
    <path className="body-neck" d="M137 69c1 7-1 12-6 17h38c-5-5-7-10-6-17z" />
    <path className="body-torso" d="M131 81c-20 5-37 15-50 31 8 10 18 17 29 21 1 20 4 39 1 60l-6 68c1 17 10 29 22 36l3 29h40l3-29c12-7 21-19 22-36l-6-68c-3-21 0-40 1-60 11-4 21-11 29-21-13-16-30-26-50-31z" />
    <path className="body-arm" d="M103 126c-14 16-20 41-18 66l2 67c1 17 7 31 17 42l11-5-4-77 10-54zM197 126c14 16 20 41 18 66l-2 67c-1 17-7 31-17 42l-11-5 4-77-10-54z" />
    <path className="body-hand" d="M87 291c-6 9-5 24 1 34l10 9 8-4-2-27zM213 291c6 9 5 24-1 34l-10 9-8-4 2-27z" />
    <path className="body-leg" d="M126 283c-13 28-14 67-4 105l8 24-3 88 22 9 2-127-1-96zM174 283c13 28 14 67 4 105l-8 24 3 88-22 9-2-127 1-96z" />
    <path className="body-foot" d="M127 499l22 10 10 8h-32zM173 499l-22 10-10 8h32z" />
    {!back && <g className="anatomy-lines body-face"><path d="M139 42h8M153 42h8M146 57q4 4 8 0" /><path d="M150 89v178M111 142c14 12 25 16 39 16s25-4 39-16M112 143c12 0 26 5 38 15M188 143c-12 0-26 5-38 15M119 169c11 7 21 10 31 10s20-3 31-10M121 250c10 8 19 11 29 11s19-3 29-11" /></g>}
    {back && <g className="anatomy-lines"><path className="spine" d="M150 88c-3 72-3 140 0 201" /><path d="M109 139c16 14 28 20 41 21 13-1 25-7 41-21M112 151c12 5 25 11 38 25M188 151c-12 5-25 11-38 25M112 258c13 13 25 19 38 20 13-1 25-7 38-20" /></g>}
  </g>;
}

export default function BodyMap({ zones, onSelect }) {
  const [active, setActive] = useState(null);
  const activeZone = zones.find((zone) => zone.slug === active);
  return <section className="vector-map">
    <svg viewBox="0 0 670 535" role="img" aria-label="Schéma musculaire interactif face et dos">
      <BaseBody x={0} /><BaseBody x={370} back />
      {zones.map((zone) => <g key={zone.slug} className={active === zone.slug ? "muscle-zone is-active" : "muscle-zone"} onMouseEnter={() => setActive(zone.slug)} onMouseLeave={() => setActive(null)} onClick={() => onSelect(zone)}>
        {shapes[zone.slug]?.map((d, index) => <path key={index} d={d} transform={backOnlyZones.has(zone.slug) || (splitFaceBackZones.has(zone.slug) && index >= 2) ? "translate(70 0)" : undefined} />)}
      </g>)}
      <text x="150" y="528" textAnchor="middle">FACE</text><text x="520" y="528" textAnchor="middle">DOS</text>
    </svg>
    <p className="vector-map-label">{activeZone ? `${activeZone.name} · ${exercises.filter((item) => matchesBodyZone(item, activeZone)).length} exercices` : "Survolez puis sélectionnez une zone musculaire"}</p>
    <div className="vector-map-buttons">{zones.map((zone) => <button key={zone.slug} className={active === zone.slug ? "is-active" : ""} type="button" onMouseEnter={() => setActive(zone.slug)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(zone.slug)} onBlur={() => setActive(null)} onClick={() => onSelect(zone)}>{zone.name}</button>)}</div>
  </section>;
}
