import React from 'react'
import Counter from './Counter'


function Home() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to EMS</h1>
      <p className="text-lg text-gray-600">Welcome to the Employee Management System</p>
      
      <div className="mt-8">
       
          <Counter />
      </div>
    </div>
  )
}

export default Home
