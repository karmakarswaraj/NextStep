import { React, useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { USER_ENDPOINT_API } from "../utility/constants";
function UpdateProfile({ open, setOpen }) {
    const { authUser, loading } = useSelector(store => store.auth);

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: authUser?.fullname,
        email: authUser?.email,
        phoneNumber: authUser?.phoneNumber,
        bio: authUser?.profile?.bio,
        skills: authUser?.profile?.skills?.map(skill => skill),
        file: authUser?.profile?.resume,
    });
    const changeFileHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files?.[0] });
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
    
        if (input.profilePicture) formData.append("profilePicture", input.profilePicture);
        if (input.resume) formData.append("resume", input.resume);
    
        try {
            dispatch(setLoading(true));
    
            const res = await axios.post(`${USER_ENDPOINT_API}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // Make sure cookies are sent with the request
            });
            console.log(res.data.success);
            
            if (res.data.success) {
                // Update the authUser with the updated data
                dispatch(setAuthUser(res.data.user));
    
                // If the token is updated or required, handle it here (e.g., store in localStorage or Redux)
                if (res.data.token) {
                    // Save token if available (this could also be done in the backend if necessary)
                    localStorage.setItem("token", res.data.token); 
                }
    
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            dispatch(setLoading(false)); // Reset loading state
        }
    
        setOpen(false); // Close modal or dialog box after update
    };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[625px]" >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="gap-4 py-4 ">
                        <div className="items-center gap-4 ">
                            <Label htmlFor="fullname" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                name="fullname"
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                name="email"
                                type="email"
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                name="phoneNumber"
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                name="bio"
                                maxLength={160}
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="skills" className="text-right">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                name="skills"
                                placeholder="E.g., JavaScript, React, Node.js"
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="profilePicture" className="text-right">
                                Profile Picture
                            </Label>
                            <Input
                                id="profilePicture"
                                type="file"
                                onChange={changeFileHandler}
                                name="profilePicture"
                                accept="image/*"
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="resume" className="text-right">
                                Resume
                            </Label>
                            <Input
                                id="resume"
                                type="file"
                                onChange={changeFileHandler}
                                name="resume"
                                accept="application/pdf"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>

                        {
                            loading ?
                                <Button > <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving changes...</Button> :
                                <Button className="w-full py-3 text-lg font-bold text-white rounded-lg bg-primary hover:bg-primary-dark" type="submit">
                                    Save changes </Button>
                        }

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateProfile