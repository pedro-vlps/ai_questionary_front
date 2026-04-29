import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./helpers/ContextApi";
import AnatomyQuestionGenerator from "./pages/AnatomyQuestionGenerator";
import Question from "./pages/Question";
import Login from "./pages/Login";
import AppMenu from "./pages/AppMenu";
import SubjectSelection from "./pages/SubjectSelection";
import Header from "./Elements/Header";
import Footer from "./Elements/Footer";

function AppContent() {
  const { isAuthenticated, hasSelectedInstitution } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasSelectedInstitution) {
      navigate("/selection");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, hasSelectedInstitution]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/app" />}
        />
        <Route
          path="/anatomy"
          element={
            isAuthenticated && hasSelectedInstitution ? (
              <>
                <AnatomyQuestionGenerator />
                <Question />
              </>
            ) : isAuthenticated ? (
              <Navigate to="/app" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/app"
          element={isAuthenticated ? <AppMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/selection"
          element={
            isAuthenticated ? <SubjectSelection /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;
