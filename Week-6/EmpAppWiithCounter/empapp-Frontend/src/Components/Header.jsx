import React from 'react'
import { NavLink } from 'react-router'
import { useCounter } from './context'

function Header() {
  const { counter } = useCounter();
  
  const navItems = [
    { name: "Home", path: "" },
    { name: "Create Employee", path: "create-emp" },
    { name: "List", path: "list" },
    { name: "Employees", path: "employees" },
  ]

  return (
    <div className="sticky top-4 z-50 flex justify-center mb-10">
      <div className="w-fit backdrop-blur-xl bg-blue-500 border border-blue-500/90 rounded-full px-6 py-2 shadow-lg flex items-center gap-4">
        <nav>
          <ul className="flex gap-6 text-white">
                
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 
                        ${isActive 
                          ? "bg-white/10 text-white shadow-md scale-105 backdrop-blur-lg" 
                          : "text-gray-300 hover:text-white hover:bg-white/5 hover:scale-105"
                        }`
                      }
                    >
                      {item.name}

                      {/* subtle glow underline */}
                      <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </NavLink>
                  </li>
                ))}

              </ul>
        </nav>

        {/* Global Counter Display */}
        <div className="border-l border-white/30 pl-4 ml-2">
          <span className="text-white font-bold text-lg">Counter: {counter}</span>
        </div>
      </div>
    </div>
  )
}

export default Header