import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from 'axios';
import { USER_ENDPOINT_API } from '@/utility/constants';
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

function Navbar() {

  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      const response = await axios.post(`${USER_ENDPOINT_API}/logout`, { withCredentials: true });

      // If logout is successful, clear the user data and redirect
      if (response.status === 200) {
        dispatch(setAuthUser(null));
        navigate('/');
        toast.success('Logout successful');
      }

    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 text-white bg-[#121212]">
      <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
        {/* Left - Brand Logo */}
        <div className="left">
          <h1 className="text-2xl font-bold">
            Next<span className="text-red-600">Step</span>
          </h1>
        </div>

        {/* Right - Navigation Links and User Options */}
        <div className="flex items-center gap-12 right">
          {/* Navigation Links */}
          <ul className="flex items-center gap-5 font-medium">
            {
              authUser && authUser.role === "Recruiter" ? (
                <>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/"}>Home</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                  <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                </>
              )
            }
          </ul>

          {/* User Actions */}
          {authUser ? (
            <div className="flex items-center gap-10">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-4 space-y-2">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <h4 className="text-sm font-semibold leading-none text-black">
                          {authUser.fullname}
                        </h4>
                        <p className="text-sm text-black ">
                          {authUser.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile & Logout Buttons */}
                    <div className="flex gap-4">
                      <Button variant="link" className="w-1/2 border-none bg-slate-300" onClick={() => {
                        navigate("/profile");
                      }}>
                        Show Profile
                      </Button>
                      <Button variant="link" className="w-1/2 border-none bg-slate-300" >
                        <div className="flex gap-3">
                          <p onClick={handleLogout}>Log out</p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={"#000000"}
                            fill={"none"}
                          >
                            <path
                              d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {/* Notification Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#ffffff"}
                fill={"none"}
              >
                <path
                  d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login"><Button variant="link" className="border-none bg-slate-300">Login</Button></Link>
              <Link to="/signup"><Button variant="link" className="border-none bg-slate-300">Signup</Button></Link>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}


export default Navbar;
