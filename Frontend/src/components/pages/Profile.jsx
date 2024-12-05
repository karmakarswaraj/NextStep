import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path based on your project structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path
import { Badge } from "@/components/ui/badge"; // Adjust path
import { Progress } from "@/components/ui/progress"; // Adjust path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adjust path
import { Briefcase, Building, GraduationCap, MapPin, Mail, Phone, Edit, Users, FileText } from 'lucide-react'; // Adjust import from lucide-react\
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import UpdateProfile from "../UpdateProfile";
export default function StudentProfile() {
    const [profileCompletion, setProfileCompletion] = useState(75);
    const [open, setOpen] = useState(false);
    //get user role from the cookie
    const { user } = useSelector((state) => state.auth);
    const role = user ? user.role : null;

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
                <div className="container px-4 py-8 mx-auto">
                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* Left Column - Profile Summary */}
                        <div className="w-full md:w-1/3 ">
                            <Card className="text-white bg-slate-900">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="relative w-24 h-24">
                                            <img
                                                src="/placeholder.svg"  // Replace with your actual path for image
                                                alt="Profile picture"
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                            <Badge className="absolute bottom-0 right-0">{role}</Badge>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => { setOpen(true) }}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <CardTitle className="mt-4">{user?.fullname}</CardTitle>
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
                                            <span>{user?.phoneNumber}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full text-black bg-white hover:bg-red-400">
                                        Download {user?.resumeName}
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="mt-6 bg-slate-200">
                                <CardHeader>
                                    <CardTitle>Profile Completion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Progress value={profileCompletion} className="w-full bg-white" />
                                    <p className="mt-2 text-center">{profileCompletion}% Complete</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full bg-red-800">Complete Your Profile</Button>
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
                                    <TabsTrigger value="applied">Applied</TabsTrigger>
                                </TabsList>
                                <TabsContent value="about">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>About Me</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                I'm a passionate Computer Science Student with a keen interest in artificial intelligence and machine learning.
                                                I'm always eager to learn new technologies and apply them to solve real-world problems.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="experience">
                                    <Card className="text-white bg-slate-900">
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
                                    <Card className="text-white bg-slate-900">
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
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Skills</CardTitle>
                                        </CardHeader>
                                        <CardContent >
                                            <div className="flex flex-wrap gap-2 ">
                                                <Badge className="text-white bg-red-600">Python</Badge>
                                                <Badge className="text-white bg-red-600">JavaScript</Badge>
                                                <Badge className="text-white bg-red-600">React</Badge>
                                                <Badge className="text-white bg-red-600">Node.js</Badge>
                                                <Badge className="text-white bg-red-600">SQL</Badge>
                                                <Badge className="text-white bg-red-600">Machine Learning</Badge>
                                                <Badge className="text-white bg-red-600">Git</Badge>
                                                <Badge className="text-white bg-red-600">AWS</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="applied">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Applied Jobs</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead >Date</TableHead>
                                                        <TableHead >Company</TableHead>
                                                        <TableHead>Role</TableHead>
                                                        <TableHead className="text-right">Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        Array.from({ length: 2 }).map((_, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>2023-06-01</TableCell>
                                                                <TableCell>Google</TableCell>
                                                                <TableCell>Software Engineer</TableCell>
                                                                <TableCell className="text-right"><Badge className="text-white bg-red-600">Pending </Badge></TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                            {
                                role === 'Student' ? (
                                    <Card className="mt-6 text-white bg-slate-900">
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
                                            <Button variant="outline" className="w-full bg-red-800">Update Preferences</Button>
                                        </CardFooter>
                                    </Card>) : (
                                    <Card className="mt-6 text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Recruitment Focus</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge>Software Engineering</Badge>
                                                <Badge>Data Science</Badge>
                                                <Badge>Product Management</Badge>
                                                <Badge>UX/UI Design</Badge>
                                                <Badge>DevOps</Badge>
                                                <Badge>Artificial Intelligence</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline" className="w-full">Update Focus Areas</Button>
                                        </CardFooter>
                                    </Card>)
                            }


                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfile open={open} setOpen={setOpen} />
            <Footer />
        </div>
    );
}
