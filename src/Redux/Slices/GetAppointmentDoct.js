import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    allAppointment:[],
}

export const getAppointment=createAsyncThunk("/allAppointment/get",async ()=>{
    
    try{
        const res=axiosInstance.get("appointment/api/v1/get");

        toast.promise(res,{
            loading:"please wait..",
            success:"All Appointments Loaded Successfully"
        })
        return (await res).data; // contain full backend data

    }catch(error){
        toast.error(error?.response?.data?.message|| "backed server has not started");
    }


}) 

const allAppointment=createSlice({
    name:"all_appointment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAppointment.fulfilled,(state,action)=>{
            if(action.payload){
                console.log(action.payload);
                state.allAppointment=[...action.payload.appointments]
            }
        })
    }


})
export default allAppointment.reducer;