// react
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Create from '@mui/icons-material/Create';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(-1);
  const navigate = useNavigate();

  const goSC_Create = () => {
    navigate('/login/set/client-create');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ position: 'fixed', bottom: 56, left: 0, right: 0 }} elevation={0}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="등록" icon={<Create />} onClick={goSC_Create}/>
      </BottomNavigation>
      </Paper>
      
    </Box>
  );
}