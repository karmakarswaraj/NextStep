import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useSelector } from "react-redux";
import JobListedCard from "../JobListedCard";
import Filter from "../Filter";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
function Jobs() {
    useGetAllJobs();
    const { allJobs } = useSelector((state) => state.job);
    // const { authUser } = useSelector((state) => state.auth); // Assuming you have a user object in auth state
    const jobsPerPage = 5; // Number of jobs to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(allJobs.length / jobsPerPage);

    // Get jobs for the current page
    const currentJobs = allJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    // Pagination navigation handlers
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="mx-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
    <Navbar />
    <div className="container px-4 py-8">
        <h1 className="mx-20 mb-8 text-3xl font-bold text-white">
            Find Your <span className="text-red-500">Next</span> Opportunity
        </h1>
        <div className="flex flex-col justify-around gap-8 lg:flex-row">
            {/* Filter Sidebar */}
            <Filter />
            {/* Job Listings */}
            <main className="w-full space-y-6 lg:w-3/4">
                {currentJobs && currentJobs.length > 0 ? (
                    <>
                        {currentJobs.map((job) => (
                            <div key={job._id}>
                                <JobListedCard job={job} />
                            </div>
                        ))}
                        {/* Pagination */}
                        {allJobs.length > jobsPerPage && (
                            <div className="flex justify-center mt-8">
                                <Button
                                    variant="outline"
                                    className="mx-1 hover:bg-yellow-300"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Button
                                        key={index + 1}
                                        variant="outline"
                                        className={`mx-1 ${
                                            currentPage === index + 1
                                                ? "bg-yellow-300"
                                                : "hover:bg-yellow-300"
                                        }`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    className="mx-1 hover:bg-yellow-300"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                ) : allJobs.length === 0 ? (
                    <p className="text-center text-white">
                        No jobs found. Try adjusting your filters!
                    </p>
                ) : (
                    <p className="text-center text-white">
                        Something went wrong. Please try later.
                    </p>
                )}
            </main>
        </div>
    </div>
    <Footer />
</div>

    );
}

export default Jobs;
