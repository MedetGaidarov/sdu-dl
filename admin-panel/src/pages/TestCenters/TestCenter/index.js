// TestCenterPage.js
import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import AppointmentList from "../../../containers/AppointmentList";
import { getAppointmentsByTestCenterId } from "../../../services/api/appointments";
import { useParams } from "react-router-dom";

const TestCenter = ({ testCenter }) => {
  const [appointments, setAppointments] = useState([]);
  const { id } = useParams();
  const {testCenterName} =  useParams();
  useEffect(() => {
    getAppointmentsByTestCenterId(id).then((appointments) => {
      if (appointments) {
        setAppointments(appointments);
      }
    });
  }, [id]);

  console.log(appointments)

  // if (!testCenter) {
  //   return <Typography variant="h4">Loading...</Typography>;
  // }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {testCenterName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default TestCenter;
