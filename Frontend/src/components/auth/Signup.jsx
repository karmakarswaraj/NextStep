import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_ENDPOINT_API } from '@/utility/constants';
import { toast } from "sonner"

function Signup() {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student', 
    file: '',
  });
  const navigate = useNavigate();
  const changeEventHandler = (event) => {
    const updatedInput = { ...input, [event.target.name]: event.target.value };
    setInput(updatedInput);
  };

  const changeFileHandler = (event) => {
    const file = event.target.files[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    
    if (input.file) {
      formData.append('file', input.file);
    }
  
    try {
      const res = await axios.post(`${USER_ENDPOINT_API}/register`, formData);
      
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      
      // Check if error.response exists before accessing it
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
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
            Next<span className="text-red-600">Step</span>
          </h1>
          <h1 className="text-xl font-extrabold text-center">Create Your Account</h1>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-gray-300">
              Full Name
            </Label>
            <Input
              value={input.fullname}
              id="fullname"
              name="fullname"
              onChange={changeEventHandler}
              type="text"
              placeholder="Enter your full name"
              className="w-full text-black"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input

              value={input.email}
              id="email"
              name="email"
              onChange={changeEventHandler}
              type="email"
              placeholder="example@email.com"
              className="w-full text-black"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-gray-300">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              type="text"
              placeholder="1234567890"
              className="w-full text-black"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
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
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                  />
                  <Label className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                  />
                  <Label className="cursor-pointer">Recruiter</Label>
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <Label htmlFor="file" className="text-gray-300 whitespace-nowrap">
                Profile Picture
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="text-black rounded-lg file:cursor-pointer file:bg-gray-100 file:border-none file:text-gray-700 file:px-4 file:py-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white rounded-lg bg-primary hover:bg-primary-dark"
          >
            Sign Up as {input.role}
          </Button>
          <p className="flex gap-2 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
