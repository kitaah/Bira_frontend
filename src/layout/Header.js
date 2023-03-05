import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { IoMdHelpCircle } from "react-icons/io";
import { GiHelp } from "react-icons/gi";
import { IoMdBeer } from 'react-icons/io';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const { logout } = UserAuth();
    
    const handleLogout = async () => {
    await logout();
    };
    return (
	<div>
		<header>
            <Navbar className="text-uppercase navbar navbar-dark bg-primary fixed-top px-5" bg="dark" expand="md">
            <Container>
                <Navbar.Brand><Link to="/"><img src={require('../medias/logo.png')} width="125" alt="PeopleCheck logo" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav ms-auto text-end mt-3 mt-md-0 mt-lg-0 mt-xl-0 align-middle">
                        <Nav.Link><Link className="nav-link" to="/home"><BsFillHouseDoorFill size={30} /></Link></Nav.Link>
                        <Nav.Link><Link className="nav-link px-md-2 px-lg-2 px-xl-3" to="#"><IoMdHelpCircle size={30} onClick={handleShow} /></Link></Nav.Link>
                        <Nav.Link><Link className="nav-link px-md-2 px-lg-2 px-xl-3" to="/products"><IoMdBeer size={30} /></Link></Nav.Link>
                        <Nav.Link><Link className="nav-link px-md-2 px-lg-2 px-xl-3" to="/categories"><AiOutlineUnorderedList size={30} /></Link></Nav.Link>
                        <Nav.Link><Link className="nav-link" onClick={handleLogout} to="/home"><FiLogOut size={30} /></Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
		<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title><GiHelp className="h3 pe-2" />Do you need help ?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center p-4">Do you encounter any problems by using this application ? Contact our helpdesk at the following email address: <span className="line-break fw-bold">support@bira.com</span></Modal.Body>
		</Modal>
	</div>
    )
}

export default Header