import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import { addItemToFavourites } from "../redux/actions/favouriteActions";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import SnackBar from "../components/SnackBar";

const ProductDetails = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const user = useSelector((state) => state.userSignIn);
    const { loading, error, product } = productDetails;

    const favourites = useSelector((state) => state.favourites);
    const { loading: favLoading, error: favError, isAdded } = favourites;

    const addToCartHandler = () => {
        history.push(`/cart/${product._id}?qty=${qty}`);
    };

    const addToFavHandler = () => {
        if (!user.isSignedIn) {
            history.push("/signin");
            return;
        }

        dispatch(addItemToFavourites(product._id));
    };

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    return (
        <>
            <Container>
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>{error}</h1>
                ) : Object.entries(product).length !== 0 ? (
                    <Row className="my-4">
                        {/* Product Image column */}
                        <Col
                            md={6}
                            sm={12}
                            className="mb-3 vh-50 d-flex justify-content-center align-items-center"
                        >
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    className="h-75 w-75"
                                    src={`/assets/images/products/${product.image}`}
                                    fluid
                                    thumbnail
                                />
                            </div>
                        </Col>

                        {/* Product details column */}
                        <Col
                            md={6}
                            sm={12}
                            className="product-detail-section overflow-auto"
                        >
                            <ListGroup variant="flush">
                                {/* Product Name */}
                                <ListGroup.Item>
                                    <h1 className="text-capitalize text-info">
                                        <strong>{product.itemName}</strong>{" "}
                                        {product.isVeg === true ? (
                                            <Image
                                                src="/assets/images/vegicon30.png"
                                                alt="veg"
                                            />
                                        ) : product.isVeg === false ? (
                                            <Image
                                                src="/assets/images/nonvegicon30.png"
                                                alt="nonveg"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </h1>
                                </ListGroup.Item>

                                {/* Rating for product */}
                                <ListGroup.Item>
                                    <h5>
                                        <Rating rating={product.rating} />{" "}
                                        {(product.rating + 0.0).toFixed(1)}{" "}
                                        Rating
                                    </h5>
                                </ListGroup.Item>

                                {/* Pricing */}
                                <ListGroup.Item>
                                    <h4 className="my-1">
                                        <strong>
                                            <i className="fa fa-inr"></i>{" "}
                                            {product.price} /-
                                        </strong>
                                    </h4>
                                </ListGroup.Item>

                                {/* Status availability and qty selector*/}
                                <ListGroup.Item>
                                    <div className="mb-2 ">
                                        <p className="d-inline-block mb-0">
                                            Product Qty/Weight/litre:
                                        </p>{" "}
                                        <p className="d-inline-block mb-0 font-weight-bold">
                                            {product.quantity}
                                        </p>
                                    </div>
                                    <p className="d-inline-block mb-0">
                                        Status:
                                    </p>{" "}
                                    <p className="d-inline-block mb-0">
                                        {product.stockCount > 0
                                            ? "Available ✅"
                                            : "Not Available ❌"}
                                    </p>
                                    {product.stockCount > 0 && (
                                        <>
                                            <Row className="mt-2">
                                                <Col sm={12}>
                                                    <p className="d-inline-block mb-0 mr-2">
                                                        Select QTY:{" "}
                                                    </p>
                                                    <Form.Control
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                        as="select"
                                                        value={qty}
                                                        className="d-inline-block"
                                                        size="sm"
                                                        style={{
                                                            width: "60px",
                                                        }}
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.stockCount
                                                            ).keys(),
                                                        ].map((item, index) => (
                                                            <option
                                                                key={index + 1}
                                                            >
                                                                {item + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </ListGroup.Item>

                                {/* Button Buy, Add to cart, Favourite */}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <Button
                                                onClick={addToCartHandler}
                                                disabled={
                                                    product.stockCount === 0
                                                }
                                                variant="info"
                                                className="mt-1 ml-2"
                                            >
                                                Add to cart{" "}
                                                <i className="fa fa-shopping-cart"></i>
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                className="mt-1 ml-2"
                                                onClick={addToFavHandler}
                                            >
                                                <i className="fa fa-heart"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {/* Item details Heading */}
                                <ListGroup.Item>
                                    <h4
                                        className="my-2 font-weight-bold"
                                        style={{ color: "#ffb037" }}
                                    >
                                        Item Details
                                    </h4>
                                </ListGroup.Item>

                                {/* Item details description and ingredients */}
                                <ListGroup.Item>
                                    <p className="text-capitalize">
                                        {product.description}
                                    </p>
                                    <ul>
                                        {product.richDescription.length !== 0 &&
                                            product.richDescription.map(
                                                (desc, index) => (
                                                    <li key={index}>{desc}</li>
                                                )
                                            )}
                                    </ul>

                                    {product.ingredients.length !== 0 && (
                                        <>
                                            <p>Ingredients</p>
                                            <ul>
                                                {product.ingredients.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            {" "}
                                                            {item}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                ) : (
                    ""
                )}

                <SnackBar
                    loading={favLoading}
                    errorMessage={favError}
                    success={isAdded}
                    successMessage="Successfully added to favourites 💝!"
                />
            </Container>
        </>
    );
};

export default ProductDetails;
