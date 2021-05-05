import React, { useEffect, useRef } from "react";
import "../css/snackbar.css";

const SnackBar = ({ loading, errorMessage, success, successMessage }) => {
    const refContainer = useRef(null);

    useEffect(() => {
        let timeout;

        if (loading) {
            refContainer.current.className = "show";
        }

        if (errorMessage) {

            timeout = setTimeout(() => {
                refContainer.current.className = "d-none";
            }, 4000);
        } else if (success) {

            timeout = setTimeout(() => {
                refContainer.current.className = "d-none";
            }, 4000);
        }

        return () => clearTimeout(timeout);
    }, [loading, errorMessage, success]);

    return (
        <div ref={refContainer} id="snackbar">
            {loading
                ? "Loading..."
                : errorMessage
                ? errorMessage
                : success
                ? successMessage
                : "Something went wrong!"}
        </div>
    );
};

export default SnackBar;
