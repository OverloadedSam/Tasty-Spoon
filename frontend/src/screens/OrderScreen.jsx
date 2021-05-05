import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { getOrderDetailById, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAYMENT_RESET } from "../redux/action-types/OrderActionTypes";

const OrderScreen = ({ history, match }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const userSignIn = useSelector((state) => state.userSignIn);

    const orderPayment = useSelector((state) => state.orderPayment);
    const {
        loading: paymentLoading,
        error: paymentError,
        success,
    } = orderPayment;

    const orderDetailsById = useSelector((state) => state.orderDetailsById);
    const { loading, error, orderDetails } = orderDetailsById;

    var subTotalAmount = 0,
        gst = 0,
        deliveryCharges = 0,
        totalItems = 0,
        grandTotal = 0;

    if (orderDetails.orderedItems) {
        subTotalAmount = Number(
            orderDetails.orderedItems.reduce(
                (acc, currItem) => acc + currItem.prodPrice * currItem.qty,
                0
            )
        );

        totalItems = Number(
            orderDetails.orderedItems.reduce(
                (acc, currItem) => acc + Number(currItem.qty),
                0
            )
        );
        gst = Number((subTotalAmount * 0.18).toFixed(2));
        deliveryCharges = subTotalAmount >= 500 ? 0 : 80;
        grandTotal = (subTotalAmount + gst + deliveryCharges).toFixed(2);
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    useEffect(() => {
        if (!userSignIn.isSignedIn) return history.push("/signin");

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(
                `${apiUrl}/config/paypal`
            );

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (
            !Object.keys(orderDetails).length ||
            orderDetails._id !== orderId ||
            success
        ) {
            dispatch({ type: ORDER_PAYMENT_RESET });
            dispatch(getOrderDetailById(orderId));
        } else {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, success, orderDetails]);

    useEffect(() => {}, []);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Order Details and <span>Payment.</span>
                </h1>
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>{error}</h1>
                ) : orderDetails && Object.keys(orderDetails).length !== 0 ? (
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>
                                        ORDER{" "}
                                        <span className="lead">
                                            {orderDetails._id}
                                        </span>
                                    </h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>{" "}
                                        <span className="text-capitalize">
                                            {orderDetails.receiverName}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{" "}
                                        <a
                                            href={`mailto:${orderDetails.user.email}`}
                                        >
                                            {orderDetails.user.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Phone: </strong> +91{" "}
                                        {orderDetails.phone}
                                    </p>
                                    <p className="my-2">
                                        <strong>Address: </strong>
                                        {
                                            orderDetails.shippingAddress.address
                                        },{" "}
                                        {orderDetails.shippingAddress.district},
                                        Pincode -{" "}
                                        {orderDetails.shippingAddress.pinCode}
                                    </p>
                                    {orderDetails.isDelivered ? (
                                        <Alert variant="success">
                                            Delivered on{" "}
                                            {orderDetails.deliveredAt}
                                        </Alert>
                                    ) : (
                                        <Alert variant="danger">
                                            Not Delivered
                                        </Alert>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p className="my-2">
                                        <strong>Method: </strong>
                                        {orderDetails.paymentMethod}
                                    </p>
                                    {orderDetails.isPaid ? (
                                        <Alert variant="success">
                                            Paid at {orderDetails.paidAt}
                                        </Alert>
                                    ) : (
                                        <Alert variant="danger">Not Paid</Alert>
                                    )}

                                    {paymentError && (
                                        <Alert variant="danger">
                                            {paymentError}
                                        </Alert>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {orderDetails.orderedItems.length === 0 ? (
                                        <Alert variant="danger">
                                            This order does not contain any
                                            items!
                                        </Alert>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {orderDetails.orderedItems.map(
                                                (item) => (
                                                    <ListGroup.Item
                                                        key={item._id}
                                                    >
                                                        <Row className="d-flex justify-content-center align-items-center">
                                                            <Col md={2}>
                                                                <Image
                                                                    src={`/assets/images/products/${item.prodImage}`}
                                                                    alt={
                                                                        item.prodName
                                                                    }
                                                                    fluid
                                                                    rounded
                                                                ></Image>
                                                            </Col>
                                                            <Col>
                                                                <Link
                                                                    to={`/productdetails/${item.prodId}`}
                                                                    className="text-capitalize text-decoration-none text-dark"
                                                                >
                                                                    {
                                                                        item.prodName
                                                                    }
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
                                                )
                                            )}
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
                                        <Table
                                            hover
                                            borderless
                                            className="mb-0"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>Total Items:</td>
                                                    <td>x {totalItems}</td>
                                                </tr>
                                                <tr>
                                                    <td>Subtotal amount:</td>
                                                    <td>
                                                        <i className="fa fa-inr"></i>{" "}
                                                        {subTotalAmount.toFixed(
                                                            2
                                                        )}
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
                                                        {deliveryCharges.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Table
                                            hover
                                            borderless
                                            className="mb-0"
                                        >
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

                                    {!orderDetails.isPaid && (
                                        <ListGroup.Item>
                                            {paymentLoading && (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </Spinner>
                                            )}

                                            {!sdkReady ? (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </Spinner>
                                            ) : (
                                                <PayPalButton
                                                    amount={
                                                        orderDetails.totalPayableAmount
                                                    }
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};

export default OrderScreen;
