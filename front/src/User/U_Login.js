// react
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// back
import axios from 'axios';

const U_Login = () => {
  const navigate = useNavigate();
  
  const goLogin = () => {
    navigate('/login');
  };

  const goFID = () => {
    navigate('/fid/01');
  };
  const goFPW = () => {
    navigate('/fpw/01');
  };
  const goRegister = () => {
    navigate('/register');
  };

  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");

  const onEmailHandler = ({ target: { value } }) => setUserEmail(value);
  const onPasswordHandler = ({ target: { value } }) => setUserPassword(value);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data ={ UserEmail:UserEmail, UserPassword:UserPassword};
    axios.post('api/auth/login', data, { withCredentials: true })
    .then(response => { 
      console.log(response);
      {goLogin()};
    })

    .catch(()=>{alert('아이디 혹은 비밀번호가 다릅니다.');
    console.log('none');
  });
    
  };


  return (
    <form onSubmit={handleSubmit}>
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
      <h1>로그인</h1>

      <TextField label="ID" required sx={{ mt: 3, mb: -1 }} value={UserEmail} onChange={onEmailHandler}/>

      <TextField label="PW" type="password" required sx={{ mt: 3, mb: 2 }} value={UserPassword} onChange={onPasswordHandler} />

      <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }} >
        로그인
      </Button>

        <Button variant="text" onClick={goFID} sx={{ mt: 1, mb: -1 }}>아이디 찾기</Button>
        <Button variant="text" onClick={goFPW} sx={{ mt: 0, mb: -1 }}>비밀번호 찾기</Button>
        <Button variant="text" onClick={goRegister} sx={{ mt: 0, mb: -1 }}>회원가입</Button>
      </Grid>
    </Box>
    </form>
  );
}
export default U_Login;