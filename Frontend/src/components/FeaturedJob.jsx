import React from 'react'
import { Button } from "@/components/ui/button";
import LatestJobCard from './LatestJobCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function FeaturedJob() {
    const { allJobs } = useSelector((state) => state.job);

    return (
        <section className="py-16 text-white bg-gray-900">
            <div className="container mx-auto">
                <h2 className="mb-8 text-3xl font-bold text-center">Featured Jobs</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {
                        allJobs && allJobs?.slice(0, 3).map((job) => <LatestJobCard key={job._id} job={job} />)
                    }
                </div>
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <Button variant="outline" size="lg" className="text-white bg-black hover:bg-red-600 hover:text-white">
                            <Link to="/jobs">View All Jobs </Link>
                        </Button>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FeaturedJob