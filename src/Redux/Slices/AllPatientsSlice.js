import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    allPatients:[],
}


export const getAllPatients=createAsyncThunk("/all_patients/get",async ()=>{
    try{
        const res=axiosInstance.get("patient/api/v1/get");

        toast.promise(res,{
            loading:"please wait..",
            success:"All patients Loaded Successfully"
        })
        return (await res).data; // contain full backend data

    }catch(error){
        toast.error(error?.response?.data?.message|| "backed server has not started");
    }


}) 



const allPatientsSlice = createSlice({
    name:"all_patients",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(getAllPatients.fulfilled,(state,action)=>{
                if(action.payload){
                    console.log("bleach",action.payload);
                    state.allPatients=[...action.payload.allPatient];
                }
        })
    }
})

export default allPatientsSlice.reducer