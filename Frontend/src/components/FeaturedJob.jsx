import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
function FeaturedJob() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="mb-8 text-3xl font-bold text-center">Featured Jobs</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((job) => (
                        <Card key={job} className="border border-gray-600 rounded-lg shadow-md bg-primary text-primary-foreground">
                            <CardHeader>
                                <CardTitle>Software Engineer</CardTitle>
                                <CardDescription className="text-sm text-white">TechCorp Inc.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-2">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    <span>Full-time</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full bg-slate-400 hover:bg-red-600 ">
                                    View Job
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <Button variant="outline" size="lg" className="text-white bg-black hover:bg-slate-400">
                            View All Jobs
                        </Button>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FeaturedJob