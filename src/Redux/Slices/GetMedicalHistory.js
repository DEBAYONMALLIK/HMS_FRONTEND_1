
import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    MedicalHistory :{}
}


export const getMedicalRecord=createAsyncThunk(
    "/medicalHistroy/get",async ()=>{
        try{
    const res=axiosInstance.get("medicalrecord/api/v1/get");

    toast.promise(res,{
        loading:"please wait...",
        success:"All details loaded successfully "
    })
        return (await res).data;    

        }catch(error){  
            console.log(error)
         toast.error(error?.response?.data|| "backend server has not started")
        }

    }
 )

const MedicalHistory= createSlice({
    name:"medical_history",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMedicalRecord.fulfilled,(state,action)=>{
            if(action.payload){
                console.log(action.payload);
                 state.MedicalHistory=action.payload.record;
            }
        })
    }
})


export default MedicalHistory.reducer