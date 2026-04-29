import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SubjectSelection = () => {
    const navigate = useNavigate();

  const handleClickSubject = () => {
    navigate("/anatomy")
  }
  
  return (
    <div>
      Select Subject
      <div>
        <Button onClick={() => handleClickSubject()}>Anatomy</Button>
      </div>
    </div>
  );
};

export default SubjectSelection;
