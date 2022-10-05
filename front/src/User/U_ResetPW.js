// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const U_ResetPW = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };
  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h1>비밀번호 초기화</h1>
        <h4>비밀번호</h4>
        <TextField type="password" label="Password" required sx={{ mt: -1, mb: -1 }} />
        <h4>비밀번호 재확인</h4>
        <TextField type="password" label="Password:RE" required sx={{ mt: -2, mb: -1 }} />
        <h5>확인을 누르면 비밀번호가 초기화됩니다.</h5>
        <Button type="submit" variant="contained" sx={{ mt: 0, mb: 0 }} onClick={goBack}>
         확인
        </Button>
      </Grid>
    </Box>
  );
};

export default U_ResetPW;