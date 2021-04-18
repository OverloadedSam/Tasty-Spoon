import React from "react";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Featurette = (props) => {
    return (
        <>
            <Row className="d-flex justify-content-center align-items-center py-4">
                <Col md={7} className={`order-md-${props.contentOrder}`}>
                    <h2 className="featurette-heading text-info">
                        Bread Omelette Salsa.{" "}
                        <span className="text-muted">
                            It’ll blow your mind.
                        </span>
                    </h2>
                    <p className="lead">
                        Some great placeholder content for the first featurette
                        here. Imagine some exciting prose here.
                    </p>
                </Col>
                <Col md={5} className={`order-md-${props.imgOrder}`}>
                    <Image
                        src={props.imgUrl}
                        alt="feature"
                        fluid
                        roundedCircle
                    />
                </Col>
            </Row>
        </>
    );
};

export default Featurette;
