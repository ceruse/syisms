// react
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// back
import axios from "axios";

const SS_Main = () => {
  const [Uposts, setUposts]=useState([]);
    /* Client DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/Client/CompanyList'
          )
        .then(res => {
            setUposts(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
     },[])
     
    /* Client DB & DataGrid Matching */
     const rowData = Uposts?.map(Uposts=>{
      return{
        Address: Uposts?.UserAddress,
        Code: Uposts?.UserCode,
        Info: Uposts?.UserInfo,
        Name: Uposts?.UserName,
        Num: Uposts?.UserPhonenumber,
        id: Uposts?.UserID
      }
     })

  return (
    <Box>
    <Grid>
    <div style={{ height: 640, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              
              columns = {[
                {
                  field: 'Info',
                  headerName: '매장 이름',
                  width: 180,
                },
                {
                  field: 'Name',
                  headerName: '매니저 이름',
                  width: 110,
                },
                {
                  field: 'Num',
                  headerName: '연락처',
                  width: 140,
                },
                {
                  field: 'Address',
                  headerName: '매장 주소',
                  width: 300,
                },
                {
                  field: 'id',
                  headerName: '매장 고유 키',
                  width: 110,
                }
              ]}

              disableSelectionOnClick
              hideFooter
              components={{ Toolbar: GridToolbar }}
              sx={{m:2}}
              />
              </div>
            </div>
          </div>
          </Grid>
    </Box>
  );

}

export default SS_Main;