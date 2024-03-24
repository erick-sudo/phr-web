import React, { useEffect, useState } from "react";
import { axiosGet } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";
import { snakeCaseToTitleCase } from "../../assets/utils";
import TallyChart from "./TallyChart";
import { AtSymbolIcon, ClockIcon } from "@heroicons/react/24/outline";
import { LineChart } from "@mui/x-charts";
import HoverFade from "../HoverFade";
import { useNavigate } from "react-router";

function AdminDashboard() {
  const [doctorsTally, setDoctorsTally] = useState(null);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axiosGet(apis.doctors.tally)
      .then((res) => {
        setDoctorsTally(
          Object.keys(res.data).map((key) => ({
            specialization: key,
            count: res.data[key],
          }))
        );
      })
      .catch((axiosError) => {});

    axiosGet(apis);

    axiosGet(apis.dashboard.count)
      .then((res) => {
        setCardData(res.data);
      })
      .catch((axiosError) => {});

    axiosGet(apis);
  }, []);

  return (
    <div>
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {cardData &&
          Object.keys(cardData).map((key, idx) => (
            <div className="p-6 bg-white rounded-lg" key={idx}>
              <h2 className="text-center text-xl text-gray-700">
                {snakeCaseToTitleCase(key)}
              </h2>
              <div className="text-center font-extrabold text-2xl pt-2">
                {cardData[key]}
              </div>
            </div>
          ))}
      </div>
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg">
          {doctorsTally && <TallyChart dataset={doctorsTally} />}
        </div>
        <div className="">
          <RecentPatients />
        </div>
      </div>
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div>
          <RecentAppointments />
        </div>
        <div className="bg-white p-6 rounded-lg">
          <LineChart
            height={300}
            series={[
              {
                data: [23, 12, 34, 9, 5, 18, 20],
                label: "Apppointments",
                color: "rgba(7, 122, 90, 0.705)",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function RecentPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchRecentPatients = () => {
    axiosGet(`${apis.patients.getPatients}?page=1&size=5`).then((res) => {
      setPatients(res.data.items);
    });
  };

  useEffect(() => {
    fetchRecentPatients();
  }, []);

  return (
    <div className="p-6 bg-white">
      <h2 className="flex items-center text-gray-600 gap-6 my-4 px-4">
        <ClockIcon height={20} /> <span className="text-xl">New Patients</span>
      </h2>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b text-emerald-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat, idx) => (
              <tr className="bg-gray-50 border-b" key={idx}>
                <td className="py-3 px-4">{pat.name}</td>
                <td className="py-3 px-4">{pat.phone}</td>
                <td className="py-3 px-4">{pat.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end px-4 pt-4">
        <HoverFade
          onClick={() => navigate("/patients")}
          className="bg-emerald-700 text-[#fff] px-4 py-2 rounded-md hover:text-emerald-800"
        >
          View More
        </HoverFade>
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
        <span className="text-xl">New Appointments</span>
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
      <div className="flex justify-end px-4 pt-4">
        <HoverFade
          onClick={() => navigate("/appointments")}
          className="bg-emerald-700 text-[#fff] px-4 py-2 rounded-md hover:text-emerald-800"
        >
          View More
        </HoverFade>
      </div>
    </div>
  );
}

export default AdminDashboard;
