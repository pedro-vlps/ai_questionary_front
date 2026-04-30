import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Col>
      <Button onClick={() => handleLoginRedirect()}>Login</Button>
      <Row>
        <Card>
          <Card.Title>Trained AI Choices Generator</Card.Title>
          <Card.Body>
            <Card.Title>Assine o plano Basic</Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default LandingPage;
