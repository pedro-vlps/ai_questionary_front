import { post } from "../helpers/FecthApi";
import { useAppContext } from "../helpers/ContextApi";
import { Card, Col, Row, Spinner } from "react-bootstrap";

const anatomyTopics = [
  { title: "Locomotor", apiName: "Locomotor" },
  { title: "Esplacno", apiName: "Splanchnology" },
  { title: "Neuro", apiName: "Neuroanatomy" },
];

const AnatomyQuestionGenerator = () => {
  const {
    setQuestionData,
    resetQuestionState,
    isLoading,
    setIsLoading,
    resetQuestionData,
  } = useAppContext();

  const handleButtonClick = async (buttonText) => {
    try {
      setIsLoading(true);
      resetQuestionState();
      resetQuestionData();
      const response = await post("ai/anatomy", { parameter: buttonText });
      console.log("Response:", response);
      setQuestionData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row className="w-100 m-0 p-0">
      <Col className="px-5 pt-4">
        <h5>Choose your anatomy topic</h5>
        <Row className="g-3 justify-content-center">
          {anatomyTopics.map((topic) => (
            <Col key={topic.title} xs={12} sm={6} md={4} lg={3} className="d-flex">
              <Card
                className="w-100 h-100"
                role="button"
                onClick={() => handleButtonClick(topic.apiName)}
              >
                <Card.Body>{topic.title}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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
