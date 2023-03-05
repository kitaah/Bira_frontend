import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill} from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function EditCategory() {
    useEffect(() => {
    document.title = 'Edit a category 📋';
    loadCategory();
    }, []);

    let navigate = useNavigate();

    const{id} = useParams();

    const [category, setCategory] = useState({
        name: "",
    });

    const { name } = category;

    const onInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`https://localhost:7245/api/Category`, category);
        navigate("/categories");
    };

    const loadCategory = async () => {
        const result = await axios.get(`https://localhost:7245/api/Category/${id}`);
        setCategory(result.data);
    };

    return (
    <main>
        <Container>
            <h1 className="text-center mb-5"><AiOutlineUnorderedList className="pe-3" size={60} />Edit a category</h1>
        <Row>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-dark shadow px-5">
            <Form onSubmit={handleSubmit} className="text-light p-3">
                <Form.Group className="mb-3" controlId="formAddName">
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control type={"text"} placeholder="Name..." name="name" defaultValue={name} onChange={onInputChange} required/>
                </Form.Group>
            <div className="d-grid gap-2">
                <Button type="submit" variant="danger" className="fw-bold mt-3">Send</Button>
            </div>
            </Form>
        </div>
        </Row>
            <div className="text-center">
                <Link className="btn btn-primary mt-5 px-5 text-center mx-auto" to="/categories">
                    <BsFillArrowLeftCircleFill className="h1 align-middle"/>
                </Link>
            </div>
        </Container>
    </main>
    )
}

export default EditCategory