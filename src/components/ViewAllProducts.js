import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaSearch } from 'react-icons/fa';
import { BsFillPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { IoMdBeer } from 'react-icons/io';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function ViewAllProducts() {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        document.title = 'Products list 🍻';
        loadProducts();
    }, []);

    const[search, setSearch] = useState('');

    const { id } = useParams();

    const loadProducts = async() => {
    const result = await axios.get("https://localhost:7245/api/Product");
    setProducts(result.data);
    }

    const deleteProduct = async (id) => {
    await axios.delete(`https://localhost:7245/api/Product/${id}`);
    loadProducts();
    };
    
    return (
    <main>
        <Container className="text-center">
            <h1 className="mb-5"><IoMdBeer className="pe-3" size={65} />Products List</h1>
            <Link className="btn btn-primary mb-3" to="/addproduct"><BsFillPlusCircleFill className="me-2" />Add a product</Link>
            <Form className="d-flex align-items-center justify-content-center align-middle my-3">
                <Stack direction="horizontal" gap={3}>
                <FaSearch size={30} />
                <Form.Control onChange={(e) =>setSearch(e.target.value)}  type="search" className="search-bar" placeholder="Search a product name..."/>
                </Stack>
            </Form>
            <Table className="table table-hover table-responsive shadow table-light">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
            {
                products.filter((product) => {
                    return search.toLowerCase()  === ''
                    ? product : product.name.toLowerCase().includes(search);
                }).map((product, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                        <td>
                            <Link className="btn btn-success" to={`/product/${product.id}`} title="See"><FaEye size={20} /></Link>
                            <Link className="btn btn-primary my-2 mx-4" to={`/editproduct/${product.id}`} title="Edit">< FaEdit size={20} /></Link>
                            <Button variant="danger" onClick={() => deleteProduct(product.id)} title="Delete"><BsTrashFill size={20} /></Button>
                        </td>
                    </tr>
                ))
            }
                </tbody>
            </Table>
        </Container>
    </main>
    )
}

export default ViewAllProducts