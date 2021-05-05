import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderActions";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const OrderedProductsScreen = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, orders } = orderDetails;
    const userSignIn = useSelector((state) => state.userSignIn);

    React.useEffect(() => {
        if (userSignIn.isSignedIn) {
            dispatch(getOrderDetails());
        }
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
                        {orders.map((order, index) => {
                            return (
                                <>
                                    <h4>Order {index + 1}</h4>
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        key={index}
                                        className="mb-5"
                                    >
                                        <tbody>
                                            <tr key="first">
                                                <th>Product Name</th>
                                                <th>Price (single)</th>
                                                <th>Quantity</th>
                                                <th>Subtotal Amount</th>
                                            </tr>

                                            {order.orderedItems.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={item.prodId}>
                                                            <td className="text-capitalize">
                                                                {item.prodName}
                                                            </td>
                                                            <td>
                                                                {" "}
                                                                <i className="fa fa-inr"></i>{" "}
                                                                {item.prodPrice}{" "}
                                                                /-
                                                            </td>
                                                            <td>
                                                                x {item.qty}
                                                            </td>
                                                            <td>
                                                                <i className="fa fa-inr"></i>{" "}
                                                                {item.prodPrice *
                                                                    item.qty}{" "}
                                                                /-
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <tr key="secondlast">
                                                <td colSpan="2">
                                                    Date Ordered
                                                </td>
                                                <td colSpan="2">
                                                    {order.dateOrdered}
                                                </td>
                                            </tr>
                                            <tr key="last">
                                                <th colSpan="2">
                                                    Total payable amount for
                                                    this order (Taxes included){" "}
                                                </th>
                                                <th colSpan="2">
                                                    <i className="fa fa-inr"></i>{" "}
                                                    {order.totalPayableAmount}{" "}
                                                    /-
                                                </th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </>
                            );
                        })}
                    </>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};

export default OrderedProductsScreen;
