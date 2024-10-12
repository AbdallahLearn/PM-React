import React from 'react'
import AdminPage from './AdminPage';
import Header from './Header';
import Footer from './Footer';
function Home() {
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
