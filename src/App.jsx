import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import SearchMode from "./pages/SearchMode";
import Job from "./pages/Job";
import BodyZone from "./pages/BodyZone";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Header />

        <main className="page-container">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/search" element={<SearchMode />} />

            <Route path="/job" element={<Job />} />

            <Route path="/body-zone" element={<BodyZone />} />

            <Route
              path="/exercises/job/:job"
              element={<Exercises />}
            />

            <Route
              path="/exercises/body/:zone"
              element={<Exercises />}
            />

            <Route
              path="/exercise/:id"
              element={<ExerciseDetail />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;