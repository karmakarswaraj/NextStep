import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/signup",
    element: <Signup />
  }// , {
  //   path: "/login",
  //   element: <Login />
  // }, {
  //   path: "/login",
  //   element: <Login />
  // }, {
  //   path: "/login",
  //   element: <Login />
  // },
])
function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
