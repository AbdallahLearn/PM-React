import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../component/Home'
import UserHome from '../component/UserHome'
import UserProfile from '../component/UserProfile'
const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
      path:'/userHome',
      element:<UserHome />
    },
    {
      path:'/userProfile',
      element:<UserProfile/>
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
