import React from 'react'
import Featurette from './Featurette';
import Container from "react-bootstrap/Container";

const TopRatedFoods = () => {
    return (
        <>
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
        </>
    );
}

export default TopRatedFoods
