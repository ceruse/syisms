// react
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SC_Update from './SC_Update';
import SC_Delete from './SC_Delete';
// back
import axios from "axios";

const SC_DB = () => {
  const [P_posts, P_setPosts]=useState([]);
    /* Client DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/Client/listClient'
          )
        .then(res => {
            P_setPosts(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
     })
     
    /* Client DB & DataGrid Matching */
     const rowData = P_posts?.map(P_post=>{
      return{
        StoreName:P_post?.ClientName,
        Number:P_post?.ClientNum,
        Address:P_post?.ClientAddress,
        ManagerName: P_post?.ManagerName,
        PhoneNumber: P_post?.ManagerNum,
        Category: P_post?.ClientInfo,
        key: P_post?.ClientID,
        id: P_post?.UserCID,
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
                  field: 'StoreName',
                  headerName: '매장 이름',
                  width: 110,
                },
                {
                  field: 'Number',
                  headerName: '매장 번호',
                  width: 110,
                },
                {
                  field: 'Address',
                  headerName: '매장 주소',
                  width: 110,
                },
                {
                  field: 'ManagerName',
                  headerName: '매니저 이름',
                  width: 150,
                },
                {
                  field: 'PhoneNumber',
                  headerName: '매니저 번호',
                  width: 110,
                },
                {
                  field: 'Category',
                  headerName: '취급 품목',
                  width: 110,
                },
                {
                  field: 'Update',
                  headerName: '수정',
                  width: 80,
                  renderCell: (id) => (
                    <SC_Update pid={id}/>
                  ),
                },
                {
                  field: 'Delete',
                  headerName: '삭제',
                  width: 80,
                  renderCell: (id) => (
                    <SC_Delete pid={id}/>
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
    </Box>
  );

}

export default SC_DB;