import React from 'react'
import { TrendingUp, Users, Zap } from "lucide-react";
function KeyFeature() {
    return (
        <section className="py-16 bg-gray-950 text-secondary-foreground">
            <div className="container mx-auto ">
                <h2 className="mb-12 text-3xl font-bold text-center text-white">Why Choose NextStep</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
                    <div className="p-6 text-center border border-gray-300 rounded-lg shadow-md bg-secondary">
                        <Zap className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="mb-2 text-xl font-semibold">Quick Apply</h3>
                        <p>Apply to multiple jobs with just one click using your NextStep profile.</p>
                    </div>
                    <div className="p-6 text-center border border-gray-300 rounded-lg shadow-md bg-secondary">
                        <Users className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="mb-2 text-xl font-semibold">Personalized Matches</h3>
                        <p>Get job recommendations tailored to your skills and experience.</p>
                    </div>
                    <div className="p-6 text-center border border-gray-300 rounded-lg shadow-md bg-secondary">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="mb-2 text-xl font-semibold">Career Growth</h3>
                        <p>Access resources and tools to help you advance in your career.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KeyFeature