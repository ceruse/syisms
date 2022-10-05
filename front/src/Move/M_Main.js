// react
import * as React from 'react';
// mui
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// dir
import MI_Input from './Input/MI_Input';
import MI_Menu from './Input/MI_Menu';
import MO_Output from './Output/MO_Output';
import MO_Menu from './Output/MO_Menu';
import MIO_DB from './IOLog/MIO_DB';

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
    const data ={ 
    };

    fetch('/api/Move/deleteinfo',
    {
      method: 'DELETE',
      headers:
      {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then((result) =>
    {
      result.json().then((resp) => {
      })
    }).catch(()=>{ alert('ERR');
      console.log('error');
    },[]);

    fetch('/api/Move/deletemoveoutputinfo',
    {
      method: 'DELETE',
      headers:
      {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then((result) =>
    {
      result.json().then((resp) => {
      })
    }).catch(()=>{ alert('ERR');
      console.log('error');
    },[]);

    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="입고" {...a11yProps(0)} />
            <Tab label="출고" {...a11yProps(1)} />
            <Tab label="명세" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MI_Input />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MO_Output />
          <Grid sx={{ mt: 4, mb: 0 }}>
           <MO_Menu/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MIO_DB />
          <Grid sx={{ mt: 4, mb: 0 }}>
          </Grid>
        </TabPanel>
      </Box>
    );
  }