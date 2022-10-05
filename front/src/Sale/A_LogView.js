// react
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
        width: 200,
      },
      {
        field: 'SCount',
        headerName: '수량',
        type: 'number',
        width: 70,
      },
      {
        field: 'EPrice',
        headerName: '가격',
        type: 'number',
        width: 110,
      },
];

const A_LogView = (param) => {
    const navigate = useNavigate();
    const ref = React.useRef(null);
    const [MS_posts, MS_setPosts]=useState([]); // MoveSales Origin DB
    const [MS_Length, setMS_Length]=useState(0); // MoveSales Origin Length
    const [F_posts, F_setPosts]=useState([]); // MoveSales Filtered DB
  
    const goBack = () => {
      navigate('/login/sales/');
    };

   /* MoveSales DB Fetching */
   useEffect(()=>{
    axios
    .get(
      '/api/Sales/moveSalesListLog'
      )
    .then(res => {
        MS_setPosts(res.data.result)
        setMS_Length(res.data.result.length)
    })
    .catch(err=>{
        console.log(err)
    })
 })

 useEffect(()=>{
  let j=0;
  for(let i=0; i<MS_Length; i++)
  {
    if(MS_posts[i]?.SalesID == param.sid?.SalesCode)
    {
      F_posts[j] = MS_posts[i];
      j++;
    }
  }
})


     /* MoveSales DB & DataGrid Matching */
     const rowDataOrigin = MS_posts?.map(MS_post=>{
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
     })

     /* MoveSales DB & DataGrid Matching */
     const rowDataFiltered = F_posts?.map(F_post=>{
      return{
        MSID: F_post?.MoveSalesID,
        key: F_post?.ProductID,
        Name:F_post?.ProductName,
        Code:F_post?.ProductCode,
        Barcode:F_post?.ProductBarcode,
        IPrice:F_post?.ProductImport,
        EPrice:F_post?.ProductExport,
        SCount:F_post?.SalesCount,
        PCount:F_post?.ProductCount,
        UserID: F_post?.UserID,
        id: F_post?.UserMSID,
        SalesID: F_post?.SalesID,
      }
      // MUI DataGrid의 Data, Parameter로써의 Data
     },[])


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
                      {param.sid?.SalesCode}
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
                      {param.sid?.SalesCount}
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
                      {param.sid?.SalesPrice}
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
                      {param.sid?.SalesDate}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -2, mb: 3 }}
        >
        <h4>판매 제품</h4>
            <div style={{ height: 318, width: '100%' }}>
                <DataGrid
                rows={rowDataFiltered}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                hideFooter
                />
            </div>
        </Grid>
    </Box>
  );
};

export default A_LogView;