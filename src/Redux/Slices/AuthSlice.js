import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

// const initialState={
//     isLoggedIn:localStorage.getItem("isLoggedIn") || false,
//     role:localStorage.getItem("role") || '',
//     data:localStorage.getItem('data') || {}
// }

// use json.parse to convert json to java script object

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    role: JSON.parse(localStorage.getItem("role")) || '',
    data: JSON.parse(localStorage.getItem('data')) || {}
};


const AuthSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        // all our reducers
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            // for dom access
            localStorage.setItem("data",JSON.stringify(action?.payload));
            localStorage.setItem("role",JSON.stringify(action?.payload?.role));
            localStorage.setItem("isLoggedIn",JSON.stringify(action?.payload?.success));
            // for coding implementation 
            state.isLoggedIn= action?.payload?.success;
            state.data=action?.payload;
            state.role=action?.payload?.role;
           
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear(); // clear whole local storage
            state.isLoggedIn=false,
            state.data={},
            state.role='';
        })
    }
})


// action for signup ,but outisde state
export const createAccount = createAsyncThunk("/auth/signup",async (data)=>{
        try{
            const res= axiosInstance.post("user/api/v1/signup",data)
                
            
           
            toast.promise(res,{
                loading:"Wait, creating your account",
                success:"successfully created",

                // error:"Failed to Create Account",
            }) 

            return (await res).data;

        }catch(error){
            toast.error(error?.response?.data?.message ||"backend sever not started" );
        }


})

// action for login ,but outisde state
export const login=createAsyncThunk("/auth/login",async (data)=>{
        try{
            const res= axiosInstance.post("user/api/v1/signin",data)
                
            
           
            toast.promise(res,{
                loading:"Wait, authentication in process..",
                success:"successfully login",
                // error:"Failed to login",

            }) 

            return (await res).data;

        }catch(error){
            console.log(" error=",error.message)
            toast.error(error?.response?.data?.message ||error.message ||"backend sever not started ");
        }


});


export const logout= createAsyncThunk("/auth/logout",async ()=>{
        try{
            const res= axiosInstance.post("user/api/v1/logout");
     
            toast.promise(res,{
                loading:"Wait, Logout in process..",
                success:"successfully Logged out",
            
            }) 

            return (await res).data;

        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message||error.message);
        }


})



export default AuthSlice.reducer
