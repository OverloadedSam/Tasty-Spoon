import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const SignInScreen = ({ history, location }) => {
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);

    const [email, setEmail] = useState(userSignIn.wrongEmail || "");
    const [password, setPassword] = useState(userSignIn.wrongPass || "");
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const signInSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn({ email, password }));
    };

    useEffect(() => {
        if (userSignIn.isSignedIn) {
            history.push(redirect);
        }
    }, [userSignIn.userData, userSignIn.isSignedIn, redirect, history]);

    return (
        <>
            <Container>
                <h1 className="text-center my-4">Sign in Here!</h1>
                <div
                    className="mx-auto"
                    style={{ width: "80%", backgroundColor: "#fffff" }}
                >
                    <Container>
                        <Form onSubmit={signInSubmitHandler}>
                            <Form.Row className="d-flex justify-content-center">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label
                                        className="font-weight-bold"
                                        htmlFor="email"
                                    >
                                        Email
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                📧
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id="email"
                                            autoComplete="username"
                                            type="email"
                                            value={email}
                                            placeholder="example@email.com"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className="d-flex justify-content-center">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label
                                        className="font-weight-bold"
                                        htmlFor="password"
                                    >
                                        Password
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                🔐
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id="password"
                                            autoComplete="current-password"
                                            type="password"
                                            value={password}
                                            placeholder="Enter password here"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>

                            {userSignIn.error && (
                                <Form.Row className="d-flex justify-content-center">
                                    <Form.Group as={Col} md={6}>
                                        <Form.Label className="text-danger d-block">
                                            {userSignIn.error}
                                        </Form.Label>
                                    </Form.Group>
                                </Form.Row>
                            )}

                            <Form.Row className="d-flex justify-content-center">
                                <Form.Group as={Col} md={6}>
                                    <Button
                                        block
                                        variant="info"
                                        type="submit"
                                        className="mt-2"
                                    >
                                        Sign in
                                    </Button>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className="d-flex justify-content-center">
                                <Form.Group as={Col} md={6}>
                                    <p variant="info">
                                        Don't have an account?{" "}
                                        <Link to="/signup">Sign Up</Link> now!
                                    </p>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Container>
                </div>
            </Container>
        </>
    );
};

export default SignInScreen;
