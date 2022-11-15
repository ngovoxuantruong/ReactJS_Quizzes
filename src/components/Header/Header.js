import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigation = useNavigate();

    const handleLogin = () => {
        navigation('./login');
    };

    const handleSignUp = () => {
        navigation('./signup');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    XuanTruong
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="users" className="nav-link">
                            User
                        </NavLink>
                        <NavLink to="admins" className="nav-link">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        <button className="btn-login" onClick={() => handleLogin()}>
                            Log in
                        </button>
                        <button className="btn-signup" onClick={() => handleSignUp()}>
                            Sign up
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
