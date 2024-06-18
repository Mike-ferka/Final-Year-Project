import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from 'react-icons/bs';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header({ OpenSidebar }) {
  // Menu Functions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // State for storing current time
  const [currentTime, setCurrentTime] = useState('');

  // Function to update current time
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentTime(`${timeString} ${dayOfWeek}`);
  };

  // Update time every minute
  useEffect(() => {
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='date'>
        <p>{currentTime}</p>
      </div>
      <div className='header-right'>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsPersonCircle className='icon' />
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>
            <button style={{ color: 'white', backgroundColor: 'red' }} onClick={handleLogout}>
              Logout
            </button>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
