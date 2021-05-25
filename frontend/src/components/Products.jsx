import React, { useEffect, useState } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Pagination from "./Pagination";
import queryString from "query-string";

const Products = ({ location, history }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, count } = productList;

    const query = queryString.parse(location.search);

    const pageNo = parseInt(query.page);
    const [page, setPage] = useState(pageNo || 1);
    const [path, setPath] = useState(null);

    const type = location.pathname;

    const pageChangeHandler = (pageNumber) => {
        history.replace(`?page=${pageNumber}`);
        setPage(pageNumber);
    };

    useEffect(() => {
        setPath((prev) => {
            if (prev !== path) {
                setPage(1);
                return location.pathname;
            } else if (prev === path) {
                const page = parseInt(!query.page ? 1 : query.page);
                setPage(page);
                return location.pathname;
            }
        });
    }, [type]);

    useEffect(() => {
        const currentPage = parseInt(!query.page ? 1 : query.page);
        if (type === "/meal") {
            const url = query.page
                ? `products/Food-Category?page=${currentPage}`
                : `products/Food-Category`;
            setPath(location.pathname);
            dispatch(listProducts("meals", url));
        }

        if (type === "/grocery") {
            const url = query.page
                ? `products/Grocery-Category?page=${currentPage}`
                : `products/Grocery-Category`;
            setPath(location.pathname);
            dispatch(listProducts("groceries", url));
        }
    }, [type, dispatch, history, page]);

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
                <Pagination
                    pageSize={12}
                    pageNumber={page}
                    count={count}
                    onPageChange={pageChangeHandler}
                />
            </Container>
        </>
    );
};

export default Products;
