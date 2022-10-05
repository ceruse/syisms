// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const U_FindPW = () => {
  const navigate = useNavigate();

  const goU_ResetPW = () => {
    navigate('/fpw/02');
  };
  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h1>비밀번호 찾기</h1>
        <h4>ID</h4>
        <TextField type="emial" label="E-mail ID" required sx={{ mt: -2, mb: -1 }} />
        <h4>이름</h4>
        <TextField label="User Name" required sx={{ mt: -2, mb: -1 }} />
        <h5>회원가입시 사용한 아이디와 이름이 일치할 경우 이메일로 비밀번호 초기화가 가능합니다.</h5>
        <Button type="submit" variant="contained" onClick={goU_ResetPW}>
          다음
        </Button>
      </Grid>
    </Box>
  );
}

export default U_FindPW;