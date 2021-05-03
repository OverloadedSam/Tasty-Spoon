import React, { useEffect } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Products = ({ location }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const type = location.pathname;
    useEffect(() => {
        if (type === "/meal") {
            dispatch(listProducts("meals"));
        }

        if (type === "/grocery") {
            dispatch(listProducts("groceries"));
        }
    }, [type, dispatch]);

    return (
        <>
            <Container>
                {type === "/meal" && (
                    <h1 className="d-inline-block home-main-heading py-2 my-5">
                        Tasty meals to <span>order.</span>
                    </h1>
                )}
                {type === "/grocery" && (
                    <h1 className="d-inline-block home-main-heading py-2 my-5">
                        Fresh groceries to <span>order.</span>
                    </h1>
                )}
            </Container>
            <Container>
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Some error! {error}</h1>
                ) : (
                    <Row>
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    product={{ ...product }}
                                />
                            );
                        })}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default Products;
