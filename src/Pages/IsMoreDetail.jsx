import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";

function IsMoreDetail() {
  const navigate = useNavigate();
  const data = useLocation();

  const email = data.state?.email;
  const role = data.state?.role;

  useEffect(() => {
    async function check() {
      console.log("role:", role);

      if (role === "doctor") {
        try {
          const res = await axiosInstance.get(`doct/api/v1/getbyemail?email=${email}`);
          console.log("junction page", res);
          navigate("/");
        } catch (error) {
          console.log(error);
          navigate("/doctor/adddetails");
        }
      } else if (role === "patient") {
        try {
          const res = await axiosInstance.get(`patient/api/v1/getbyemail?email=${email}`);
          console.log("junction page", res);
          navigate("/");
        } catch (error) {
          console.log(error);
          navigate("/patient/adddetails");
        }
      } 
    //   else if (role === "admin") {
    //     console.log("redirect to homepage");
    //     navigate("/");
    //   }
    }

    check();
  }, [email, role, navigate]); // dependencies
}

export default IsMoreDetail;
