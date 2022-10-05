// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const U_ViewID = () => {
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
      <h1>아이디 확인</h1>
      <h4>고객님의 아이디는 " roremipsum@gmail.com " 입니다.</h4>
      <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={goBack}>
        확인
      </Button>
      </Grid>
    </Box>
  );
};

export default U_ViewID;