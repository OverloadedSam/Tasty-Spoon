import React from "react";
import "../App.css";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const ProfileCard = ({ customerName, customerImg, testimonial }) => {
    return (
        <>
            <Col md={4} className="mb-4">
                <div className="card profile-card">
                    <div className="background-block">
                        <Image
                            src="./assets/images/testimonials/card-bg.jpg"
                            alt="profile image"
                            className="background"
                        />
                    </div>

                    <div className="profile-thumb-block">
                        <Image
                            src={`${customerImg}`}
                            alt="profile-image"
                            className="profile"
                        />
                    </div>

                    <div className="card-content">
                        <h2>
                            {`${customerName}`}
                            <small className="text-muted">
                                <i className="fa fa-quote-left"></i>{" "}
                                <strong> {`${testimonial}`}</strong>{" "}
                                <i className="fa fa-quote-right"></i>
                            </small>
                        </h2>
                        <div className="icon-block">
                            <a href=".">
                                <i className="card-icon fa fa-facebook"></i>
                            </a>
                            <a href=".">
                                <i className="card-icon fa fa-twitter"></i>
                            </a>
                            <a href=".">
                                <i className="card-icon fa fa-instagram "></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    );
};

export default ProfileCard;
