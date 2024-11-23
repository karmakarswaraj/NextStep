import {React, useState} from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
function HeroSection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm, "in", location);
        // Implement search logic here
    };
    return (
        <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-primary-foreground">
            <div className="container mx-auto text-center">
                <h1 className="mb-4 text-4xl font-bold">Find Your Dream Job with Next<span className="text-red-600">Step</span></h1>
                <p className="mb-8 text-xl">Connect with top employers and take the next step in your career</p>
                <form onSubmit={handleSearch} className="flex flex-col max-w-3xl gap-4 mx-auto md:flex-row">
                    <Input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow bg-primary-foreground text-primary"
                    />
                    <Input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-grow bg-primary-foreground text-primary"
                    />
                    <Button type="submit" size="lg" className="bg-red-600 text-secondary-foreground hover:bg-white">
                        <Search className="w-4 h-4 mr-2" /> Search Jobs
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default HeroSection