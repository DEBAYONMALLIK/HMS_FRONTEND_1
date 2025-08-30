import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    addMoreDetails:[],
    // allPatients:[]
}

const detailPatientSlice = createSlice({
    name:"add_more_doct_details",
    initialState,
    reducers:{},
        extraReducers:(builder)=>{
            builder. // to store the data in frontend ui
            addCase(add_more_patient_details.fulfilled,(state,action)=>{
                    console.log("extra reducers=", action.payload);

                    if(action.payload){
                        console.log("inside of payload")
                        state.addMoreDetails=action.payload.new_patient;// from backend

                    }
            })
            // .addCase(getAllPatients.fulfilled,(state,action)=>{
            //        console.log("extra reducers=", action.payload);

            //             if(action.payload){
            //             console.log("inside of payload")
            //             state.allPatients=[...action.payload.all_patient];// from backend

            //         }
            // })
        }
})





export const add_more_patient_details=createAsyncThunk("/patient/add_details",async (data) =>{

    try{
        console.log("custom ACTION");
        const res=axiosInstance.post("patient/api/v1/addDetails",data);
               
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

// export const getAllPatients=createAsyncThunk("/all_patient/get",async ()=>{
//     try{
//         const res=axiosInstance.get("patient/api/v1/get");

//         toast.promise(res,{
//             loading:"please wait..",
//             success:"All patient Loaded Successfully"
//         })
//         return (await res).data; // contain full backend data

//     }catch(error){
//         toast.error(error?.response?.data?.message|| "backed server has not started");
//     }


// }) 


export const delete_patient=createAsyncThunk("/patient/patient_delete",async(data)=>{
    try{
            const res = axiosInstance.delete(`patient/api/v1/delete/${data.email}`);
            toast.promise(res,{
            loading:"please wait..",
            success:" Patient Deleted Successfully",
            })
              return (await res).data; 
    }catch(error){
        console.log("ERROR",error);
           toast.error(error?.response?.data?.message);
    }
})





export default detailPatientSlice.reducer