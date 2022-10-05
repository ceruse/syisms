// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import P_Menu from './P_Menu';
import P_View from './CRUD/P_View';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// back
import axios from "axios";

// barcode function
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  
const P_DB = () => {
  const [Bopen, setBOpen] = React.useState(false);
  const [P_posts, P_setPosts]=useState([]);

  const BON = () => {
    setBOpen(true);
  };
  const BCLOSE = () => {
    setBOpen(false);
  };

    /* Product DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/product/Productlist'
          )
        .then(res => {
            P_setPosts(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
     },[])
     
    /* Product DB & DataGrid Matching */
     const rowData = P_posts?.map(P_post=>{
      return{
        Name:P_post?.ProductName,
        Code:P_post?.ProductCode,
        Count:P_post?.ProductCount,
        Att:P_post?.Attribute,
        IPrice:P_post?.ProductImport,
        EPrice:P_post?.ProductExport,
        key: P_post?.ProductID,
        id: P_post?.UserPID,
      }
     })

    return (
      <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs
        >
          <div style={{ height: 750, width: '100%'}}>
            <div style={{ display: 'flex', height: '90%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns={[
                {
                  field: 'Name',
                  headerName: '품명',
                  width: 150,
                },
                {
                  field: 'Code',
                  headerName: '품번',
                  width: 220,
                },
                {
                  field: 'Count',
                  headerName: '수량',
                  type: 'number',
                  width: 80,
                },
                {
                  field: 'Att',
                  headerName: '비고',
                  width: 150,
                },
                {
                  field: 'EPrice',
                  headerName: '가격',
                  type: 'number',
                  width: 110,
                },
                {
                  field: 'View',
                  headerName: '보기',
                  width: 80,
                  renderCell: (id) => (
                      <P_View pid={id}/>
                  ),
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
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={Bopen}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
      <Grid>
        <P_Menu />
      </Grid>
    </Box>
  );
}

export default P_DB;