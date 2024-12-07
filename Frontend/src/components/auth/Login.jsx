import { React, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { USER_ENDPOINT_API } from "@/utility/constants";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setAuthUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth); //1

  // Consolidate `role` in input state itself
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Student", // default value for role
  });

  // Handle input change
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // Handle submit
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(setLoading(true));

      // Validate input (email and password) before making the request
      if (!input.email || !input.password) {
        toast.error("Email and password are required.");
        return;
      }

      const res = await axios.post(`${USER_ENDPOINT_API}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // for handling cookies (if needed for the session)
      });

      if (res.data.success) {
        // localStorage.setItem("authToken", res.data.token);
        dispatch(setAuthUser(res.data.user)); // Set the user data in Redux store

        navigate(res.data.user.role === "Recruiter" ? "/admin/companies" : "/");
        toast.success(res.data.message || "Login successful");
      }
    } catch (error) {
      // Handle error properly: Network errors, Axios errors, etc.
      if (error.response) {
        toast.error(error.response.data.message || "Login failed"); // Use error.response here
      } else {
        toast.error("Network error: Unable to connect.");
      }
    } finally {
      dispatch(setLoading(false)); // Stop the loading indicator
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen text-white bg-gray-900">
      <div className="flex items-center justify-center w-full px-4 py-8 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full p-6 space-y-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg md:w-1/2"
        >
          <h1 className="text-3xl font-extrabold text-center">
            Log in to Next<span className="text-red-600">Step</span>
          </h1>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              type="email"
              placeholder="example@email.com"
              className="w-full text-black"
            />
          </div>
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              type="password"
              placeholder="***********"
              className="w-full text-black"
            />
          </div>
          {/* Role Selection */}
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <Label className="text-gray-300">I am a:</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={changeEventHandler}
                  />
                  <Label className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={changeEventHandler}
                  />
                  <Label className="cursor-pointer">Recruiter</Label>
                </div>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          {loading ? (
            <Button>
              {" "}
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...
            </Button>
          ) : (
            <Button className="w-full py-3 text-lg font-bold text-white rounded-lg bg-primary hover:bg-primary-dark">
              Log in as {input.role === "Student" ? "Student" : "Recruiter"}
            </Button>
          )}
          {/* Social login */}
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-white text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="ghost" className="border-2">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button variant="ghost" className="border-2">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>
          {/* Footer links */}
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between">
              <p className="flex gap-2 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-600 hover:underline">
                  Sign Up
                </Link>
              </p>
              <p className="flex gap-2 text-center">
                <Link to="/login" className="text-red-600 hover:underline">
                  {" "}
                  Forgot your password?
                </Link>
              </p>
            </div>
            <div className="flex justify-center ">
              <a className="hover:underline" href="#">
                Terms of Service
              </a>
              {" | "}
              <a className="hover:underline" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
