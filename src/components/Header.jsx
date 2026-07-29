import { Activity } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-circle">
          <Activity size={28} strokeWidth={2.4} />
        </div>

        <div className="header-text">
          <h1>MusculoPrevent</h1>
          <p>Prévention des troubles musculo-squelettiques du marin</p>
        </div>
      </div>
    </header>
  );
}