import Logo from "../Images/Logo.png";
import { Button, Col, Row } from "react-bootstrap";
import { useAppContext } from "../helpers/ContextApi";

const Header = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <Row className="w-100 m-0 p-0 d-flex justify-content-between py-4 px-4">
      {isAuthenticated ? (
        <>
          <Col md={2}>
            <img src={Logo} alt="Logo of the project" />
          </Col>
          <Col md={2}>
            <Button className="w-50">Log Out</Button>
          </Col>
        </>
      ) : (
        ""
      )}
    </Row>
  );
};

export default Header;
