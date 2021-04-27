import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/actions/userActions";

const SignInForm = (props) => {
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);

    const [email, setEmail] = React.useState(userSignIn.wrongEmail || "");
    const [password, setPassword] = React.useState(userSignIn.wrongPass || "");

    const signInSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(signIn({ email, password }));
    };

    React.useEffect(() => {
        if (userSignIn.isSignedIn) {
            props.closeModal();
        }
    });

    return (
        <>
            <Form className="p-3" onSubmit={signInSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        autoComplete="username"
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        autoComplete="current-password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                </Form.Group>
                {userSignIn.error && (
                    <Form.Label className="text-danger d-block">
                        {userSignIn.error}
                    </Form.Label>
                )}
                <Button variant="info" type="submit">
                    Sign In
                </Button>
            </Form>
        </>
    );
};

export default SignInForm;
