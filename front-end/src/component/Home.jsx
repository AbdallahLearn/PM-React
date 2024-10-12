// import React from 'react'
import AdminPage from './AdminPage';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    // Check If User Is Logged In //
    if (localStorage.getItem("userId") === null) {
      navigate("/signin"); // LogIn
    };
    //== Check If User Is Logged In ==//
    
  })
  return (
    <div className='min-h-screen flex flex-col'>
    <Header/>
    <div className='flex-grow flex flex-col mt-20 items-center'>
    <AdminPage/>
    </div>
    <Footer/>
    </div>
  )
}

export default Home;
