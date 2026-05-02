import { Button, Card, Col, Row } from "react-bootstrap";
import { get } from "../helpers/FecthApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionsList = () => {
  const navigate = useNavigate();

  const [questionsData, setQuestionsData] = useState([]);

  const getQuestions = async () => {
    const response = await get("questions");
    setQuestionsData(response.data);
  };

  const handleBackToAI = () => {
    navigate("/anatomy");
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Row className="w-100 m-0 p-0">
      <Button className="w-25 m-auto" onClick={() => handleBackToAI()}>Voltar</Button>
      <Row className="w-100 m-0 p-0 d-flex justify-content-center align-content-stretch">
        {questionsData.map((e) => (
          <Col xs={12} sm={6} md={4} lg={3} className="m-2">
            <Card className="h-100">
              <Card.Body>
                <Card.Text>{e.topic}</Card.Text>
                <Card.Text>{e.subtopic}</Card.Text>
                <Card.Text>{e.diversity_mode}</Card.Text>
                <Card.Title>{e.question}</Card.Title>
                <Card.Text>A - {e.answer_a}</Card.Text>
                <Card.Text>B - {e.answer_b}</Card.Text>
                <Card.Text>C - {e.answer_c}</Card.Text>
                <Card.Text>D - {e.answer_d}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default QuestionsList;
