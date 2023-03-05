import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { IoMdBeer } from 'react-icons/io';
import AOS from "aos";
import "aos/dist/aos.css";


function Home() {
    const { user } = UserAuth();
    useEffect(() => {
      document.title = 'User home 🍻';
      AOS.init();
      AOS.refresh();
  }, []);
  

  return (

<div data-aos="fade-right" data-aos-delay="100" data-aos-duration="4000">
    <main className="text-center">
        <h1 className="mb-5 px-5">Welcome<span className="line-break">{user && user.email}</span></h1>
        <h2 className="mb-3 px-5">Manage all the products and categories !</h2>
        <div className="d-flex flex-column align-items-center">
        <Link className="btn btn-danger fw-bold text-uppercase border border-warning py-2 my-4 link-to-allproducts" to="/products"><span className="h4">Products management</span></Link>
        <Link className="btn btn-success fw-bold text-uppercase border border-warning py-2 mb-4 link-to-allcategories" to="/categories"><span className="h4">Categories management</span></Link>
        </div>
        <IoMdBeer size={70} />
    </main>
</div>
  )
}
export default Home