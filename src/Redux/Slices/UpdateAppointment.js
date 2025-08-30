import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";


export const updateAppointment=createAsyncThunk("/Appointment/update",async (data)=>{
    try{
        const res=axiosInstance.put("appointment/api/v1/update",data);

        toast.promise(res,{
            loading:"please wait updating status..",
            success:"Status Updated Successfully.."
        })
        return (await res).data; // contain full backend data

    }catch(error){
        toast.error(error?.response?.data?.message|| "backed server has not started");
    }


}) 