import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdBeer } from 'react-icons/io';
import { BsFillArrowLeftCircleFill} from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function EditMovie() {
    useEffect(() => {
    document.title = 'Edit a product 🍻';
    loadProduct();
    loadCategories();
    }, []);

    let navigate = useNavigate();

    const{id} = useParams();

    const [categories,setCategories] = useState([]);

    const [product, setProduct] = useState({
      name: "",
      categoryid: "",
      quantity: "",
      price: "",
    });

    const { name, categoryid, quantity, price } = product;

    const onInputChange = (e) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`https://localhost:7245/api/Product/${id}`, product);
      navigate("/products");
    };

    const loadProduct = async () => {
        const result = await axios.get(`https://localhost:7245/api/Product/${id}`);
        setProduct(result.data);
    };

    const loadCategories = async () => {
      const result = await axios.get("https://localhost:7245/api/Category");
      setCategories(result.data);
    };

    return (
    <main>
        <Container>
            <h1 className="text-center mb-5"><IoMdBeer className="pe-3" size={60} />Edit a product</h1>
        <Row>
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-dark shadow px-5">
            <Form onSubmit={handleSubmit} className="text-light p-3">
              <Form.Group className="mb-3" controlId="formAddName">
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control type={"text"} placeholder="Name..." name="name" defaultValue={name} onChange={onInputChange} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddCategory">
                <Form.Label htmlFor="categoryid">Category:</Form.Label>
                  <Form.Select name="categoryid" defaultValue={categoryid} onChange={onInputChange} >
                      <option value="">-- Select a category --</option>
                      {categories.map((category) => (
                      <option value={category.id}>{category.name}</option>))}
                  </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddQuantity">
                <Form.Label htmlFor="quantity">Quantity</Form.Label>
                <Form.Control type={"number"} min="1" placeholder="Quantity..." name="quantity" defaultValue={quantity} onChange={onInputChange} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddPrice">
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control type={"number"} min="1" placeholder="Price..." name="price" step="any" defaultValue={price} onChange={onInputChange} required/>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="danger" className="fw-bold mt-3">Send</Button>
              </div>
            </Form>
          </div>
        </Row>
            <div className="text-center">
                <Link className="btn btn-primary mt-5 px-5 text-center mx-auto" to="/products">
                    <BsFillArrowLeftCircleFill className="h1 align-middle"/>
                </Link>
            </div>
        </Container>
    </main>
    )
}

export default EditMovie