import React from "react";

const Rating = ({ rating }) => {
    var absVal = Math.floor(rating);
    let star = [];
    var index;
    for (index = 0; index < absVal; index++) {
        star.push(<i key={index} className="fa fa-star"></i>);
    }
    if (absVal < rating) {
        star.push(<i className="fa fa-star-half-o" key={index}></i>);
        index++;
    }
    for (index; index < 5; index++) {
        star.push(<i key={index} className="fa fa-star-o"></i>);
    }

    const ratingColor =
        rating <= 2 ? "danger" : rating <= 3.5 ? "warning" : "success";
    return (
        <>
            <span className={`text-${ratingColor}`} key="rate">
                {star}
            </span>
        </>
    );
};

export default Rating;
