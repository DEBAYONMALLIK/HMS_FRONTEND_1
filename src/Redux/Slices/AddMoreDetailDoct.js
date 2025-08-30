import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    addMoreDetails:[],
}

const detailDoctSlice = createSlice({
    name:"add_more_doct_details",
    initialState,
    reducers:{},
        extraReducers:(builder)=>{
            builder. // to store the data in frontend ui
            addCase(add_more_doct_details.fulfilled,(state,action)=>{
                    console.log("extra reducers=", action.payload);

                    if(action.payload){
                        console.log("inside of payload")
                        state.addMoreDetails=action.payload.newDoctor;// from backend

                    }
            })
        }
})


export const add_more_doct_details=createAsyncThunk("/doctor/add_details",async (data) =>{

    try{
        console.log("custom ACTION");
        const res=axiosInstance.post("doct/api/v1/addDetails",data);
               
           toast.promise(res,{
            loading:"please wait..",
            success:" doctors created Successfully",
            
        })
       return (await res).data; // contain full backend data
         
    }
    catch(error)
    {
          console.log("ERROR",error)
          toast.error(error?.response?.data?.message);
          toast.error(error?.response?.statusText)
    }

    }

)

export const delete_doctor=createAsyncThunk("/doctor/doctor_delete",async(data)=>{
    try{
            const res = axiosInstance.delete(`doct/api/v1/delete/${data.email}`);
            toast.promise(res,{
            loading:"please wait..",
            success:" Doctor Deleted Successfully",
            })
              return (await res).data; 
    }catch(error){
        console.log("ERROR",error);
           toast.error(error?.response?.data?.message);
    }
})

export default detailDoctSlice.reducer