import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import AppointmentCard from "../Components/AppointmentCard";
import Homelayout from "../Layouts/HomeLayouts";
import { getAppointment } from "../Redux/Slices/GetAppointmentDoct";
function UserDashBoard(){

    const dispatch=useDispatch();
    const {allAppointment} = useSelector((state)=>state.allAppointment);
    const {role}=useSelector((state)=>state.auth);

        async function loadAppointment() {
          const response= await dispatch(getAppointment());
                // console.log("backend=",response)
        }

        useEffect(()=>{
            loadAppointment();
        },[]);


return(
<Homelayout>
              <div  className="min-h-[90vh] pt-12 px-20 flex flex-col  gap-10 text-white " >
                  {role!=='admin' &&  <h1> Your appointments </h1>}
                 {role==='admin' &&  <h1> All appointments </h1>}

                <div className="bg-[#33334d] rounded-sm shadow-xl/20 flex px-2 py-2 h-10 justify-between flex-row">
                   {role!=="admin" && <h1 className=" w-1/5">Appointment ID</h1>}
                   {role==="admin" && <h1 className=" w-1/5">Patient's Email</h1>}
                    <h2 className="w-1/5"> {(role=="doctor")? <>Patient's Email</>:<>Doctor's Email</>}</h2>
                    <h2 className="w-1/5"> Time  <span className="text-sm text-gray-500">(24-hr)</span></h2>
                    <h2 className="w-1/5"> Date</h2>
                    <h2 className="  pl-15 w-1/5"> Status</h2>
                </div>

                    {/* each elemt of array */}
                    <div >

                            {allAppointment?.map((ele,idx)=>
                              {
                               return <AppointmentCard  data={ele} onStatusChange={loadAppointment}/>
                               })}
                    
                    </div>


                </div> 
</Homelayout>

);
}

export default UserDashBoard;