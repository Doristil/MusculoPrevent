import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { LanguageProvider } from "./i18n.jsx";
import { LanguageContext } from "./context/LanguageContext.jsx";
import "./index.css";

import "./styles/cards.css";
import "./styles/buttons.css";
import "./styles/badges.css";

class AppErrorBoundary extends React.Component {
  static contextType = LanguageContext;
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
            <h1>{this.context?.t("errorTitle") ?? "MusculoPrevent"}</h1>
            <p>{this.context?.t("errorMessage") ?? "The application could not be displayed. Reload the page and try again."}</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider><AppErrorBoundary><BrowserRouter><App /></BrowserRouter></AppErrorBoundary></LanguageProvider>
  </React.StrictMode>
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
