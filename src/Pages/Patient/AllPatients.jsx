import { getAdapter } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DoctorCard from "../../Components/DoctorCard";
import DoctorCardEdit from "../../Components/DoctorCardEdit";
import PatientCard from "../../Components/PatientCard";
import Homelayout from "../../Layouts/HomeLayouts";
import { getAllDoctors } from "../../Redux/Slices/AllDoctorsSlice";
import { getAllPatients } from "../../Redux/Slices/AllPatientsSlice";

function AllPatientsList(){

     const role = useSelector((state)=>state?.auth?.role);
   const dispatch = useDispatch();
   
    const allPatients=useSelector((state)=>state.allPatients.allPatients); // render from store -> initial state
    console.log("allllllll",allPatients)
   async function loadPatients(){
        await dispatch(getAllPatients());
    }


  useEffect(()=>{
    loadPatients();
  },[]); // on first render it will dispatch the action and gets all the value inside all doctors


    return(

        <Homelayout>
            <div  className="min-h-[90vh] pt-12 px-20 flex flex-col  gap-10 text-white " >
                    <h1>Get Your appointment </h1>

                {/* <div className="bg-[#33334d] rounded-sm shadow-xl/20 flex px-2 py-2 h-10 flex-row">
                    <h1 className="flex-1 ">Name</h1>
                    <h2 className="flex-1"> ID</h2>
                    <h2 className="flex-1"> Email</h2>
                    <h2 className="flex-1"> Phone Number</h2>
                    <h2 className="flex-1">Edit</h2>
                  
                </div> */}
                   <div className="bg-[#33334d] rounded-sm shadow-xl/20 flex px-5 py-2 h-10 justify-between">
                    <h1 >Name</h1>
                    <h2 > ID</h2>
                    <h2 > Email</h2>
                    <h2 > Phone Number</h2>
                    <h2 >Edit Info</h2>
                    {/* <h2 className="flex-1"> Status</h2> */}
                </div>

                    {/* each element of array */}
                    <div >

                            {allPatients?.map((ele,idx)=>
                              {
                                // if(role==='admin') return<DoctorCardEdit key={ele._id} data={ele} />
                               return <PatientCard key={ele._id} data={ele}/>
                               })}
                    
                    </div>


                </div>    


        </Homelayout>
    );


}

export default AllPatientsList;