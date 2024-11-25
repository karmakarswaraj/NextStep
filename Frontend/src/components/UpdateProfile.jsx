import { React, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import {
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
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

function UpdateProfile({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        profilePicture: null, // For profile picture
        resume: null, // For resume
    });

    const changeFileHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.files[0] });
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true); 
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.profilePicture) formData.append("profilePicture", input.profilePicture);
        if (input.resume) formData.append("resume", input.resume);

        try {
            const res = await axios.post(`${USER_ENDPOINT_API}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }finally {
            setLoading(false); // Reset loading state
        }
        setOpen(false);
        console.log(input);
        
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[625px]">
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
                                required
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
                                required
                            />
                        </div>
                        <div className="items-center gap-4 ">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                name="phoneNumber"
                                type="tel"
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
                                accept=".pdf"
                            />
                        </div>
                    </div>
                    <DialogFooter>

                        {
                            loading ? <Button> <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving changes...</Button> : <Button className="w-full py-3 text-lg font-bold text-white rounded-lg bg-primary hover:bg-primary-dark">
                                Save changes </Button>
                        }

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateProfile