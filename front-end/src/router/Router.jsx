import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../component/Home';
import Students from '../pages/Students';
import SignIn from '../pages/SignIn'; 
import SignUp from '../pages/SignUp'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />
  },
  {
    path: '/SignIn',
    element: <SignIn />
  },
  {
    path: '/Home',
    element: <Home />
  },
  {
    path: '/students',
    element: <Students />
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

