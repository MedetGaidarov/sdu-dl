import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { login } from "../../actions/authActions";
import { connect } from "react-redux";

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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send email and password to server for authentication
    login(username, password);
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className={classes.textField}
          value={username}
          onChange={handleUsernameChange}
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
          Sign in
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
