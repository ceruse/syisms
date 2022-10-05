// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const date = new Date();

const M_ICreate = () => {
  const navigate = useNavigate();
  //useState() - 값이 변화되는 것을 저장
  const [text, setText] = useState(''); //처음 기본값 비우기

  //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
  const onTextChange = (e) => {
      //e : 이벤트 객체
      setText(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
  }

  //state값을 초기화 시키는 함수
  const onDateReset = () => {
      setText('');
  }

  const goBack = () => {
    navigate('/login/move');
  };
  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>입고 등록</h3>
        <Grid container spacing={3} sx={{ mt: -2, mb: 2 }}>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>입고 등록일</h4>
                    <TextField value={date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()} disabled sx={{ mt: -1, mb: 0 }}/>
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
                    <TextField label="OutputStroe" required sx={{ mt: -1, mb: 0 }}/>
            </Grid>
        </Grid>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
          <h4>제품 등록</h4>
          <Grid>
            <TextField
            label="Product Code or Barcode"
            sx={{ mt: -1, mb: 0 }}
            type="text"
            onChange={onTextChange}
            value={text}
            />
            <Button type="submit" variant="contained" onClick={onDateReset}>
              등록
            </Button>
            {text}
          </Grid>
        </Grid>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mb: 0 }}
        >
          <h4>제품 목록</h4>
        </Grid>
        <Grid sx={{mt: 2, mb: 0}}>
            <Button type="submit" variant="contained" onClick={goBack}>
                등록
            </Button>
            <Button type="submit" variant="contained" onClick={goBack}>
                취소
            </Button>
        </Grid>
      </Grid>
  </Box>
  );
};

export default M_ICreate;