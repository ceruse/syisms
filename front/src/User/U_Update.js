// react
import React, { useState } from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// dir
import U_Delete from './U_Delete';

const U_UserDB = () => {
  const navigate = useNavigate();

  const goU_DB = () => {
    navigate('/login/user-db');
  }
  const goBack = () => {
    navigate('../');
  }

  const [UserEmail, setUserEmail]=useState([]);
  const [UserPassword, setUserPassword]=useState("");
  const [UserRePassword, setRePassword]=useState("");
  const [UserName, setUserName]=useState("");
  const [UserAddress, setUserAddress]=useState("");
  const [UserPhonenumber, setUserPhonenumber]=useState("");
  const [UserInfo, setUserInfo]=useState("");
  const [UserCode, setUserCode]=useState("");

  const [ProductInfo, setProductInfo]=useState("");
  const [UProductCode, setProductCode]=useState("");

  /* Product DB Fetching */
   useEffect(()=>{
    getUsers();
    getProduct();
   },[])

   function getUsers() {
      fetch('/api/mypage/select') .then((result) =>{
        result.json().then((resp => {
          setUserEmail(resp.UserEmail)
          setUserPassword(resp.UserPassword)
          setUserName(resp.UserName)
          setUserAddress(resp.UserAddress)
          setUserPhonenumber(resp.UserPhonenumber)
          setUserInfo(resp.UserInfo)
          setUserCode(resp.UserCode)
        }))
        })
   }

   function getProduct() {
    fetch('/api/Product/ProductList') .then((result) =>{
      result.json().then((resp => {
        setProductInfo(resp.UserInfo)
        setProductCode(resp.UserCode)
      }))
      })
 }

   function UpdateUser(){
    if(UserPassword !== UserRePassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
  }
  else if(UserPassword.length <= 7 ){
    return alert('비밀번호는 8자 이상이어야 합니다.')
}
    let item={UserEmail,UserPassword,UserName,UserAddress,UserPhonenumber,UserInfo, UserCode}
    console.warn("item",item)
    fetch('/api/mypage/update', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
      console.log('error');
    });

    let set={UserInfo, UserCode}
    console.warn("set",set)
    fetch('/api/mypage/updateProduct', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getProduct()
        {goBack()};
      })
    }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
      console.log('error');
    });
   }

  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
      <h1>회원정보 수정</h1>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -4, mb: -1 }}
        >
          <h4>아이디</h4>
          <TextField value={UserEmail} InputProps={{readOnly: true,}} sx={{ mt: -2, mb: -1 }} />
          <h4>비밀번호</h4>
          <TextField label='Password' type="password" required sx={{ mt: -2, mb: -1 }} value={UserPassword} onChange={(e)=>setUserPassword(e.target.value)}/>
          <h4>비밀번호 재확인</h4>
          <TextField label='RE:Password' type="password" required sx={{ mt: -2, mb: -1 }} value={UserRePassword} onChange={(e)=>setRePassword(e.target.value)}/>
          <h4>이름</h4>
          <TextField value={UserName} sx={{ mt: -2, mb: -1 }}  onChange={(e)=>setUserName(e.target.value)}/>
          <h4>매장</h4>
          <TextField value={UserInfo} sx={{ mt: -2, mb: -1 }} onChange={(e)=>setUserInfo(e.target.value)}/>
          <h4>기업 코드</h4>
          <TextField value={UserCode} sx={{ mt: -2, mb: -1 }} onChange={(e)=>setUserCode(e.target.value)}/>
          <h4>주소</h4>
          <TextField value={UserAddress} sx={{ mt: -2, mb: -1 }} onChange={(e)=>setUserAddress(e.target.value)}/>
          <h4>번호</h4>
          <TextField value={UserPhonenumber} sx={{ mt: -2, mb: 2 }} onChange={(e)=>setUserPhonenumber(e.target.value)}/>
          <U_Delete />
        </Grid>
      <Grid>
         <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={UpdateUser}>
           저장
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