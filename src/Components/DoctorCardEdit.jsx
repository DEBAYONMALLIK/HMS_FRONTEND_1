import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";
import Homelayout from "../Layouts/HomeLayouts";
import { delete_doctor } from "../Redux/Slices/AddMoreDetailDoct";
function DoctorCardEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // doctor data passed via navigate(..., {state:data})
  const doctorData = location.state;

  const [formData, setFormData] = useState({
    name: doctorData?.name || "",
    tags: doctorData?.tags || "",
    experience: doctorData?.experience || "",
    review: doctorData?.review || "",
    specialization: doctorData?.specialization || "",
    email: doctorData?.email || "",
    phone: doctorData?.phone || "",
    isActive: doctorData?.isActive || false,
    availability: {
      days: doctorData?.availability?.days || [],
      timeslots: doctorData?.availability?.timeslots || [
        { start: "", end: "" },
      ],
    },
  });

  // Handle simple fields
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Handle nested fields: days
  function handleDaysChange(e) {
    const { value, checked } = e.target;
    let newDays = [...formData.availability.days];
    if (checked) {
      newDays.push(value);
    } else {
      newDays = newDays.filter((d) => d !== value);
    }
    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, days: newDays },
    }));
  }

  // Handle nested fields: timeslots
  function handleTimeslotChange(index, field, value) {
    const newTimeslots = [...formData.availability.timeslots];
    newTimeslots[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, timeslots: newTimeslots },
    }));
  }

  // Add new timeslot
  function addTimeslot() {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeslots: [...prev.availability.timeslots, { start: "", end: "" }],
      },
    }));
  }

  // Submit form -> PUT API
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/doct/api/v1/update/${doctorData.email}`,
        formData
      );
      console.log("Updated doctor:", res.data);
    
    //   navigate("/"); // redirect back to list
    toast.success("Doctor updated successfully!")
    } catch (error) {
      console.error("Update failed:", error);
      
      toast.error("Failed to update doctor info")
    }
  }

  async function deleteDoctor(){
  const response= await dispatch(delete_doctor(doctorData));
    if(response?.payload?.success){
      navigate(-1);
    }
    else {
      console.log("error in deleting doctor");
    }
  }


  return (
    <Homelayout>
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Update Doctor Info</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* Tags */}
        <textarea
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma or space separated)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* Experience */}
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience (years)"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* Review */}
        <input
          type="number"
          step="0.1"
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Review Rating"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* Specialization */}
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
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

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        />

        {/* Active Status */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        {/* Availability Days */}
        <div>
          <p className="font-semibold">Availability Days:</p>
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
            (day) => (
              <label key={day} className="mr-4">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.availability.days.includes(day)}
                  onChange={handleDaysChange}
                />{" "}
                {day}
              </label>
            )
          )}
        </div>

        {/* Availability Timeslots */}
        <div>
          <p className="font-semibold">Availability Timeslots:</p>
          {formData.availability.timeslots.map((slot, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="time"
                value={slot.start}
                onChange={(e) =>
                  handleTimeslotChange(index, "start", e.target.value)
                }
                className="p-2 rounded bg-gray-800 border border-gray-600"
              />
              <input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  handleTimeslotChange(index, "end", e.target.value)
                }
                className="p-2 rounded bg-gray-800 border border-gray-600"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeslot}
            className="mt-2 bg-gray-700 px-3 py-1 rounded"
          >
            + Add Timeslot
          </button>
        </div>

        {/* Submit */}
       
         <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2"  >
          Update
         </button>

        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        type="button"
         onClick={deleteDoctor}>
          Delete
        </button>
      </form>
    </div>
    </Homelayout>
  );
}

export default DoctorCardEdit;
