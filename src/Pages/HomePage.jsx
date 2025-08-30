import { useEffect } from "react";
import { FaAmbulance } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBedPulse } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import ChatBotWidget from "../Components/ChatBotWidget";
import Homelayout from "../Layouts/HomeLayouts";
import { getAllDoctors } from "../Redux/Slices/AllDoctorsSlice";
import { getAllPatients } from "../Redux/Slices/AllPatientsSlice";
function HomePage() {
  const pieData = [
    { name: "Completed", value: 28 },
    { name: "Remaining", value: 72 },
  ];

   const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);
  const role = useSelector((state)=>state?.auth?.role);

    const {allDoctors}=useSelector((state)=>state.allDoctors); // render from store
    const {allPatients} =useSelector((state)=>state.allPatients)

  const dispatch=useDispatch();

  async function load_doct() {
    await dispatch(getAllDoctors());
    await dispatch(getAllPatients());
  }

useEffect(()=>{
    load_doct()
},[])

const total_patient=allPatients.length;
console.log("Total Patients=",allPatients)

const total_doct=allDoctors.length;

const COLORS = ["#14b8a6", "#0f172a"];

  return (
    <Homelayout>
      <div className="pt-10 mx-2 text-white flex flex-col md:flex-row items-center justify-center gap-10 min-h-[85vh]">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 pl-[5%]">
          <h1 className="text-5xl font-semibold leading-tight">
            Manage your <span className="text-teal-400 font-bold">hospital</span> with ease
          </h1>
          <h3 className="mt-3 text-gray-300 text-lg w-10/12">
            Get real-time insights on patients, doctors, rooms, and ambulances. 
            Streamline your hospital operations and improve efficiency with our 
            intuitive dashboard.
          </h3>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/user/dashboard">
              <button className="bg-teal-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all">
                View Dashboard
              </button>
            </Link>
            { role!=='doctor' && role!=='admin' &&
            <Link to="/alldoctors">
              <button className="border border-teal-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-teal-600 transition-all">
                Book Appointment
              </button>
            </Link>}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <div className="bg-[#0f172a] text-white p-8 rounded-xl shadow-lg w-full max-w-[500px]">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Patients</p>
                  <p className="text-2xl font-bold">{total_patient}</p>
                </div>
                <div className="bg-teal-500 p-3 rounded-full">
                < FaUser />
                </div>
              </div>

              <div className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Doctors</p>
                  <p className="text-2xl font-bold">{total_doct}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                 <FaUserDoctor />
                </div>
              </div>

              <div className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Beds</p>
                  <p className="text-2xl font-bold">2,000</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                <FaBedPulse />
                </div>
              </div>

              <div className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Ambulances</p>
                  <p className="text-2xl font-bold">50</p>
                </div>
                <div className="bg-red-500 p-3 rounded-full">
                  {/* <i className="fas fa-ambulance text-xl"></i> */}
                  <FaAmbulance />
                </div>
              </div>
            </div>

            {/* Pie Chart + Details */}
            <div className="mt-6 bg-[#1e293b] p-6 rounded-lg">
              {/* Header Stats */}
              <div className="flex gap-6 mb-4 flex-wrap">
                <p className="text-teal-400">30 New Tasks</p>
                <p className="text-blue-400">50 New Patients</p>
                <p className="text-red-400">20 Notifications</p>
              </div>

              <div className="flex items-center gap-6">
                {/* Pie Chart */}
                <div className="relative w-32 h-32">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={40}
                        outerRadius={50}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="absolute text-xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    28%
                  </p>
                </div>

                {/* Details */}
                <div className="text-sm text-gray-300 space-y-2">
                  <p>Total Patients: {total_patient}</p>
                  <p>Total Doctors: {total_doct}</p>
                  <p>Appointments Today: 90</p>
                  <p>Departments: 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBotWidget/>
    </Homelayout>
  );
}

export default HomePage;
