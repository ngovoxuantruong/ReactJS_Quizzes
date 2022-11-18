import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

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
                    <Nav className="me-4">
                        {isAuthenticated === false ? (
                            <>
                                <button className="btn-login" onClick={() => handleLogin()}>
                                    Log in
                                </button>
                                <button className="btn-signup" onClick={() => handleSignUp()}>
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
