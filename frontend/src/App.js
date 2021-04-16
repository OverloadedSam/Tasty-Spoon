import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./components/NavMenu";
import BgHome from "./components/BgHome";
import Featurette from "./components/Featurette";
import ChooseUs from "./components/ChooseUs";
import ProfileCard from "./components/ProfileCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
    return (
        <div className="App">
            <NavMenu />
            <BgHome />
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-2">
                    Our Top Rated <span> Meals.</span>{" "}
                </h1>
                <Featurette
                    imgUrl="./assets/images/food/feature-1.jpg"
                    imgOrder="2"
                    contentOrder="1"
                />
                <Featurette
                    imgUrl="./assets/images/food/feature-2.jpg"
                    imgOrder="1"
                    contentOrder="2"
                />
                <Featurette
                    imgUrl="./assets/images/food/feature-3.jpg"
                    imgOrder="2"
                    contentOrder="1"
                />
            </Container>

            <ChooseUs />

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
        </div>
    );
}

export default App;
