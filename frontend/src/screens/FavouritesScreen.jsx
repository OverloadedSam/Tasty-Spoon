import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    showFavouriteItems,
    removeFromFavourites,
} from "../redux/actions/favouriteActions";
import { Link } from "react-router-dom";

const FavouritesScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSignIn);

    const favourites = useSelector((state) => state.favourites);
    const { loading, error, items } = favourites;

    const removingItem = useRef(false);

    const favItemDeleteHandler = (productId) => {
        removingItem.current = true;
        dispatch(removeFromFavourites(productId));
    };

    useEffect(() => {
        if (user.isSignedIn) {
            dispatch(showFavouriteItems());
        } else {
            history.push("/signin");
        }
    }, [dispatch, history, user.isSignedIn]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Your <span>Favourites.</span>
                </h1>

                {loading && !removingItem.current ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>{error}</h1>
                ) : items && items.length === 0 ? (
                    <h2>You have not added any favourite item yet!</h2>
                ) : (
                    <Container>
                        {items.map((product, index) => {
                            return (
                                <ListGroup key={product._id}>
                                    <ListGroup.Item key={product._id + "sam"} >
                                        <Row key={index+52} className="d-flex justify-content-center align-items-center">
                                            <Col
                                                key={index+4}
                                                md={3}
                                                className="d-flex justify-content-center align-items-center"
                                                >
                                                <Link
                                                    to={`/productdetails/${product._id}`}
                                                    >
                                                    <Image
                                                        thumbnail
                                                        src={`/assets/images/products/${product.image}`}
                                                        alt={product.itemName}
                                                        style={{
                                                            width: "100px",
                                                        }}
                                                        />
                                                </Link>
                                            </Col>

                                            <Col
                                                key={index+1}
                                                md={3}
                                                className="d-flex justify-content-center align-items-center"
                                                >
                                                <Link
                                                    to={`/productdetails/${product._id}`}
                                                    className="text-decoration-none"
                                                    >
                                                    <h5 className="mb-2 text-capitalize text-dark">
                                                        {product.itemName}
                                                    </h5>
                                                </Link>
                                            </Col>

                                            <Col
                                                key={index+2}
                                                sm={3}
                                                className="d-flex justify-content-center align-items-center "
                                                >
                                                <Badge
                                                    variant="secondary"
                                                    className="mb-2 mb-sm-0"
                                                    >
                                                    <i className="fa fa-star"></i>{" "}
                                                    {product.rating}
                                                </Badge>
                                            </Col>

                                            <Col
                                                key={index+3}
                                                sm={3}
                                                className="d-flex justify-content-center align-items-center "
                                            >
                                                <Button
                                                    onClick={() =>
                                                        favItemDeleteHandler(
                                                            product._id
                                                        )
                                                    }
                                                    variant="outline-danger"
                                                    size="sm"
                                                >
                                                    <i className="fa fa-trash "></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            );
                        })}
                    </Container>
                )}
            </Container>
        </>
    );
};

export default FavouritesScreen;
