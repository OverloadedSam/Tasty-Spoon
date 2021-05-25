import React from "react";
import BootstrapPagination from "react-bootstrap/Pagination";

const Pagination = ({ pageSize, pageNumber, count, onPageChange }) => {
    if (!count) return null;

    const pages = Math.ceil(count / pageSize);

    return (
        <div>
            <BootstrapPagination>
                {[...Array(pages).keys()].map((p, index) => (
                    <BootstrapPagination.Item
                        key={index + 1}
                        active={index + 1 === pageNumber}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </BootstrapPagination.Item>
                ))}
            </BootstrapPagination>
            <br />
        </div>
    );
};

export default Pagination;
