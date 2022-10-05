// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MI_View from './MI_View';
// back
import axios from "axios";

const MI_Input = () => {
  const [I_posts, I_setPosts]=useState([]);
    /* Input DB Fetching */
     useEffect(()=>{
        axios
        .get('/api/move/moveoutput')
        .then(res => {
            I_setPosts(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
     },[])

    /* Input DB & DataGrid Matching */
     const rowData = I_posts?.map(I_post=>{
      return{
        Code:"RT-"+I_post?.OutputID,
        InputStore:I_post?.InputStore,
        OutputStore:I_post?.OutputStore,
        OutputDate:I_post?.OutputDate.substr(0,10),
        OutputInfo:I_post?.OutputInfo,
        id: I_post?.OutputID,
      }
     })
  return (
    <div style={{ height: 640, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns = {[
                {
                  field: 'Code',
                  headerName: 'RT 코드',
                  width: 120,
                },
                {
                  field: 'OutputStore',
                  headerName: '출고지',
                  width: 150,
                },
                {
                  field: 'OutputDate',
                  headerName: '출고 등록일',
                  width: 150,
                },
                {
                  field: 'OutputInfo',
                  headerName: '비고',
                  width: 150,
                },
                {
                  field: 'View',
                  headerName: '보기',
                  renderCell: (id) => (
                    <>
                      <MI_View iid={id}/>
                    </>
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
  );
}

export default MI_Input;