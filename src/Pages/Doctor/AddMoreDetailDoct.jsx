import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Homelayout from "../../Layouts/HomeLayouts";
import { add_more_doct_details } from "../../Redux/Slices/AddMoreDetailDoct";

function AddMoreDetailsDoct(){
// time slot is remaining
const [checkedState, setCheckedState] = useState({
  monday: false,
  tuesday: false,
  wednesday:false,
  thursday:false,
  friday:false,
  saturday:false,
  sunday:false
});

// console.log(checkedState)

    const dispatch=useDispatch();
    const navigate= useNavigate();

//   const details = useSelector((state) => state.add_more_doct_details);
// console.log(details); 

    const [allDetailData,setAllDetailData]=useState({
        phone:"",
        isActive:false,
        specialization:"",
        //it stores as file.
        availability:{
            days:[],
            timeslots:[
              {
              start:"",
              end:""
              }
                       ]
        }
    });



    function handleUserInput(e){
           const{name,value}=e.target;
            
           setAllDetailData({
                ...allDetailData,
               [name]:name==="isActive"?value==="true":value     // name:value will take the key as a name not, email,pass etc 
            })
    }


    // on Form submit
    async function createAllDetail(event){
        event.preventDefault();
  
        if(!allDetailData.phone){
            toast.error("please enter all the fields");
            return;
        }

          const selectedDays=Object.entries(checkedState).filter(([day,ischeckd])=>ischeckd)
          .map(([day])=>day);

        // setAllDetailData((prev)=>({
        //   ...prev,
        //   availability:{
        //     ...prev.availability,
        //     days:selectedDays
        //   }
        // }))

          // creating a new array of days

          console.log(
            "CHECK THIS FIELD",allDetailData)


                // console.log(allDetailData)

            const payload = {
            phone:allDetailData.phone,
            isActive:allDetailData.isActive,
            specialization:allDetailData.specialization,
            availability: {
            ...allDetailData.availability,
            days: selectedDays, // ✅ directly use it here
             },
            };
            // console.log("myyyyyyyyyy=",payload)

   

        const response= await dispatch(add_more_doct_details(payload)); // should i use this? ANS: yes
        // console.log("responseeeeeee=",response);

        if(response?.payload?.success)
      {
        navigate("/");
      }


        // clearing all the useStates
   
        setAllDetailData({
          phone:"",
          isActive:false,
        })
    
    }

    return(

        <Homelayout>
            <div className="flex justify-center items-center h-[100vh]">

     <form noValidate onSubmit={createAllDetail} className="flex flex-col justify-center gap-3 rounded-lg  p-4 text-white w-96 shadow-xl/20">
            <h1 className="text-center text-2xl font-bold"> Registration page</h1>




              {/* phone */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="font-semibold">Phone</label>
                    <input 
                      type="number"
                      name="phone" 
                      id="phone"  
                      placeholder="9476..."
                      className="bg-transparent px-2 py-1 border rounded"
                      onChange={handleUserInput}
                      value={allDetailData.phone}
                      />
                 </div>

    
            
             {/* isActive     */}
                <div className="flex flex-col gap-1">
            <label htmlFor="isActive" className="font-semibold">Is Active</label>
            <select

                name="isActive"
                id="isActive"
                className="bg-transparent px-2 py-1 border rounded"
                value={allDetailData.isActive}
                onChange={handleUserInput} >

                <option value="true">True</option>
                <option value="false">False</option>
            </select>
            </div>

          {/* specialization */}
           <div className="flex flex-col gap-1">
  <label htmlFor="specialization" className="font-semibold">
    Specialization
  </label>
  <select
    name="specialization"
    id="specialization"
    className="bg-transparent px-2 py-1 border rounded"
    onChange={handleUserInput}
    value={allDetailData.specialization}
  >
    <option value="">Select Department</option>
    <option value="generalMedicine">General Medicine</option>
    <option value="cardiology">Cardiology</option>
    <option value="dermatology">Dermatology</option>
    <option value="pediatrics">Pediatrics</option>
    <option value="gynecology">Gynecology</option>
    <option value="orthopedics">Orthopedics</option>
  </select>
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


   {Object.entries(checkedState).map(([day,ischecked],idx)=>{
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
   })}

                {/* submit button */}
                 <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 mt-1 transition-all duration-300 ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer ">
                    Add Details
                 </button>

               {/* already have an account?*/}
            

      </form>
            
            </div>


        </Homelayout>
    );

}
export default AddMoreDetailsDoct;