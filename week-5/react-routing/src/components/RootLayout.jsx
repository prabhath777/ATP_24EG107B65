import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"
function RootLayout() {
  return (
    <div className="text-3xl ">
    <Header />
    <div className="min-h-screen mx-19">
       {/* placeholder */}
       <Outlet />
    </div>
    <Footer />
    </div>
  )
}

export default RootLayout