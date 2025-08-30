import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserDoctor } from "react-icons/fa6";
import { useDispatch,useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Homelayout from "../../Layouts/HomeLayouts";
import { add_appointment } from "../../Redux/Slices/AddApointment";

function AllDoctorsDescription() {
  const locator = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Auth_details = useSelector((state) => state.auth);

  const [email, setemail] = useState({
    patient: Auth_details.data.email,
    doctor: locator.state.email,
    time: "",
    date: ""
  });

  const availableTimeSlots = locator.state.availability.timeslots || [];
  const availableDays = locator.state.availability.days || [];
  const normalizedAvailableDays = availableDays.map((day) =>
    day.toLowerCase()
  );

  function handleUserInput(e) {
    const { name, value } = e.target;
    setemail({
      ...email,
      [name]: value
    });
  }

  async function BookApointment(event) {
    event.preventDefault();

    const selectedDate = new Date(email.date);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const datevalue = selectedDate.toLocaleDateString("en-US", {
      weekday: "long"
    }).toLowerCase();

    if (!Auth_details.isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!normalizedAvailableDays.includes(datevalue) || selectedDate < today) {
      toast.error("Choose an appropriate day");
      return;
    }

    const response =await dispatch(add_appointment(email));

    setemail({
      patient: Auth_details.data.email,
      doctor: locator.state.email,
      time: "",
      date: ""
    });
      if(response?.payload?.success){ // from backend
                navigate("/",{state:response.payload})
  }
  
}

  const todayStr = new Date().toISOString().split("T")[0]; // for input min

  return (
<Homelayout>
    <div className="flex justify-center h-screen items-center ">
    <div className=" max-w-2xl mx-auto p-6 rounded-xl  space-y-6 shadow-[0_0_20px_2px_rgba(59,_130,_246,_0.3)]   transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_3px_rgba(59,_130,_246,_0.6)] ">
      

      <div className="text-center  items-center ">

       <div className="flex justify-center py-2">
   <FaUserDoctor className="text-blue-100 h-20 w-20" />
     </div>  

        <h2 className="text-2xl font-bold py-2 px-20 ">Dr {locator.state.name}</h2>
        <p className="text-gray-600">{locator.state.specialization}</p>
        <p className="text-sm text-gray-500">📧 {locator.state.email}</p>
        <p className="text-sm text-gray-500">📞 {locator.state.phone}</p>
        {availableDays.length > 0 && (
  <div>
    <label className="block font-medium mb-1 py-2">Available Days:</label>
    <div className="flex flex-wrap gap-2">
      {availableDays.map((day, index) => (
        <span
          key={index}
          className="bg-[#034603] text-green-50 text-sm px-3 py-1 rounded-full border  border-green-700"
        >
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </span>
      ))}
    </div>
  </div>
)}
      
      </div>

      <form onSubmit={BookApointment} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="date">
            Choose Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={email.date}
            onChange={handleUserInput}
            className="w-full border p-2 rounded"
            min={todayStr} // disables past dates
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="time">
            Choose Time Slot:
          </label>
          <select
            name="time"
            id="time"
            value={email.time}
            onChange={handleUserInput}
            className="w-full border p-2 rounded bg-[#1d232a]"
          >
            <option value="">--Select--</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={`${slot.start}-${slot.end}`}>
                {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Book Appointment
        </button>
      </form>
    </div>
    </div>
    </Homelayout>
  );
}

export default AllDoctorsDescription;
