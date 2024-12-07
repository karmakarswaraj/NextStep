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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_ENDPOINT_API } from "@/utility/constants";
import { setSingleJobById } from "@/redux/jobSlice";
import { JOB_ENDPOINT_API } from "@/utility/constants";

const JobDescription = () => {

    // const { jobData } = useGetSingleJob(id); // Use the custom hook
    const [isSaved, setIsSaved] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    const { singleJobById } = useSelector((state) => state.job);
    const { authUser } = useSelector((state) => state.auth);
    const isIntiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const { id } = useParams(); // Get job ID from route
    const dispatch = useDispatch();


    const handleApply = async () => {
        if (!authUser) {
            toast.error("You must be logged in to apply for a job.");
            return;
        }

        try {
            const res = await axios.post(
                `${APPLICATION_ENDPOINT_API}/apply/${id}`, // Endpoint to apply for the job
                {}, // Request body (if any)
                {
                    withCredentials: true,  // This sends cookies with the request
                }
            );

            if (res.data.success) {
                setIsApplied(true);

                // Check the current structure of `applications` and update accordingly
                const updatedApplications = [
                    ...singleJobById.applications,
                    { applicant: { _id: authUser?._id } }, // Ensure consistent structure
                ];

                // Update the applications array in the job data
                const updatedSingleJob = {
                    ...singleJobById,
                    applications: updatedApplications,
                };

                dispatch(setSingleJobById(updatedSingleJob));

                toast.success("Application submitted successfully!");
                // Update local UI state if needed, e.g., set a flag to disable the apply button
            } else {
                toast.error(res.data.message || "Failed to apply for the job.");
            }
        } catch (error) {
            if (error.res && error.res.data) {
                toast.error(error.res.data.message || "An error occurred.");
            } else {
                toast.error("Unable to apply for the job. Please try again later.");
            }
            console.error("Error while applying for the job:", error);
        }

    };

    //HOOK
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get(`${JOB_ENDPOINT_API}/find/${id}`, { withCredentials: true });
                if (response.data && response.data.job) {
                    console.log(response.data.job);

                    dispatch(setSingleJobById(null));

                    dispatch(setSingleJobById(response.data.job));
                    setIsApplied(response.data.job.applications.some(application => application.applicant === authUser?._id));
                    // Check if the user has already applied for the job
                } else {
                    toast.error("Job details not found.");
                }
            } catch (error) {
                toast.error("Failed to fetch job details.");
                console.error("Error fetching job details:", error);
            }
        };

        if (id) {
            fetchJobData();
        }
    }, [id, dispatch]);

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
                                            {singleJobById.title}
                                        </CardTitle>
                                        <CardDescription className="text-xl text-red-500">
                                            {singleJobById.company.companyName}
                                        </CardDescription>
                                    </div>
                                    <img
                                        // src={jobData.company.companyLogo || "/default-logo.png"}
                                        alt={`${singleJobById.company.companyName} logo`}
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
                                        {singleJobById.location}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <Briefcase className="w-4 h-4 mr-1 " />
                                        {singleJobById.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {singleJobById.salary}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center bg-yellow-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Posted on {new Date(singleJobById.createdAt).toDateString()}
                                    </Badge>
                                </div>
                                <Separator className="my-6" />
                                {/* Details */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Job Description</h3>
                                        <p>{singleJobById.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Responsibilities</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {singleJobById.responsibilities.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Requirements</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {singleJobById.requirements.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Benefits</h3>
                                        <ul className="pl-5 space-y-1 list-disc">
                                            {singleJobById.benefits.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={isApplied ? null : handleApply}
                                    disabled={isApplied}
                                    variant="outline" size="lg" className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-white hover:text-black'}`}>
                                    {isApplied ? "Applied" : "Apply Now"}
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
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Building className="w-5 h-5 mr-2" />
                                        <span>{singleJobById.company.companyName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 mr-2" />
                                        <span>{singleJobById.openings}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{singleJobById.location}</span>
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
                                <CardTitle>More information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">
                                    Application Deadline : {new Date(singleJobById.applicationDeadline).toDateString()}
                                </p>
                                <p className="text-lg font-semibold">
                                    Total Applicants : {singleJobById.applications.length}
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
