// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// dir
import MO_View from './MO_View';
// back
import axios from "axios";

const columns = [
  {
    field: 'Code',
    headerName: 'RT 코드',
    width: 120,
  },
  {
    field: 'InputStore',
    headerName: '입고지',
    width: 150,
  },
  {
    field: 'Date',
    headerName: '출고 등록일',
    width: 110,
  },
  {
    field: 'Info',
    headerName: '비고',
    width: 150,
  },
  {
    field: 'OutputView',
    headerName: '보기',
    renderCell: (params) => (
      <MO_View oid={params}/>
    ),
  }
];

const MO_Output = () => {
  const [O_posts, O_setPosts]=useState([]);
  
  /* Input DB Fetching */
   useEffect(()=>{
      axios
      .get('/api/move/outputlists')
      .then(res => {
          O_setPosts(res.data.output)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])

  /* Input DB & DataGrid Matching */
   const rowData = O_posts?.map(O_post=>{
    return{
      Code:"RT-"+O_post?.OutputID,
      InputStore:O_post?.InputStore,
      OutputStore:O_post?.OutputStore,
      Date:O_post?.OutputDate.substr(0,10),
      Info:O_post?.OutputInfo,
      id: O_post?.OutputID,
    }
   })
  return (
    <>
    <div style={{ height: 640, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              components={{ Toolbar: GridToolbar }}
              sx={{m:2}}
              />
              </div>
            </div>
          </div>
    </>
  );
};

export default MO_Output;