
import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate=useNavigate();
    return(
        <div className="h-[100vh] flex flex-col justify-center items-center">

            <h1 className="text-9xl text-white font-extrabold tracking-widest">
                404
            </h1>

            <div className="bg-black text-white px-2 tx-sm rotate-12 absolute">
                page not found ...
            </div>

         
                <button onClick={()=>navigate(-1)} className="border border-amber-500 my-5 py-3 px-8 text-amber-500" >Go Back</button>
            

        </div>
    );

}

export default NotFound;