import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    addApointment:[],
}

const addApointmentSlice = createSlice({
    name:"add_appointment",
    initialState,
    reducers:{},
        extraReducers:(builder)=>{
            builder. // to store the data in frontend ui
            addCase(add_appointment.fulfilled,(state,action)=>{
                    console.log("extra reducers=", action.payload);

                    if(action.payload){
                        console.log("inside of payload")
                        state.addApointment=action.payload.new_appointment;// from backend

                    }
            })
        }
})


export const add_appointment=createAsyncThunk("/appointment/create",async(data)=>{

try{
    console.log("sending data to backend")
    const response=axiosInstance.post("appointment/api/v1/create",data);
         toast.promise(response,{
            loading:"please wait..",
            success:" Appointment created Successfully",
            
        })
       return (await response).data; // contain full backend data
         
}
    catch(error)
    {
          console.log("ERROR",error)
          toast.error(error?.response?.data?.message);
        //   toast.error(error?.response?.statusText)
    }

})

export default addApointmentSlice.reducer;