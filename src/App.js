import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.scss';
import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from "./components/Home";
import ViewAllProducts from "./components/ViewAllProducts";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ViewProduct from "./components/ViewProduct";
import ViewAllCategories from "./components/ViewAllCategories";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/products'
            element={
              <ProtectedRoute>
                <ViewAllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path='/addproduct'
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editproduct/:id'
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/product/:id'
            element={
              <ProtectedRoute>
                <ViewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/categories'
            element={
              <ProtectedRoute>
                <ViewAllCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/addcategory'
            element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editcategory/:id'
            element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>
      </AuthContextProvider>
    </div>
  );
}
;
export default App;