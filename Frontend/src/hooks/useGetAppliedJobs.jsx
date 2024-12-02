import { setAllAppliedJobs } from '@/redux/applicationSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_ENDPOINT_API } from '../utility/constants';
const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${APPLICATION_ENDPOINT_API}/job/applied`);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
}

export default useGetAppliedJobs