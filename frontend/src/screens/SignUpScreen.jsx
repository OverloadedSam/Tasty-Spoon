import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/actions/userActions";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const SignUpScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userSignUp = useSelector((state) => state.userSignUp);
    const userSignIn = useSelector((state) => state.userSignIn);

    const { error } = userSignUp;

    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
    });

    const onChangeFormHandler = (event) => {
        const targetedFieldName = event.target.name;
        const targetedFieldValue = event.target.value;

        setUserData({ ...userData, [targetedFieldName]: targetedFieldValue });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (userData.password === userData.confirmPassword) {
            const dataForSavingToDb = { ...userData };
            delete dataForSavingToDb["confirmPassword"];
            dispatch(signUp(dataForSavingToDb));
        }
    };

    React.useEffect(() => {
        if (userSignIn.isSignedIn) history.push("/");
        if (userSignUp.isSignedUpSuccess && userSignIn.isSignedIn) {
            history.push("/");
        }
    });

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Sign Up <span>Here!</span>
                </h1>
                <Form className="my-3" onSubmit={onSubmitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                First Name
                            </Form.Label>
                            <Form.Control
                                onChange={onChangeFormHandler}
                                type="text"
                                name="firstName"
                                placeholder="Your first name"
                                isInvalid={
                                    (userData.firstName.length !== 0 &&
                                        userData.firstName.length < 3) ||
                                    (error && error.includes("firstName"))
                                }
                                value={userData.firstName}
                                required
                            />
                            {error && error.includes("firstName") && (
                                <Form.Text className="text-danger">
                                    Enter correct first name!
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                Last name
                            </Form.Label>
                            <Form.Control
                                onChange={onChangeFormHandler}
                                type="text"
                                name="lastName"
                                placeholder="Your last name"
                                isInvalid={
                                    (userData.lastName.length !== 0 &&
                                        userData.lastName.length < 3) ||
                                    (error && error.includes("lastName"))
                                }
                                value={userData.lastName}
                                required
                            />
                            {error && error.includes("lastName") && (
                                <Form.Text className="text-danger">
                                    Enter correct last name!
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                Email
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        📧
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={onChangeFormHandler}
                                    type="email"
                                    name="email"
                                    placeholder="youremail@example.com"
                                    isInvalid={error && error.includes("email")}
                                    value={userData.email}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {error &&
                                error.includes("E-mail") &&
                                error.includes("registered") && (
                                    <Form.Text className="text-danger">
                                        {error}
                                    </Form.Text>
                                )}

                            {error && error.includes("valid email") && (
                                <Form.Text className="text-danger">
                                    E-mail must be a genuine email address.
                                </Form.Text>
                            )}
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                Phone
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        📞
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={onChangeFormHandler}
                                    type="text"
                                    placeholder="Your mobile phone number"
                                    name="phone"
                                    isInvalid={error && error.includes("phone")}
                                    value={userData.phone}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {error &&
                                error.includes("Phone") &&
                                error.includes("registered") && (
                                    <Form.Text className="text-danger">
                                        {error}
                                    </Form.Text>
                                )}
                            {error &&
                                error.includes("phone") &&
                                error.includes("pattern") && (
                                    <Form.Text className="text-danger">
                                        Enter valid phone number
                                    </Form.Text>
                                )}
                            <Form.Text className="text-muted">
                                We'll never share your phone with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                Password
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        🔑
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={onChangeFormHandler}
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password here"
                                    value={userData.password}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {userData.password !== userData.confirmPassword && (
                                <Form.Text className="text-danger">
                                    Passwords are not matching!
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label className="font-weight-bold">
                                Confirm Password
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        🔑
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onChange={onChangeFormHandler}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password here"
                                    isInvalid={
                                        userData.password !==
                                            userData.confirmPassword ||
                                        (error && error.includes("password"))
                                    }
                                    value={userData.confirmPassword}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {error && error.includes("password") && (
                                <Form.Text className="text-danger">
                                    Password length must be at least 6 character
                                    long.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Label className="font-weight-bold">
                            Address
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>🏡</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={onChangeFormHandler}
                                as="textarea"
                                name="address"
                                // placeholder="NOTE: Give the address where you want to get your food and grocery delivered!"
                                isInvalid={
                                    (userData.address.length !== 0 &&
                                        userData.address.length < 10) ||
                                    (error && error.includes("address"))
                                }
                                value={userData.address}
                                aria-label="With textarea"
                            />
                        </InputGroup>
                        {error && error.includes("address") && (
                            <Form.Text className="text-danger">
                                Address must be at least 10 characters long!
                            </Form.Text>
                        )}
                    </Form.Row>

                    <div className="my-4">
                        <Button type="submit" variant="success" size="block">
                            Create Account
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default SignUpScreen;
