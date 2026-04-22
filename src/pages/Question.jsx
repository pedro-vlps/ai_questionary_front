import { useAppContext } from '../helpers/ContextApi';

const Question = () => {
  const { questionData, selectedAnswer, showResult, setSelectedAnswer, setShowResult } = useAppContext();

  if (!questionData) {
    return null;
  }

  const answers = [
    { letter: 'A', text: questionData.resposta_a, explanation: questionData.explicacao_a },
    { letter: 'B', text: questionData.resposta_b, explanation: questionData.explicacao_b },
    { letter: 'C', text: questionData.resposta_c, explanation: questionData.explicacao_c },
    { letter: 'D', text: questionData.resposta_d, explanation: questionData.explicacao_d },
  ];

  const correctAnswer = questionData.resposta_certa;

  const handleAnswerClick = (letter) => {
    setSelectedAnswer(letter);
    setShowResult(true);
  };

  const getButtonStyle = (letter) => {
    if (!showResult) return {};
    if (letter === correctAnswer) return { backgroundColor: '#4CAF50', color: 'white' };
    if (letter === selectedAnswer) return { backgroundColor: '#f44336', color: 'white' };
    return {};
  };

  return (
    <div>
      <h2>{questionData.pergunta}</h2>
      <div>
        {answers.map((answer) => (
          <button
            key={answer.letter}
            onClick={() => handleAnswerClick(answer.letter)}
            disabled={showResult}
            style={getButtonStyle(answer.letter)}
          >
            {answer.letter}) {answer.text}
          </button>
        ))}
      </div>
      {showResult && (
        <div>
          {answers.map((answer) => (
            <div key={answer.letter} style={{ marginTop: '10px' }}>
              <strong>{answer.letter}) {answer.text}</strong>
              {answer.letter === correctAnswer && (
                <p style={{ color: '#4CAF50' }}>✓ {answer.explanation}</p>
              )}
              {answer.letter === selectedAnswer && answer.letter !== correctAnswer && (
                <p style={{ color: '#f44336' }}>✗ {answer.explanation}</p>
              )}
              {answer.letter !== correctAnswer && answer.letter !== selectedAnswer && (
                <p style={{ color: '#666' }}>{answer.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Question