import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_ENDPOINT_API } from "@/utility/constants";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${JOB_ENDPOINT_API}/admin/job`);
                if(res.data.success){ 
                    dispatch(setAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdminJobs();
    }, []);
}
export default useGetAllAdminJobs;