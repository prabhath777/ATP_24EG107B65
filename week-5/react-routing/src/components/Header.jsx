import { NavLink } from "react-router"

function Header() {
  return (
   <nav className='p-5'>
    <ul className='flex justify-end gap-5'>
       <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "text-blue-700 bg-blue-200 p-3" : "")}>
            Home
          </NavLink>
        </li>
        
    
        <li>
            <NavLink to="tech" className={({ isActive }) => (isActive ? "text-blue-700 bg-blue-200 p-3" : "")}> Technology </NavLink>
        </li>
        
    
        <li>
            <NavLink to="login" className={({ isActive }) => (isActive ? "text-blue-700 bg-blue-200 p-3" : "")}> Login </NavLink>
        </li>
        
   
        <li>
            <NavLink to="register" className={({ isActive }) => (isActive ? "text-blue-700 bg-blue-200 p-3" : "")}> register </NavLink>
        </li>
        
    </ul>
   </nav>
  )
}

export default Header
