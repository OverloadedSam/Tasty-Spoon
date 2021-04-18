import React from "react";
import HeroBackground from "../components/BgHome";
import TopRatedFoods from "../components/TopRatedFoods";
import ChooseUs from "../components/ChooseUs";
import Testimonials from "../components/Testimonial";

const HomeScreen = () => {
    return (
        <>
            <HeroBackground />
            <TopRatedFoods />
            <ChooseUs />
            <Testimonials />
        </>
    );
};

export default HomeScreen;
