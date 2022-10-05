// react
import React, { useState, useEffect } from 'react';
// mui
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// back
import axios from 'axios';
// dir
import HS_Sales from './Sales/HS_Sales';
import HM_Move from './Move/HM_Move';
import HC_Total from './Company/HC_Total';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const H_Main = () => {
    const [value, setValue] = React.useState(-1);
    const [type, setType]=useState(false);
    const [Comp, setComp]=useState(false);

    /* User DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/mypage/select'
          )
        .then(res => {
          if(res.data.UserType=="Company")
          {
            setType(true)
            setComp(true)
            setValue(0)
          }
          else if(res.data.UserType=="Store")
          {
            setType(false)
            setComp(true)
            setValue(0)
          }
          else
          {
            setValue(0)
            setComp(false)
          }
        })
     },[])
  
     const handleChange = (event, newValue) => {
       setValue(newValue);
     };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {Comp&&<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {type&&<Tab label="통계" {...a11yProps(0)} />}
          {!type&&<Tab label="매출" {...a11yProps(0)} />}
          {!type&&<Tab label="이동" {...a11yProps(1)} />}
          </Tabs>}
        {!Comp&&<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {!type&&<Tab label="매출" {...a11yProps(0)} />}
        </Tabs>}
        </Box>
        {type&&<TabPanel value={value} index={0}>
        {type&&<HC_Total/>}
        </TabPanel>}
        {!type&&<TabPanel value={value} index={0}>
        {!type&&<HS_Sales/>}
        </TabPanel>}
        {!type&&<TabPanel value={value} index={1}>
        {!type&&<HM_Move/>}
        </TabPanel>}
      </Box>
    );
  }

  export default H_Main;