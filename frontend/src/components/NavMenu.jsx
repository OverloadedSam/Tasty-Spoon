import React from 'react'
import "../css/navMenuStyle.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../redux/actions/userActions'

const NavMenu = () => {
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const {userData} = userSignIn;

    var userFirstName;
    if(userData){
        userFirstName = userData.userFirstName;
    }
    const signOutHandler = () => {
        dispatch(signOut());
    }

    return (
        <>
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to="/">Tasty Spoon</Navbar.Brand>
                <Navbar.Toggle aria-controls="application-navbar" />
                <Navbar.Collapse
                    className="justify-content-between"
                    id="application-navbar"
                >
                    <Nav className="ml-auto">
                        <Nav.Link className="mx-auto px-3 navbar-item" as={ Link } to="/">Home</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" as={ Link } to="/about">About</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" as={ Link } to="/meal">Meal</Nav.Link>
                        <Nav.Link className="mx-auto px-3 navbar-item" as={ Link } to="/grocery">
                            Grocery <Badge variant="danger">New</Badge>
                        </Nav.Link>
                        <NavDropdown className="mx-auto px-3 navbar-item" title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item className="navbar-item" as={ Link } to="/category/food">
                                <i className="fa fa-cutlery"> Food Categories</i>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="navbar-item" as={ Link } to="/category/grocery">
                                <i className="fa fa-lemon-o"> Grocery Categories</i>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Item>

                            <hr style={{ width: "85%", height: "1px", border: "none", color: "#000", backgroundColor: "#000" }} />
                        </Nav.Item>

                        <Nav.Link className="mx-auto px-3" as={ Link } to="/cart">
                            <i className="fa fa-shopping-cart"><span className="navbar-item"> Cart</span></i>
                        </Nav.Link>


                        {
                            userData ?
                            (<DropdownButton
                                menuAlign="right"
                                title="Your Account"
                                id="dropdown-menu-align-right"
                                size="sm"
                                className="p-1 mx-auto"
                                variant="info"
                                >
                                    <Dropdown.Header className="text-capitalize"><i className="fa fa-user-circle-o"></i>{" "}{userFirstName}</Dropdown.Header>
                                    <Dropdown.Item as={Link} to="/" ><i className="fa fa-gear text-primary"></i>{" "}Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/ordereditems" ><i className="fa fa-truck text-success"></i>{" "}My Orders</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/favourites" ><i className="fa fa-heart text-danger"></i>{" "}Favourites</Dropdown.Item>
                                    <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/" onClick={signOutHandler}><i className="fa fa-sign-out"></i>{" "}Sign out</Dropdown.Item>
                            </DropdownButton>)
                        :
                        (
                            <Nav.Item className="mx-auto p-1">
                                <Button variant="info" size="sm" className="mx-2" as={Link} to="/signin">Sign in</Button>
                            </Nav.Item>
                        )

                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavMenu
