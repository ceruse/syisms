// react
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import View from '@mui/icons-material/Pageview';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
// back
import axios from "axios";
// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const columns = [
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
      type: 'number',
      width: 80,
    },
    {
      field: 'UCode',
      headerName: '기업 코드',
      type: 'number',
      width: 110,
    },
];

const MIO_View = (param) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [DAposts, setDAposts] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const goBack = () => {
    navigate('/login/move');
  };

  useEffect(()=>{
    axios
    .get('/api/move/detailAllList')
    .then(res => {
        let j=0;
        for(let i=0; i<res.data.result.length; i++)
        {
          if(param?.ioid?.RT === "RT-"+res?.data?.result[i]?.OutputID)
          {
            DAposts[j]=res?.data?.result[i];
            DAposts[j].id=j;
            j++;
          }
        }
    })
    .catch(err=>{
      console.log(err)
    })
  })

   const rowData = DAposts?.map(DAposts=>{
    return{
      Name: DAposts?.ProductName,
      Code: DAposts?.ProductCode,
      Count: DAposts?.SalesCount,
      UCode: DAposts?.UserCode,
      id: DAposts?.id,
    }
   },[])

  return (
    <div>
      <IconButton aria-label="IO View" onClick={handleOpen}>
          <View />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
        <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <h3>입/출고 내역</h3>
            <h4>구분</h4>
            <Typography variant="body1" color="text.secondary" >
              {param.ioid.DIV}
            </Typography>
            <Grid container spacing={3} sx={{ mt: -2, mb: 2 }}>
                <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>RT 코드</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {param.ioid.RT}
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
                    <h4>입고 등록일</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {param.ioid.Date}
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
                    <h4>입고지</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {param.ioid.Input}
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
                    <h4>출고지</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {param.ioid.Output}
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
                    <h4>비고</h4>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                      {param.ioid.Info}
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
        <h4>제품 내역</h4>
        <div style={{ height: 370, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              components={{ Toolbar: CustomToolbar }}
              sx={{m:2, mt: 0, mb: 0}}
              />
              </div>
            </div>
          </div>
        </Grid>
    </Box>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Grid>
              <Button type="submit" variant="contained" onClick={handleClose}>확인</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MIO_View;