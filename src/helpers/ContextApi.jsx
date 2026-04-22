import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

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
  const [token, setToken] = useState(localStorage.getItem('token'));

  const resetQuestionState = () => {
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
    resetQuestionState,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
