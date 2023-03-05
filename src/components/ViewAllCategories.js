import React, { useEffect, useState } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { BsFillPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function ViewAllCategories() {
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        document.title = 'Categories list 📋';
        loadCategories();
    }, []);

    const[search, setSearch] = useState('');

    const { id } = useParams();

    const loadCategories = async() => {
    const result = await axios.get("https://localhost:7245/api/Category");
    setCategories(result.data);
    }

    const deleteCategory = async (id) => {
    await axios.delete(`https://localhost:7245/api/Category/${id}`);
    loadCategories();
    };
    
    return (
    <main>
        <Container className="text-center">
            <h1 className="mb-5"><AiOutlineUnorderedList className="pe-3" size={65} />Categories List</h1>
            <Link className="btn btn-primary mb-3" to="/addcategory"><BsFillPlusCircleFill className="me-2" />Add a category</Link>
            <Form className="d-flex align-items-center justify-content-center align-middle my-3">
                <Stack direction="horizontal" gap={3}>
                <FaSearch size={30} />
                <Form.Control onChange={(e) =>setSearch(e.target.value)}  type="search" className="search-bar" placeholder="Search a category name..."/>
                </Stack>
            </Form>
            <Table className="table table-hover table-responsive shadow table-light">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
            {
                categories.filter((category) => {
                    return search.toLowerCase()  === ''
                    ? category : category.name.toLowerCase().includes(search);
                }).map((category, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{category.name}</td>
                        <td>
                            <Link className="btn btn-primary my-2 mx-4" to={`/editcategory/${category.id}`} title="Edit">< FaEdit size={20} /></Link>
                            <Button variant="danger" onClick={() => deleteCategory(category.id)} title="Delete"><BsTrashFill size={20} /></Button>
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

export default ViewAllCategories