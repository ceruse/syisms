// react
import React, { useState } from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
// back
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const U_Delete = () => {
    const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [U_posts, U_setPosts]=useState([]);
  const [U_type, setUtype]=useState(false);

  /* User DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/mypage/select'
        )
      .then(res => {
        U_setPosts(res.data)
        if(res.data.UserType=="Company")
            setUtype(true);
        else if(res.data.UserType=="Store")
            setUtype(true);
        else
            setUtype(false);
      })
      .catch(err=>{
          console.log(err)
      })
   },[])
   console.log(U_posts)

   function Delete(){
    let UserID = U_posts.UserID;

    let User ={UserID};

console.warn("User",User)
fetch('/api/auth/deleteall',
{
  method: 'DELETE',
  headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
  },
  body:JSON.stringify(User)
}).then((result) => {
  result.json().then((resp) => {
    console.warn(resp);
    alert('모든 데이터가 삭제 되었습니다.');
    navigate('../../../');
  })
}).catch(()=>{ alert('ERR');
  console.log('error');
});
    }

  return (
    <div>
      <Button onClick={handleOpen}>회원정보 삭제</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: -4, mb: -1 }}
            >
                <h2>회원정보 삭제</h2>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                    <b1>회원 정보를 삭제를 진행할 경우</b1>
                    <b1>재고, 판매, 입/출고, 관리 를 포함한</b1>
                    <b1>모든 DB가 삭제됩니다.</b1>
                </Grid>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 0, mb: 2}}
                >
                    {U_type&&<h3>계정 유형 : 기업형</h3>}
                    {!U_type&&<h3>계정유형 : 개인 사업자</h3>}
                </Grid>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -3, mb: 0}}
                >
                    {U_type&&<h4>기업 코드 : {U_posts?.UserCode}</h4>}
                </Grid>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -3, mb: 0}}
                >
                    <h4>매장 정보 : {U_posts?.UserInfo}</h4>
                </Grid>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -2, mb: -2 }}
                >
                    <h4>Export 기능을 통한 DB 저장이 권장됩니다.</h4>
                    <Grid>
                        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={Delete}>
                            확인
                        </Button>
                        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} onClick={handleClose}>
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default U_Delete;