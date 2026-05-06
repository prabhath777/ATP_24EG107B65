import { createBrowserRouter, RouterProvider } from "react-router"
import { CounterProvider } from "./Components/context"
import RootLayout from "./Components/RootLayout"
import Home from "./Components/Home"
import Create from "./Components/Create"
import List from "./Components/List"
import EditEmp from "./Components/EditEmp"
import Employees from "./Components/Employees"

function App() {
  const routerobj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "create-emp",
          element: <Create />
        },
        {
          path: "list",
          element: <List />
        },
        {
          path: "employees",
          element: <Employees />
        },
        {
          path: "edit-emp",
          element: <EditEmp />
        }

      ]
    }

  ])

  return (
    <CounterProvider>
      <RouterProvider router={routerobj} />
    </CounterProvider>
  )
}

export default App
