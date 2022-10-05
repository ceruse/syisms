// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// back
import axios from "axios";
import { createRowsInternalCache } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";

// barcode function
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  
const P_CMain = () => {
  const [P_posts, P_setPosts]=useState([]);
    /* Product DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/product/CompanyProductList'
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
        Date:P_post?.ProductDate.substr(0,10),
        IPrice:P_post?.ProductImport,
        EPrice:P_post?.ProductExport,
        UserInfo:P_post?.UserInfo,
        id: P_post?.ProductID,
      }
     },[])

    return (
      <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs
        >
          <div style={{ height: 840, width: '100%'}}>
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
                  width: 220
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
                  field: 'IPrice',
                  headerName: '입고가',
                  type: 'number',
                  width: 110,
                },
                {
                  field: 'EPrice',
                  headerName: '출고가',
                  type: 'number',
                  width: 110,
                },
                {
                  field: 'Date',
                  headerName: '입력일',
                  type: 'number',
                  width: 180,
                },
                {
                  field: 'UserInfo',
                  headerName: '매장',
                  type: 'number',
                  width: 150,
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
      <Grid>
      </Grid>
    </Box>
  );
}

export default P_CMain;