import Header from './Header'
import { Outlet } from 'react-router'
function RootLayout() {
  return (
    <div>
      <Header />
       <div className="min-h-screen mx-19 ">
       {/* placeholder */}
       <Outlet />
    </div>
    </div>
    
  )
}

export default RootLayout
