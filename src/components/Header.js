import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{background: 'white'}}>
        <div>
            <img src="https://jobs.weekday.works/_next/static/media/logo.268caeb2.png" alt="weekday" style={{height: "30px", maxWidth: "150px"}}/>
        </div>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header