import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path based on your project structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path
import { Badge } from "@/components/ui/badge"; // Adjust path
import { Progress } from "@/components/ui/progress"; // Adjust path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adjust path
import { Briefcase, GraduationCap, MapPin, Mail, Phone, Edit } from 'lucide-react'; // Adjust import from lucide-react
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
export default function StudentProfile() {
    const [profileCompletion, setProfileCompletion] = useState(75);

    return (
        <div className="min-h-screen bg-[#75cda7]">
        <Navbar/>
        
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* Left Column - Profile Summary */}
                <div className="w-full md:w-1/3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="relative w-24 h-24">
                                    <img
                                        src="/placeholder.svg"  // Replace with your actual path for image
                                        alt="Profile picture"
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                    <Badge className="absolute bottom-0 right-0">Student</Badge>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </div>
                            <CardTitle className="mt-4">John Doe</CardTitle>
                            <CardDescription>Computer Science Student</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    <span>Stanford University</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>john.doe@example.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>(123) 456-7890</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Download Resume</Button>
                        </CardFooter>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Profile Completion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={profileCompletion} className="w-full" />
                            <p className="mt-2 text-center">{profileCompletion}% Complete</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Complete Your Profile</Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column - Detailed Information */}
                <div className="w-full md:w-2/3">
                    <Tabs defaultValue="about">
                        <TabsList>
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="skills">Skills</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About Me</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        I'm a passionate Computer Science student with a keen interest in artificial intelligence and machine learning.
                                        I'm always eager to learn new technologies and apply them to solve real-world problems.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="experience">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Work Experience</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold">Software Engineering Intern</h3>
                                            <p className="text-sm text-muted-foreground">TechCorp Inc. • Summer 2023</p>
                                            <p className="mt-2">Worked on developing new features for the company's main product using React and Node.js.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Research Assistant</h3>
                                            <p className="text-sm text-muted-foreground">Stanford AI Lab • 2022 - Present</p>
                                            <p className="mt-2">Assisting in research projects related to natural language processing and computer vision.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="education">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Education</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold">Stanford University</h3>
                                            <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science • 2021 - 2025</p>
                                            <p className="mt-2">Relevant coursework: Data Structures, Algorithms, Machine Learning, Database Systems</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Online Courses</h3>
                                            <ul className="mt-2 list-disc list-inside">
                                                <li>Deep Learning Specialization - Coursera</li>
                                                <li>Full Stack Web Development - Udacity</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="skills">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Python</Badge>
                                        <Badge>JavaScript</Badge>
                                        <Badge>React</Badge>
                                        <Badge>Node.js</Badge>
                                        <Badge>SQL</Badge>
                                        <Badge>Machine Learning</Badge>
                                        <Badge>Git</Badge>
                                        <Badge>AWS</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Job Preferences</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Desired Role:</span>
                                    <span>Software Engineer</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Job Type:</span>
                                    <span>Full-time, Internship</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Preferred Locations:</span>
                                    <span>San Francisco, New York, Remote</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Update Preferences</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}
