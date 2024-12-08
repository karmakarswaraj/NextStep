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
    const { authUser: user } = useSelector((state) => state.auth);
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
                                            <span>{user?.email}</span>
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
                                    {
                                        role === "student" ? (
                                            <>
                                                <TabsTrigger value="about">About</TabsTrigger>
                                                <TabsTrigger value="experience">Experience</TabsTrigger>
                                                <TabsTrigger value="education">Education</TabsTrigger>
                                                <TabsTrigger value="skills">Skills</TabsTrigger>
                                                <TabsTrigger value="applied">Applied</TabsTrigger>
                                            </>
                                        ) : (
                                            <>
                                                <TabsTrigger value="about">About</TabsTrigger>
                                                <TabsTrigger value="experience">Experience</TabsTrigger>
                                            </>
                                        )
                                    }

                                </TabsList>

                                {/* About Me Section */}
                                <TabsContent value="about">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>About Me</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{user.profile.bio}</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Work Experience Section */}
                                <TabsContent value="experience">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Work Experience</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {user.profile.workExperience.length > 0 ? (
                                                <div className="space-y-4">
                                                    {user.profile.workExperience.map((experience, index) => (
                                                        <div key={index}>
                                                            <h3 className="font-semibold">{experience.title}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {experience.company} • {experience.period}
                                                            </p>
                                                            <p className="mt-2">{experience.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">No work experience available.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Education Section */}
                                <TabsContent value="education">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Education</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {user.profile.education.length > 0 ? (
                                                    user.profile.education.map((education, index) => (
                                                        <div key={index}>
                                                            <h3 className="font-semibold">{education.institution}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {education.degree} • {education.startYear} - {education.endYear}
                                                            </p>
                                                            {education.relevantCoursework && education.relevantCoursework.length > 0 && (
                                                                <p className="mt-2">
                                                                    Relevant coursework: {education.relevantCoursework.join(", ")}
                                                                </p>
                                                            )}
                                                            {education.additionalDetails && education.additionalDetails.length > 0 && (
                                                                <ul className="mt-2 list-disc list-inside">
                                                                    {education.additionalDetails.map((detail, detailIndex) => (
                                                                        <li key={detailIndex}>{detail}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No education details available.</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Skills Section */}
                                <TabsContent value="skills">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Skills</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {user.profile.skills.length > 0 ? (
                                                    user.profile.skills.map((skill, index) => (
                                                        <Badge key={index} className="text-white bg-red-600">
                                                            {skill}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <p>No skills available.</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Applied Jobs Section */}
                                <TabsContent value="applied">
                                    <Card className="text-white bg-slate-900">
                                        <CardHeader>
                                            <CardTitle>Applied Jobs</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Company</TableHead>
                                                        <TableHead>Role</TableHead>
                                                        <TableHead className="text-right">Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {user.profile.appliedJobs.length > 0 ? (
                                                        user.profile.appliedJobs.map((job, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{job.date}</TableCell>
                                                                <TableCell>{job.company}</TableCell>
                                                                <TableCell>{job.role}</TableCell>
                                                                <TableCell className="text-right">
                                                                    <Badge className="text-white bg-red-600">
                                                                        {job.status}
                                                                    </Badge>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan="4">No applied jobs available.</TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            {/* Dynamic Job Preferences or Recruitment Focus */}
                            {role === 'Student' ? (
                                <Card className="mt-6 text-white bg-slate-900">
                                    <CardHeader>
                                        <CardTitle>Job Preferences</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Desired Role:</span>
                                                <span>{user.profile.jobPreferences?.role || 'Software Engineer'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Job Type:</span>
                                                <span>{user.profile.jobPreferences?.type || 'Full-time, Internship'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Preferred Locations:</span>
                                                <span>{user.profile.jobPreferences?.locations?.join(', ') || 'San Francisco, New York, Remote'}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full bg-red-800">Update Preferences</Button>
                                    </CardFooter>
                                </Card>
                            ) : (
                                <Card className="mt-6 text-white bg-slate-900">
                                    <CardHeader>
                                        <CardTitle>Recruitment Focus</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {user.profile.recruitmentFocus?.map((focus, index) => (
                                                <Badge key={index}>{focus}</Badge>
                                            )) || (
                                                    <>
                                                        <Badge>Software Engineering</Badge>
                                                        <Badge>Data Science</Badge>
                                                        <Badge>Product Management</Badge>
                                                        <Badge>UX/UI Design</Badge>
                                                        <Badge>DevOps</Badge>
                                                        <Badge>Artificial Intelligence</Badge>
                                                    </>
                                                )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">Update Focus Areas</Button>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <UpdateProfile open={open} setOpen={setOpen} />
            <Footer />
        </div>
    );
}
