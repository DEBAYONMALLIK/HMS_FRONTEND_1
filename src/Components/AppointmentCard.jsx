
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateAppointment } from "../Redux/Slices/UpdateAppointment";


function AppointmentCard({ data, onStatusChange }){

const appointment=data;
console.log("data=",data)

const role=useSelector((state)=>state.auth.role);

console.log("role==",role)
const dispatch=useDispatch();

async function handleStatusUpdate(patient,doctor,time,date,status){

  const payload={
    patient:patient,
    doctor:doctor,
    status:status,
    time:time,
    date:date,

  }
  const response = await dispatch(updateAppointment(payload));
  if(response?.payload?.success){onStatusChange();}
  else return
      
}


    return(
        <div
          className="text-white  flex flex-row justify-between cursor-pointer px-2 py-5 overflow-hidden tracking-wide" >

                
               {role!=='admin' && <p className="text-[#8585ad]  w-1/5 line-clamp-3 " > {data?._id} </p>}
                 {role==='admin' && <p className=" w-1/5 line-clamp-3 " > {data?.patient} </p>} 

            <p className=" line-clamp-2 w-1/5 ">{(role==="doctor")?data?.patient:data?.doctor}</p>
            <p className=" line-clamp-2 w-1/5">{data?.time}</p>
            <p className=" line-clamp-2 w-1/5">{data?.date.split('T')[0]}</p>
         
            <div className=" flex w-1/5">
  {appointment.status === "pending" ? (
     (role ==="doctor")?(
     <div className="flex justify-between">

      <button
        className="bg-green-600 text-white px-3 mr-1 py-1 rounded hover:bg-green-700"
        onClick={() => handleStatusUpdate(appointment.patient,appointment.doctor, appointment.time,appointment.date,"confirmed")}
      >
        Accept
      </button>

      <button
        className="bg-red-600 text-white px-3 py-1  mr-25 rounded hover:bg-red-700"
        onClick={() => handleStatusUpdate(appointment.patient,appointment.doctor,appointment.time,appointment.date,"cancelled")}
      >
        Reject
      </button>

    </div>):(<div className="flex justify-between">
      <span
      className="px-3 py-1 rounded font-semibold ml-10 bg-orange-400"
      >Pending</span>
    </div>)  
 

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