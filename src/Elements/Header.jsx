import Logo from "../Images/Logo.png";
import { Button, Col, Row } from "react-bootstrap";
import { useAppContext } from "../helpers/ContextApi";
import { logoutRequest } from "../helpers/FecthApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error on logout:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <Row className="w-100 m-0 p-0 d-flex justify-content-between py-4 px-4">
      {isAuthenticated ? (
        <>
          <Col md={2}>
            <img src={Logo} alt="Logo of the project" />
          </Col>
          <Col md={2}>
            <Button className="w-50" onClick={handleLogout}>Log Out</Button>
          </Col>
        </>
      ) : (
        ""
      )}
    </Row>
  );
};

export default Header;
