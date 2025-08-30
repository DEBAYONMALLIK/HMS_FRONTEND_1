import { all } from "axios";
import React, { useState } from "react"
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import Homelayout from "../Layouts/HomeLayouts";
function ContactUs(){


    const[all_data,set_all_data]=useState({
        name:"",
        email:"",
        message:""
    })

    function HandleuserInput(e){
        e.preventDefault();
        const{name,value}=e.target;
        set_all_data({
            ...all_data,
           [name]:value
        })
        console.log(all_data);

    }
    async function onformsubit(e){

         e.preventDefault();
         try{   

         const response=axiosInstance.post("user/api/v1/contactus",all_data);
         toast.promise(response,{
            loading:"Submitting your form",
            success:"form Submitted."

         })
         set_all_data({
         name:"",
        email:"",
        message:""
         })
        return (await response).data;}
        catch(error){
      toast.error(error?.response?.data?.message || "backend sever not started ");
        }
    }


    return(
    <Homelayout> 
        <div className="flex flex-col items-center justify-center content-center min-h-[100vh]">
            <form  onSubmit={onformsubit}  className="flex flex-col justify-center gap-3 rounded-lg  p-4 text-white w-96 shadow-xl/20" >
                <h1 className="text-center text-3xl font-bold">Contact Form</h1>
                    <label htmlFor="name" className="font-semibold text-lg">Name</label>
                    <input 
                    type="text"
                    id="name"
                    name="name"
                    className="bg-transparent px-2 py-1 border rounded"
                    onChange={HandleuserInput}
                    value={all_data.name}
                    placeholder="john cena"

                    />

                    <label htmlFor="email" className="font-semibold text-lg"> Email</label>
                      <input 
                      type="text"
                      id="email"
                      name="email"
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={HandleuserInput}
                      value={all_data.email}
                      placeholder="john@gmail.com"

                       />  

                       <label htmlFor="message" className="font-semibold text-lg">Message</label>
                       <textarea 
                        name="message"
                        type="text" 
                        id="message" 
                        className="bg-transparent px-2 py-1 h-80 border rounded"  
                        onChange={HandleuserInput}
                        value={all_data.message}
                        placeholder="enter your message...."
                        />
                       
                       
                       <button type="submit " className="bg-yellow-600 hover:bg-yellow-500 mt-1 transition-all duration-300 ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer" >Submit </button>
            </form>



        </div>
    </Homelayout>
    );
}
export default ContactUs