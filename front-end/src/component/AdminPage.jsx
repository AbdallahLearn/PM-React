import React from 'react'
import CardIdea from './CardIdea'
function AdminPage() {
  return (
    <div>
        <div className="container grid grid-cols-3 w-[90%] m-auto max-md:grid-cols-2 max-sm:grid-cols-1 ">
        <CardIdea/>
        </div>
    
    </div>
  )
}

export default AdminPage
