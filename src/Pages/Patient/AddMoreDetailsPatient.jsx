import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Homelayout from "../../Layouts/HomeLayouts";
import { add_more_patient_details } from "../../Redux/Slices/PatientsSlice";
function AddMoreDetailPatient(){

    const dispatch=useDispatch();

    console.log("AllDetails page")
    const navigate=useNavigate();

  const [allDetailData,setAllDetailData]=useState({
    contact:"",
    gender:"Male",
    dob:"",
  })


    function handleUserInput(e){
            const{name,value}=e.target;
            setAllDetailData({
                ...allDetailData,
                [name]:value,
            })

    }


    async function createAllDetail(event){
        event.preventDefault();
  
        if(!allDetailData.contact){
            toast.error("please enter all the fields");
            return;
        }

      

          console.log(
            "CHECK THIS FIELD",allDetailData)


                // console.log(allDetailData)

            const payload = {
            contact:allDetailData.contact,
            gender:allDetailData.gender,
            dob:allDetailData.dob,
            };
            // console.log("myyyyyyyyyy=",payload)

   

        const response= await dispatch(add_more_patient_details(payload)); // should i use this? ANS: yes
        // console.log("responseeeeeee=",response);

        if(response?.payload?.success)
      {
        navigate("/");
      }


        // clearing all the useStates
   
        setAllDetailData({
           contact:"",
           gender:"",
         dob:"",
        })
    
    }

    return(
    <Homelayout>
          <div className="flex justify-center items-center h-[100vh]">
                 <form noValidate onSubmit={createAllDetail} className="flex flex-col justify-center gap-3 rounded-lg  p-4 text-white w-96 shadow-xl/20">
            <h1 className="text-center text-2xl font-bold"> Registration page</h1>




              {/* phone */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="contact" className="font-semibold">Phone</label>
                    <input 
                      type="number"
                      name="contact" 
                      id="contact"  
                      placeholder="9476..."
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={allDetailData.contact}
                      />
                 </div>

    
            
             {/* Gender     */}
                <div className="flex flex-col gap-1">
            <label htmlFor="gender" className="font-semibold">Gender</label>
            <select

                name="gender"
                id="gender"
                className="bg-transparent px-2 py-1 border rounded"
                value={allDetailData.gender}
                onChange={handleUserInput} >

                <option value="Male">  Male   </option>
                <option value="Female">Female</option>

            </select>
            </div>

          {/* D.O.B */}
                      <div className="flex flex-col gap-1">
                    <label htmlFor="dob" className="font-semibold">D.O.B</label>
                    <input 
                      type="date"
                      name="dob" 
                      id="dob"  
                      placeholder="2004-02-28"
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={allDetailData.dob}
                      />
                 </div>


            {/* check box */}

                       {/* <div className="flex flex-col gap-1">
                    <label htmlFor="specialization" className="font-semibold">MONDAY</label>
                    <input 
                      type="checkbox"
                      name="specialization" 
                      id="specialization"  
                      placeholder="ortho..."
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={allDetailData.specialization}
                      />
                 </div> */}


   {/* {Object.entries(checkedState).map(([day,ischecked],idx)=>{
    return (<>
     <label htmlFor={day} className="font-semibold"> {day}</label>
    <input type="checkbox"
    id={day}
    onChange={()=>{
        setCheckedState((prev)=>({
          ...prev,
          [day]:!ischecked
        }))
      }}
     />
    </>);
   })} */}

                {/* submit button */}
                 <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 mt-1 transition-all duration-300 ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer ">
                    Add Details
                 </button>

               {/* already have an account?*/}
            

      </form>

          </div>
  
    </Homelayout>);
}
export default AddMoreDetailPatient;