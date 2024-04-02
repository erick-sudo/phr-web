const base_url = "http://localhost:8000";

export const apis = {
  register: `${base_url}/register`,
  login: `${base_url}/login`,
  verifyEmail: `${base_url}/verify-email`,
  verificationNotification: `${base_url}/email/verification-notification`,
  verificationNotificationResend: `${base_url}/resend/verification-notification`,
  resetPassword: `${base_url}/reset-password`,
  forgotPassword: `${base_url}/forgot-password`,
  logout: `${base_url}/logout`,
  currentUser: `${base_url}/api/user`,
  profile: `${base_url}/api/profile`,
  patients: {
    getPatients: `${base_url}/patients`,
    getPatientById: `${base_url}/patients/<:id>`,
    createPatient: `${base_url}/patients`,
    updatePatient: `${base_url}/patients/<:id>`,
    deletePatient: `${base_url}/patients/<:id>`,
    search: `${base_url}/patients/search`,
    appointments: `${base_url}/patients/<:id>/appointments`,
    medicalRecords: `${base_url}/patients/<:id>/medical_records`,
  },
  doctors: {
    tally: `${base_url}/doctors/tally/by/specialization`,
    getDoctors: `${base_url}/doctors`,
    getDoctorById: `${base_url}/doctors/<:id>`,
    createDoctor: `${base_url}/doctors`,
    updateDoctor: `${base_url}/doctors/<:id>`,
    deleteDoctor: `${base_url}/doctors/<:id>`,
    search: `${base_url}/doctors/search`,
  },
  appointments: {
    getAppointments: `${base_url}/appointments`,
    getAppointmentById: `${base_url}/appointments/<:id>`,
    createAppointment: `${base_url}/appointments`,
    updateAppointment: `${base_url}/appointments/<:id>`,
    deleteAppointment: `${base_url}/appointments/<:id>`,
  },
  medicalRecords: {
    getMedicalRecordById: `${base_url}/medicalrecords/<:id>`,
    createMedicalRecord: `${base_url}/medicalrecords`,
    updateMedicalRecord: `${base_url}/medicalrecords/<:id>`,
    deleteMedicalRecord: `${base_url}/medicalrecords/<:id>`,
    labtests: `${base_url}/medicalrecords/<:id>/labtests`,
  },
  dashboard: {
    count: `${base_url}/dashboard/count`,
  },
};

export async function getRequest({ endpoint, errorCallback, successCallback }) {
  await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          successCallback(res);
        });
      } else {
        response.json().then((res) => {
          errorCallback(-1, res);
        });
      }
    })
    .catch((error) => {
      errorCallback(0, error);
    });
}

export async function postRequest({
  endpoint,
  method,
  payload,
  errorCallback,
  successCallback,
}) {
  await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        successCallback(response.body);
      } else {
        errorCallback(-1, response.body);
      }
    })
    .catch((error) => {
      errorCallback(0, error);
    });
}
