
import { createBrowserRouter,RouterProvider,Navigate } from "react-router"
import RootLayout from "./components/RootLayout"
import Home from "./components/Home"
import Login from "./components/Login"
import Technology from "./components/Technology"
import Register from "./components/Register"
import ReactComp from "./components/React"
import Java from "./components/Java"

function App() {
  const routerobj = createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
            path:"register",
            element:<Register/>
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"home",
          element:<Home />
        },
        {
          path:"tech",
          element:<Technology/>,
          children:[{
            index: true,
            element:<Navigate to="java" replace/>
          },
          {
            path:"java",
            element:<Java/>
          },
          {
            path:"react",
            element:<ReactComp/>
          }]
        }
      ]
      
    }

  ])
  return (
   
    <RouterProvider router={routerobj} />
  )
}

export default App

