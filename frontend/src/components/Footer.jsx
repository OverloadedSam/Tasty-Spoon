import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const Footer = () => {
    return (
        <>
            <footer className="bg-dark mt-4">
                <div style={{ backgroundColor: "#ffb037" }}>
                    <Container>
                        <Row className="py-4 d-flex align-items-center">
                            <Col
                                md={6}
                                className="text-center text-md-left mb-4 mb-md-0"
                            >
                                <h3 className="mb-0 font-weight-bold">
                                    Get connected with us on social networks!
                                </h3>
                            </Col>

                            <Col
                                md={6}
                                className="text-center text-md-right footerIcon"
                            >
                                <a href="#!" className="fb-ic mb-2">
                                    <i className="footer-icon mb-2 fa fa-facebook-f mr-4">
                                        {" "}
                                    </i>
                                </a>
                                <a href="#!" className="tw-ic">
                                    <i className="footer-icon mb-2 fa fa-twitter mr-4">
                                        {" "}
                                    </i>
                                </a>
                                <a href="#!" className="gplus-ic">
                                    <i className="footer-icon mb-2 fa fa-youtube mr-4">
                                        {" "}
                                    </i>
                                </a>
                                <a href="#!" className="li-ic">
                                    <i className="footer-icon mb-2 fa fa-linkedin mr-4">
                                        {" "}
                                    </i>
                                </a>
                                <a href="#!" className="ins-ic">
                                    <i className="footer-icon fa fa-instagram">
                                        {" "}
                                    </i>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container className="text-center text-md-left mt-5 text-light">
                    <Row className="mt-3">
                        <Col md={3} className="mx-auto mb-4">
                            <h5 className="text-uppercase font-weight-bold">
                                Food ordering App!
                            </h5>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto text-info"
                                style={{
                                    height: "0.5px",
                                    width: "20%",
                                    color: "#ffb037",
                                    backgroundColor: "#ffb037",
                                }}
                            />
                            <p className="text-info">
                                We bring professional chefs to your home to
                                prepare delicious meals at a fraction of the
                                cost. Life transforming, plant-rich super meals
                                delivered to your doorstep.
                            </p>
                        </Col>

                        <Col md={2} className="mx-auto mb-4 footer-links">
                            <h5 className="text-uppercase font-weight-bold text-info">
                                Menu
                            </h5>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    height: "0.5px",
                                    width: "20%",
                                    color: "#ffb037",
                                    backgroundColor: "#ffb037",
                                }}
                            />
                            <p>
                                <a href="#!">Home</a>
                            </p>
                            <p>
                                <a href="#!">About</a>
                            </p>
                            <p>
                                <a href="#!">Meals</a>
                            </p>
                            <p>
                                <a href="#!">Grocery</a>
                            </p>
                        </Col>

                        <Col md={3} className="mx-auto mb-4 footer-links">
                            <h5 className="text-uppercase font-weight-bold text-info">
                                Useful links
                            </h5>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    height: "0.5px",
                                    width: "20%",
                                    color: "#ffb037",
                                    backgroundColor: "#ffb037",
                                }}
                            />
                            <p>
                                <a href="#!">Privacy Policy </a>
                            </p>
                            <p>
                                <a href="#!">FAQ</a>
                            </p>
                            <p>
                                <Button
                                    variant="info"
                                    className="rounded-pill text-light btn-sm"
                                >
                                    Sign in
                                </Button>
                            </p>
                            <p>
                                <Button
                                    variant="outline-info"
                                    className="rounded-pill btn-sm"
                                >
                                    Sign Up
                                </Button>
                            </p>
                        </Col>

                        <Col
                            md={4}
                            className=" mx-auto mb-md-0 mb-4 footer-links"
                        >
                            <h5 className="text-uppercase font-weight-bold text-info">
                                Contact
                            </h5>
                            <hr
                                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    height: "0.5px",
                                    width: "20%",
                                    color: "#ffb037",
                                    backgroundColor: "#ffb037",
                                }}
                            />
                            <p>
                                <i className="fa fa-home mr-3"></i>Mayur Vihar
                                Phase-II, Delhi.
                            </p>
                            <p>
                                <i className="fa fa-envelope mr-3"></i>
                                FoodOrder@email.com
                            </p>
                            <p>
                                <i className="fa fa-phone mr-3"></i>+ 01 234 567
                                88
                            </p>
                            <p>
                                <i className="fa fa-print mr-3"></i>+ 01 234 567
                                89
                            </p>
                        </Col>
                    </Row>
                </Container>
                <div className="text-center py-3 text-light">
                    © 2021 Copyright:
                    <a href="https://mdbootstrap.com/"> FoodOrderingApp.com</a>
                </div>
            </footer>
        </>
    );
};

export default Footer;
