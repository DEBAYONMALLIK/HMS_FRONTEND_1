import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"



const initialState={
    allMedicalHis:[],
}

export const getAllMediHis=createAsyncThunk("/allMediHistory/get",async ()=>{
    try{
        const res= axiosInstance.get("medicalrecord/api/v1/all/get");
              toast.promise(res,{
            loading:"please wait..",
            success:"All doctors Loaded Successfully"
        })
        return (await res).data; // contain full backend data

    }catch(error){
          toast.error(error?.response?.data?.message|| "backed server has not started");
    }
} )

const allMedicalHisSlice= createSlice({
    name:"all_medical_his",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(getAllMediHis.fulfilled,(state,action)=>{
                if(action.payload){
                    console.log(action.payload);
                    state.allMedicalHis=[...action.payload.records];
                }
        })
    }
})

export default allMedicalHisSlice.reducer;