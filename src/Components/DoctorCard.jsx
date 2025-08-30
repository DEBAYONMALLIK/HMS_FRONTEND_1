import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorCard({data})
{
   const nagivate=useNavigate();
 
  const role = useSelector((state)=>state?.auth?.role);
  
   return(
    
    <div 
     className="text-white  flex flex-row cursor-pointer px-2 py-5 overflow-hidden tracking-wide "
     >
    
    
 
                <div className="flex-1 "> <h2 className=" capitalize   text-xl font-bold  line-clamp-2">{data?.name}</h2>
                <p className="text-[#8585ad]"> {data?.specialization} </p>
                </div>
           
          
            <p className="flex-1 line-clamp-2">{data?.email}</p>
            <p className="flex-1 line-clamp-2 ">{data?.phone}</p>
                {/* is active button */}
                <div className="flex-1"> 
                      {(data?.isActive)
                      ?  
                      <div className=" flex flex-row  "> 
                        <button className="  text-green-50 w-30 py-1  hover:shadow-lg hover:shadow-green-500/50 border rounded-xl border-green-700 bg-[#034603]">
                        Available
                        </button> 
                        <div className="flex-1 pl-20 pt-2 ">
                         {/* passing data inside navigator tag */}

                            <  FaArrowRight className="h-6 w-6" onClick={()=>{ 
                                if(role=== "admin") nagivate("/admin/doctor/edit",{state:data})
                              else nagivate("/doctor/description",{state:data})
                             }} />
                       </div> 
                       </div>
                       :
                         <div className=" flex flex-row  "> 
                        <button className="  text-red-50 w-30 py-1  hover:shadow-lg hover:shadow-red-500/50 border rounded-xl border-red-700 bg-[#4d0000]">
                        Unavailable
                        </button> 
                        <div className="flex-1 pl-20 pt-2 ">
                            {/* passing data inside navigator tag */}
                            
                            <  FaArrowRight className="h-6 w-6" onClick={()=>{
                              if(role=== "admin") nagivate("/admin/doctor/edit",{state:data})
                              else nagivate("/doctor/description",{state:data})}
                            } />
                        </div> 
                        </div>
                       }
              </div>
        
  

    </div>

   ); 

}
export default DoctorCard;