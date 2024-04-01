import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosGet } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";

function Profile() {
  const { userInfo } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);

  const getProfile = async (url) => {
    await axiosGet(url)
      .then((res) => {
        console.log(res);
      })
      .catch((axiosError) => {});
    console.log(profile);
  };

  useEffect(() => {
    if (userInfo?.role === "Doctor") {
      getProfile(
        apis.doctors.getDoctorById.replace("<:id>", userInfo.doctor_id)
      );
    } else if (userInfo?.role === "Patient") {
      getProfile(
        apis.patients.getPatientById.replace("<:id>", userInfo.patient_id)
      );
    }
  }, [userInfo]);

  return (
    <div>
      <div>
        <h5>Full Name</h5>
        <div>{userInfo.name}</div>
      </div>
    </div>
  );
}

export default Profile;
