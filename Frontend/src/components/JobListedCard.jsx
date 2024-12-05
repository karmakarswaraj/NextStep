import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function JobListedCard({ job }) {
    const navigate = useNavigate();
    
    return (
        <div>
            <Card key={job.id} >
                <CardHeader>
                    <div className="flex items-center gap-4 justify-items-center">
                        <img
                            // src={}
                            alt={`${job.companyName} logo`}
                            width={64}
                            height={64}
                            className="rounded-md"
                        />
                        <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription>{job.description}</CardDescription>

                        </div>
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
                            <span>Posted {job.createdAt}</span>
                        </div>
                    </div>
                    <p className="mt-4">
                        {job.description}
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full text-white bg-black hover:bg-red-600" onClick={() => {navigate(`/jobs/details/${job._id}`) }}>
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default JobListedCard