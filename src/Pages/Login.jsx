import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Homelayout from "../Layouts/HomeLayouts";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { login } from "../Redux/Slices/AuthSlice";

function Login(){
    const dispatch=useDispatch();
    const navigate= useNavigate();

  const role = useSelector((state)=>state?.auth?.role);
    const [loginData,setloginData]=useState({
        email:"",
        password:"",
       //it stores as file.
    });



    function handleUserInput(e){
           const{name,value}=e.target;
            setloginData({
                ...loginData,
               [name]:value  // name:value will take the key as a name not, email,pass etc 
            })
    }


  
           // on Form submit
            async function onLogin(event){
                event.preventDefault();
                // console.log(signupData);
                // CHECKING FOR ALL THE FIELDS
                if( !loginData.email || !loginData.password ){
                    toast.error("please fill all the details");
                    return
                }
            
            

                // console.log(formData.getAll);

                const response= await dispatch(login(loginData)); // should i use this? ANS: yes
                console.log(response);

                if(response?.payload?.success){ // from backend
                      const userRole = response.payload.role; // safer

                    if(userRole==="admin"){console.log("this is a fucking admin ",role);navigate("/");}
               else navigate("/user/ismoredetail",{state:response.payload});
            }


                // clearing all the useStates
            
                setloginData({
                    email:"",
                    password:"",
                
                })
            
            }

    return(

        <Homelayout>
            <div className="flex justify-center items-center h-[100vh]">

     <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg  p-4 text-white w-96 shadow-xl/20">
            <h1 className="text-center text-2xl font-bold"> Login Page</h1>



        


             {/* email  */}
                 <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input 
                      type="email"
                      name="email" 
                      id="email" // used by htmlfor 
                      placeholder="abcs@gmail.com"
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={loginData.email}
                      />
                 </div>
            
             {/* password     */}
               <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">password</label>
                    <input 
                      type="password"
                      name="password" 
                      id="password"  
                      placeholder="enter your password"
                      className="bg-transparent px-2 py-1 border rounded"
                         onChange={handleUserInput}
                      value={loginData.password}
                      />
                 </div>
             
             {/* role */}
         
                

                {/* submit button */}
                 <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 mt-1 transition-all duration-300 ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer ">
                    Login
                 </button>

               {/* already have an account?*/}
               <p className="text-center">
                Do not have an account ? 
                <Link to="/signup" className="text-accent link ml-1">signup</Link>
               </p>

      </form>
            
            </div>


        </Homelayout>
    );

}
export default Login;