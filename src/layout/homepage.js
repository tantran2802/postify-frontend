import { Navbar, Container, NavbarBrand, NavbarToggle, NavbarCollapse, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
export default function HomePage()
{
    return(
    <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarBrand href="/">Education</NavbarBrand>
                    <NavbarToggle aria-controls='basic-navbar-nav'></NavbarToggle>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="posts">Posts</Nav.Link>
                            <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item href="posting">Posting</NavDropdown.Item>
                            <NavDropdown.Item href="searching">
                                Searching
                            </NavDropdown.Item>
                            <NavDropdown.Item href="signup">Signup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <div>
                <Outlet />
            </div>

    </div>);
}