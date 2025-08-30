import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
Bar,   BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
Tooltip, XAxis, YAxis} from "recharts";

import Homelayout from "../../Layouts/HomeLayouts";
import { getMedicalRecord } from "../../Redux/Slices/GetMedicalHistory";


function UserProfile() {
   
    const dispatch=useDispatch();

  async function LoadMedicalHistory(){
   const res= await dispatch(getMedicalRecord());

  }

useEffect(()=>{LoadMedicalHistory();},[])


  const userData = useSelector((state) => state?.auth?.data);
  const medicalData = useSelector((state) => state?.medicalHistory);

//   console.log("from state",medicalData.patient)


    const healthStatsData=medicalData?.MedicalHistory?.healthStats;


//   const weightProgressData = [
//     { month: "Jan", weight: 78 },
//     { month: "Feb", weight: 79 },
//     { month: "Mar", weight: 78.5 },
//     { month: "Apr", weight: 80 },
//     { month: "May", weight: 79.5 },
//   ];

  const weightProgressData=medicalData?.MedicalHistory?.weight;

  return (
    <Homelayout>
      <div className="bg-gray-900 min-h-screen text-white p-6 space-y-6 max-w-5xl mx-auto rounded-2xl my-10">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-700" />
          <div>
            <h2 className="text-2xl font-bold">{userData?.name || "John Doe"}</h2>
            <p className="text-gray-400">{medicalData?.MedicalHistory?.patient || "john@example.com"}</p>
          </div>
        </div>

        {/* Medical Records */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Medical Record</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div><strong>Blood Group:</strong> {medicalData?.MedicalHistory?.bloodGroup || "c+"}</div>
            <div><strong>Height:</strong> {medicalData?.MedicalHistory?.height || 180} cm</div>
            <div><strong>Weight:</strong> {medicalData?.MedicalHistory?.weight?.[0]?.weight || 80} kg</div>

            <div><strong>Allergies:</strong> {(medicalData?.MedicalHistory?.allergies || []).join(",  ")  }</div>

            <div><strong>Surgeries:</strong> {(medicalData?.MedicalHistory?.pastSurgeries || ["Appendectomy"]).join(", ")}</div>
            <div><strong>Diseases:</strong> {(medicalData?.MedicalHistory?.chronicDiseases || ["Hypertension"]).join(", ")}</div>
            <div><strong>Medications:</strong> {(medicalData?.MedicalHistory?.medications || ["Atorvastatin"]).join(", ") }</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Health Stats</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={healthStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#333", border: "none", color: "#fff" }} />
                <Line type="monotone" dataKey="weight" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speedometer */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Health Meter</h3>
          <div className="flex justify-center">
            <ReactSpeedometer
              maxValue={200}
              value={medicalData?.MedicalHistory?.healthMeter}
              needleColor="white"
              startColor="white"
              endColor="blue"
              textColor="#fff"
              height={200}
            />
          </div>
        </div>
      </div>
    </Homelayout>
  );
}

export default UserProfile;
