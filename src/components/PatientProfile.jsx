import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apis } from "../lib/apis";
import { notifiers } from "../assets/notifiers";
import { formatDate, snakeCaseToTitleCase } from "../assets/utils";
import { axiosGet } from "../lib/axiosLib";
import { AuthContext } from "./context/AuthContext";
import { AppointmentForm } from "./Appointments";
import { AtSymbolIcon } from "@heroicons/react/24/outline";

function PatientProfile() {
  const { userInfo } = useContext(AuthContext);
  const id = userInfo.id;
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setPatientRecords] = useState([]);

  const fetchPatient = async () => {
    await axiosGet(apis.patients.getPatientById.replace("<:id>", id))
      .then((res) => {
        setPatient(res.data);
      })
      .catch((axiosError) => {
        notifiers.httpError(axiosError);
      });
  };

  const fetchMedicalRecords = () => {
    axiosGet(apis.patients.medicalRecords.replace("<:id>", id))
      .then((res) => {
        setPatientRecords(res.data);
      })
      .catch((axiosError) => {
        notifiers.httpError(axiosError);
      });
  };

  useEffect(() => {
    fetchPatient();
    fetchMedicalRecords();
  }, [id]);

  return (
    <div className="scroll_y">
      <div className="p-4">
        <h4 className="text-xl p-4">Profile</h4>
        <div className="grid grid-cols-2 xl:grid-cols-4 bg-emerald-700/10 border-t border-b border-r shadow-sm p-6 gap-6 border-l-8 border-emerald-800">
          {patient &&
            [
              "name",
              "dob",
              "gender",
              "address",
              "email",
              "phone",
              "created_at",
              "updated_at",
            ].map((attrib, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-gray-700">
                  {snakeCaseToTitleCase(attrib)}
                </h4>
                <p className="text-lg break-all">
                  {["created_at", "updated_at"].includes(attrib)
                    ? formatDate(patient[attrib])
                    : patient[attrib]}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <div>
          <AppointmentForm title="Request appointment" />
        </div>
      </div>

      <div>
        <div className="flex items-center px-4 py-2">
          <h4 className="text-xl  grow">Medical Records</h4>
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-2  xl:grid-cols-4">
          {medicalRecords &&
            medicalRecords.length > 0 &&
            medicalRecords.map((record, idx) => (
              <MedicalRecordCard
                refetch={() => {
                  fetchPatient();
                  fetchMedicalRecords();
                }}
                key={idx}
                medicalRecord={record}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function MedicalRecordCard({ refetch, medicalRecord }) {
  return (
    <div className="card card-body border-l-8 hover:shadow-lg hover:bg-gray-50 hover:border-l-emerald-800 duration-300">
      <div className="">
        <h4 className="font-bold">Administered By</h4>
        <p className="px-2">{medicalRecord?.doctor?.name}</p>
      </div>
      <div className="">
        <h4 className="font-bold">Symptoms</h4>
        <p className="px-2">{medicalRecord?.symptoms}</p>
      </div>
      <div className="">
        <h4 className="font-bold">Diagnosis</h4>
        <p className="px-2">{medicalRecord?.diagnosis}</p>
      </div>
      <div className="">
        <h4 className="font-bold">Treatment</h4>
        <p className="px-2">{medicalRecord?.treatment}</p>
      </div>
    </div>
  );
}

function RecentAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchRecentAppointments = () => {
    axiosGet(`${apis.appointments.getAppointments}?page=1&size=5`).then(
      (res) => {
        setAppointments(res.data.items);
      }
    );
  };

  useEffect(() => {
    fetchRecentAppointments();
  }, []);

  return (
    <div className="p-6 bg-white">
      <h2 className="flex items-center text-gray-600 gap-6 my-4 px-4">
        <AtSymbolIcon height={20} />{" "}
        <span className="text-xl">Appointment History</span>
      </h2>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b text-emerald-700">
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, idx) => (
              <tr className="bg-gray-50 border-b" key={idx}>
                <td className="py-3 px-4">{appointment.doctor.name}</td>
                <td className="py-3 px-4">{appointment.patient.name}</td>
                <td className="py-3 px-4">{appointment.appointment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientProfile;
