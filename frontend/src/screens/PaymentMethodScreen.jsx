import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { savePaymentMethodToCart } from "../redux/actions/cartActions";

const PaymentMethodScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userSignIn = useSelector((state) => state.userSignIn);
    const cart = useSelector((state) => state.cart);

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    if (!cart.shippingAddress) {
        history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!cart.shippingAddress) {
            history.push("/shipping");
        }
        dispatch(savePaymentMethodToCart(paymentMethod));
        history.push("/placeorder");
    };

    const paymentMethodChangeHandler = (e) => {
        setPaymentMethod(e.currentTarget.value);
    };

    useEffect(() => {
        if (!userSignIn.isSignedIn) {
            history.push("/signin");
            return;
        }
    }, [userSignIn, history]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Payment <span>Method.</span>
                </h1>
                <Form className="mt-2" onSubmit={submitHandler}>
                    <Form.Row className="d-flex justify-content-center">
                        <Form.Group as={Col} md={6}>
                            <Form.Label
                                className="my-0 mt-2"
                                as="legend"
                                htmlFor="paymentMethod"
                            >
                                Select payment method
                            </Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="d-flex justify-content-center">
                        <Form.Group as={Col} md={6}>
                            <Form.Check
                                type="radio"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={paymentMethodChangeHandler}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="d-flex justify-content-center">
                        <Form.Group as={Col} md={6}>
                            <Button
                                block
                                variant="info"
                                type="submit"
                                className="mt-2"
                                disabled={!paymentMethod}
                            >
                                Continue
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        </>
    );
};

export default PaymentMethodScreen;
