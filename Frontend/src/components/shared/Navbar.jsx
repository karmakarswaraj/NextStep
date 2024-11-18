import React from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/button";
function Navbar() {
  return (
    <div className="p-4 text-white bg-[#121212]">
      <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
        <div className="left">
          <h1 className="text-2xl font-bold">
            Next<span className="text-red-600">Step</span>
          </h1>
        </div>

        <div className="flex items-center gap-12 right">
          <ul className="flex items-center gap-5 font-medium">
            <li className="px-4">Home</li> {/* <Link to="/">Home</Link> */}
            <li className="px-4">Jobs</li>
            <li className="px-4">Browse</li>
          </ul>

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
                <div className="flex items-center gap-4">
                <Avatar className="cursor-pointer ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="flex-row space-y-1">
                  <h4 className="text-sm font-semibold leading-none">
                    Swaraj Karmakar
                  </h4>
                  <p className="text-sm text-muted-foreground">@karmakarswaraj</p>
                </div>

                </div>
                <div className="flex gap-4">
                  <Button variant="link" className="border-none">
                    Show Profile
                  </Button>
                  <Button variant="link" className="border-none">
                    Log out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
