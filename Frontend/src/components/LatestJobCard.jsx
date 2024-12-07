import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
function LatestJobCard({ job }) {
    const navigate = useNavigate();
    return (
        <div>
            <Card key={job} className="border border-gray-600 rounded-lg shadow-md ">
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="text-sm ">{job.company.companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span >{job.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>{job.salary}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" className="w-full text-white bg-black hover:bg-red-600 hover:text-white" onClick={() => {navigate(`/jobs/details/${job._id}`) }}>
                        View Job
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LatestJobCard