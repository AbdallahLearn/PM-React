import React from 'react'
import CardIdea from './CardIdea'
function AdminPage() {
  return (
    <div>
        <div className="container gap-5 grid grid-cols-3 m-auto max-md:grid-cols-2 max-sm:grid-cols-1 ">
        <CardIdea/>
        </div>
    
    </div>
  )
}

export default AdminPage
