// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import View from '@mui/icons-material/Pageview';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// back
import axios from "axios";
// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

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

const MO_View = (param) => {
  const [open, setOpen] = React.useState(0);
  const [DataFetchingAlert, setDataFetchingAlert] = React.useState(false);
  const [MOposts, setMOposts]=useState([]);
  const navigate = useNavigate();
  
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
    .get('/api/move/detailmoveoutput')
    .then(res => {
      if(res.data.result.length)
      {
        let j=0;

        for(let i=0; i<res?.data?.result.length; i++)
        {
          if(param.oid.row.Code === ("RT-"+res.data.result[i].OutputID))
          {
            MOposts[j]=res.data.result[i];
            MOposts[j].id=j+1;
            j++;
          }
        }
        if(MOposts)
        {
          setDataFetchingAlert(true);
        }
      }
    })
    .catch(err=>{
      console.log(err)
    })
})

/* MoveOutput DB & DataGrid Matching */
const rowData = MOposts?.map(MOposts=>{
  if(MOposts)
  {
    return{
    Name:MOposts?.ProductName,
    Code:MOposts?.ProductCode,
    Count:MOposts?.SalesCount,
    UserCode:MOposts?.UserCode,
    id:MOposts?.UserMOID
    }
  }
  else
  {
    return{
      id:MOposts?.UserMOID
    }
  }
  })

  return (
    <div>
      <IconButton aria-label="Output View" onClick={handleOpen}>
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
            <h3>출고 내역</h3>
            <Grid container spacing={2} sx={{ mt: -2, mb: 2 }}>
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
                      {param.oid.row.Code}
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
                      {param.oid.row.Date}
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
                      {param.oid.row.InputStore}
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
                      {param.oid.row.OutputStore}
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
                    {(param.oid.row.Info)&&(param.oid.row.Info)}
                    {!(param.oid.row.Info)&&("NONE")}
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
        <h4>출고 제품</h4>
        <div style={{ height: 370, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns = {[
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
                    field: 'UserCode',
                    headerName: '기업 코드',
                    width: 110,
                  },
              ]}
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
              <Button type="submit" variant="contained" onClick={handleClose}>닫기</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MO_View;