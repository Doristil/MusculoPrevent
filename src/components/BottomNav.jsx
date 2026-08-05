import { BarChart3, Crosshair, House, ShieldAlert, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";
import "./BottomNav.css";

const items = [
  { label: "home", path: "/", Icon: House },
  { label: "library", path: "/body-zone", Icon: Crosshair },
  { label: "painNav", path: "/pain", Icon: ShieldAlert },
  { label: "progress", path: "/progress", Icon: BarChart3 },
  { label: "profile", path: "/job", Icon: UserRound },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isActive = (path) => {
    if (path === "/body-zone") return location.pathname.startsWith("/body-zone") || location.pathname.startsWith("/exercises");
    return location.pathname === path;
  };
  return <nav className="bottom-nav" aria-label={t("menu")}>
    {items.map(({ label, path, Icon }) => <button key={path} className={isActive(path) ? "is-active" : ""} type="button" aria-current={isActive(path) ? "page" : undefined} onClick={() => navigate(path)}><Icon size={21} strokeWidth={1.9} /><span>{label === "library" ? t("libraryShort") : t(label)}</span></button>)}
  </nav>;
}
