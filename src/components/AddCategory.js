import axios from "axios";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddCategory() {
    useEffect(() => {
        document.title = 'Add a category 📋';
    }, []);

    let navigate = useNavigate();

    const [category, setCategory] = useState({
        name: "",
    });

    const { name } = category;

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await axios.post("https://localhost:7245/api/Category", category);
    navigate("/categories");
  };

  return (
    <main>
        <Container>
        <h1 className="text-center mb-5"><AiOutlineUnorderedList className="pe-3" size={60} />Add a category</h1>
        <Row>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-dark shadow px-5">
            <Form onSubmit={handleSubmit} className="text-light p-3">
                <Form.Group className="mb-3" controlId="formAddName">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type={"text"} placeholder="Name..." name="name" defaultValue={name} onChange={onInputChange} required/>
                </Form.Group>
            <div className="d-grid gap-2">
                <Button type="submit" variant="danger" className="fw-bold mt-3">Send</Button>
            </div>
            </Form>
            </div>
        </Row>
        <div className="text-center">
        <Link className="btn btn-primary mt-5 px-5" to="/categories">
            <BsFillArrowLeftCircleFill className="h1 align-middle"/>
        </Link>
        </div>
        </Container>
    </main>
  );
}

export default AddCategory