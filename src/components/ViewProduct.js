import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdBeer } from 'react-icons/io';
import { FaCubes, FaList } from 'react-icons/fa';
import { ImPriceTag } from 'react-icons/im'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function ViewMovie() {
    useEffect(() => {
    document.title = 'Product 🍻';
    loadProduct();
    }, []);

    const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    });

    const { id } = useParams();

    const loadProduct = async () => {
    const result = await axios.get(`https://localhost:7245/api/Product/${id}`);
    setProduct(result.data);
    };

    return (
    <main>
        <Container>
            <h1 className="text-center mb-5"><IoMdBeer className="pe-3" size={60} />Product information</h1>
            <Row>
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow bg-dark">
                    <Card.Body>
                        <Card.Text>
                            <Card.Title className="text-center m-4">{product.name}</Card.Title>
                            <ul className="list-group list-group-flush rounded">
                                <li className="list-group-item">
                                    <b><IoMdBeer className="pe-3" size={40} />Name: </b>
                                    {product.name}
                                </li>
                                <li className="list-group-item">
                                    <b><FaList className="pe-3" size={40} />Category: </b>
                                    {product.category.name}
                                </li>
                                <li className="list-group-item">
                                    <b><FaCubes className="pe-3" size={40} />Quantity: </b>
                                    {product.quantity}
                                </li>
                                <li className="list-group-item">
                                    <b><ImPriceTag className="pe-3" size={40} />Price: </b>
                                    ${product.price}
                                </li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                    <div className="text-center">
                        <Link className="btn btn-primary mt-5" to={"/products"}>Go back</Link>
                    </div>
                </div>
            </Row>
        </Container>
    </main>
    )
}

export default ViewMovie