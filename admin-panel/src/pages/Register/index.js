import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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

function Registration() {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/signup", { username, password, email, firstName, lastName });
            if (res.data) {
                console.log(res.data)
            }
        } catch (error) {
            setErrorMessage("Failed to register. Please try again.");
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    return (
        <Container maxWidth="xs" className={classes.root}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form className={classes.form} onSubmit={register}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={lastName}
            onChange={handleLastNameChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            className={classes.textField}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            fullWidth
            className={classes.submitButton}
            type="submit"
          >
            Sign up
          </Button>
        </form>
        <button
            onClick={() => history.push('/login')}
        >
            Go to Login
        </button>
      </Container>
    );
}

export default Registration;
