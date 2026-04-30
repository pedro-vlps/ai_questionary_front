import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../helpers/ContextApi";
import { get } from "../helpers/FecthApi";
import { useEffect } from "react";

const subjects = [
  {
    text: "Anatomy",
    route: "anatomy",
  },
];

const SubjectSelection = () => {
  const { setSelectedInstitution } = useAppContext();
  const navigate = useNavigate();

  const handleClickSubject = (subjectRoute) => {
    navigate(`/${subjectRoute}`);
  };

  const getInstitution = async () => {
    const response = await get("institutions");
    response.data.forEach((e) => {
      if (e.name === "UBA") {
        setSelectedInstitution(e);
      }
    });
  };

  useEffect(() => {
    getInstitution();
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="w-100 m-0 p-0">
      <Col className="px-5 pt-4">
        <h5>Choose your subject</h5>
        <Row className="g-3 justify-content-center">
          {subjects.map((subject, index) => (
            <Col
              key={`${subject.text}-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex"
            >
              <Card
                className="w-100 h-100"
                role="button"
                onClick={() => handleClickSubject(subject.route)}
              >
                <Card.Body>{subject.text}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default SubjectSelection;
