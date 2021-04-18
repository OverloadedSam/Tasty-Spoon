import React from 'react'
import ProfileCard from './ProfileCard';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Testimonial = () => {
    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-5">
                    Our <span> Testimonials.</span>{" "}
                </h1>

                <Row>
                    <ProfileCard
                        customerName="John Doe"
                        customerImg="./assets/images/testimonials/c1.jpg"
                        testimonial="They are the best in every aspect of delivering good food and grocery."
                    />
                    <ProfileCard
                        customerName="Dave"
                        customerImg="./assets/images/testimonials/c2.jpg"
                        testimonial="I randomly found them on internet and now i am their regular customer."
                    />
                    <ProfileCard
                        customerName="Selena Gomez"
                        customerImg="./assets/images/testimonials/c3.jpg"
                        testimonial="The best brand for ordering any kind of meal, food or grocery in Delhi."
                    />
                </Row>
            </Container>
        </>
    );
}

export default Testimonial
