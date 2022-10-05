// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// dir
import MIO_View from './MIO_View';
// back
import axios from "axios";


// colum
const columns = [
  {
    field: 'RT',
    headerName: 'RT 코드',
    width: 120,
  },
  {
    field: 'DIV',
    headerName: '내역',
    width: 110,
  },
  {
    field: 'Date',
    headerName: '확정일',
    width: 110,
  },
  {
    field: 'Info',
    headerName: '비고',
    width: 110,
  },
  {
    field: 'IOView',
    headerName: '보기',
    renderCell: (id) => (
      <MIO_View ioid={id.row}/>
    ),
  }
];


const MIO_DB = () => {
  const [IO_DB, setIO_DB] = useState([]);

  useEffect(()=>{
    // API
    axios
      .get(
        '/api/Move/alllist'
        )
      .then(res => {
        setIO_DB(res.data.result)
      })
      .catch(err=>{
          console.log(err)
      })
  },[])
  
   const rowData = IO_DB?.map(IO_DB=>{
    return{
      RT: "RT-"+IO_DB?.OutputID,
      DIV: "확정",
      Date: IO_DB?.InputDate.substring(0,10),
      Info: IO_DB?.OutputInfo,
      Input: IO_DB?.InputStore,
      Output: IO_DB?.OutputStore,
      id: IO_DB?.OutputID,
    }
   },[])

  return (
    <div style={{ height: 640, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              {/* Input DB */}
                {/*IDB_Fetching()*/}
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
}

export default MIO_DB;