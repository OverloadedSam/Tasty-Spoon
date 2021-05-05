import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../redux/actions/orderActions";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const OrderedProductsScreen = ({ history }) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, orders } = orderDetails;
    const userSignIn = useSelector((state) => state.userSignIn);

    React.useEffect(() => {
        if (userSignIn.isSignedIn) {
            dispatch(getOrderDetails());
        } else history.push("/signin");
    }, [dispatch, userSignIn.isSignedIn]);

    return (
        <>
            <Container>
                <h1 className="d-inline-block home-main-heading py-2 my-4">
                    All Your <span>Orders</span>
                </h1>

                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : error ? (
                    <h6>{error}</h6>
                ) : orders.length !== 0 ? (
                    <>
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center">ORDER ID</th>
                                    <th className="text-center">DATE</th>
                                    <th className="text-center">
                                        TOTAL AMOUNT
                                    </th>
                                    <th className="text-center">PAID AT</th>
                                    <th className="text-center">
                                        DELIVERED AT
                                    </th>
                                    <th className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="text-center">
                                            {order._id}
                                        </td>
                                        <td className="text-center">
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td className="text-center">
                                            <i className="fa fa-inr"></i>{" "}
                                            {order.totalPayableAmount.toFixed(
                                                2
                                            )}
                                        </td>
                                        <td className="text-center text-success">
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 16)
                                            ) : (
                                                <i className="fa fa-times text-danger"></i>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    16
                                                )
                                            ) : (
                                                <i className="fa fa-times text-danger"></i>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <Link to={`/order/${order._id}`}>
                                                <Button
                                                    className="btn-sm"
                                                    variant="info"
                                                >
                                                    <i className="fa fa-info-circle"></i>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};

export default OrderedProductsScreen;
