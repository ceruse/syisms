// react
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SA_Update = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/login/set');
  }

  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>속성 수정</h3>
        <h4>속성 이름</h4>
        <TextField label="Attribute 01" sx={{ mt: -1, mb: 2 }} />
        <TextField label="Attribute 02" sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 03" sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 04" sx={{ mt: 0, mb: 2 }} />
        <TextField label="Attribute 05" sx={{ mt: 0, mb: 2 }} />

        <Grid>
            <Button type="submit" variant="contained" onClick={goBack}>
                저장
            </Button>
            <Button type="submit" variant="contained" onClick={goBack}>
                취소
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SA_Update;