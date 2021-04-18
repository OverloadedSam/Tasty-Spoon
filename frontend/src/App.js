import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./components/NavMenu";
import BgHome from "./components/BgHome";
import ChooseUs from "./components/ChooseUs";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import TopRatedFoods from "./components/TopRatedFoods";

function App() {
    return (
        <div className="App">
            <NavMenu />
            <BgHome />
            <TopRatedFoods/>
            <ChooseUs />
            <Testimonial />
            <Footer />
        </div>
    );
}

export default App;
