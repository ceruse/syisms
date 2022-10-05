// react
import React, { useState, useEffect } from 'react';
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// back
import axios from "axios";

// Styles function
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

const rows1 = [
  { id: 1, ProductName: 'Snow', ProductCode: 'Jon', ProductCount: 35 },
];
const rows2 = [
  { id: 1, ProductName: 'Snow', ProductCode: 'Jon', ProductCount: 35 },
];


const HM_Graph01 = () => {
  const [CIposts, setCIposts]=useState([]); // Confirm Input
  const [COposts, setCOposts]=useState([]); // Confirm Output

  useEffect(()=>{
    axios // Confrim Input
    .get('/api/move/OnlyMeMoveInputList')
    .then(res =>
      {
        if(res)
        {
          let CI=[];

          for(let i=0; i<res.data.result.length; i++)
          {
            CI[i]=res.data.result[i];
            CI[i].id=i+1;
          }
          setCIposts(CI)
        }
      })
    axios // Confirm Output
    .get('/api/move/OnlyMeMoveOutputList')
    .then(res =>
      {
        if(res)
        {
          let CO=[];
          
          for(let i=0; i<res.data.result.length; i++)
          {
            CO[i]=res.data.result[i];
            CO[i].id=i+1;
          }
          setCOposts(CO)
        }
      })
    },[])

   const CIdata = CIposts?.map(CIposts=>{
    return{
      Name:CIposts?.ProductName,
      Code:CIposts?.ProductCode,
      Count:CIposts?.Count,
      id: CIposts?.id,
    }
   },[])

   const COdata = COposts?.map(COposts=>{
    return{
      Name:COposts?.ProductName,
      Code:COposts?.ProductCode,
      Count:COposts?.Count,
      id: COposts?.id,
    }
   },[])

  return (
    <>
      <Grid container spacing={0} sx={{ mt: 0, mb: 0 }}>
        <Grid item xs={6}>
          <Paper elevation={1}>
              <Grid sx={{ mt: -2, mb: -1 }}>
                  <h3>입고 순위 명세</h3>
              </Grid>
          </Paper>
          <div style={{ height: 340, width: '100%' }}>
            <DataGrid
              rows={CIdata}
              columns={[
                {
                  field: 'Name',
                  headerName: '품명',
                  width: 150,
                },
                {
                  field: 'Code',
                  headerName: '품번',
                  width: 150,
                },
                {
                  field: 'Count',
                  headerName: '수량',
                  width: 150,
                }
              ]}
              disableSelectionOnClick //
              components={{ Toolbar: GridToolbar }} //
              hideFooter //
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
              <Grid sx={{ mt: -2, mb: -1 }}>
                  <h3>출고 순위 명세</h3>
              </Grid>
          </Paper>
        <div style={{ height: 340, width: '100%' }}>
            <DataGrid
              rows={COdata}
              columns={[
                {
                  field: 'Name',
                  headerName: '품명',
                  width: 150,
                },
                {
                  field: 'Code',
                  headerName: '품번',
                  width: 150,
                },
                {
                  field: 'Count',
                  headerName: '수량',
                  width: 150,
                }
              ]}
              disableSelectionOnClick //
              components={{ Toolbar: GridToolbar }} //
              hideFooter //
            />
          </div>
        </Grid>
      </Grid>
    </>
    );
  };
  
  export default HM_Graph01;