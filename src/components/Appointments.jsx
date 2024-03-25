import React, { useEffect, useState } from "react";
import { LazySearch } from "./Search";
import { apis } from "../lib/apis";
import { apiCalls } from "../assets/apiCalls";
import { notifiers } from "../assets/notifiers";
import { formatDate } from "../assets/utils";
import { DeleteModal } from "./modals/DeleteModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { AppointmentStatus } from "./AppointmentStatus";
import { axiosPatch } from "../lib/axiosLib";

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
    <div className="py-4 grow m-2">
      <div className="">
        <h4 className="text-xl px-4 py-2">Appointments</h4>

        <div className="flex flex-col">
          <div className="border-4 bg-gray-50 px-4 pt-2 pb-8 rounded-md m-2">
            <h4 className="text-xl py-2 font-semibold">Recent Appointments</h4>
            <div className="scroll_x">
              <AppointmentsTable
                fetchPages={fetchPages}
                appointments={appointments}
              />
            </div>
          </div>
          <div className="m-2 max-w-[30rem]">
            <AppointmentForm fetchPages={fetchPages} />
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
          <th className="px-2 py-1">Status</th>
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
              <td className="px-2 py-2 bg-white whitespace-nowrap">
                {appointment.reason?.slice(0, 25)}...
              </td>
              <td className="px-4">
                <AppointmentStatus status={appointment.status} />
              </td>
              <td className="px-4 py-2 flex items-center gap-4">
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
                {appointment.status === "Pending" && (
                  <button
                    onClick={() => {
                      axiosPatch(
                        apis.appointments.updateAppointment.replace(
                          "<:id>",
                          appointment.id
                        ),
                        {
                          status: "Approved",
                        }
                      )
                        .then((res) => {
                          fetchPages();
                        })
                        .catch((axiosError) => {
                          console.log(axiosError);
                        });
                    }}
                    className="bg-emerald-700 text-white px-4 py-1 hover:bg-emerald-500 duration-300 rounded"
                  >
                    Approve
                  </button>
                )}
                {appointment.status === "Approved" && (
                  <button
                    onClick={() => {
                      axiosPatch(
                        apis.appointments.updateAppointment.replace(
                          "<:id>",
                          appointment.id
                        ),
                        {
                          status: "Closed",
                        }
                      )
                        .then((res) => {
                          fetchPages();
                        })
                        .catch((axiosError) => {
                          console.log(axiosError);
                        });
                    }}
                    className="bg-red-700 text-white px-4 py-1 hover:bg-red-500 duration-300 rounded"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export const AppointmentForm = ({
  title = "Create Appointment",
  fetchPages = () => {},
  initialPatient,
}) => {
  const [patient, setPatient] = useState({});
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
        notifiers.httpSuccess("Appointment created successfully");
      },
      errorCallback: (res) => {
        notifiers.httpError(res.message);
      },
    });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md border-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
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
            className="border-l-4 border-emerald-700 bg-emerald-700/10 rounded w-full outline-none p-2 mt-2"
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
            className="border-l-4 border-emerald-700 bg-emerald-700/10 rounded w-full outline-none p-2 mt-2"
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
            className="border-l-4 border-emerald-700 bg-emerald-700/10 rounded mt-1 p-2 h-12 w-full rounded-md focus:outline-none focus:border-emerald-500"
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
            className="border-l-4 border-emerald-700 bg-emerald-700/10 rounded mt-1 p-4 w-full rounded-md focus:outline-none focus:border-emerald-500"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
          >
            {title}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Appointments;
