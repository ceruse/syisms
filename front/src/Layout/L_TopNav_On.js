// react
import React, { useState } from 'react';
import  { useEffect } from 'react';
// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// back
import axios from 'axios';
// dir
import L_UserNav_On from './L_UserNav_On';

function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

export default function ButtonAppBar() {
  const [U_posts, U_setPosts]=useState([]);

  /* Product DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/mypage/select'
        )
      .then(res => {
        U_setPosts(res.data.UserInfo)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
            {U_posts}
          </Typography>


            <L_UserNav_On />
        </Toolbar>
      </AppBar>
    </Box>
    
  );
  
}