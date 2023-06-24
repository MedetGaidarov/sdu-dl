import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppointmentList = ({ appointments }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "green";
      case "canceled":
        return "red";
      case "completed":
        return "blue";
      default:
        return "";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "time", headerName: "Time", width: 130 },
    { field: "status", headerName: "Status", width: 130,
      renderCell: (params) => {
        return <div style={{ color: getStatusColor(params.value) }}>{params.value}</div>
      } 
    },
    { field: "email", headerName: "Email", width: 200 },
  ];

  const handleClick = (id) => {
    // you can implement the action when the user clicks on a row.
  };

  return (
    <Card>
      <CardContent>
        <DataGrid
          rows={appointments.map((appointment) => ({
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            email: appointment.email,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={(rowParams) => handleClick(rowParams.row.id)}
        />
        <Button 
          variant="contained"
          onClick={() =>
            navigate('/appointments-add')
          }
        >
          Добавить
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
