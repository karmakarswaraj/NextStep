import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, Search } from "lucide-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
];

const jobListings = [
    {
        id: 1,
        title: "Backend Developer",
        company: "InnovateTech",
        location: "Remote",
        jobType: "Contract",
        salary: "90,000-110,000",
        description: "Looking for a backend developer to build and maintain APIs and server-side applications.",
        requirements: "Proficiency in Python, Experience with Django, Knowledge of RESTful API design, Familiarity with SQL databases.",
        experience: "3-5 years",
        position: "Senior-level",
        companyId: "673258c2f3fbb885b74e9436"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "TechSolutions",
        location: "San Francisco, CA",
        jobType: "Full-time",
        salary: "100,000-130,000",
        description: "Seeking a frontend developer to create user interfaces for our web applications using React.js and other modern frameworks.",
        requirements: "Proficiency in JavaScript, React.js, HTML/CSS, Experience with responsive design, Familiarity with version control (Git).",
        experience: "2-4 years",
        position: "Mid-level",
        companyId: "839cf24f8a563b7b54e299f9"
    },
    {
        id: 3,
        title: "Product Manager",
        company: "InnovateX",
        location: "New York, NY",
        jobType: "Full-time",
        salary: "110,000-150,000",
        description: "We are looking for a product manager to lead cross-functional teams in the development and launch of new products.",
        requirements: "Strong experience in product management, Ability to collaborate with engineering and design teams, Excellent communication skills.",
        experience: "5+ years",
        position: "Executive-level",
        companyId: "5a319cfdb7f1a9a34e74a9c3"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "CreativeHub",
        location: "Los Angeles, CA",
        jobType: "Part-time",
        salary: "60,000-80,000",
        description: "We need a talented UI/UX designer to work on user-centric design for web and mobile applications, ensuring smooth and intuitive user experiences.",
        requirements: "Proficiency in design tools like Sketch, Figma, Adobe XD, Strong understanding of design principles and user behavior.",
        experience: "2-3 years",
        position: "Mid-level",
        companyId: "29b23fa84fcb21da5ecf5d10"
    },
    {
        id: 5,
        title: "Data Scientist",
        company: "DataTech Solutions",
        location: "Chicago, IL (Hybrid)",
        jobType: "Full-time",
        salary: "120,000-150,000",
        description: "Looking for a data scientist to analyze large datasets and provide actionable insights to improve business performance.",
        requirements: "Experience with Python, SQL, and data analysis tools, Knowledge of machine learning algorithms, Strong analytical skills.",
        experience: "3-5 years",
        position: "Senior-level",
        companyId: "b9cf72f9a1849236dcb489d3"
    }
];


const locations = ["San Francisco, CA", "New York, NY", "Los Angeles, CA", "Austin, TX", "Chicago, IL"];

export default function JobListingPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState("");
    const [location, setLocation] = useState(""); // State to track the selected location
    const [salaryRange, setSalaryRange] = useState([0, 200000]);

    const handleJobTypeChange = (jobType) => {
        setSelectedJobTypes((prev) =>
            prev.includes(jobType)
                ? prev.filter((type) => type !== jobType)
                : [...prev, jobType]
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
        console.log("Filters:", {
            selectedJobTypes,
            selectedExperience,
            salaryRange,
        });
        // Implement search logic here
    };



    return (
        <div className="mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
            <Navbar />
            <div className="container px-4 py-8 ">
                <h1 className="mx-20 mb-8 text-3xl font-bold text-white">Find Your <span className="text-red-500">Next</span> Opportunity</h1>
                <div className="flex flex-col justify-around gap-8 lg:flex-row">
                    {/* Filter Sidebar */}

                    <aside className="w-full border-none lg:w-1/4">
                        <Card className="border border-black ">
                            <CardHeader>
                                <CardTitle>Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="search" className="text-base font-semibold">
                                        Search
                                    </Label>
                                    <form onSubmit={handleSearch} className="flex gap-2 mt-2">
                                        <Input
                                            id="search"
                                            placeholder="Job title or keyword"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Button type="submit" size="icon">
                                            <Search className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                                <div>
                                    <Label className="text-base font-semibold">Job Type</Label>
                                    <div className="mt-2 space-y-2">
                                        {jobTypes.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={selectedJobTypes.includes(type)}
                                                    onCheckedChange={() => handleJobTypeChange(type)}
                                                />
                                                <label
                                                    htmlFor={type}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="experience"
                                        className="text-base font-semibold"
                                    >
                                        Experience Level
                                    </Label>
                                    <Select
                                        onValueChange={setSelectedExperience}
                                        value={selectedExperience}
                                    >
                                        <SelectTrigger id="experience" className="mt-2">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {experienceLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="location" className="text-base font-semibold">
                                        Location
                                    </Label>
                                    <Select onValueChange={setLocation} value={location}>
                                        <SelectTrigger id="location" className="mt-2">
                                            <SelectValue placeholder="Select job location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((loc) => (
                                                <SelectItem key={loc} value={loc}>
                                                    {loc}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-base font-semibold">
                                        Salary Range
                                    </Label>
                                    <div className="mt-2">
                                        <Slider
                                            min={0}
                                            max={200000}
                                            step={10000}
                                            value={salaryRange}
                                            onValueChange={setSalaryRange}
                                        />
                                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                            <span>${salaryRange[0].toLocaleString()}</span>
                                            <span>${salaryRange[1].toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Job Listings */}
                    <main className="w-full space-y-6 lg:w-1/2">
                        {jobListings.map((job) => (
                            <Card key={job.id} >
                                <CardHeader>
                                    <div className="flex items-center gap-4 justify-items-center">
                                        <img
                                            src={job.logo}
                                            alt={`${job.company} logo`}
                                            width={64}
                                            height={64}
                                            className="rounded-md"
                                        />
                                        <div>
                                            <CardTitle>{job.title}</CardTitle>
                                            <CardDescription>{job.company}</CardDescription>

                                        </div>

                                        {/* <Button variant="outline" ><Bookmark/></Button> */}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            <span>{job.jobType}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="w-4 h-4 mr-2" />
                                            <span>{job.salary}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>Posted {job.posted}</span>
                                        </div>
                                    </div>
                                    <p className="mt-4">
                                        {job.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full text-white bg-black hover:bg-red-600">
                                        View Job
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center mt-8">
                            <Button variant="outline" className="mx-1 hover:bg-yellow-300">
                                Previous
                            </Button>
                            <Button variant="outline" className="mx-1 hover:bg-yellow-300">
                                1
                            </Button>
                            <Button variant="outline" className="mx-1 hover:bg-yellow-300">
                                2
                            </Button>
                            <Button variant="outline" className="mx-1 hover:bg-yellow-300">
                                3
                            </Button>
                            <Button variant="outline" className="mx-1 hover:bg-yellow-300">
                                Next
                            </Button>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
