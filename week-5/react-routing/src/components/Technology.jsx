import React from 'react'
import { Outlet, Link } from 'react-router'

function Technology() {
  return (
    <div className='bg-gray-200 p-4'>
      <nav className='flex justify-center gap-3'>
        <Link to="/tech/java" className='mr-4 text-blue-600 underline'>Java</Link>
        <Link to="/tech/react" className={({ isActive }) => (isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>React</Link>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Technology
