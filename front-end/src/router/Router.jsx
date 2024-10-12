import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../component/Home'
import Students from '../pages/Students'
import Error from '../component/Error'
const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>,
        errorElement:<Error/>
    },
    {
      path:'/students',
      element:<Students/>
  },
  
  
])
function Router() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Router
