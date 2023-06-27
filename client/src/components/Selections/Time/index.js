import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

const TimeSelection = ({ times, onTimeSlotChange }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBackClick = () => {
    history.push("/booking");
  };

  const handleNextClick = () => {
    console.log("Next button clicked, selected time is:", selectedTime);
    onTimeSlotChange(selectedTime);
    history.push("/personal-data");
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#fff",
        // overflow: "auto",
        // position: "relative",
      }}
    >
      <Grid
        sx={{
          padding: isMobile ? "10px" : "100px 50px",
          margin: isMobile ? "" : "20px 40px",
          height: "30%"
        }}
      >
        {times.length ? (
          times.map((timeSlot, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleTimeClick(timeSlot)}
              disabled={timeSlot.booked}
              style={{
                margin: "10px",
                backgroundColor:
                  selectedTime === timeSlot
                    ? "gray"
                    : timeSlot.booked
                    ? "gray"
                    : "#3E6FF4",
              }}
            >
              {timeSlot.time.substring(0, 5)}
            </Button>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No timeslots currently
            </Typography>
          </Box>
        )}
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          margin: isMobile ? "20px 30px" : "20px 40px",
          padding: "30px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleBackClick}
          sx={{ width: "200px" }}
        >
          Назад
        </Button>
        <Button
          sx={{ margin: isMobile ? "20px 0 " : "0 20px", width: "200px" }}
          variant="contained"
          onClick={handleNextClick}
          disabled={!selectedTime}
        >
          Дальше
        </Button>
      </Box>
    </Box>
  );
};

export default TimeSelection;
