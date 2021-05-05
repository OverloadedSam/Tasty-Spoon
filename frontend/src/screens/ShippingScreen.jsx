import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { saveAddressToCart } from "../redux/actions/cartActions";

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userSignIn = useSelector((state) => state.userSignIn);
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [shipData, setShipData] = useState({
        district: shippingAddress.district || "",
        pinCode: shippingAddress.pinCode || "",
        landmark: shippingAddress.landmark || "",
        address: shippingAddress.address || "",
    });

    const error = useRef(false);

    const formChangeHandler = (e) => {
        const field = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (field === "pinCode" && Number(value) <= 0) {
            error.current = true;
        } else if (field !== "pinCode" && !value.trim()) {
            error.current = true;
        } else {
            error.current = false;
        }

        setShipData({ ...shipData, [field]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!userSignIn.isSignedIn) {
            history.push("/signin");
            return;
        }
        if (error.current) {
            return;
        }

        dispatch(saveAddressToCart(shipData));
        history.push("/payment");
    };

    useEffect(() => {
        if (!userSignIn.isSignedIn) history.push("/signin");
    });

    const districts = [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdra",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi",
    ];

    const renderInput = (label, name, icon, type = "text") => {
        return (
            <Form.Row className="d-flex justify-content-center">
                <Form.Group as={Col} md={6}>
                    <Form.Label className="font-weight-bold" htmlFor={name}>
                        {label}
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{icon}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            required
                            id={name}
                            name={name}
                            type={type}
                            value={shipData[name]}
                            onChange={formChangeHandler}
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        );
    };

    return (
        <Container>
            <h1 className="d-inline-block home-main-heading py-2 my-3">
                Ship<span>ping.</span>
            </h1>
            <Form onSubmit={submitHandler}>
                <Form.Row className="d-flex justify-content-center">
                    <Form.Group as={Col} md={6}>
                        <Form.Label
                            className="font-weight-bold"
                            htmlFor="district"
                        >
                            Select District
                        </Form.Label>
                        <Form.Control
                            required
                            id="district"
                            name="district"
                            as="select"
                            onChange={formChangeHandler}
                            value={shipData.district}
                        >
                            <option value="">District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                {renderInput("Pin code", "pinCode", "ZIP", "number")}
                {renderInput("Landmark", "landmark", "🗼")}

                <Form.Row className="d-flex justify-content-center">
                    <Form.Group as={Col} md={6}>
                        <Form.Label
                            className="font-weight-bold"
                            htmlFor={"address"}
                        >
                            Address
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>🏠</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                as="textarea"
                                rows={3}
                                id="address"
                                name="address"
                                value={shipData.address}
                                onChange={formChangeHandler}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Row className="d-flex justify-content-center">
                    <Form.Group as={Col} md={6}>
                        <Button
                            block
                            variant="info"
                            type="submit"
                            className="mt-2"
                            disabled={error.current}
                        >
                            Continue
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    );
};

export default ShippingScreen;
