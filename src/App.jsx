import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import SearchMode from "./pages/SearchMode";
import Job from "./pages/Job";
import BodyZone from "./pages/BodyZone";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import Pain from "./pages/Pain";
import Progress from "./pages/Progress";

import "./App.css";

function App() {
  const location = useLocation();
  const isExercisePlayer = location.pathname.startsWith("/exercise/") && !new URLSearchParams(location.search).has("preview") && !new URLSearchParams(location.search).has("intro");

  return (
    <div className="app">

      {!isExercisePlayer && <Header />}

      <main className={isExercisePlayer ? "exercise-player-layout" : "page-container"}>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/search"
            element={<SearchMode />}
          />

          <Route
            path="/job"
            element={<Job />}
          />

          <Route
            path="/body-zone"
            element={<BodyZone />}
          />
          <Route path="/pain" element={<Pain />} />
          <Route path="/progress" element={<Progress />} />

          <Route
            path="/exercises/job/:job"
            element={<Exercises />}
          />

          <Route
            path="/exercises/body/:zone"
            element={<Exercises />}
          />
          <Route path="/exercises/zones/:zones" element={<Exercises />} />

          <Route
            path="/exercise/:id"
            element={<ExerciseDetail />}
          />

        </Routes>

      </main>
      {!isExercisePlayer && <BottomNav />}

    </div>
  );
}

export default App;
