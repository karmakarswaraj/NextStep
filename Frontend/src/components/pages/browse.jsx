import React from "react";
import { Button } from "@/components/ui/button"; // Adjust path based on your project structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path
import { Badge } from "@/components/ui/badge"; // Adjust path
import { Briefcase, TrendingUp, ArrowRight } from "lucide-react"; // Assuming lucide-react is installed
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const jobCategories = [
    { name: "Technology", icon: "💻", count: 1234 },
    { name: "Healthcare", icon: "🏥", count: 987 },
    { name: "Education", icon: "🎓", count: 756 },
    { name: "Finance", icon: "💰", count: 543 },
    { name: "Marketing", icon: "📊", count: 432 },
    { name: "Design", icon: "🎨", count: 321 },
    { name: "Sales", icon: "🤝", count: 654 },
    { name: "Engineering", icon: "⚙️", count: 876 },
];

const trendingJobs = [
    { title: "Data Scientist", growth: "+25%" },
    { title: "UX Designer", growth: "+18%" },
    { title: "Cloud Architect", growth: "+30%" },
    { title: "AI Engineer", growth: "+40%" },
    { title: "Cybersecurity Analyst", growth: "+22%" },
];

const topCompanies = [
    { name: "TechCorp", logo: "/placeholder.svg", jobCount: 50 },
    { name: "HealthCare Plus", logo: "/placeholder.svg", jobCount: 35 },
    { name: "EduTech Innovations", logo: "/placeholder.svg", jobCount: 28 },
    { name: "FinanceGrow", logo: "/placeholder.svg", jobCount: 42 },
    { name: "MarketBoost", logo: "/placeholder.svg", jobCount: 31 },
];

export default function BrowsePage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
            <Navbar />

            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-white">Browse Opportunities</h1>

                {/* Job Categories */}
                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-white">Job Categories</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {jobCategories.map((category) => (
                            <Card key={category.name} className="transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2 text-2xl">{category.icon}</span>
                                        {category.name}
                                    </CardTitle>
                                    <CardDescription>{category.count} jobs available</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant="ghost" className="w-full text-white bg-black hover:bg-red-600 ">
                                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Trending Jobs */}
                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-white">Trending Job Roles</h2>
                    <Card className="text-white bg-gray-700 border border-black">
                        <CardContent className="p-6">
                            <ul className="space-y-4">
                                {trendingJobs.map((job) => (
                                    <li key={job.title} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <TrendingUp className="w-5 h-5 mr-2 text-red-600 " />
                                            <span>{job.title}</span>
                                        </div>
                                        <Badge variant="secondary" className={"bg-red-600"}>{job.growth}</Badge>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Top Companies */}
                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-white">Top Companies Hiring</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {topCompanies.map((company) => (
                            <Card key={company.name} className="transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center pb-2 space-x-4">
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                    <CardTitle>{company.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        <span>{company.jobCount} open positions</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full text-white bg-black hover:bg-red-600">
                                        View Jobs
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
