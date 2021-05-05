import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

const CartScreen = ({ match, history, location }) => {
    const dispatch = useDispatch();

    const quantity = location.search
        ? Number(location.search.split("=")[1])
        : 1;

    const userSignIn = useSelector((state) => state.userSignIn);
    const cart = useSelector((state) => state.cart);
    let { cartItems } = cart;

    useEffect(() => {
        // If user is coming from previous screen like product-detail page, meals, grocery etc.
        if (match.params.id) {
            dispatch(addToCart(match.params.id, quantity));
        }
    }, [dispatch, match.params.id, quantity]);

    const checkoutHandler = () => {
        if (!userSignIn.isSignedIn) {
            history.push("/signin");
            return;
        }

        history.push("/shipping");
    };

    // Delete items from cart screen
    const itemDeleteHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // Change quantity on cart screen
    const addToCartHandlerOnChange = (id, qty) => {
        dispatch(addToCart(id, qty));
    };

    var subTotalAmount = 0,
        gst = 0,
        deliveryCharges = 0,
        totalItems = 0,
        grandTotal = 0;

    if (cartItems.length !== 0) {
        subTotalAmount = Number(
            cartItems.reduce(
                (acc, currItem) => acc + currItem.prodPrice * currItem.qty,
                0
            )
        );
        totalItems = Number(
            cartItems.reduce((acc, currItem) => acc + Number(currItem.qty), 0)
        );
        gst = Number((subTotalAmount * 0.18).toFixed(2));
        deliveryCharges = subTotalAmount >= 500 ? 0 : 80;
        grandTotal = (subTotalAmount + gst + deliveryCharges).toFixed(2);
    }

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Shopping <span>Cart</span>
                </h1>

                <Row>
                    <Col md={8}>
                        {cartItems.length === 0 ? (
                            <div>Your cart is empty!</div>
                        ) : (
                            <ListGroup variant="flush">
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item.prodId}>
                                        <Row className="d-inline-flex align-items-center no-wrap">
                                            <Col md={2}>
                                                <Image
                                                    src={`/assets/images/products/${item.prodImage}`}
                                                    className="cart-image"
                                                    alt={item.prodName}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col
                                                md={3}
                                                className="mt-md-0 mt-4"
                                            >
                                                <Link
                                                    to={`/productdetails/${item.prodId}`}
                                                    className="text-capitalize text-decoration-none text-dark"
                                                >
                                                    <h5 className="font-weight-bold">
                                                        {item.prodName}
                                                    </h5>
                                                </Link>
                                            </Col>
                                            <Col
                                                md={2}
                                                className="my-1 my-md-0"
                                            >
                                                {" "}
                                                <h6 className="font-weight-bold">
                                                    <i className="fa fa-inr">
                                                        {" "}
                                                    </i>{" "}
                                                    {item.prodPrice}
                                                </h6>
                                            </Col>
                                            <Col md={5}>
                                                <Row>
                                                    <Col sm={9} xs={9} md={10}>
                                                        <p className="d-inline-block mr-3">
                                                            QTY:{" "}
                                                        </p>
                                                        <Form.Control
                                                            as="select"
                                                            value={item.qty}
                                                            className="d-inline-block"
                                                            size="sm"
                                                            style={{
                                                                width: "60px",
                                                            }}
                                                            onChange={(e) =>
                                                                addToCartHandlerOnChange(
                                                                    item.prodId,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {[
                                                                ...Array(
                                                                    item.prodStockCount
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={
                                                                        x + 1
                                                                    }
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>

                                                    <Col sm={3} xs={3} md={2}>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() =>
                                                                itemDeleteHandler(
                                                                    item.prodId
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>

                    {/* Checkout card */}
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Subtotal ({totalItems}) items</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Table hover borderless className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal amount:</td>
                                                <td>
                                                    <i className="fa fa-inr"></i>{" "}
                                                    {subTotalAmount.toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>GST 18%</td>
                                                <td>
                                                    <i className="fa fa-inr"></i>{" "}
                                                    {gst}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Delivery charges: </td>
                                                <td>
                                                    <i className="fa fa-inr"></i>{" "}
                                                    {deliveryCharges.toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Table hover borderless className="mb-0">
                                        <tbody>
                                            <tr>
                                                <th>Grand Total: </th>
                                                <th>
                                                    <i className="fa fa-inr"></i>{" "}
                                                    {grandTotal}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button
                                        variant="info"
                                        size="lg"
                                        block
                                        onClick={checkoutHandler}
                                        disabled={cartItems.length === 0}
                                    >
                                        Proceed To Checkout
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CartScreen;
