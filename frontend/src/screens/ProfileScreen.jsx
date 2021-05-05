import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import SnackBar from "../components/SnackBar";
import {
    getUserDetails,
    updateUserProfile,
} from "../redux/actions/userActions";

const ProfileScreen = ({ history }) => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const userSignIn = useSelector((state) => state.userSignIn);
    const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
    const { loading, error, isUpdated } = userProfileUpdate;

    useEffect(() => {
        if (!userSignIn.isSignedIn) {
            history.push("/signin");
            return;
        }
        dispatch(getUserDetails());
    }, [dispatch, history, userSignIn.isSignedIn]);

    useEffect(() => {
        if (userDetails.userData) {
            if (userDetails.userData) {
                const user = userDetails.userData;
                setUserData({
                    ...userData,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                });
            }
        }
    }, [userDetails.userData]);

    const validateField = (field, value) => {
        const removeErrorMessage = () => {
            const copy = { ...errors };
            delete copy[field];
            setErrors(copy);
        };

        if (field === "firstName") {
            if (value.trim().length < 3) {
                setErrors({
                    ...errors,
                    firstName: "First name must be at least 3 characters long!",
                });
            } else removeErrorMessage();
        }

        if (field === "lastName") {
            if (value.trim().length < 3) {
                setErrors({
                    ...errors,
                    lastName: "Last name must be at least 3 characters long!",
                });
            } else removeErrorMessage();
        }

        if (field === "phone") {
            if (!value.match(/^[6-9][0-9]{9}$/)) {
                setErrors({ ...errors, phone: "Invalid phone number" });
            } else removeErrorMessage();
        }

        if (field === "email") {
            if (
                !value.match(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                )
            ) {
                setErrors({ ...errors, email: "Email must be a valid email" });
            } else removeErrorMessage();
        }

        if (field === "password" || field === "confirmPassword") {
            const otherField =
                field === "password"
                    ? userData.confirmPassword
                    : userData.password;

            if (!(value === otherField)) {
                setErrors({
                    ...errors,
                    confirmPassword: "Passwords are not matching!",
                });
            } else if (value.trim().length < 6 && value.trim() !== "") {
                setErrors({
                    ...errors,
                    confirmPassword:
                        "Password must be at least 6 character long!",
                });
            } else {
                const copy = { ...errors };
                delete copy["confirmPassword"];
                errors.current = copy;
                setErrors(copy);
            }
        }
    };

    const updateHandler = (e) => {
        e.preventDefault();
        if (
            Object.keys(errors).length >= 1 ||
            userData.password !== userData.confirmPassword
        ) {
            setErrors({
                ...errors,
                confirmPassword: "Passwords are not matching!",
            });
            return;
        }

        const dataToBeUpdated = { ...userData };
        if (!userData.password) {
            delete dataToBeUpdated.password;
            delete dataToBeUpdated.confirmPassword;
        }

        dispatch(updateUserProfile(dataToBeUpdated));
    };

    const changeHandler = (e) => {
        const field = e.currentTarget.name;
        const value = e.currentTarget.value;
        validateField(field, value);
        setUserData({
            ...userData,
            [field]: value,
        });
    };

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
                            id={name}
                            name={name}
                            type={type}
                            value={userData[name]}
                            onChange={changeHandler}
                            isInvalid={errors[name]}
                        />
                    </InputGroup>
                    {errors[name] && (
                        <Form.Text className="text-danger">
                            {errors[name]}
                        </Form.Text>
                    )}
                </Form.Group>
            </Form.Row>
        );
    };

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-3">
                    Your <span>Profile.</span>
                </h1>
                <Form onSubmit={updateHandler}>
                    {userDetails.loading ? (
                        <h1>Loading...</h1>
                    ) : userDetails.error ? (
                        <h1>{userDetails.error}</h1>
                    ) : (
                        <>
                            {renderInput("First Name", "firstName", "👤")}
                            {renderInput("Last Name", "lastName", "👤")}
                            {renderInput("Email", "email", "📧", "email")}
                            {renderInput("Phone", "phone", "+91", "phone")}
                            {renderInput(
                                "New Password",
                                "password",
                                "🔑",
                                "password"
                            )}
                            {renderInput(
                                "Confirm New Password",
                                "confirmPassword",
                                "🔑",
                                "password"
                            )}

                            <Form.Row className="d-flex justify-content-center">
                                <Form.Group as={Col} md={6}>
                                    <Button
                                        block
                                        variant="info"
                                        type="submit"
                                        className="mt-2"
                                        disabled={
                                            Object.keys(errors).length !== 0 ||
                                            loading
                                        }
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update Profile"}
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </>
                    )}
                </Form>
            </Container>
            <Container className="d-flex justify-content-center">
                <SnackBar
                    loading={loading}
                    errorMessage={error}
                    success={isUpdated}
                    successMessage="Your profile has been successfully updated ✅!"
                />
            </Container>
        </>
    );
};

export default ProfileScreen;
