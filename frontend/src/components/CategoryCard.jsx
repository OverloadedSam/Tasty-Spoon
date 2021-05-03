import React from 'react'
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';

const CategoryCard = ({category, location}) => {
    return (
        <Col sm={6} md={4} className="d-flex justify-content-center my-3">
            <Card
                as={Link}
                to={`${location.pathname}/${category.name}`}
                className="text-decoration-none"
                style={{ width: "16rem" }}
            >
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <Image
                        src={`/assets/svg/categories/${category.icon}`}
                        style={{ width: "10rem" }}
                        alt={category.name}
                    />
                </div>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center align-items-center">
                        <h3 className="text-decoration-none text-dark text-uppercase">
                            {category.name}
                        </h3>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CategoryCard
