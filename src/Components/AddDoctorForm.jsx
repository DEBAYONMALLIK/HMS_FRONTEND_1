import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";
import Homelayout from "../Layouts/HomeLayouts";

function AddDoctorForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    tags: "",
    experience: "",
    review: "",
    specialization: "",
    email: "",
    phone: "",
    isActive: true,
    availability: {
      days: [],
      timeslots: [{ start: "", end: "" }],
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

  // Handle availability days
  function handleDaysChange(e) {
    const { value, checked } = e.target;
    let newDays = [...formData.availability.days];
    if (checked) newDays.push(value);
    else newDays = newDays.filter((d) => d !== value);

    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, days: newDays },
    }));
  }

  // Handle availability timeslots
  function handleTimeslotChange(index, field, value) {
    const newTimeslots = [...formData.availability.timeslots];
    newTimeslots[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, timeslots: newTimeslots },
    }));
  }

  function addTimeslot() {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeslots: [...prev.availability.timeslots, { start: "", end: "" }],
      },
    }));
  }

  // Submit form -> POST API
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("fucking name==",formData.email)
    try {
      const res = await axiosInstance.post("/doct/api/v1/addDetails", formData);
      console.log("Doctor added:", res.data);
      toast.success("Doctor added successfully!");
      navigate("/admin/doctors"); // redirect back to list
    } catch (error) {
      console.error("Create failed:", error);
      toast.error("Failed to add doctor");
    }
  }

  return (
    <Homelayout>
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Add New Doctor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor Name"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <textarea
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <input
            type="number"
            step="0.1"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Review Rating"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          {/* Availability days */}
          <div>
            <p className="font-semibold">Availability Days:</p>
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <label key={day} className="mr-4">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.availability.days.includes(day)}
                  onChange={handleDaysChange}
                />{" "}
                {day}
              </label>
            ))}
          </div>

          {/* Timeslots */}
          <div>
            <p className="font-semibold">Availability Timeslots:</p>
            {formData.availability.timeslots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => handleTimeslotChange(index, "start", e.target.value)}
                  className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => handleTimeslotChange(index, "end", e.target.value)}
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

          <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Add Doctor
          </button>
        </form>
      </div>
    </Homelayout>
  );
}

export default AddDoctorForm;
