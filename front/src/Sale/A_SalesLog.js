// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// dir
import A_View from './A_View';
// back
import axios from "axios";
// colum
const columns = [
  {
    field: 'SalesCodeF',
    headerName: '판매 코드',
    width: 120,
  },
  {
    field: 'SalesCount',
    headerName: '판매 수량',
    type: 'number',
    width: 100,
  },
  {
    field: 'SalesPrice',
    headerName: '판매 가격',
    type: 'number',
    width: 110,
  },
  {
    field: 'SalesDate',
    headerName: '판매 날짜',
    width: 110,
  },
  {
    field: 'SalesView',
    headerName: '보기',
    renderCell: (id) => (
      <A_View id={id}/>
    ),
  }
];

const A_SalesLog = () => {
  const [S_posts, S_setPosts]=useState([]);
    /* Sales DB Fetching */
    useEffect(()=>{
      axios
      .get(
        '/api/Sales/SalesList'
        )
      .then(res => {
          S_setPosts(res.data.result)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])

    /* Sales DB & DataGrid Matching */
    const rowData = S_posts?.map(S_post=>{
      return{
        SalesCodeF: "SA-"+S_post?.SalesID,
        SalesCode: S_post?.SalesID,
        SalesCount: S_post?.SalesCount,
        SalesPrice: S_post?.SalesPrice,
        SalesDate: S_post?.SalesDate.substr(0,10),
        id: S_post?.UserSID,
      }
      // MUI DataGrid의 Data, Parameter로써의 Data
     },[])

  return (
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
  );
};

export default A_SalesLog;