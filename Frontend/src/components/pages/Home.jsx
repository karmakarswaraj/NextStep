import React from "react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import HeroSection from "../HeroSection";
import FeaturedJob from "../FeaturedJob";
import KeyFeature from "../KeyFeature";
import JobCategories from "../JobCategories";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";

export default function HomePage() {
    useGetAllJobs();
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <FeaturedJob />
            <KeyFeature />
            <JobCategories />
            <Footer />
        </div>
    );
}
