import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const getStoredAuthUser = () => {
  try {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem('auth_user');
    return null;
  }
};

const getStoredSelectedInstitution = () => {
  try {
    const storedInstitution = localStorage.getItem('selected_institution');
    return storedInstitution ? JSON.parse(storedInstitution) : null;
  } catch {
    localStorage.removeItem('selected_institution');
    return null;
  }
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentArea, setCurrentArea] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState(getStoredAuthUser);
  const [selectedInstitution, setSelectedInstitutionState] = useState(getStoredSelectedInstitution);

  const setSelectedInstitution = (institution) => {
    if (institution) {
      localStorage.setItem('selected_institution', JSON.stringify(institution));
    } else {
      localStorage.removeItem('selected_institution');
    }

    setSelectedInstitutionState(institution);
  };

  const login = (user, token) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.removeItem('selected_institution');
    setAuthUser(user);
    setSelectedInstitutionState(null);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
    localStorage.removeItem('selected_institution');
    setAuthUser(null);
    setSelectedInstitutionState(null);
    setCurrentArea(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuestionData(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    window.addEventListener('auth:logout', logout);
    return () => window.removeEventListener('auth:logout', logout);
  }, []);

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetQuestionData = () => {
    setQuestionData(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const value = {
    currentArea,
    setCurrentArea,
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswers,
    questionData,
    setQuestionData,
    selectedAnswer,
    setSelectedAnswer,
    showResult,
    setShowResult,
    isLoading,
    setIsLoading,
    resetQuestionState,
    resetQuestionData,
    authUser,
    setAuthUser,
    selectedInstitution,
    setSelectedInstitution,
    isAuthenticated: Boolean(authUser),
    hasSelectedInstitution: Boolean(selectedInstitution),
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
