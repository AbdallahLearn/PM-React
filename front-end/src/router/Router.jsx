import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../component/Home'
import Students from '../pages/Students'
const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
      path:'/students',
      element:<Students/>
  }
])
function Router() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Router
