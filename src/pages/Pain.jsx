import { ArrowRight, Boxes, Hand, ShieldAlert, Waves, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import "./Pain.css";

const concerns = [
  { key: "lifting", Icon: Boxes, zones: ["lombaires", "dos", "jambes"] },
  { key: "repetitive", Icon: Wrench, zones: ["main-poignet", "avant-bras", "epaules"] },
  { key: "overhead", Icon: Hand, zones: ["epaules", "trapezes", "dos"] },
  { key: "stability", Icon: Waves, zones: ["jambes", "mollets", "abdominaux"] },
];

export default function Pain() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return <section className="pain-page">
    <p className="page-eyebrow">{t("painEyebrow")}</p>
    <h1>{t("painTitle")}</h1>
    <p className="pain-intro">{t("painIntro")}</p>
    <div className="pain-warning"><ShieldAlert size={19} /><span>{t("painWarning")}</span></div>
    <div className="pain-grid">{concerns.map(({ key, Icon, zones }) => <article className="pain-card" key={key}>
      <Icon className="pain-icon" size={23} />
      <h2>{t(`pain_${key}_title`)}</h2>
      <p>{t(`pain_${key}_text`)}</p>
      <div className="pain-zone-links">{zones.map((zone) => <button key={zone} type="button" onClick={() => navigate(`/selection/body/${zone}`)}>{t(`zone_${zone}`)} <ArrowRight size={15} /></button>)}</div>
    </article>)}</div>
  </section>;
}
