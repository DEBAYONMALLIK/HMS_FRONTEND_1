import { getAdapter } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DoctorCard from "../../Components/DoctorCard";
import DoctorCardEdit from "../../Components/DoctorCardEdit";
import Homelayout from "../../Layouts/HomeLayouts";
import { getAllDoctors } from "../../Redux/Slices/AllDoctorsSlice";
function AllDoctorsList(){
const navigate= useNavigate();
     const role = useSelector((state)=>state?.auth?.role);
   const dispatch = useDispatch();
   
    const allDoctors=useSelector((state)=>state.allDoctors.allDoctors); // render from store -> initial state
     console.log("allllllll",allDoctors)
   async function loadDoctors(){
        await dispatch(getAllDoctors());
    }


  useEffect(()=>{
    loadDoctors();
  },[]); // on first render it will dispatch the action and gets all the value inside all doctors


    return(

        <Homelayout>
            <div  className="min-h-[90vh] pt-12 px-20 flex flex-col  gap-10 text-white " >
                    <h1>Get Your appointment </h1>

                <div className="bg-[#33334d] rounded-sm shadow-xl/20 flex px-2 py-2 h-10 flex-row">
                    <h1 className="flex-1 ">Name</h1>
                 
                    <h2 className="flex-1"> Email</h2>
                    <h2 className="flex-1"> Phone Number</h2>
                    <h2 className="flex-1"> Status</h2>
                </div>

                    {/* each elemt of array */}
                    <div >

                            {allDoctors?.map((ele,idx)=>
                              {
                                // if(role==='admin') return<DoctorCardEdit key={ele._id} data={ele} />
                               return <DoctorCard key={ele._id} data={ele}/>
                               })}
                               {role === "admin" && (
  <button
    onClick={() => navigate("/admin/doctor/add")}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
  >
    + Add Doctor
  </button>
)}
                    
                    </div>


                </div>    


        </Homelayout>
    );


}

export default AllDoctorsList;