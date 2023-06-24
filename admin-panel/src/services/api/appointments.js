// src/services/api/appointments.js

export const getAppointmentsByTestCenterId = async (testCenterId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/appointments?testCenterId=${testCenterId}`
    );
    const appointments = await response.json();

    return appointments.content;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

const mockAppointments = [
  {
    id: 1,
    date: '2023-05-14',
    time: '14:40',
    testCenterId: 1,
    email:"JonnSSSddd@gmail.com",
    appointmentStatus: 'Scheduled'
  },
  {
    id: 2,
    date: '2023-05-14',
    time: '15:40',
    email:"JonnSSSddd@gmail.com",
    testCenterId: 1,
  
    appointmentStatus: 'Waiting_confirmation'
  },
  {
    id: 3,
    date: '2023-05-14',
    time: '14:40',
    email:"JonnSSSddd@gmail.com",
    testCenterId: 2,
    appointmentStatus: 'Scheduled'

  },
  // Add more mock appointments as needed...
];
