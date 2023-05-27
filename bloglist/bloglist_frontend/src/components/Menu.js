import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Menu = ({ props }) => (
  <Nav fill variant="tabs" className="justify-content-center" as="ul">
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/">blogs</Link>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link>
        <Link to="/users">users</Link>
      </Nav.Link>
    </Nav.Item>
    {props}
  </Nav>
);

export default Menu;
