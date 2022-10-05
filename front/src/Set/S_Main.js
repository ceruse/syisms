// react
import React, { useState, useEffect } from 'react';
// mui
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// back
import axios from 'axios';
// dir
import SC_DB from './Client/SC_DB';
import SC_Menu from './Client/SC_Menu';
import SS_Main from './Store/SS_Main';

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
  
const S_Main = () => {
    const [value, setValue] = React.useState(-1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [type, settype]=useState(false);

    /* Product DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/mypage/select'
          )
        .then(res => {
          if(res.data.UserType=="Company")
          {
            settype(true)
            setValue(0)
          }
          else if (res.data.UserType=="Store")
          {
            settype(true)
            setValue(0)
          }
          else
          {
            settype(false)
            setValue(0)
          }
        })
        .catch(err=>{
            console.log(err)
        })
     },[])
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* 기업형 */}
          {type&&
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="매장" {...a11yProps(0)} />
            <Tab label="거래처" {...a11yProps(1)} />
          </Tabs>}
          {/* 개인 사업자 */}
          {!type&&
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="거래처" {...a11yProps(0)} />
          </Tabs>}
        </Box>

        {/* 기업형 */}
        {type&&<TabPanel value={value} index={0}>
          <SS_Main />
        </TabPanel>}
        {type&&<TabPanel value={value} index={1}>
          <SC_DB />
          <Grid sx={{ mt: 4, mb: 0 }}>
           <SC_Menu/>
          </Grid>
        </TabPanel>}
        {/* 개인 사업자 */}
        {!type&&<TabPanel value={value} index={0}>
          <SC_DB />
          <Grid sx={{ mt: 4, mb: 0 }}>
           <SC_Menu/>
          </Grid>
        </TabPanel>}
      </Box>
  );
}
export default S_Main;