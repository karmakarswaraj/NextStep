import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function JobCategories() {
    const jobCategory = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Marketing",
        "Design",
        "Sales",
        "Engineering",
    ]
    return (
        <>
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center text-white">Explore Job Categories</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {jobCategory.map((category) => (
                            <Button key={category} variant="outline" className="py-8 text-lg text-center text-white border border-gray-300 rounded-lg shadow-md bg-primary">
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-primary-foreground">
                <div className="container mx-auto text-center">
                    <h2 className="mb-4 text-3xl font-bold">Ready to Take the Next<span className="text-red-600">Step</span>?</h2>
                    <p className="mb-8 text-xl">
                        Join thousands of job seekers who have found their dream jobs through NextStep.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" variant="secondary">
                            <Link to="/signup">Sign Up Now </Link>
                        </Button>

                    </div>
                </div>
            </section>
        </>
    )
}

export default JobCategories