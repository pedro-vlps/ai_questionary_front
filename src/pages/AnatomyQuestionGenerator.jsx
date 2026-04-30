import { post } from '../helpers/FecthApi';
import { useAppContext } from '../helpers/ContextApi';
import { Card, Col, Row } from 'react-bootstrap';

const anatomyTopics = ['Locomotor', 'Esplacno', 'Neuro'];

const AnatomyQuestionGenerator = () => {
  const { setQuestionData, resetQuestionState } = useAppContext();

  const handleButtonClick = async (buttonText) => {
    try {
      resetQuestionState();
      const response = await post('ai/anatomy', { parameter: buttonText });
      console.log('Response:', response);
      setQuestionData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Row className="w-100 m-0 p-0">
      <Col className="px-5 pt-4">
        <h5>Choose your anatomy topic</h5>
        <Row className="g-3 justify-content-center">
          {anatomyTopics.map((topic) => (
            <Col key={topic} xs={12} sm={6} md={4} lg={3} className="d-flex">
              <Card
                className="w-100 h-100"
                role="button"
                onClick={() => handleButtonClick(topic)}
              >
                <Card.Body>{topic}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default AnatomyQuestionGenerator;
