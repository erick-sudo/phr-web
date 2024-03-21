import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import TopNavigationBar from "../TopNavigationBar";
import SideNavigationBar from "../SideNavigationBar";
import Patients from "../Patients";
import PatientDetails from "../PatientDetails";
import Doctors from "../Doctors";
import Appointments from "../Appointments";

function Dashboard() {
  const [showSizeNav, setShowSideNav] = useState(true);
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      {userInfo ? (
        <>
          <div>
            <TopNavigationBar setShowSideNav={setShowSideNav} />
          </div>
          <div className="flex grow">
            {showSizeNav && (
              <div className="p-2">
                <SideNavigationBar />
              </div>
            )}
            <div className="flex-grow relative px-2 m-4">
              <div className=" absolute inset-0 scroll_y rounded-lg bg-gray-100">
                <Routes>
                  <Route path="patients" element={<Patients />} />
                  <Route path="patients/:id" element={<PatientDetails />} />
                  <Route path="doctors" element={<Doctors />} />
                  <Route path="appointments" element={<Appointments />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
}

export default Dashboard;
