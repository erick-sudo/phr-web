import React, { useEffect, useState } from "react";
import { apis, getRequest, postRequest } from "../lib/apis";
import { NavLink } from "react-router-dom";
import {
  BuildingOfficeIcon,
  EnvelopeOpenIcon,
  PencilIcon,
  PhoneIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { patientImages } from "../assets/images/images";
import EditModal from "./modals/EditModal";
import { FormModal } from "./modals/FormModal";
import { DeleteModal } from "./modals/DeleteModal";
import Pagination from "./Pagination";
import { apiCalls } from "../assets/apiCalls";
import { notifiers } from "../assets/notifiers";
import { Search2 } from "./Search";

function Patients() {
  const [patients, setPatients] = useState({});

  const fetchPages = (page) => {
    getRequest({
      endpoint: `${apis.patients.getPatients}?page=${page}`,
      errorCallback: () => {},
      successCallback: (res) => {
        setPatients(res);
      },
    });
  };

  const searchPatients = (q) => {
    apiCalls.postRequest({
      endpoint: apis.patients.search,
      httpMethod: "POST",
      httpHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpBody: {
        query: q,
        field_names: ["name", "email", "phone"],
      },
      successCallback: (res) => {
        const dt = {
          per_page: 10,
          total: res.length,
          current_page: 1,
          items: res,
        };
        setPatients(dt);
      },
      errorCallback: (res, body) => {
        // TODO: handle
      },
    });
  };

  const handleSearch = (query) => {
    searchPatients(query);
  };

  useEffect(() => {
    fetchPages(1);
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <div className="m-2 p-2 rounded-md bg-gray-50">
        <h1 className="text-xl px-4">Patients</h1>
        <div className="flex px-4 gap-2 pt-4">
          <Search2 handleSearch={handleSearch} placeholder="Search..." />
          <FormModal
            onSubmit={(payload) => {
              apiCalls.postRequest({
                endpoint: apis.patients.createPatient,
                httpHeaders: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                httpBody: payload,
                successCallback: (res) => {
                  notifiers.httpSuccess("Patient registered successfully");
                  fetchPages(1);
                },
                errorCallback: (err) => {
                  notifiers.httpError(err.message);
                },
              });
            }}
            icon={<PlusCircleIcon height={20} />}
            anchorClassName="flex items-center gap-2 bg-emerald-800 text-[#fff] px-4 py-2 rounded-xl"
            anchorText="New Patient"
            submitText="Save Patient"
            description="Register new Patient"
            inputFields={[
              {
                name: "name",
                as: "text",
                required: true,
              },
              {
                name: "dob",
                as: "date",
                required: true,
              },
              {
                name: "gender",
                as: "select",
                required: true,
                label: "Select Gender",
                options: [
                  {
                    value: "Male",
                    label: "Male",
                  },
                  {
                    value: "Female",
                    label: "Female",
                  },
                ],
              },
              {
                name: "address",
                as: "text",
                required: true,
              },
              {
                name: "phone",
                as: "text",
                required: true,
              },
              {
                name: "email",
                as: "email",
                required: true,
              },
            ]}
          />
        </div>

        <div className="scroll_x m-4 min-h-[50vh]">
          <PatientsTable
            fetchPages={() => {
              fetchPages(1);
            }}
            patients={patients?.items}
          />
        </div>
        <div className="flex justify-center pb-4">
          {patients?.current_page && (
            <Pagination
              totalPages={Math.ceil(patients?.total / patients?.per_page)}
              setCurrentPage={fetchPages}
              currentPage={patients?.current_page}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PatientsTable({ fetchPages, patients }) {
  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 whitespace-nowrap px-4">Patient</th>
            <th className="py-2 whitespace-nowrap px-4">Phone</th>
            <th className="py-2 whitespace-nowrap px-4">Date of Birth</th>
            <th className="py-2 whitespace-nowrap px-4">Gender</th>
            <th className="py-2 whitespace-nowrap px-4">Address/Email</th>
            <th className="py-2 whitespace-nowrap px-4">
              <BuildingOfficeIcon height={16} />
            </th>
          </tr>
        </thead>
        {patients && patients.length > 0 && (
          <tbody>
            {patients.map((patient, idx) => (
              <tr className="border-b" key={patient.id}>
                <td className="bg-white py-2 whitespace-nowrap px-4">
                  <div className="mx-4 h-8 w-8 overflow-hidden rounded-[40px] border border-emerald-500/50 flex items-center justify-center ring-1 ring-emerald-700">
                    <img
                      className="h-full w-full object-cover"
                      src={patientImages[idx % 13]}
                      alt="logo"
                    />
                  </div>
                  <NavLink className="px-2" to={`/patients/${patient.id}`}>
                    {patient.name}
                  </NavLink>
                </td>
                <td className="bg-white py-2 whitespace-nowrap px-4">
                  <div className="flex items-center gap-1 bg-emerald-500/10 w-max whitespace-nowrap rounded-xl border-1 border-emerald-800/50 px-2">
                    <PhoneIcon height={10} />
                    {patient.phone}
                  </div>
                </td>
                <td className="bg-white py-2 whitespace-nowrap px-4">
                  {patient.dob}
                </td>
                <td className="bg-white py-2 whitespace-nowrap px-4">
                  {patient.gender}
                </td>
                <td className="bg-white py-2 whitespace-nowrap px-4">
                  <div>{patient.address}</div>
                  <div className="flex items-center gap-1 bg-emerald-500/10 w-max whitespace-nowrap rounded-xl border-1 border-emerald-800/50 px-2">
                    <EnvelopeOpenIcon height={10} />
                    {patient.email}
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center gap-2 px-4">
                    <EditModal
                      receiveNewRecord={(res) => {
                        fetchPages(1);
                      }}
                      description="Edit Patient Details"
                      anchorText=""
                      anchorClassName="border-1 p-2 rounded border-emerald-700/50 text-emerald-600 duration-300 hover:bg-emerald-600 hover:text-white"
                      icon={<PencilIcon height={14} />}
                      dataEndpoint={apis.patients.getPatientById.replace(
                        "<:id>",
                        patient.id
                      )}
                      updateEndpoint={apis.patients.updatePatient.replace(
                        "<:id>",
                        patient.id
                      )}
                      editableFields={[
                        {
                          name: "name",
                          as: "text",
                          required: true,
                        },
                        {
                          name: "email",
                          as: "email",
                          required: true,
                        },
                        {
                          name: "phone",
                          as: "text",
                          required: true,
                        },
                        {
                          name: "gender",
                          as: "select",
                          required: true,
                          label: "Select Gender",
                          options: [
                            {
                              value: "Male",
                              label: "Male",
                            },
                            {
                              value: "Female",
                              label: "Female",
                            },
                          ],
                        },
                        {
                          name: "address",
                          as: "text",
                          required: true,
                        },
                        {
                          name: "dob",
                          as: "date",
                          required: true,
                        },
                      ]}
                    />
                    <DeleteModal
                      receiveResponse={() => {
                        fetchPages(1);
                      }}
                      endpoint={`${apis.patients.deletePatient.replace(
                        "<:id>",
                        patient.id
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Patients;
