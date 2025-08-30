import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateAppointment } from "../Redux/Slices/UpdateAppointment";

function AppointmentCard({ data, onStatusChange }){
const appointment=data;
console.log("data=",data)
const dispatch=useDispatch();

async function handleStatusUpdate(patient,doctor,status){
  const payload={
    patient:patient,
    doctor:doctor,
    status:status,
  }
  const response = await dispatch(updateAppointment(payload));
  if(response?.payload?.success){onStatusChange();}
  else return
      
}
  // useEffect(()=>{
   
  // },[handleStatusUpdate]);



    return(
        <div
          className="text-white  flex flex-row justify-between cursor-pointer px-2 py-5 overflow-hidden tracking-wide "
    
        >

                
                <p className="text-[#8585ad]  w-1/5 line-clamp-3 " > {data?._id} </p>
               
           
            <p className=" line-clamp-2 w-1/5 ">{data?.patient}</p>
            <p className=" line-clamp-2 w-1/5">{data?.time}</p>
            <p className=" line-clamp-2 w-1/5">{data?.date.split('T')[0]}</p>
            {/* <p className="flex-1 line-clamp-2 ">{data?.status}</p> */}
            <div className=" flex w-1/5">
  {appointment.status === "pending" ? (
    <div className="flex justify-between">
      <button
        className="bg-green-600 text-white px-3 mr-1 py-1 rounded hover:bg-green-700"
        onClick={() => handleStatusUpdate(appointment.patient,appointment.doctor, "confirmed")}
      >
        Accept
      </button>
      <button
        className="bg-red-600 text-white px-3 py-1  mr-25 rounded hover:bg-red-700"
        onClick={() => handleStatusUpdate(appointment.patient,appointment.doctor, "cancelled")}
      >
        Reject
      </button>
    </div>
  ) : (
    <span
      className={`px-3 py-1 rounded font-semibold ml-10 ${
        appointment.status === "confirmed"
          ? "bg-green-500"
          : "bg-red-500"
      } text-white`}
    >
      {appointment.status}
    </span>
  )}
</div>

                {/* is active button */}

        </div>

    );
}


export default AppointmentCard;