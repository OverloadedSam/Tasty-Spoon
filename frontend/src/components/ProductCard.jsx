import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { addItemToFavourites } from "../redux/actions/favouriteActions";
import SnackBar from "./SnackBar";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);
    const { loading, error, isAdded } = favourites;

    product.rating = Number(product.rating + 0.0).toFixed(1);
    const badgeColor =
        product.rating <= 2
            ? "danger"
            : product.rating <= 3.5
            ? "warning"
            : "success";

    const history = useHistory();
    const addToCartHandler = () => {
        history.push(`/cart/${product._id}`);
    };

    const addToFavHandler = () => {
        dispatch(addItemToFavourites(product._id));
    };

    return (
        <>
            <Col lg={3} md={4} className="mb-3">
                <Card className="text-decoration-none text-reset">
                    <div className="inner">
                        <Link to={`/productdetails/${product._id}`}>
                            <Card.Img
                                variant="top"
                                src={`/assets/images/products/${product.image}`}
                                className="prod-img"
                            />
                        </Link>
                    </div>
                    <Card.Body className="px-3 py-2">
                        <Card.Title
                            as={Link}
                            to={`/productdetails/${product._id}`}
                            className="text-decoration-none"
                        >
                            <h4 className="text-capitalize text-info font-weight-bold">
                                {product.itemName}{" "}
                                {product.isVeg === true ? (
                                    <Image
                                        src="/assets/images/vegicon15.png"
                                        alt="veg"
                                    />
                                ) : product.isVeg === false ? (
                                    <Image
                                        src="/assets/images/nonvegicon15.png"
                                        alt="nonveg"
                                    />
                                ) : (
                                    ""
                                )}
                            </h4>
                        </Card.Title>
                        <div>
                            <h6>
                                <i className="fa fa-inr"></i> {product.price}
                                <Badge variant={badgeColor} className="mx-3">
                                    <i className="fa fa-star"></i>{" "}
                                    {product.rating}
                                </Badge>
                            </h6>
                        </div>
                        <Card.Text
                            as={Link}
                            to={`/productdetails/${product._id}`}
                            className="text-capitalize text-decoration-none text-dark"
                        >
                            {product.description}
                        </Card.Text>
                        <div>
                            <Button
                                disabled={product.stockCount === 0}
                                onClick={addToCartHandler}
                                size="sm"
                                variant="info"
                                className="mx-2 mt-1"
                            >
                                <i className="fa fa-shopping-cart"></i>
                            </Button>
                            <Button
                                onClick={addToFavHandler}
                                size="sm"
                                variant="outline-danger"
                                className="mt-1"
                            >
                                <i className="fa fa-heart"></i>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <SnackBar
                loading={loading}
                errorMessage={error}
                success={isAdded}
                successMessage="Successfully added to favourites 💝!"
            />
        </>
    );
};

export default ProductCard;
