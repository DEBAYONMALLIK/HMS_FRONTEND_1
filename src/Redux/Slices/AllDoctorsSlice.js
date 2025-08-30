import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    allDoctors:[],
}


export const getAllDoctors=createAsyncThunk("/all_doctor/get",async ()=>{
    try{
        const res=axiosInstance.get("doct/api/v1/get");

        toast.promise(res,{
            loading:"please wait..",
            success:"All doctors Loaded Successfully"
        })
        return (await res).data; // contain full backend data

    }catch(error){
        toast.error(error?.response?.data?.message|| "backed server has not started");
    }


}) 



const allDoctorsSlice= createSlice({
    name:"all_doctors",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(getAllDoctors.fulfilled,(state,action)=>{
                if(action.payload){
                    console.log(action.payload);
                    state.allDoctors=[...action.payload.allDoctor];
                }
        })
    }
})

export default allDoctorsSlice.reducer