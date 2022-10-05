// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SellIcon from '@mui/icons-material/Sell';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
// back
import axios from 'axios';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const [type, setType]=useState(false);
  /* User DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/mypage/select'
        )
      .then(res => {
        if(res.data.UserType==="Company")
          setType(true)
        else
          setType(false)
      })
   },[])

  const goU_Main = () => {
    navigate('/login');
  };

  const goP_Main = () => {
    navigate('/login/product');
  };

  const goP_CMain = () => {
    navigate('/login/productAll');
  };

  const goA_Main = () => {
    navigate('/login/sales');
  };

  const goM_Main = () => {
    navigate('/login/move');
  };

  const goS_Main = () => {
    navigate('/login/set');
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
        <BottomNavigationAction label="메인" icon={<HomeIcon />} onClick={goU_Main}/>
        {!type&&<BottomNavigationAction label="재고" icon={<InventoryIcon />} onClick={goP_Main} />}
        {type&&<BottomNavigationAction label="창고 재고" icon={<InventoryIcon />} onClick={goP_Main} />}
        {type&&<BottomNavigationAction label="전체 재고" icon={<InventoryIcon />} onClick={goP_CMain} />}
        {!type&&<BottomNavigationAction label="판매" icon={<SellIcon />} onClick={goA_Main} />}
        <BottomNavigationAction label="이동" icon={<LocalShippingIcon />} onClick={goM_Main} />
        <BottomNavigationAction label="관리" icon={<SettingsIcon />} onClick={goS_Main} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}