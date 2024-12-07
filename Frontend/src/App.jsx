import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@/components/pages/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/pages/Jobs"
import Browse from "./components/pages/Browse"
import Profile from "./components/pages/Profile"
import JobDescription from "./components/pages/JobDescription"
import AdminCompany from "./components/admin/AdminCompany"
import AdminJobs from "./components/admin/AdminJobs"
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
  }, {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/jobs/details/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/admin/companies",
    element: <AdminCompany />
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />
  }
])
function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
