import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Building,
    Users,
    Star,
    Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useJobData from "@/hooks/useGetSingleJob.jsx"; // Custom hook
import { APPLICATION_ENDPOINT_API } from "@/utility/constants";
import useGetSingleJob from "@/hooks/useGetSingleJob.jsx";

const JobDescription = () => {
    const { id } = useParams(); // Get job ID from route

    const { jobData, isLoading } = useJobData(id); // Use the custom hook
    const [isSaved, setIsSaved] = useState(false);
    const { authUser } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    // const isApplied = useGetSingleJob.application.some(application => application.applicant === authUser._id) || false;
    // const isApplied = true;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-500">
                <p>Loading job details...</p>
            </div>
        );
    }

    const handleApply = async () => {
        if (!authUser) {
            toast.error("You must be logged in to apply for a job.");
            return;
        }
    
        try {
            const response = await axios.post(
                `${APPLICATION_ENDPOINT_API}/apply/${id}`, // Endpoint to apply for the job
                {}, // Request body (if any)
                {
                    withCredentials: true,  // This sends cookies with the request
                }
            );
    
            if (response.data.success) {
                toast.success("Application submitted successfully!");
                // Update local UI state if needed, e.g., set a flag to disable the apply button
            } else {
                toast.error(response.data.message || "Failed to apply for the job.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "An error occurred.");
            } else {
                toast.error("Unable to apply for the job. Please try again later.");
            }
            console.error("Error while applying for the job:", error);
        }
    };
    

    const handleSaveJob = () => {
        if (!authUser) {
            toast.error("You must be logged in to save a job.");
            return;
        }
        setIsSaved(!isSaved);
        toast.success(isSaved ? "Job Removed from saved list." : "Job Added to saved list.");
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Job link has been copied to clipboard.");
    };

    // function printTokenFromCookies() {
    //     // Helper function to get a specific cookie by name
    //     function getCookie(name) {
    //       const cookies = document.cookie.split(";"); // Split cookies by `;`
    //       for (let cookie of cookies) {
    //         const [key, value] = cookie.trim().split("="); // Trim whitespace and split key-value
    //         if (key === name) {
    //           return decodeURIComponent(value); // Decode and return the cookie value
    //         }
    //       }
    //       return null; // Return null if cookie not found
    //     }
      
    //     // Replace 'token' with the actual name of your token cookie
    //     const token = getCookie("token");
    //     if (token) {
    //       console.log("Token:", token);
    //     } else {
    //       console.error("Token not found in cookies.");
    //     }
    //   }
      
      
    return (
        <div className="min-h-screen text-white bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
            <Navbar />
            <div className="container px-4 py-8 mx-auto text-white">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        <Card className="bg-[#121212] text-white">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-3xl font-bold">
                                            {jobData.title}
                                        </CardTitle>
                                        <CardDescription className="text-xl text-red-500">
                                            {jobData.company.companyName}
                                        </CardDescription>
                                    </div>
                                    <img
                                        src={jobData.company.companyLogo || "/default-logo.png"}
                                        alt={`${jobData.company.companyName} logo`}
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {jobData.location}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <Briefcase className="w-4 h-4 mr-1 " />
                                        {jobData.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {jobData.salary}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Posted on {new Date(jobData.createdAt).toDateString()}
                                    </Badge>
                                </div>
                                <Separator className="my-6" />
                                {/* Details */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Job Description</h3>
                                        <p>{jobData.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Responsibilities</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {jobData.responsibilities.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Requirements</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {jobData.requirements.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Benefits</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {jobData.benefits.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                
                                        <Button size="lg" className="bg-gray-600 pointer-events-none">
                                            Applied
                                        </Button>
                                   
                                        <Button onClick={handleApply} size="lg" className="bg-red-600 hover:bg-white hover:text-black">
                                            Apply Now
                                        </Button>
                                   
                                
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={handleSaveJob} className="bg-red-600">
                                        <Star className={`h-4 w-4 ${isSaved ? "fill-yellow-400" : ""}`} />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={handleShare} className="bg-red-600">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <Card className="bg-[#121212] text-white">
                            <CardHeader>
                                <CardTitle>Company Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 ">
                                    <div className="flex items-center">
                                        <Building className="w-4 h-4 mr-2" />
                                        <span>{jobData.company.companyName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{jobData.opennings || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{jobData.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full bg-yellow-600 ">
                                    {/*  onClick={() => { navigate(`${jobData.website}`) }} */}
                                    View Company Profile
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="mt-6 bg-[#121212] text-white">
                            <CardHeader >
                                <CardTitle>Application Deadline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">
                                    {new Date(jobData.applicationDeadline).toDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDescription;
