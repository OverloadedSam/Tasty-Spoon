import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { placeAnOrder } from "../redux/actions/orderActions";
import { PLACE_ORDER_RESET } from "../redux/action-types/OrderActionTypes";

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const userSignIn = useSelector((state) => state.userSignIn);
    const order = useSelector((state) => state.order);
    const { orderData, placedOrder } = order;

    var subTotalAmount = 0,
        gst = 0,
        deliveryCharges = 0,
        totalItems = 0,
        grandTotal = 0;

    if (cart.cartItems.length !== 0) {
        subTotalAmount = Number(
            cart.cartItems.reduce(
                (acc, currItem) => acc + currItem.prodPrice * currItem.qty,
                0
            )
        );
        totalItems = Number(
            cart.cartItems.reduce(
                (acc, currItem) => acc + Number(currItem.qty),
                0
            )
        );
        gst = Number((subTotalAmount * 0.18).toFixed(2));
        deliveryCharges = subTotalAmount >= 500 ? 0 : 80;
        grandTotal = (subTotalAmount + gst + deliveryCharges).toFixed(2);
    }

    const placeOrderHandler = () => {
        if (!cart.cartItems) return;

        dispatch(placeAnOrder());
    };

    useEffect(() => {
        if (!userSignIn.isSignedIn) return history.push("/signin");
        if (placedOrder) {
            history.push(`/order/${orderData._id}`);
            dispatch({ type: PLACE_ORDER_RESET });
        }
    }, [dispatch, history, placedOrder]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Review and <span>Place Order.</span>
                </h1>

                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p className="my-2">
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address},{" "}
                                    {cart.shippingAddress.district}, Pincode -{" "}
                                    {cart.shippingAddress.pinCode}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p className="my-2">
                                    <strong>Method: </strong>
                                    {cart.paymentMethod}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? (
                                    <Alert variant="danger">
                                        You don't have any items in the cart!
                                    </Alert>
                                ) : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item) => (
                                            <ListGroup.Item key={item.prodId}>
                                                <Row className="d-flex justify-content-center align-items-center">
                                                    <Col md={2}>
                                                        <Image
                                                            src={`/assets/images/products/${item.prodImage}`}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        ></Image>
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            to={`/productdetails/${item.prodId}`}
                                                            className="text-capitalize text-decoration-none text-dark"
                                                        >
                                                            {item.prodName}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x{" "}
                                                        <i className="fa fa-inr"></i>{" "}
                                                        {item.prodPrice.toFixed(
                                                            2
                                                        )}{" "}
                                                        ={" "}
                                                        <i className="fa fa-inr"></i>{" "}
                                                        {(
                                                            item.prodPrice *
                                                            item.qty
                                                        ).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Table hover borderless className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Total Items:</td>
                                                <td>x {totalItems}</td>
                                            </tr>
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
                                                    {gst.toFixed(2)}
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
                                        onClick={placeOrderHandler}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Place Order
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

export default PlaceOrderScreen;
