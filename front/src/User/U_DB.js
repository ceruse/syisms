// react
import React, { useState } from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// back
import axios from 'axios';

  const U_UserDB = () => {
  const navigate = useNavigate();

  const goU_Update = () => {
    navigate('/login/user-db/update');
  }
  const goBack = () => {
    navigate('../');
  }

  const [U_posts, U_setPosts]=useState([]);
  /* Product DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/mypage/select'
        )
      .then(res => {
        console.log(res.data)
        U_setPosts(res.data)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])

  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
      <h1>회원정보</h1>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -4, mb: -1 }}
        >
          <h4>아이디</h4>
          <TextField value={U_posts.UserEmail} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: -1 }} />
          <h4>이름</h4>
          <TextField value={U_posts.UserName} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: -1 }} />
          <h4>매장</h4>
          <TextField value={U_posts.UserInfo} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: -1 }} />
          <h4>기업 코드</h4>
          <TextField value={U_posts.UserCode} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: -1 }} />
          <h4>주소</h4>
          <TextField value={U_posts.UserAddress} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: -1 }} />
          <h4>번호</h4>
          <TextField value={U_posts.UserPhonenumber} InputProps={{
            readOnly: true,
          }}sx={{ mt: -2, mb: 2 }} />
        </Grid>
      <Grid>
         <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={goU_Update}>
           수정
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={goBack}>
          취소
          </Button>
      </Grid>
      </Grid>
    </Box>
  );
}

export default U_UserDB;