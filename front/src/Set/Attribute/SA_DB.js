// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SA_DB = () => {
  const navigate = useNavigate();

  const goSA_Update = () => {
    navigate('/login/set/attribute-update');
  }

  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h4>속성 이름</h4>
        <TextField label="Attribute 01" disabled sx={{ mt: -1, mb: 2 }} />
        <TextField label="Attribute 02" disabled sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 03" disabled sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 04" disabled sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 05" disabled sx={{ mt: 0, mb: 0 }} />

        <h5>속성은 최대 '5개' 까지 사용 가능합니다.</h5>

        <Button type="submit" variant="contained" onClick={goSA_Update}>
          수정
        </Button>
      </Grid>
    </Box>
  );
};

export default SA_DB;