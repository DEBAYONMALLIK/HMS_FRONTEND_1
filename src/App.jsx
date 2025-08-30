import './App.css';

import { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import AddDoctorForm from './Components/AddDoctorForm';
import RequireAuth from './Components/Auth/RequireAuth';
import DoctorCardEdit from './Components/DoctorCardEdit';
import Footer from './Components/Footer';
import MedicalHistoryCreate from './Components/MedicalHistory';
import PatientCardEdit from './Components/PatientCardEdit';
import Homelayout from './Layouts/HomeLayouts';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Denied from './Pages/Denied';
import AddMoreDetailsDoct from './Pages/Doctor/AddMoreDetailDoct';
import AllDoctorsList from './Pages/Doctor/AllDoctors';
import AllDoctorsDescription from './Pages/Doctor/AllDoctorsDescription';
import CreateDoct from './Pages/Doctor/CreateDoct';
import HomePage from './Pages/HomePage';
import IsMoreDetail from './Pages/IsMoreDetail';
import Login from './Pages/Login';
import AllMedicalHistoryList from './Pages/MedicalHistory/AllMedicalHistory';
import NotFound from './Pages/NotFound';
import AddMoreDetailPatient from './Pages/Patient/AddMoreDetailsPatient';
import AllPatientsList from './Pages/Patient/AllPatients';
import SignUp from './Pages/SignUp';
import UserDashBoard from './Pages/UserDashBoard';
import UserProfile from './Pages/UserProfile/PatientProfile';
function App() {

  return (
    <>
    <Routes>
      <Route path="/doctor/adddetails" element={<AddMoreDetailsDoct/>}></Route>
      <Route path="/patient/adddetails" element={<AddMoreDetailPatient/>}></Route>
      <Route path='/' element={<HomePage/>} ></Route>
      <Route path='/aboutus' element={<AboutUs/>}  > </Route>
      <Route path='/signup' element={<SignUp/>} ></Route>
      <Route path='*' element={<NotFound/>} > </Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path="/alldoctors" element={<AllDoctorsList/>}></Route>


    <Route path="/contactus" element={<ContactUs/>}></Route>
    <Route path='/denied' element={<Denied/>}></Route>
    <Route path='/doctor/description/' element={<AllDoctorsDescription/>} ></Route>
  
   {/* admin */}
    <Route path="/admin/doctor/edit" element={<DoctorCardEdit/>}></Route>
      <Route path="/admin/patient/edit" element={<PatientCardEdit/>}></Route>
        <Route path="/admin/doctor/add" element={<AddDoctorForm />} />
        <Route path="/admin/medicalhistory/add" element={<MedicalHistoryCreate/>} />
         <Route path="/admin/medicalhistory/view" element={<AllMedicalHistoryList/>} />


    <Route path="/user/ismoredetail" element={<IsMoreDetail/>}></Route>


    <></>

        {/* nested auth with Outlet */}
    <Route element={<RequireAuth allowedRoles={['doctor','admin']} />}>
    <Route path='/doctor/create' element={<CreateDoct/>} />
    </Route>

     <Route element={<RequireAuth allowedRoles={['admin']} />}>
    <Route path='/allpatients' element={<AllPatientsList/>} />
    </Route>
    

       <Route element={<RequireAuth allowedRoles={['doctor','admin','patient']} />}>
    <Route path='/profile' element={<UserProfile/>} />
    </Route>
    

     <Route element={<RequireAuth allowedRoles={['doctor','admin','patient']} />}>
       <Route path="/user/dashboard" element={<UserDashBoard/>}/>
    </Route>


    </Routes>
    

    
    </>
  )
}

export default App
