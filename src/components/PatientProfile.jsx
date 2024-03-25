import React, { useContext, useEffect, useState } from "react";
import { apis } from "../lib/apis";
import { notifiers } from "../assets/notifiers";
import {
  formatCurrency,
  formatDate,
  snakeCaseToTitleCase,
} from "../assets/utils";
import { axiosGet, axiosPost } from "../lib/axiosLib";
import { AuthContext } from "./context/AuthContext";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { LazySearch } from "./Search";
import { AppointmentStatus } from "./AppointmentStatus.jsx";
import { ModalLink } from "./modals/ModalLink.jsx";
import ControlledAccordions from "./ControlledAccordions.jsx";
import { ExpandMore, LogoutOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import LinesMesh from "./LinesMesh.jsx";
import { Accordion } from "react-bootstrap";
import { AccordionDetails, AccordionSummary } from "@mui/material";

function PatientProfile() {
  const { userInfo, logout } = useContext(AuthContext);
  const id = userInfo.id;
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setPatientRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchPatient = async () => {
    await axiosGet(apis.patients.getPatientById.replace("<:id>", id))
      .then((res) => {
        setPatient(res.data);
      })
      .catch((axiosError) => {
        notifiers.httpError(axiosError);
      });
  };

  const fetchAppointments = () => {
    axiosGet(`${apis.patients.appointments.replace("<:id>", id)}`).then(
      (res) => {
        setAppointments(res.data);
      }
    );
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
    fetchAppointments();
  }, [id]);

  return (
    <div className="scroll_y bg-gray-100">
      <div>
        <div className="m-4 p-4 bg-white rounded">
          <h4 className="text-xl p-4">Profile</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative flex p-4 rounded overflow-hidden">
              <div className="flex flex-col items-center justify-between z-20">
                <div className="h-24 w-24 border-4 border-emerald-700 rounded-full bg-emerald-800 z-20 flex items-center justify-center">
                  <span className="font-extrabold text-[2rem] text-white">
                    {patient?.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="text-emerald-700 border-1 border-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-700 hover:text-white duration-300"
                >
                  <LogoutOutlined /> Logout
                </button>
              </div>
              <div className="flex flex-col grow">
                <div className="w-full flex justify-end">
                  <button className="p-1 rounded-full text-xl hover:bg-emerald-700 hover:text-white duration-300 hover:shadow-emerald-800 hover:shadow-xl">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 mx-4">
              {patient &&
                ["name", "dob", "gender", "address", "email", "phone"].map(
                  (attrib, idx) => (
                    <div key={idx} className="flex items-center border-b">
                      <h4 className="font-bold text-gray-700 w-1/3 py-2 px-4">
                        {snakeCaseToTitleCase(attrib)}
                      </h4>
                      <p className=" w-2/3 py-1 px-4">
                        {["created_at", "updated_at"].includes(attrib)
                          ? formatDate(patient[attrib])
                          : patient[attrib]}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
        <div className="bg-white m-4 p-4 rounded">
          <div>
            <Appointments appointments={appointments} />
          </div>
          <div className="px-4">
            <AppointmentForm
              patient={patient}
              title="Request appointment"
              fetchPages={fetchAppointments}
            />
          </div>
        </div>
      </div>

      <div className="m-4 p-2 bg-gray-50 rounded">
        <div className="flex items-center px-4 py-2">
          <h4 className="text-xl px-4 text-gray-600 grow">Medical Records</h4>
        </div>
        <div className="p-4">
          {medicalRecords && medicalRecords.length > 0 && (
            <ControlledAccordions
              className=""
              items={medicalRecords.map((record, idx) => ({
                summary: formatDate(record.created_at),
                details: <MedicalRecordCard key={idx} medicalRecord={record} />,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const AppointmentForm = ({
  title = "Create Appointment",
  fetchPages = () => {},
  patient,
}) => {
  const [doctor, setDoctor] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPost(apis.appointments.createAppointment, {
      patient_id: patient.id,
      doctor_id: doctor.id,
      appointment_date: dateTime,
      reason: reason,
    })
      .then((res) => {
        fetchPages();
        notifiers.httpSuccess("Appointment created successfully");
      })
      .catch((res) => {
        notifiers.httpError(res);
      });
  };

  return (
    <ModalLink
      anchorClassName="flex gap-2 items-center bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-600 duration-300"
      anchorText="Request Appointment"
      submitButtonClassName="hidden"
      cancelButtonClassName=" ring-2 ring-red-600 px-4 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white duration-300"
      modalContent={
        <div className="p-6 bg-gray-50 rounded-md border-4">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <form onSubmit={handleSubmit}>
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
                Submit
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

function MedicalRecordCard({ medicalRecord }) {
  const [labTests, setLabTests] = useState([]);

  const fetchLabTests = function () {
    axiosGet(apis.medicalRecords.labtests.replace("<:id>", medicalRecord.id))
      .then((res) => {
        setLabTests(res.data);
      })
      .catch((axiosError) => {
        //
      });
  };

  useEffect(() => {
    fetchLabTests();
  }, []);

  return (
    <div className="">
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
      <div>
        <ControlledAccordions
          className="pt-4 pb-2"
          items={[
            {
              summary: "Lab Tests",
              details: (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-1">Name</th>
                      <th className="px-4 py-1">Description</th>
                      <th className="px-4 py-1">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labTests &&
                      labTests.map((labTest, idx) => (
                        <tr className="border-b" key={idx}>
                          <td className="px-4 py-1">{labTest.name}</td>

                          <td className="px-4 py-1">
                            {labTest.description}
                          </td>
                          <td className="px-4 py-1">
                            {formatCurrency(labTest.price)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function Appointments({ appointments }) {
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
              <th className="py-3 px-4">Appointment Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, idx) => (
              <tr className="bg-gray-50 border-b" key={idx}>
                <td className="py-3 px-4">{appointment.doctor.name}</td>
                <td className="py-3 px-4">{formatDate(appointment.appointment_date)}</td>
                <td className="py-3 px-4">
                  <AppointmentStatus status={appointment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientProfile;
