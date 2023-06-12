// TestCenterPage.js
import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import AppointmentList from "../../../containers/AppointmentList";
import { getAppointmentsByTestCenterId } from "../../../services/api/appointments";

const TestCenter = ({ testCenter }) => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    getAppointmentsByTestCenterId(testCenter.id).then((appointments) => {
      if (appointments) {
        setAppointments(appointments);
      }
    });
  }, [testCenter.id]);

  console.log(appointments)

  if (!testCenter) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {testCenter.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default TestCenter;
