import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { placeAnOrder } from "../redux/actions/orderActions";

const TransactionScreen = ({ history }) => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);

    React.useEffect(() => {
        const loader = () => {
            setTimeout(() => {
                history.replace("/ordereditems");
            }, 3000);
        };
        if (order.placedOrder) {
            loader();
        }
    }, [dispatch, history, order.placedOrder]);

    React.useEffect(() => {
        dispatch(placeAnOrder());
    }, [dispatch]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-4">
                    Transaction <span>Status</span>
                </h1>

                {order.loading ? (
                    <>
                        <h6>
                            Please wait your transaction is being processed...
                        </h6>
                        <h6>Please do not refresh or leave the page!</h6>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </>
                ) : order.error ? (
                    <h3>{order.error}</h3>
                ) : order.placedOrder ? (
                    <h3 className="text-success">
                        Your order has been placed check your order to get all
                        the details your orders.
                    </h3>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};

export default TransactionScreen;
