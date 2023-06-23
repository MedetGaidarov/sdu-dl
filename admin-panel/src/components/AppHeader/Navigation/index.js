import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navLinks = [
    { text: 'Home', icon: <HomeIcon />, to: '/' },
    { text: 'Users', icon: <PeopleIcon />, to: '/users' },
    { text: 'Test Centers', icon: <LocationOnIcon />, to: '/test-centers' },
  ];

  return (
    <>
      <IconButton color="inherit" onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          {navLinks.map(({ text, icon, to }) => (
            <ListItem
              key={text}
              button
              onClick={() => {
                navigate(to);
                handleDrawerClose();
              }}
              selected={to === location.pathname}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
