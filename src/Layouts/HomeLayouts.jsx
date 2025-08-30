import { elements } from "chart.js";
import { BiLogOut } from "react-icons/bi";
import { GrUserNew } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function Homelayout({ children }) {
 
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
  
  const role = useSelector((state)=>state?.auth?.role);


async function handleLogOut(e){
  e.preventDefault();
   const response= await dispatch(logout()); // should i use this? ANS: yes
   console.log(response);
  
  if(response?.payload?.success){ // from backend
   navigate("/");
  
}
}

  function close_drawer(){
    const ele=document.getElementsByClassName("drawer-toggle");
    ele[0].checked=false;
  }


    return (
      
  <div className="">
            {/* drawer */}
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer" className="btn btn-primary drawer-button h-[5vh]"><RiMenu2Fill/> </label>
                </div>
                <div className="drawer-side ">
                  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                  
                  {/* blur effect */}
                <ul className="menu text-white min-h-full w-80 p-4  bg-base-100/30 backdrop-blur-lg">  

                    {/* Sidebar content here */}
                    <li> 
                      
                      <div className="flex justify-between  z-10">
                        <Link to="/">Home</Link>
                        <button>< IoIosCloseCircleOutline  className="h-5 w-5" onClick={close_drawer}/></button>
                      </div>
                      
                      </li>
          
                  {isLoggedIn && role ==="admin" &&(
                <li>
                  <Link to="/allpatients" >All Patients</Link>
                </li>
              )}

                    {isLoggedIn && role ==="admin" &&(
                <li>
                  <Link to="/admin/medicalhistory/add" >Create Medicalrecord</Link>
                </li>
              )}
                       {isLoggedIn && role ==="admin" &&(
                <li>
                  <Link to="/admin/medicalhistory/view" >view Medicalrecord</Link>
                </li>
              )}


                     { role!=='doctor' && <li><Link to="/alldoctors">All Doctors</Link></li>} 
                    {/* <li><Link to="/details">My Details</Link></li> */}
                    <li><Link to="/contactus">Contact Us</Link></li>
                      <li><Link to="/aboutus">About Us</Link></li>
                      {isLoggedIn && role==="doctor"&&(
                          <li>
                  <Link to="/user/dashboard" >Doctor Dashboard</Link>
                </li>
                      )}
                            {isLoggedIn && role==="patient"&&(
                          <li>
                  <Link to="/user/dashboard" >Dashboard</Link>
                </li>
                      )}
                      
                    {/* if NOT LoggedIn logic */}
                    {/* {!isLoggedIn &&(
                        <li className="w-[70%] ">
                      <div className=" w-full flex items-center justify-center ">
                             <Link to="/login" className="w-1/2 btn btn-primary border font-semibold px-4 py-1 text-center rounded-md"> <button >Login</button></Link>
                        
                       
                        <Link to="/signup" className="w-1/2 btn btn-secondary border font-semibold px-4 py-1 text-center rounded-md"> <button >Signup</button></Link>
                        
                      </div>
                      </li>
                    )} */}

                                  {!isLoggedIn && (
  <li className="mt-2">
    <div className="w-full flex items-center justify-center gap-2">
      
        <>
              <Link to="/login" className="w-1/2 btn btn-primary border font-semibold px-4 py-1 text-center rounded-md"> <button >Login</button></Link>
                        
         <Link to="/signup" className="w-1/2 btn btn-secondary border font-semibold px-4 py-1 text-center rounded-md"> <button >Signup</button></Link>
                        
        </>
      
    </div>
  </li>
)}



                {/* if  LoggedIn logic */}
              {isLoggedIn && (
  <li className="mt-2">
    <div className="w-full flex items-center justify-center gap-2">
      {role === "patient" ? (
        <>
          <Link
            to="/profile"
            className="w-1/2 btn btn-primary border font-semibold px-4 py-1 text-center rounded-md"
          >
            Profile
          </Link>
          <Link
            onClick={handleLogOut}
            className="w-1/2 btn btn-secondary border font-semibold px-4 py-1 text-center rounded-md"
          >
            Logout
          </Link>
        </>
      ) : (
        <Link
          onClick={handleLogOut}
          className="w-full btn btn-secondary border font-semibold px-4 py-1 text-center rounded-md"
        >
          Logout
        </Link>
      )}
    </div>
  </li>
)}


                  </ul>
                </div>
            </div>




        {children}


        
        
        
        
        <Footer/>
    </div>
    )
}

export default Homelayout;