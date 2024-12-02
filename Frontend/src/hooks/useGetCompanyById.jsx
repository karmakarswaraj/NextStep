import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_ENDPOINT_API } from "../utility/constants";
const useGetCompanyById = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${COMPANY_ENDPOINT_API}/find/${id}`);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log("Error occured while fetching company details",error);
            }
        };
        fetchCompanyDetails();
    },[id,dispatch])
};
export default useGetCompanyById;