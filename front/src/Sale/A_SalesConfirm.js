// react
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// back
import axios from "axios";
// Styled function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));
// colum
const columns = [
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
        field: 'SCount',
        headerName: '수량',
        type: 'number',
        width: 80,
      },
      {
        field: 'EPrice',
        headerName: '가격',
        type: 'number',
        width: 110,
      },
];

const A_SalesConfirm = () => {
    const navigate = useNavigate();
    const ref = React.useRef(null);
      
    const [S_posts, S_setPosts]=useState([]);
    const [S_Length, setS_Length]=useState(0);
    /* Sales DB Fetching */
    useEffect(()=>{
      axios
      .get(
        '/api/Sales/SalesList'
        )
      .then(res => {
          S_setPosts(res.data.result)
          setS_Length(res.data.result.length-1)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])

   const [MS_posts, MS_setPosts]=useState([]); // MoveSales DB
   /* MoveSales DB Fetching */
   useEffect(()=>{
    axios
    .get(
      '/api/Sales/moveSalesList'
      )
    .then(res => {
        MS_setPosts(res.data.result)
    })
    .catch(err=>{
        console.log(err)
    })
 },[])
 
    /* MoveSales DB & DataGrid Matching */
    const rowData = MS_posts?.map(MS_post=>{
      return{
        MSID: MS_post?.MoveSalesID,
        key: MS_post?.ProductID,
        Name:MS_post?.ProductName,
        Code:MS_post?.ProductCode,
        Barcode:MS_post?.ProductBarcode,
        IPrice:MS_post?.ProductImport,
        EPrice:MS_post?.ProductExport,
        SCount:MS_post?.SalesCount,
        PCount:MS_post?.ProductCount,
        UserID: MS_post?.UserID,
        id: MS_post?.UserMSID,
        SalesID: MS_post?.SalesID,
      }
      // MUI DataGrid의 Data, Parameter로써의 Data
     },[])
  
    const UpdateSalesID = () => {
      const Updata ={
        SalesID:S_posts[S_Length]?.SalesID, //생성된 Sales SalesID 값
      }

// 3. SalesID 값을 받아와 MoveSales에 입력
      fetch('/api/Sales/updateSalesID/', {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(Updata)
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
        })
      }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
        console.log('error');
      });
      navigate('/login/sales');
    };

  return (
      <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <h3>판매 내역</h3>
            <Grid container spacing={3} sx={{ mt: -2, mb: 2 }}>
                <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>판매 코드</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {S_posts[S_Length]?.SalesID}
                    </Typography>
                </Grid>
                <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>판매 수량</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {S_posts[S_Length]?.SalesCount}
                    </Typography>
                </Grid>
                <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>판매 가격</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {S_posts[S_Length]?.SalesPrice}
                    </Typography>
                </Grid>
                <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>판매 날짜</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {S_posts[S_Length]?.SalesDate.substr(0,10)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -2, mb: 0 }}
        >
        <h4>판매 제품</h4>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={5}
        >
        <div style={{ height: 320, width: '100%'}}>
            <div style={{ display: 'flex', height: '90%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              sx={{m:2}}
              />
              </div>
            </div>
          </div>

        </Grid>
        </Grid>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mb: 0 }}
        >
            <Button type="submit" variant="contained" onClick={UpdateSalesID}>
                확인
            </Button>
        </Grid>
    </Box>
  );
};

export default A_SalesConfirm;