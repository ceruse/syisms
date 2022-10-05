// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const U_FindID = () => {
  const navigate = useNavigate();

  const goU_ViewID = () => {
    navigate('/fid/02');
  };
  return(
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h1>아이디 찾기</h1>
        <h4>이름</h4>
        <TextField label="User Name" required sx={{ mt: -2, mb: -1 }} />
        <h4>번호</h4>
        <TextField label="Phone Number" required sx={{ mt: -2, mb: -1 }} />
        <h5>회원가입시 사용한 이름과 번호가 일치하면 아이디 확인이 가능합니다.</h5>
        <Button type="submit" variant="contained" onClick={goU_ViewID}>
            다음
        </Button>
      </Grid>
    </Box>
  );
};

export default U_FindID;