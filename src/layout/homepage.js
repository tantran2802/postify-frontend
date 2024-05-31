import { Navbar, Container, NavbarBrand, NavbarToggle, NavbarCollapse, Nav, NavDropdown } from "react-bootstrap";
import { Outlet, Link, useNavigate, useLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utilities/authContext";
export default function HomePage()
{
    const { loginState } = useContext(AuthContext);
    const navigateTo = useNavigate();
    const handleLogout = () => {
        window.location.reload();
        localStorage.removeItem('token');
        navigateTo('/');
      };

    return(
    <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarBrand as={Link} to='/posts'>Social E</NavbarBrand>
                    <NavbarToggle aria-controls='basic-navbar-nav'></NavbarToggle>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                            {loginState == false ? (
                                <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                                </>
                            ): <></>}
                            {loginState == true ? (
                            <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/posting">Posting</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/searching">Searching</NavDropdown.Item>
                            {/* <NavDropdown.Item href="signup">Logout</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            ) : <></>
                        }
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <div>
                <Outlet />
            </div>

    </div>);
}