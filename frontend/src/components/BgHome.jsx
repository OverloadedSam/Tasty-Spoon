import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

const BgHome = () => {
    return (
        <>
            <Container fluid className="p-0">
                <Jumbotron
                    style={{
                        backgroundImage: `url("assets/images/hero-background/hero-${Math.ceil(
                            Math.random() * 7
                        )}.jpg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    className="rounded-0"
                >
                    <div className="bg-img-content">
                        <h1 className="px-2 mb-4 display-4 text-center">
                            Hasty and Tasty!
                        </h1>
                        <p className="text-center p-0 mx-md-5 mb-0">
                            We bring professional chefs to your home to prepare
                            delicious meals at a fraction of the cost.
                        </p>
                        <p className="text-center p-1 mx-5 mb-2">
                            Life transforming, plant-rich super meals delivered
                            to your doorstep.
                        </p>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button
                                as={Link}
                                to="/meal"
                                variant="info"
                                className="m-2 rounded-pill "
                            >
                                Get Meals
                            </Button>
                            <Button
                                as={Link}
                                to="/grocery"
                                variant="outline-info"
                                className="m-2 rounded-pill border-light text-light"
                            >
                                Get Grocery
                            </Button>
                        </div>
                    </div>
                </Jumbotron>
            </Container>
        </>
    );
};

export default BgHome;
