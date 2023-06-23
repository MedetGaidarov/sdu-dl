// src/components/AppHeader/index.js

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navigation from './Navigation';
import Logout from '../Logout';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#1976d2',
  },
  title: {
    flexGrow: 1,
  },
});

const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
       
      <Toolbar>
      <Navigation/>
        <Typography variant="h6" className={classes.title}>
          Driving License Booking App
        </Typography>
        <Logout/>
      </Toolbar>

      
    </AppBar>
  );
};

export default AppHeader;
