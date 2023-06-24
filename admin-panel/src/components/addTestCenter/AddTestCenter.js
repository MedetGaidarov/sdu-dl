import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StarRateOutlined } from '@mui/icons-material';
import { postTestCenter } from '../../actions/testCenterActions';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginTop: 50,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textField: {
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#1976d2",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#115293",
    },
  },
});

function AddTestCenter() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform the submit logic here, such as making an API request to add the test center
    // You can use the values from the state variables (name, address, city, state, zip) in the API request

    // Clear the form fields after submitting
    const testCenter = 
    {
        name : name,
        address : address,
        city: city,
        state: state,
        zip : zip
    }

    await postTestCenter(testCenter)
    setName('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    
    navigate('/testcenters')

  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Test Center
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={address}
          onChange={handleAddressChange}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={city}
          onChange={handleCityChange}
        />
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={state}
          onChange={handleStateChange}
        />
        <TextField
          label="Zip"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={zip}
          onChange={handleZipChange}
        />
        <Button
          variant="contained"
          fullWidth
          className={classes.submitButton}
          type="submit"
        >
          Add Test Center
        </Button>
      </form>
    </Container>
  );
}

export default AddTestCenter;
