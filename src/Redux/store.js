import { configureStore } from "@reduxjs/toolkit";

import addApointmentSlice from "./Slices/AddApointment"
import detailDoctSlice from"./Slices/AddMoreDetailDoct"
import allDoctorSliceReducer from "./Slices/AllDoctorsSlice"
import allMedicalHistoryReducer from "./Slices/AllMedicalHistory"
import allPatientSliceReducer from"./Slices/AllPatientsSlice"
import authSliceReducer from"./Slices/AuthSlice"
import allAppointmentSlice from "./Slices/GetAppointmentDoct"
import medicalHistory from "./Slices/GetMedicalHistory"
import detailPatientSlice from"./Slices/PatientsSlice"
const store= configureStore({
    reducer:{
        auth:authSliceReducer, // auth store
        allDoctors:allDoctorSliceReducer,
        add_more_doct_details:detailDoctSlice,
        patient:detailPatientSlice,
        create_appointment:addApointmentSlice,
        allAppointment:allAppointmentSlice,
        medicalHistory:medicalHistory,
        allPatients:allPatientSliceReducer,
        allMedicalHistory:allMedicalHistoryReducer   
    },
    devTools:true
})
// console.log(add_more_patient_details)
export default store
// AddMoreDetailPatient