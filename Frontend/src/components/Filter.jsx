import React, { useState } from "react"
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
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
];
const locations = ["San Francisco, CA", "New York, NY", "Los Angeles, CA", "Austin, TX", "Chicago, IL"];


function Filter() {
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState("");
    const [location, setLocation] = useState(""); // State to track the selected location
    const [salaryRange, setSalaryRange] = useState([0, 200000]);
    const [searchTerm, setSearchTerm] = useState("");

    
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
        <>
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
                                    onValueChange={(newRange) => setSalaryRange(newRange)}
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
        </>
    )
}

export default Filter