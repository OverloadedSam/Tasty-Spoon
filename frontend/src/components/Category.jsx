import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProductCategory } from "../redux/actions/categoryActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CategoryCard from "./CategoryCard";

const Category = ({ match, location }) => {
    const setProdType = useState("")[1];

    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const { loading, error, categories } = category;

    useEffect(() => {
        setProdType(match.params.producttype);

        dispatch(listProductCategory(match.params.producttype));
    }, [match.params.producttype, setProdType, dispatch]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3 mb-5">
                    {match.params.producttype === "food" && "Food"}
                    {match.params.producttype === "grocery" && "Grocery"}
                    <span> categories.</span>
                </h1>
                <Row>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <h1>error</h1>
                    ) : categories.length !== 0 ? (
                        categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                location={location}
                                category={category}
                            />
                        ))
                    ) : (
                        ""
                    )}
                </Row>
            </Container>
        </>
    );
};

export default Category;
