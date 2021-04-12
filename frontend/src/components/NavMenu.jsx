import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";

const NavMenu = () => {
    return (
        <>
            <Navbar expand="lg">
                <Navbar.Brand href="#home">Food Ordering App</Navbar.Brand>
                <Navbar.Toggle aria-controls="application-navbar" />
                <Navbar.Collapse
                    className="justify-content-between"
                    id="application-navbar"
                >
                    <Nav className="ml-auto">
                        <Nav.Link className="mx-auto px-3 navbar-item" href="#home">Home</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" href="#link">About</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" href="#link">Meals</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" href="#link">
                            Grocery <Badge variant="danger">New</Badge>
                        </Nav.Link>
                        <NavDropdown className="mx-auto px-3 navbar-item" title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item className="navbar-item" href="#action/3.1">

                                <i className="fa fa-cutlery"> Food Categories</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="navbar-item" href="#action/3.2">
                                <i className="fa fa-lemon-o"> Grocery Categories</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Item>

                            <hr style={{ width: "85%", height: "1px", border: "none", color: "#000", backgroundColor: "#000" }} />
                        </Nav.Item>
                        <NavDropdown className="mx-auto px-3 navbar-item" title="Sam" id="profile-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">
                                <i className="fa fa-user-circle-o"> Samdeesh</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <i className="fa fa-gear"><span> Profile</span></i>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <i className="fa fa-sign-out"><span> Logout</span></i>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link className="mx-auto px-3" href="#home">
                            <i className="fa fa-shopping-cart"><span className="navbar-item"> Cart</span></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavMenu
