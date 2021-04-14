import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const ChooseUs = () => {
    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-5">
                    Why Choose<span> Us?</span>{" "}
                </h1>
            </Container>
            <Container fluid className="bg-dark">
                <Row className="pt-5">
                    <Col md={12}>
                        <h2
                            className="text-center"
                            style={{ color: "#ffb037" }}
                        >
                            We have top notch services!
                        </h2>
                        <p className="text-white text-muted text-center pb-4">
                            Apart from affordable price rates and variety of
                            meal choices we have some other reasons to choose
                            us!
                        </p>
                    </Col>
                </Row>

                <Row className="pb-5">
                    <Col md={4}>
                        <div className="text-center mb-5 mb-md-0">
                            <div className="text-info mb-4">
                                <Image
                                    src="./assets/images/why-choose-us/world-class-chefs.jpg"
                                    fluid
                                    thumbnail
                                />
                            </div>

                            <h4 className="mb-3 text-info">
                                World Class Chefs
                            </h4>
                            <p className="text-white text-muted mb-0">
                                We have 20+ chefs from 10 different counties of
                                the world. They are highly skilled and can cook
                                anything
                            </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="text-center mb-5 mb-md-0">
                            <div className="text-info mb-4">
                                <Image
                                    src="./assets/images/why-choose-us/fastest-delivery.jpg"
                                    fluid
                                    thumbnail
                                />
                            </div>

                            <h4 className=" mb-3 text-info">Fast Delivery</h4>
                            <p className="text-white text-muted mb-0">
                                Any order can be delivered in Delhi withing 45
                                minutes. Currently we deliver our products
                                anywhere in delhi.
                            </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="text-center mb-5 mb-md-0">
                            <div className="text-info mb-4">
                                <Image
                                    src="./assets/images/why-choose-us/safety-first.jpg"
                                    fluid
                                    thumbnail
                                />
                            </div>

                            <h4 className="mb-3 text-info">Super Hygiene</h4>
                            <p className="text-white text-muted mb-0">
                                It is our responsibility to provide you good
                                hygiene food and groccery our staff maintains
                                world class hygiene.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChooseUs;
