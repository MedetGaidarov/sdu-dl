import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
  IconButton,
  Icon,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import CitySelection from "../../components/Selections/City";
import TestCenterSelection from "../../components/Selections/TestCenter";
import DateSelection from "../../components/Selections/Date";
import TimeSelection from "../../components/Selections/Time";
import PersonalDataForm from "../../components/Forms/PersonalData";
import BookingSummary from "../../components/Summary/Booking";
import { createBooking, fetchAvailableTimes } from "../../services/api/booking";
import { getTestCenters } from "../../services/api/testCenters";
import DateTimeSelection from "../../components/DateTimeSelection";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import ProgressIndicator from "../../components/ProgressIndicator";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import logo from "../../assets/img/logo.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: `${theme.spacing(4)}px`,
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#fff",
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
}));

const Booking = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTestCenter, setSelectedTestCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [personalData, setPersonalData] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [testCenters, setTestCenters] = useState([]);
  const handleCityChange = (e) => setSelectedCity(e.target.value);
  const handleTestCenterChange = (e) => setSelectedTestCenter(e.target.value);
  const handleDateChange = (date) => setSelectedDate(date);
  const handleTimeChange = (e) => setSelectedTime(e.target.value);
  const handleTimeSlotConfig = (ts) => setSelectedTimeSlot(ts);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    {
      text: "Контакты",
      onClick: () => {
        /* Scroll to content 1 */
      },
    },
    {
      text: "Город",
      onClick: () => {
        /* Scroll to content 2 */
      },
    },
  ];

  const location = useLocation();
  const disablePastDates = (date) => {
    // Return true if the date is before the current date, which will disable it
    return date < new Date();
  };
  const handlePersonalDataSubmit = async (data) => {
    await setPersonalData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const testCenters = await getTestCenters();
      setTestCenters(testCenters);
      console.log(testCenters);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const selectedTestCenterObj = testCenters.find(
        (center) => center.id === selectedTestCenter
      );

      if (selectedTestCenterObj) {
        const testCenterId = selectedTestCenterObj.id;
        let dateOnly = selectedDate.toISOString().split("T")[0];
        let timeSlots = await fetchAvailableTimes(dateOnly, testCenterId);
        setTimeSlots(timeSlots);
      } else {
        console.error(`No test center found with id: ${selectedTestCenter}`);
      }
    };
    fetchData();
  }, [selectedTestCenter, selectedDate]);

  const handleSummaryConfirmationButton = async () => {
    const bookingData = {
      timeSlotId: selectedTimeSlot.id,
      name: personalData.name,
      email: personalData.email,
    };

    console.log("Why you here ? ");
    await createBooking(bookingData);
  };

  const drawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={item.onClick}>
            {item.text}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Router>
      <Box
        sx={{
          border: "1px solid #ddd",
          boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          // padding: "2em",
          backgroundColor: "#fff",
          overflow: "auto",
          height: "100vh",
          position: "relative",
        }}
      >
        <StyledAppBar position="fixed">
          <StyledToolbar>
            <img
              alt="Logo"
              src={logo}
              style={{ height: isMobile ? "80px" : "100px", margin: "0 15px" }}
            />{" "}
            {/* Replace 'logo.jpg' with the path to your logo image */}
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon sx={{ color: "rgb(2, 13, 68)" }} />
                </IconButton>
                {drawer}
              </>
            ) : (
              <Box display="flex" justifyContent="flex-end" flexGrow={1}>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    sx={{ color: "rgb(2, 13, 68)" }}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </StyledToolbar>
        </StyledAppBar>
        <Grid
          container
          direction="column"
          // justifyContent="center"
          alignItems="center"
          spacing={3}
          style={{
            margin: isMobile ? "100px 0 30px 0  " : "159px 0",
            width: "100%",
          }} // Set to full viewport height
        >
          <Switch>
            <Route path="/booking" exact>
              <Grid item>
                <ProgressIndicator activeStep={1} />
              </Grid>

              <Grid item>
                <CitySelection
                  cities={["Atyrau", "Almaty", "Astana"]}
                  selectedCity={selectedCity}
                  onCityChange={handleCityChange}
                />
              </Grid>
              <Grid item>
                <TestCenterSelection
                  testCenters={testCenters}
                  selectedTestCenter={selectedTestCenter}
                  onTestCenterChange={handleTestCenterChange}
                />
              </Grid>
              <Button component={Link} to="/date-time">
                Дальше
              </Button>
            </Route>
            <Route path="/date-time">
              <Grid item>
                <ProgressIndicator activeStep={2} />
              </Grid>

              <Grid
                container
                item
                justifyContent="space-around" // Creates equal space around each grid item
                alignItems="center" // Centers children on the vertical line
              >
                <Grid item xs={12} md={9}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ margin: "0 0 0 10px" }}
                  >
                    <DateCalendar
                      date={selectedDate}
                      onChange={handleDateChange}
                      shouldDisableDate={disablePastDates}
                      sx={{
                        border: "1px solid #ddd",
                        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        padding: "10px 0 ",
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={15} md={9}>
                  <TimeSelection
                    times={timeSlots}
                    selectedTime={selectedTime}
                    onTimeSlotChange={handleTimeSlotConfig}
                  />
                </Grid>
              </Grid>
            </Route>
            <Route path="/personal-data">
              <Grid item>
                <ProgressIndicator activeStep={3} />
              </Grid>
              <PersonalDataForm onSubmit={handlePersonalDataSubmit} />
            </Route>
            <Route path="/summary">
              <BookingSummary
                bookingDetails={{
                  city: selectedCity,
                  testCenter: testCenters.name
                    ? testCenters[selectedTestCenter - 1].name
                    : "TestCenter",
                  date: selectedDate.toISOString().split("T")[0],
                  time: selectedTimeSlot.time,
                  personalData,
                }}
                onClickSummary={handleSummaryConfirmationButton}
              />
            </Route>
          </Switch>
        </Grid>
      </Box>
    </Router>
  );
};

export default Booking;
