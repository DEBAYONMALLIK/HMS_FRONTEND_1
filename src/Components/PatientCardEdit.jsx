import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";
import Homelayout from "../Layouts/HomeLayouts";
import { delete_patient } from "../Redux/Slices/PatientsSlice";
function PatientCardEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();

  // patient data passed via navigate(..., {state:data})
  const patientData = location.state;

  const [formData, setFormData] = useState({
    name: patientData?.name || "",
    dob: patientData?.dob ? patientData.dob.split("T")[0] : "", // YYYY-MM-DD
    gender: patientData?.gender || "",
    contact: patientData?.contact || "",
    email: patientData?.email || "",
    medical_history: patientData?.medical_history || [
      { date: "", treatment: "", medicine: [] },
    ],
  });

  // Handle top-level field changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle medical history change
  function handleHistoryChange(index, field, value) {
    const newHistory = [...formData.medical_history];
    newHistory[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      medical_history: newHistory,
    }));
  }

  // Handle medicine array
  function handleMedicineChange(index, value) {
    const newHistory = [...formData.medical_history];
    newHistory[index].medicine = value.split(",").map((m) => m.trim());
    setFormData((prev) => ({
      ...prev,
      medical_history: newHistory,
    }));
  }

  // Add new history record
  function addHistory() {
    setFormData((prev) => ({
      ...prev,
      medical_history: [
        ...prev.medical_history,
        { date: "", treatment: "", medicine: [] },
      ],
    }));
  }

  // Submit form -> PUT API
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/patient/api/v1/update/${patientData.email}`,
        formData
      );
      console.log("Updated patient:", res.data);

      toast.success("Patient updated successfully!");
      // navigate("/"); // redirect after update
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update patient info");
    }
  }

    async function deletePatient(){
    const response= await dispatch(delete_patient(patientData));
      if(response?.payload?.success){
        navigate(-1);
      }
      else {
        console.log("error in deleting patient");
      }
    }
  

  return (
    <Homelayout>
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Update Patient Info</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient Name"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Contact */}
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          {/* Email (readonly since unique identifier) */}
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 opacity-50 cursor-not-allowed"
          />

          {/* Medical History */}
          <div>
            <p className="font-semibold">Medical History:</p>
            {formData.medical_history.map((record, index) => (
              <div key={index} className="border border-gray-600 p-3 mb-2 rounded">
                <input
                  type="date"
                  value={record.date ? record.date.split("T")[0] : ""}
                  onChange={(e) =>
                    handleHistoryChange(index, "date", e.target.value)
                  }
                  className="p-2 rounded bg-gray-800 border border-gray-600 mr-2"
                />
                <input
                  type="text"
                  value={record.treatment || ""}
                  onChange={(e) =>
                    handleHistoryChange(index, "treatment", e.target.value)
                  }
                  placeholder="Treatment"
                  className="p-2 rounded bg-gray-800 border border-gray-600 mr-2"
                />
                <input
                  type="text"
                  value={record.medicine?.join(", ") || ""}
                  onChange={(e) => handleMedicineChange(index, e.target.value)}
                  placeholder="Medicines (comma separated)"
                  className="p-2 rounded bg-gray-800 border border-gray-600"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addHistory}
              className="mt-2 bg-gray-700 px-3 py-1 rounded"
            >
              + Add Record
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        type="button"
         onClick={deletePatient}>
          Delete
        </button>
        </form>
      </div>
    </Homelayout>
  );
}

export default PatientCardEdit;
