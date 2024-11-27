import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_ENDPOINT_API } from "@/utility/constants";

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching jobs...");
        const fetchAllJobs = async () => {
          try {
            const res = await axios.get("http://localhost:8000/api/v1/job/find", {
              withCredentials: true,
            });

            console.log(res);

            if (res.data.success) {
              dispatch(setAllJobs(res.data.jobs)); 
            }
          } catch (error) {
            console.error("Error fetching jobs:", error);
          }
        };
        fetchAllJobs();
      }, [dispatch]);

};

export default useGetAllJobs;
