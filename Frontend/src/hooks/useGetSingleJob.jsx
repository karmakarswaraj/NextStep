import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { JOB_ENDPOINT_API } from "@/utility/constants";
import { setSingleJobById } from "@/redux/jobSlice";

const useGetSingleJob = (jobId) => {
    const [jobData, setJobData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { authUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchJobData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${JOB_ENDPOINT_API}/find/${jobId}`, { withCredentials: true });
                if (response.data && response.data.job) {
                    setJobData(response.data.job);

                    // Dispatch the job details to Redux
                    dispatch(setSingleJobById(response.data.job));
                    setIsApplied(response.data.job.applications.some((application) => application.applicant === authUser?._id));
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
    }, [jobId, dispatch]);

    return { jobData, isLoading };
};

export default useGetSingleJob;
