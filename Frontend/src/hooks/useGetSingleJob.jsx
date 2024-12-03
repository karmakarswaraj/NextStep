import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { JOB_ENDPOINT_API } from "@/utility/constants";

const useGetSingleJob = (jobId) => {
    const [jobData, setJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get(`${JOB_ENDPOINT_API}/find/${jobId}`);
                if (response.data && response.data.job) {
                    setJobData(response.data.job);
                } else {
                    toast.error("Job details not found.");
                }
            } catch (error) {
                toast.error("Failed to fetch job details.");
                console.error("Error fetching job details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (jobId) {
            fetchJobData();
        }
    }, [jobId]);

    return { jobData, isLoading };
};

export default useGetSingleJob;
