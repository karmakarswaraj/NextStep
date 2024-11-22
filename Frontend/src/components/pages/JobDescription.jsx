import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Briefcase, MapPin, DollarSign, Clock, Building, Users, Star, Share2 } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

// Example static data
const jobData = {
    id: "job123",
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote Option)",
    salary: "$120,000 - $180,000",
    jobType: "Full-time",
    postedDate: "2 weeks ago",
    applicationDeadline: "2023-12-31",
    companyLogo: "/placeholder.svg",
    companySize: "1000-5000 employees",
    description: "TechCorp Inc. is seeking a talented and motivated Senior Software Engineer to join our innovative team. The ideal candidate will have a strong background in full-stack development and a passion for creating scalable, efficient, and maintainable code.",
    responsibilities: [
        "Design and implement new features for our core product",
        "Collaborate with cross-functional teams to define and implement innovative solutions",
        "Write clean, efficient, and well-documented code",
        "Participate in code reviews and mentor junior developers",
        "Troubleshoot, debug, and upgrade existing systems",
    ],
    requirements: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of experience in software development",
        "Strong proficiency in JavaScript, TypeScript, and React",
        "Experience with Node.js and Express.js",
        "Familiarity with cloud platforms (AWS, Azure, or GCP)",
        "Excellent problem-solving and communication skills",
    ],
    benefits: [
        "Competitive salary and equity package",
        "Health, dental, and vision insurance",
        "401(k) plan with company match",
        "Flexible work hours and remote work options",
        "Professional development budget",
        "Generous paid time off",
    ],
};

const JobDetailsPage = () => {
    const { toast } = useToast()
    const navigate = useNavigate(); // For navigation
    const [isSaved, setIsSaved] = useState(false);

    const handleApply = () => {
        toast({
            title: "Application Submitted",
            description: "Your application has been successfully submitted.",
        });
    };

    const handleSaveJob = () => {
        setIsSaved(!isSaved);
        toast({
            title: isSaved ? "Job Removed" : "Job Saved",
            description: isSaved
                ? "This job has been removed from your saved list."
                : "This job has been added to your saved list.",
        });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link Copied",
            description: "Job link has been copied to clipboard.",
        });
    };

    return (
        <div className="min-h-screen bg-[#67794d]">
            <Navbar />
            <div className="container px-4 py-8 mx-auto ">
                <div className="flex flex-col gap-8 lg:flex-row ">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3 ">
                        <Card className="bg-[#121212] text-white">
                            <CardHeader>
                                <div className="flex items-start justify-between ">
                                    <div>
                                        <CardTitle className="text-3xl font-bold">{jobData.title}</CardTitle>
                                        <CardDescription className="text-xl">{jobData.company}</CardDescription>
                                    </div>
                                    <img
                                        src={jobData.companyLogo}
                                        alt={`${jobData.company} logo`}
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <Badge variant="secondary" className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {jobData.location}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center">
                                        <Briefcase className="w-4 h-4 mr-1" />
                                        {jobData.jobType}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {jobData.salary}
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Posted {jobData.postedDate}
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
                                <Button onClick={handleApply} size="lg">Apply Now</Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={handleSaveJob}>
                                        <Star className={`h-4 w-4 ${isSaved ? 'fill-yellow-400' : ''}`} />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={handleShare}>
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    {/* (Repeat similar sidebar logic for React) */}
                    <div className="w-full lg:w-1/3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Company Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Building className="w-4 h-4 mr-2" />
                                        <span>{jobData.company}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>{jobData.companySize}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{jobData.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">View Company Profile</Button>
                            </CardFooter>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Application Deadline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">{jobData.applicationDeadline}</p>
                            </CardContent>
                        </Card>

                        {/* <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Similar Jobs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-blue-600 hover:underline">Full Stack Developer at InnoTech</a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-600 hover:underline">Senior React Developer at WebSolutions</a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-600 hover:underline">Software Architect at DataDriven Inc.</a>
                                </li>
                            </ul>
                        </CardContent>
                    </Card> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDetailsPage;
