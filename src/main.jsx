import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { LanguageProvider } from "./i18n.jsx";
import "./index.css";

import "./styles/cards.css";
import "./styles/buttons.css";
import "./styles/badges.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="page-container">
          <div className="card">
            <h1>MusculoPrevent</h1>
            <p>L’application n’a pas pu s’afficher. Rechargez la page puis consultez la console du navigateur si le problème persiste.</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <LanguageProvider><BrowserRouter><App /></BrowserRouter></LanguageProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
