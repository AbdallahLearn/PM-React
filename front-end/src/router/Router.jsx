// import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../component/Home';
import Students from '../pages/Students';
import SignIn from '../pages/SignIn'; 
import SignUp from '../pages/SignUp'; 
import UserHome from '../component/UserHome'
import UserProfile from '../component/UserProfile'
import Error from '../component/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
    errorElement: <Error />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/students',
    element: <Students />
  },
  {
    path:'/user-home',
    element:<UserHome />
  },
  {
    path:'/user-profile',
    element:<UserProfile/>
  },
]);


function Router() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default Router;

