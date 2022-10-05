// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// back
import axios from 'axios';

const SC_Create = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/login/set');
  };

  const [ClientName, setClientName] = useState("");
  const [ClientNum, setClientNum] = useState("");
  const [ClientAddress, setClientAddress] = useState("");
  const [ManagerName, setManagerName] = useState("");
  const [ManagerNum, setManagerNum] = useState("");
  const [ClientInfo, setClientInfo] = useState("");


  const onClientName = ({ target: { value } }) => setClientName(value);
  const onClientNum = ({ target: { value } }) => setClientNum(value);
  const onClientAddress = ({ target: { value } }) => setClientAddress(value);
  const onManagerName = ({ target: { value } }) => setManagerName(value);
  const onManagerNum = ({ target: { value } }) => setManagerNum(value);
  const onClientInfo = ({ target: { value } }) => setClientInfo(value);

  const handleSubmit = (event) => {
  
    event.preventDefault();
    const data ={ 
      ClientName:ClientName,
      ClientNum:ClientNum,
      ClientAddress:ClientAddress,
      ManagerName:ManagerName,
      ManagerNum:ManagerNum,
      ClientInfo:ClientInfo,
    };

    axios.post('/api/Client/addClient', data)
    .then(response => { 
      console.log(response);
      {goBack()};
    })
    .catch(()=>{alert('다시 작성하세요.');
    console.log('error');
  });
};



  return (
    <form onSubmit={handleSubmit}>
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>거래처 등록</h3>
        <h4>매장 이름</h4>
        <TextField label="Store Name" required sx={{ mt: -1, mb: 0 }} value={ClientName} onChange={onClientName}/>
        <h4>매장 번호</h4>
        <TextField label="Store Number" required sx={{ mt: -1, mb: 0 }} value={ClientNum} onChange={onClientNum}/>
        <h4>매장 주소</h4>
        <TextField label="Store Address" required sx={{ mt: -1, mb: 0 }} value={ClientAddress} onChange={onClientAddress}/>
        <h4>매니저 이름</h4>
        <TextField label="Manager Name" required sx={{ mt: -1, mb: 0 }} value={ManagerName} onChange={onManagerName}/>
        <h4>매니저 번호</h4>
        <TextField label="Manager Number" required sx={{ mt: -1, mb: 0 }} value={ManagerNum} onChange={onManagerNum}/>
        <h4>취급 품목</h4>
        <TextField
          label="Info"
          multiline
          rows={5}
          required
          sx={{ mt: -1, mb: 0 } } value={ClientInfo} onChange={onClientInfo}
        />
        <Grid sx={{mt: 2, mb: 0}}>
            <Button type="submit" variant="contained">
                등록
            </Button>
            <Button type="submit" variant="contained" onClick={goBack}>
                취소
            </Button>
        </Grid>
    </Grid>
  </Box>
  </form>
  );
};

export default SC_Create;