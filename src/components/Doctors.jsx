import React, { useEffect, useState } from "react";
import { apis, getRequest } from "../lib/apis";
import { NavLink } from "react-router-dom";
import {
  BuildingOfficeIcon,
  EnvelopeOpenIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import EditModal from "./modals/EditModal";
import { FormModal } from "./modals/FormModal";
import { DeleteModal } from "./modals/DeleteModal";
import Pagination from "./Pagination";
import { apiCalls } from "../assets/apiCalls";
import { notifiers } from "../assets/notifiers";
import { Search2 } from "./Search";

const specializations = [
  "Internal Medicine",
  "Pediatrics",
  "Surgery",
  "Obstetrics and Gynecology",
  "Anesthesiology",
  "Psychiatry",
  "Radiology",
  "Ophthalmology",
  "Dermatology",
  "Orthopedics",
];

function Doctors() {
  const [doctors, setDoctors] = useState({});

  const fetchPages = (page) => {
    getRequest({
      endpoint: `${apis.doctors.getDoctors}?page=${page}`,
      errorCallback: () => {},
      successCallback: (res) => {
        setDoctors(res);
      },
    });
  };

  const searchDoctors = (q) => {
    apiCalls.postRequest({
      endpoint: apis.doctors.search,
      httpMethod: "POST",
      httpHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpBody: {
        query: q,
        field_names: ["name", "email", "phone", "specialization"],
      },
      successCallback: (res) => {
        const dt = {
          per_page: 10,
          total: res.length,
          current_page: 1,
          items: res,
        };
        setDoctors(dt);
      },
      errorCallback: (res, body) => {
        // TODO: handle
      },
    });
  };

  const handleSearch = (query) => {
    searchDoctors(query);
  };

  useEffect(() => {
    fetchPages(1);
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <div className="m-2 p-2 rounded-md bg-gray-50">
        <h1 className="text-xl px-4">Doctors</h1>
        <div className="flex px-4 gap-2 pt-4">
          <Search2 handleSearch={handleSearch} placeholder="Search..." />
          <FormModal
            onSubmit={(payload) => {
              apiCalls.postRequest({
                endpoint: apis.doctors.createDoctor,
                httpHeaders: {
                  Accept: "application/json",
                  Authorization: "Bearer " + sessionStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
                httpBody: payload,
                successCallback: (res) => {
                  notifiers.httpSuccess("Doctor registered successfully");
                  fetchPages(doctors?.current_page || 1);
                },
                errorCallback: (err) => {
                  notifiers.httpError(err.message);
                },
              });
            }}
            icon={<PlusCircleIcon height={20} />}
            anchorClassName="flex items-center gap-4 bg-emerald-800 text-[#fff] px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-800 duration-300 hover:ring-1 hover:ring-emerald-800"
            anchorText="New Doctor"
            submitText="Save Doctor"
            description="Register new Doctor..."
            inputFields={[
              {
                name: "name",
                as: "text",
                required: true,
              },
              {
                name: "specialization",
                as: "select",
                required: true,
                label: "Select Specialization",
                options: specializations.map((sp) => ({
                  value: sp,
                  label: sp,
                })),
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

        <div className="scroll_x min-h-[50vh]">
          <DoctorsTable
            fetchPages={fetchPages.bind(null, doctors?.current_page)}
            doctors={doctors?.items}
          />
        </div>
        <div className="flex justify-center py-4">
          {doctors?.current_page && (
            <Pagination
              totalPages={Math.ceil(doctors?.total / doctors?.per_page)}
              setCurrentPage={fetchPages}
              currentPage={doctors?.current_page}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DoctorsTable({ fetchPages, doctors }) {
  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 whitespace-nowrap px-4">Name</th>
            <th className="py-2 whitespace-nowrap px-4">Specialization</th>
            <th className="py-2 whitespace-nowrap px-4">Phone</th>
            <th className="py-2 whitespace-nowrap px-4">Email</th>
            <th className="py-2 whitespace-nowrap px-4">
              <BuildingOfficeIcon height={16} />
            </th>
          </tr>
        </thead>
        {doctors && doctors.length > 0 && (
          <tbody>
            {doctors.map((doctor, idx) => (
              <tr className="border-b" key={doctor.id}>
                <td className="bg-white py-3 whitespace-nowrap px-4">
                  <NavLink className="px-2" to={`/doctors/${doctor.id}`}>
                    {doctor.name}
                  </NavLink>
                </td>
                <td className="bg-white py-3 whitespace-nowrap px-4">
                  {doctor.specialization}
                </td>
                <td className="bg-white py-3 whitespace-nowrap px-4">
                  {doctor.phone}
                </td>
                <td className="bg-white py-3 whitespace-nowrap px-4">
                  <div className="flex items-center gap-1 bg-emerald-500/10 w-max whitespace-nowrap rounded-xl border-1 border-emerald-800/50 px-2">
                    <EnvelopeOpenIcon height={10} />
                    {doctor.email}
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center gap-2 px-4">
                    <EditModal
                      receiveNewRecord={(res) => {
                        fetchPages();
                      }}
                      description="Edit Doctor Details"
                      anchorText=""
                      anchorClassName="border-1 p-2 rounded border-emerald-700/50 text-emerald-600 duration-300 hover:bg-emerald-600 hover:text-white"
                      icon={<PencilIcon height={14} />}
                      dataEndpoint={apis.doctors.getDoctorById.replace(
                        "<:id>",
                        doctor.id
                      )}
                      updateEndpoint={apis.doctors.updateDoctor.replace(
                        "<:id>",
                        doctor.id
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
                          name: "specialization",
                          as: "select",
                          required: true,
                          label: "Select Specialization",
                          options: specializations.map((sp) => ({
                            value: sp,
                            label: sp,
                          })),
                        },
                      ]}
                    />
                    <DeleteModal
                      receiveResponse={() => {
                        fetchPages();
                      }}
                      endpoint={`${apis.doctors.deleteDoctor.replace(
                        "<:id>",
                        doctor.id
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

export default Doctors;
