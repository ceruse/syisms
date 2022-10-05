// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import View from '@mui/icons-material/Pageview';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// back
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
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

/* List Array */
const rows = [
  { id: 1, SalesName: 'Jordan', SalesCode: 'TB0A2BBQ',  SalesCount: 1, SalesPrice: 219000},
  { id: 2, SalesName: 'Dunk', SalesCode: 'TB0A2BA1',  SalesCount: 1, SalesPrice: 198000},
  { id: 3, SalesName: 'Uptempo', SalesCode: 'TB0A2CDE',  SalesCount: 1, SalesPrice: 179000},
  { id: 4, SalesName: 'Zoom', SalesCode: 'TB0A2AQ2',  SalesCount: 1, SalesPrice: 129000},
  { id: 5, SalesName: 'Converse', SalesCode: 'TB0A2DDS',  SalesCount: 1, SalesPrice: 89000},
];

const MI_View = (param) => {
  const [Bopen, setBOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // product
  const [Pposts, setPposts]=useState([]);
  const [PLength, setPLength]=useState(0);
  // move output
  const [MOposts, setMOposts]=useState([]);
  const [MOLength, setMOLength]=useState(0);
  // Check
  const [R_Check, setR_Check]=useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const BON = () => {
    setBOpen(true);
  };
  const BCLOSE = () => {
    setBOpen(false);
  };

  const onProduct = () => {
    axios
    .get(
      '/api/product/Productlist'
      )
    .then(res => {
        setPposts(res.data.result)
        setPLength(res.data.result.length)
    })
    .catch(err=>{
        console.log(err)
    })
  }

  const onConfirm = () => {
      BON();
      if(MOposts[0])
      {
        // Confirm = 1로 변경하는 api
      let OutputID = param.iid.row.Code.substring(3,);
      let Output={OutputID};
      fetch('/api/Move/finalConfirm/', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(Output)
      }).then((result) => {
      result.json().then((resp) => {
      })
      }).catch(()=>{ console.log('ERR');
        console.log('error');
      });
  
      // Confirm = 1로 변경하는 api2
      fetch('/api/Move/finalmoveoutputConfirm/', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(Output)
      }).then((result) => {
      result.json().then((resp) => {
      })
      }).catch(()=>{ console.log('ERR');
        console.log('error');
      });
  
      for(let i=0; i<MOLength; i++)
      {
        // MOposts[i] 가 가지고있는 제품일 때
        if(rowData[i].Keep===true)
        {
          let ProductCode = MOposts[i].ProductCode;
          let MoveOutput={OutputID, ProductCode};
          // 
            fetch('/api/Move/updateProduct/', {
            method: 'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(MoveOutput)
            });
        } // MOposts[i] 가 가지고있지 않은 제품일 때
        else if(rowData[i].Keep===false)
        {
          const data ={ 
            ProductName:MOposts[i].ProductName, 
            ProductCode:MOposts[i].ProductCode,
          //ProductBarcode:ProductBarcode,
            ProductImport:MOposts[i].ProductImport,
            ProductExport:MOposts[i].ProductExport,
            ProductCount:MOposts[i].SalesCount,
            Attribute:MOposts[i].Attribute,
          };
    
          axios.post('/api/Move/addProduct', data)
          .then(response => { 
            console.log(response);
          })
          .catch(()=>{alert('-');
          console.log('Error');
        });
        }
        else{
          const data ={ 
            ProductName:MOposts[i].ProductName, 
            ProductCode:MOposts[i].ProductCode,
          //ProductBarcode:ProductBarcode,
            ProductImport:MOposts[i].ProductImport,
            ProductExport:MOposts[i].ProductExport,
            ProductCount:MOposts[i].SalesCount,
            Attribute:MOposts[i].Attribute,
          };
    
          axios.post('/api/Move/addProduct', data)
          .then(response => { 
            console.log(response);
          })
          .catch(()=>{alert('-');
          console.log('Error');
        });
        }
      }
      let TT={OutputID};
      fetch('/api/Move/updateoutputProduct/', {
              method: 'PUT',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify(TT)
              }).then((result) => {
              result.json().then((resp) => {
              })
              }).catch(()=>{ console.log('ERR');
                console.log('error');
              });


              let Dtime={OutputID};
              fetch('/api/Move/updatetime/', {
              method: 'PUT',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify(Dtime)
              }).then((result) => {
              result.json().then((resp) => {
              })
              }).catch(()=>{ console.log('ERR');
                console.log('error');
              });
      BCLOSE();
      handleClose();
      alert("재고 확정 완료");
      }
  };

  useEffect(()=>{
      axios
      .get('/api/move/detailmoveoutput')
      .then(res => {
        if(res.data.result.length)
        {
          let j=0;
          
          if(open)
          {
            onProduct(); // product db fetching
              for(let i=0; i<res?.data?.result.length; i++)
              {
                if(param.iid.row.Code == ("RT-"+res.data.result[i].OutputID))
                {
                  MOposts[j]=res.data.result[i];
                  MOposts[j].id=j+1;
                  if(PLength)
                  {
                    for(let p=0; p<PLength; p++)
                    {
                      if(!MOposts[j].Keep)
                      {
                        if(Pposts[p]?.ProductCode===MOposts[j]?.ProductCode)
                        {
                          MOposts[j].Keep=true; // 있다
                        }
                        else if(Pposts[p]?.ProductCode!==MOposts[j]?.ProductCode)
                        {
                          MOposts[j].Keep=false; // 없다
                        }
                      }
                    }
                  }
                  else
                  {
                    MOposts[j].Keep=false; // 없다
                  }
                  j++;
                }
              }
              setMOLength(MOposts.length); // MOLength Create
              setR_Check(true);
          }
          
        }
      })
      .catch(err=>{
        console.log(err)
      })
})

  /* MoveOutput DB & DataGrid Matching */
    const rowData = MOposts?.map(MOposts=>{
      if(R_Check === true)
      {
          if(MOposts?.Keep === true)
        {
          return{
          Name:MOposts?.ProductName,
          Code:MOposts?.ProductCode,
          Count:MOposts?.SalesCount,
          UserCode:MOposts?.UserCode,
          Keep:true,
          KeepF:"",
          id:MOposts?.UserMOID
          }
        }
        if(MOposts?.Keep === false)
        {
          return{
          Name:MOposts?.ProductName,
          Code:MOposts?.ProductCode,
          Count:MOposts?.SalesCount,
          UserCode:MOposts?.UserCode,
          Keep:false,
          KeepF:"V",
          id:MOposts?.UserMOID,
          }
        }
      }
      else
      {
        return{
          id:MOposts?.UserMOID
          }
      }
    })

    useEffect(()=>{
      if(open)
      {
        if(!rowData[0]?.Keep)
        {
          BON();
        }
        if(rowData[0]?.Keep===true || rowData[0]?.Keep===false)
        {
          BCLOSE();
        }
      }
    })

  return (
    <div>
      <IconButton aria-label="Input View" onClick={handleOpen}>
          <View />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
      <Box sx={{ ...style, width: 800 }}>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <h3>입고 내역</h3>
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
                      {param.iid.row.Code}
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
                      {param.iid.row.OutputDate}
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
                      {param.iid.row.InputStore}
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
                      {param.iid.row.OutputStore}
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
                    {param.iid.row.OutputInfo&&(param.iid.row.OutputInfo)}
                    {!(param.iid.row.OutputInfo)&&("NONE")}
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
        <h4>입고 제품</h4>
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
                    type: 'number',
                    width: 110,
                  },
                  {
                    field: 'KeepF',
                    headerName: '신규',
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

          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Grid>
              <Tooltip title="확정버튼을 누르면 입고처리가 완료됩니다.">
                <Button type="submit" variant="contained" onClick={onConfirm}>확정</Button>
              </Tooltip>
              <Button type="submit" variant="contained" onClick={handleClose}>닫기</Button>
            </Grid>
          </Grid>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={Bopen}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
      </Box>
      </Modal>
    </div>
  );
}

export default MI_View;