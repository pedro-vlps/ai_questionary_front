import { useState } from "react";
import { post } from "../helpers/FecthApi";
import { useAppContext } from "../helpers/ContextApi";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const anatomyTopics = [
  { title: "Locomotor", apiName: "Locomotor" },
  { title: "Esplacno", apiName: "Splanchnology" },
  { title: "Neuro", apiName: "Neuroanatomy" },
];

const AnatomyQuestionGenerator = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  const {
    setQuestionData,
    resetQuestionState,
    isLoading,
    setIsLoading,
    resetQuestionData,
  } = useAppContext();

  const generateQuestion = async (topic) => {
    try {
      setIsLoading(true);
      resetQuestionState();
      resetQuestionData();
      const response = await post("ai/anatomy", { parameter: topic.apiName });
      console.log("Response:", response);
      setQuestionData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveToHistory = () => {
    navigate("/questions");
  };

  const handleSelectTopic = async (topic) => {
    setSelectedTopic(topic);
    await generateQuestion(topic);
  };

  const handleChangeTopic = () => {
    setSelectedTopic(null);
    resetQuestionState();
    resetQuestionData();
  };

  const handleNextQuestion = async () => {
    if (!selectedTopic) {
      return;
    }

    await generateQuestion(selectedTopic);
  };

  return (
    <Row className="w-100 m-0 p-0 d-flex flex-column align-items-center">
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card
          className="w-100 mx-auto"
          role="button"
          onClick={() => handleMoveToHistory()}
        >
          <Card.Body>Lista de Perguntas</Card.Body>
        </Card>
      </Col>
      <Col className="px-5 pt-4">
        {!selectedTopic ? (
          <>
            <h5>Choose your anatomy topic</h5>
            <Row className="g-3 justify-content-center">
              {anatomyTopics.map((topic) => (
                <Col
                  key={topic.title}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex"
                >
                  <Card
                    className="w-100 h-100"
                    role="button"
                    onClick={() => handleSelectTopic(topic)}
                  >
                    <Card.Body>{topic.title}</Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <div className="d-flex flex-column align-items-center gap-3">
              <h5 className="mb-0">
                Selected topic: <strong>{selectedTopic.title}</strong>
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button variant="outline-light" onClick={handleChangeTopic}>
                  Trocar materia
                </Button>
                <Button onClick={handleNextQuestion} disabled={isLoading}>
                  Proxima pergunta
                </Button>
              </div>
            </div>
          </>
        )}
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default AnatomyQuestionGenerator;
