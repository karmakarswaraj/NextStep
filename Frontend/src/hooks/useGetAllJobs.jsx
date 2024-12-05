import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JOB_ENDPOINT_API } from "@/utility/constants";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
          const res = await axios.get(`${JOB_ENDPOINT_API}/find`, {
              withCredentials: true, // This sends cookies with the request
          });
    
          if (res.data.success) {
              dispatch(setAllJobs(res.data.jobs));
          } else {
              console.error("Error response:", res.data.message);
          }
      } catch (error) {
          if (error.response) {
              console.error("Error response:", error.response.data); // Backend error response
          } else if (error.request) {
              console.error("No response received:", error.request); // No response from the server
          } else {
              console.error("Error fetching jobs:", error.message); // General error
          }
      }
  };
  
    fetchAllJobs();
  }, []);

};

export default useGetAllJobs;
