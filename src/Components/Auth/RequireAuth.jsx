import { useSelector } from "react-redux"
import { Navigate,Outlet, useLocation } from "react-router-dom";

function RequireAuth({ allowedRoles }){
       console.log("param value",allowedRoles);
    const{isLoggedIn , role}=useSelector((state)=>state.auth);
    
    console.log(role) //"doctor"
    console.log(localStorage.getItem("role")); 
   
    const location =useLocation();

 


    
    return isLoggedIn && allowedRoles.find((myRole)=>(myRole==role))  ? <Outlet/>
    :isLoggedIn ? (<Navigate to="/denied"/>):<Navigate to="/login"/>

}

export default RequireAuth