import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PatientCard({data})
{
   const nagivate=useNavigate();
  
  const role = useSelector((state)=>state?.auth?.role);
  console.log("fucking role=",data) // printing admi
   return(
    
    <div 
     className="text-white  flex flex-row cursor-pointer px-2 py-5 overflow-hidden tracking-wide "
     >
    
    
 
                <div className="flex-1 "> <h2 className=" capitalize   text-xl font-bold  line-clamp-2">{data?.name}</h2>
                <p className="text-[#8585ad]"> {data?.specialization} </p>
                </div>
           
            <p className="flex-1 line-clamp-2 ">{data?.userId}</p>
            <p className="flex-1 line-clamp-2">{data?.email}</p>
            <p className="flex-1 line-clamp-2 ">{data?.contact}</p>
                     <div className=" flex flex-row  "> 
                     
                        <div className="flex-1 pl-20 pt-2 ">
                         {/* passing data inside navigator tag */}
   <FaArrowRight className="h-6 w-6" onClick={()=>{nagivate("/admin/patient/edit",{state:data})}} />
                       </div> 
                       </div>
  

    </div>

   ); 

}
export default PatientCard;