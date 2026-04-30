import { useAppContext } from "../helpers/ContextApi";
import { Col, Row } from "react-bootstrap";

const Question = () => {
  const {
    questionData,
    selectedAnswer,
    showResult,
    setSelectedAnswer,
    setShowResult,
  } = useAppContext();

  if (!questionData) {
    return null;
  }

  const answers = [
    {
      letter: "A",
      text: questionData.answer_a,
      explanation: questionData.explanation_a,
    },
    {
      letter: "B",
      text: questionData.answer_b,
      explanation: questionData.explanation_b,
    },
    {
      letter: "C",
      text: questionData.answer_c,
      explanation: questionData.explanation_c,
    },
    {
      letter: "D",
      text: questionData.answer_d,
      explanation: questionData.explanation_d,
    },
  ];

  const correctAnswer = questionData.correct_answer;

  const handleAnswerClick = (letter) => {
    setSelectedAnswer(letter);
    setShowResult(true);
  };

  const getButtonStyle = (letter) => {
    if (!showResult) return {};
    if (letter === correctAnswer)
      return { backgroundColor: "#4CAF50", color: "white" };
    if (letter === selectedAnswer)
      return { backgroundColor: "#f44336", color: "white" };
    return {};
  };

  return (
    <Row className="w-100 m-0 p-0">
      <Col className="px-5 pt-4">
        <h2>{questionData.question}</h2>
        <Row className="g-3 justify-content-center">
          {answers.map((answer) => (
            <Col key={answer.letter} xs={12} md={10} lg={8} className="d-flex">
              <button
                type="button"
                className="card w-100 text-start"
                onClick={() => handleAnswerClick(answer.letter)}
                disabled={showResult}
                style={getButtonStyle(answer.letter)}
              >
                <span className="card-body">
                  {answer.letter}) {answer.text}
                </span>
              </button>
            </Col>
          ))}
        </Row>
        {showResult && (
          <div>
            {answers.map((answer) => (
              <div key={answer.letter} style={{ marginTop: "10px" }}>
                <strong>
                  {answer.letter}) {answer.text}
                </strong>
                {answer.letter === correctAnswer && (
                  <p style={{ color: "#4CAF50" }}>✓ {answer.explanation}</p>
                )}
                {answer.letter === selectedAnswer &&
                  answer.letter !== correctAnswer && (
                    <p style={{ color: "#f44336" }}>✗ {answer.explanation}</p>
                  )}
                {answer.letter !== correctAnswer &&
                  answer.letter !== selectedAnswer && (
                    <p style={{ color: "#eeeeee" }}>{answer.explanation}</p>
                  )}
              </div>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Question;
