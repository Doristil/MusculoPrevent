import { BarChart3, Crosshair, House, ShieldAlert, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import "./BottomNav.css";

const items = [
  { label: "home", path: "/", Icon: House },
  { label: "library", path: "/body-zone", Icon: Crosshair },
  { label: "painNav", path: "/pain", Icon: ShieldAlert },
  { label: "Suivi", path: "/progress", Icon: BarChart3 },
  { label: "profile", path: "/job", Icon: UserRound },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  return <nav className="bottom-nav" aria-label="Navigation principale">
    {items.map(({ label, path, Icon }) => <button key={path} className={location.pathname === path ? "is-active" : ""} type="button" onClick={() => navigate(path)}><Icon size={21} /><span>{label === "library" ? t("library").replace(" d’exercices", "") : t(label)}</span></button>)}
  </nav>;
}
