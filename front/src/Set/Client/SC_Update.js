// react
import * as React from 'react';
import  { useState, useEffect } from 'react';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

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

const SC_Update = (param) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let [ClientID, setClientID]=useState(param.pid.row.key);
  let [ClientName, setClientName]=useState(param.pid.row.StoreName);
  let [ClientNum, setClientNum]=useState(param.pid.row.Number);
  let [ClientAddress, setClientAddress]=useState(param.pid.row.Address);
  let [ManagerName, setManagerName]=useState(param.pid.row.ManagerName);
  let [ManagerNum, setManagerNum]=useState(param.pid.row.PhoneNumber);
  let [ClientInfo, setClientInfo]=useState(param.pid.row.Category);


  useEffect(()=>{
   })

   function UpdateClient(){

    let item={ClientID,ClientName,ClientNum,ClientAddress,ManagerName,ManagerNum,ClientInfo}

    console.warn("item",item)
    fetch('/api/Client/updateClient/', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        setClientID(resp.ClientID)
        setClientName(resp.ClientName)
        setClientNum(resp.ClientNum)
        setClientAddress(resp.ClientAddress)
        setManagerName(resp.ManagerName)
        setManagerNum(resp.ManagerNum)
        setClientInfo(resp.ClientInfo)
        console.log(item)
        {handleClose()};
      })
    }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
      console.log('error');
    });
   }

  return (
    <div>
      <IconButton aria-label="SC View" onClick={handleOpen}>
          <UpdateIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* Update S*/}
          <Grid
          container
          direction="column"
          justifyContent="center"     
          alignItems="center"
          >
            <h3>거래처 수정</h3>

            <h4>매장 이름</h4>
            <TextField label="Store Name" sx={{ mt: -1, mb: 0 }} value={ClientName} onChange={(e)=>setClientName(e.target.value)}/>
            <h4>매장 번호</h4>
            <TextField label="Store Number" sx={{ mt: -1, mb: 0 }} value={ClientNum} onChange={(e)=>setClientNum(e.target.value)}/>
            <h4>매장 주소</h4>
            <TextField label="Manager address" sx={{ mt: -1, mb: 0 }} value={ClientAddress} onChange={(e)=>setClientAddress(e.target.value)}/>
            <h4>매니저 이름</h4>
            <TextField label="Manager Name" sx={{ mt: -1, mb: 0 }} value={ManagerName} onChange={(e)=>setManagerName(e.target.value)}/>
            <h4>매니저 번호</h4>
            <TextField label="Manager Number" sx={{ mt: -1, mb: 0 }} value={ManagerNum} onChange={(e)=>setManagerNum(e.target.value)}/>
            <h4>취급 품목</h4>
            <TextField 
            label="Info" multiline rows={5} sx={{ mt: -1, mb: 0 }} value={ClientInfo}  onChange={(e)=>setClientInfo(e.target.value)}
            />
          </Grid>
          {/* Update E */}
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Grid>
              <Button type="submit" variant="contained" onClick={UpdateClient}>확인</Button>
              <Button type="submit" variant="contained" onClick={handleClose}>취소</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default SC_Update;