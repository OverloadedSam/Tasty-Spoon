import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./components/NavMenu";
import BgHome from "./components/BgHome";
import Featurette from "./components/Featurette";
import ChooseUs from "./components/ChooseUs";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";

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
            <Testimonial />
            <Footer />
        </div>
    );
}

export default App;
