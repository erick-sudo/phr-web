import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apis } from "../lib/apis";
import { notifiers } from "../assets/notifiers";
import { formatDate, snakeCaseToTitleCase } from "../assets/utils";
import { DeleteModal } from "./modals/DeleteModal";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FormModal } from "./modals/FormModal";
import { ModalLink } from "./modals/ModalLink";
import { LazySearch } from "./Search";
import EditModal from "./modals/EditModal";
import { axiosGet } from "../lib/axiosLib";

function PatientDetails() {
  const { id } = useParams();
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
    <div>
      <h4 className="text-xl p-4">Patient's Details</h4>

      <div className="grid grid-cols-2 xl:grid-cols-4 bg-white shadow-sm m-2 p-6 gap-6 rounded-lg border-l-8 border-emerald-800">
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

      <div>
        <div className="flex items-center px-4 py-2">
          <h4 className="text-xl  grow">Medical Records</h4>
          <CreateNewMedicalRecord
            refetch={() => {
              fetchPatient();
              fetchMedicalRecords();
            }}
            patientId={id}
          />
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

function CreateNewMedicalRecord({ refetch, patientId }) {
  const [doctor, setDoctor] = useState(null);

  return (
    <ModalLink
      submitButtonClassName="hidden"
      disabled={true}
      anchorText="Create New Record"
      anchorClassName="flex items-center gap-2 bg-emerald-800 text-[#fff] px-4 py-2 rounded-lg"
      modalContent={
        <div>
          <div className="mb-4">
            <LazySearch
              receiveSelection={(res) => setDoctor(res)}
              childHoverClassName="hover:border-emerald-700 hover:bg-emerald-600/10"
              className="z-50"
              placeholder="Search Doctor..."
              fieldNames={["name", "email"]}
              endpoint={apis.doctors.search}
            />
            <input
              onChange={() => {}}
              value={doctor?.name || ""}
              required
              placeholder="No doctor selected..."
              className="w-full outline-none bg-transparent p-2 mt-2"
            />
          </div>

          {doctor ? (
            <FormModal
              onSubmit={(payload) => {
                payload["doctor_id"] = doctor.id;
                payload["patient_id"] = patientId;
                apiCalls.postRequest({
                  endpoint: apis.medicalRecords.createMedicalRecord,
                  httpHeaders: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  httpBody: payload,
                  successCallback: (res) => {
                    notifiers.httpSuccess("Medical record added successfully");
                    if (typeof refetch === "function") {
                      refetch();
                    }
                  },
                  errorCallback: (err) => {
                    notifiers.httpError(err.message);
                  },
                });
              }}
              icon={<PlusCircleIcon height={20} />}
              anchorClassName="flex items-center gap-2 bg-emerald-800 text-[#fff] px-4 py-2 rounded-xl hover:bg-emerald-700"
              anchorText="Initialize Symptoms, Diagnosis and Treatment"
              submitText="Save Record"
              description="Add new medical record..."
              inputFields={[
                {
                  name: "symptoms",
                  as: "textarea",
                  required: true,
                },
                {
                  name: "diagnosis",
                  as: "textarea",
                  required: true,
                },
                {
                  name: "treatment",
                  as: "textarea",
                  required: true,
                },
              ]}
            />
          ) : (
            <div className="text-lg">Please select a doctor</div>
          )}
        </div>
      }
    />
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
      <div className="flex justify-end items-center gap-2 px-4">
        <EditModal
          receiveNewRecord={(res) => {
            if (typeof refetch === "function") {
              refetch();
            }
          }}
          description="Edit Medical Record"
          anchorText=""
          anchorClassName="border-1 p-2 rounded border-emerald-700/50 text-emerald-600 duration-300 hover:bg-emerald-600 hover:text-white"
          icon={<PencilIcon height={14} />}
          dataEndpoint={apis.medicalRecords.getMedicalRecordById.replace(
            "<:id>",
            medicalRecord.id
          )}
          updateEndpoint={apis.medicalRecords.updateMedicalRecord.replace(
            "<:id>",
            medicalRecord.id
          )}
          editableFields={[
            {
              name: "symptoms",
              as: "textarea",
              required: true,
            },
            {
              name: "diagnosis",
              as: "textarea",
              required: true,
            },
            {
              name: "treatment",
              as: "textarea",
              required: true,
            },
          ]}
        />
        <DeleteModal
          receiveResponse={() => {
            if (typeof refetch === "function") {
              refetch();
            }
          }}
          endpoint={`${apis.medicalRecords.deleteMedicalRecord.replace(
            "<:id>",
            medicalRecord.id
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
    </div>
  );
}

export default PatientDetails;
