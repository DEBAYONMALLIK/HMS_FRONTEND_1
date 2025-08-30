import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Homelayout from "../Layouts/HomeLayouts";
import { createAccount } from "../Redux/Slices/AuthSlice";

function SignUp(){
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const [previewImage,setPreviewImage]=useState("");

    const [signupData,setSignupData]=useState({
        name:"",
        email:"",
        password:"",
        role:"",
        avatar:"" //it stores as file.
    });



    function handleUserInput(e){
           const{name,value}=e.target;
            setSignupData({
                ...signupData,
               [name]:value  // name:value will take the key as a name not, email,pass etc 
            })
    }

    function getImage(event){

            event.preventDefault();
            const uploadedImg=event.target.files[0];

            if(uploadedImg){ 

            setSignupData({
            ...signupData,
            avatar:uploadedImg 
            })

            const reader = new FileReader();
            reader.readAsDataURL(uploadedImg); // it starts converting to base64
            
            reader.addEventListener("load",()=>{ // wait for reader until it gets converted
                // console.log(reader.result)
                return setPreviewImage(reader.result);

            })
           }
     
    }
  
    // on Form submit
    async function createNewAccount(event){
        event.preventDefault();
        // console.log(signupData);
        // CHECKING FOR ALL THE FIELDS
         if(!signupData.name ||  !signupData.email || !signupData.password || !signupData.avatar || !signupData.role){
            toast.error("please fill all the details");
            return
         }
         if(!signupData.email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
            toast.error("Invalid email address");
            return;
         }
        if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
         toast.error("Password should have minimum eight characters,must have uppercase letter, lowercase letter, number and  special characters");
            return;
        }
        // create a formData
        // chnaged this

            const payload = {
            name: signupData.name,
            email: signupData.email,
            password: signupData.password,
            role: signupData.role,
            };

        // console.log(formData.getAll);

        const response= await dispatch(createAccount(payload)); // should i use this? ANS: yes
        console.log(response);

        if(response?.payload?.success){
        navigate("/");
      }


        // clearing all the useStates
        setPreviewImage("");
        setSignupData({
            name:"",
            email:"",
            password:"",
            role:"",
            avatar:"" 
        })
    
    }

    return(

        <Homelayout>
            <div className="flex justify-center items-center h-[100vh]">

     <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg  p-4 text-white w-96 shadow-xl/20">
            <h1 className="text-center text-2xl font-bold"> Registration page</h1>

            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage?
              (<img src={previewImage} alt="" className="w-24 h-24 rounded-full m-auto bg-cover" /> )
             :(<BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>)}
            </label>

                <input
                 type="file"
                 className="hidden" 
                 name="image_uploads"
                 id="image_uploads"
                 accept=".jpg, .jpeg, .png, .svg" 
                 onChange={getImage}/>


              {/* name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Name</label>
                    <input 
                      type="name"
                      name="name" 
                      id="name"  
                      placeholder="harry..."
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={signupData.name}
                      />
                 </div>


             {/* email  */}
                 <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input 
                      type="email"
                      name="email" 
                      id="email"  
                      placeholder="abcs@gmail.com"
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={signupData.email}
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
                      value={signupData.password}
                      />
                 </div>
             
             {/* role */}
              <select 
  name="role" 
  value={signupData.role} 
  onChange={handleUserInput} 
  className="bg-transparent px-2 py-1 border rounded"
>
  <option value="">Select Role</option>
  <option value="patient">Patient</option>
  <option value="doctor">Doctor</option>
  <option value="staff">Staff</option>
  <option value="admin">Admin</option>
</select>
                

                {/* submit button */}
                 <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 mt-1 transition-all duration-300 ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer ">
                    Create Account
                 </button>

               {/* already have an account?*/}
               <p className="text-center">
                Already have an account ? 
                <Link to="/login" className="text-accent link ml-1">Login</Link>
               </p>

      </form>
            
            </div>


        </Homelayout>
    );

}
export default SignUp;