import React, { useEffect, useState } from "react";
import { LazySearch } from "./Search";
import { apis } from "../lib/apis";
import { apiCalls } from "../assets/apiCalls";
import { notifiers } from "../assets/notifiers";
import { formatDate } from "../assets/utils";
import { DeleteModal } from "./modals/DeleteModal";
import { TrashIcon } from "@heroicons/react/24/outline";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchPages = () => {
    apiCalls.getRequest({
      endpoint: apis.appointments.getAppointments,
      httpMethod: "GET",
      httpHeaders: {
        Accept: "application/json",
      },
      successCallback: (res) => {
        setAppointments(res.items);
      },
      errorCallback: (err) => {
        notifiers.httpError(err);
      },
    });
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div>
      <div>
        <h4 className="text-xl px-4 py-2">Appointments</h4>

        <div className="grid gap-6 xl:grid-cols-2 container mx-auto">
          <AppointmentForm fetchPages={fetchPages} />
          <div className="flex-grow border-4 bg-gray-50 p-2 rounded-md">
            <h4 className="text-xl py-2">Recent Appointments</h4>
            <AppointmentsTable
              fetchPages={fetchPages}
              appointments={appointments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentsTable({ appointments, fetchPages }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="px-2 py-1">Patient</th>
          <th className="px-2 py-1">Doctor</th>
          <th className="px-2 py-1">Date</th>
          <th className="px-2 py-1">Subject</th>
        </tr>
      </thead>
      <tbody>
        {appointments &&
          appointments.length > 0 &&
          appointments.map((appointment) => (
            <tr className="border-b" key={appointment.id}>
              <td className="px-2 py-2 bg-white">
                {appointment?.patient?.name}
              </td>
              <td className="px-2 py-2 bg-white">
                {appointment?.doctor?.name}
              </td>
              <td className="px-2 py-2 bg-white">
                {formatDate(appointment.appointment_date)}
              </td>
              <td className="px-2 py-2 bg-white">{appointment.reason}</td>
              <td className="px-6 ">
                <DeleteModal
                  receiveResponse={() => {
                    fetchPages();
                  }}
                  endpoint={`${apis.appointments.deleteAppointment.replace(
                    "<:id>",
                    appointment.id
                  )}`}
                  anchorClassName="border-1 p-2 rounded border-red-700/50 text-red-600 hover:bg-red-600 hover:text-white"
                  anchorText=""
                  consequences={
                    <>
                      <h4>This action is irreversible</h4>
                    </>
                  }
                  icon={<TrashIcon height={14} />}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

const AppointmentForm = ({ fetchPages }) => {
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    apiCalls.postRequest({
      endpoint: apis.appointments.createAppointment,
      httpMethod: "POST",
      httpHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpBody: {
        patient_id: patient.id,
        doctor_id: doctor.id,
        appointment_date: dateTime,
        reason: reason,
      },
      successCallback: (res) => {
        fetchPages();
        notifiers.httpSuccess("Appointment registered successfully");
      },
      errorCallback: (res) => {
        notifiers.httpError(res.message);
      },
    });
  };

  return (
    <div className="max-w-xl min-w-96 p-6 bg-gray-50 rounded-md border-4 xl:self-end">
      <h2 className="text-lg font-semibold mb-4">Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <LazySearch
            receiveSelection={(res) => setPatient(res)}
            childHoverClassName="hover:border-emerald-700 hover:bg-emerald-600/10"
            className="z-50"
            placeholder="Search Patient..."
            fieldNames={["name", "email"]}
            endpoint={apis.patients.search}
          />
          <input
            onChange={() => {}}
            value={patient?.name || ""}
            required
            placeholder="Select patient..."
            className="w-full outline-none bg-transparent p-2 mt-2"
          />
        </div>
        <div className="mb-4">
          <LazySearch
            receiveSelection={(res) => setDoctor(res)}
            childHoverClassName="hover:border-emerald-700 "
            className="z-40"
            placeholder="Search Doctor..."
            fieldNames={["name", "email"]}
            endpoint={apis.doctors.search}
          />
          <input
            onChange={() => {}}
            value={doctor?.name || ""}
            required
            placeholder="Select doctor..."
            className="w-full outline-none bg-transparent p-2 mt-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateTime"
            className="block text-sm font-medium text-gray-700"
          >
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            className="mt-1 p-2 h-12 w-full rounded-md focus:outline-none focus:border-emerald-500"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <textarea
            rows={6}
            placeholder="Subject"
            id="reason"
            className="mt-1 p-4 w-full rounded-md focus:outline-none focus:border-emerald-500"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointments;
