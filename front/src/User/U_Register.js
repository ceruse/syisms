// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// back
import axios from 'axios';



const U_Register = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('../');
  };

  const [UserType1, setUserType1] = useState(false);
  const [UserType2, setUserType2] = useState(false);
  const [UserType3, setUserType3] = useState(false);
  const [UserTypeData, setUserTypeData] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [CirUserPassword, setCirUserPassword] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserAddress, setUserAddress] = useState("");
  const [UserPhonenumber, setUserPhonenumber] = useState("");
  const [UserInfo, setUserInfo] = useState("");
  const [UserCode, setUserCode] = useState("");


  const onEmailHandler = ({ target: { value } }) => setUserEmail(value);
  const onPasswordHandler = ({ target: { value } }) => setUserPassword(value);
  const onCirPasswordHandler = ({ target: { value } }) => setCirUserPassword(value);
  const onNamedHandler = ({ target: { value } }) => setUserName(value);
  const onInfoHandler = ({ target: { value } }) => setUserInfo(value);
  const onAddressHandler = ({ target: { value } }) => setUserAddress(value);
  const onPhonenumberHandler = ({ target: { value } }) => setUserPhonenumber(value);
  const onUserCodeHandler = ({ target: { value } }) => setUserCode(value);

  const handleSubmit = (event) => {
    if(UserPassword !== CirUserPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
  }else if(UserPassword.length <= 7 ){
    return alert('비밀번호는 8자 이상이어야 합니다.')
}
  
    event.preventDefault();
    const data ={ 
      UserEmail:UserEmail,
      UserName:UserName, 
      UserPassword:UserPassword,
      UserInfo:UserInfo,
      UserAddress:UserAddress,
      UserPhonenumber:UserPhonenumber,
      UserType:UserTypeData,
      UserCode:UserCode,
    };
    axios.post('api/auth/signup', data)
    .then(response => { 
      console.log(response);
      {goBack()};
    })

    .catch(()=>{alert('회원가입은 1번만 진행할 수 있습니다.');
    console.log('already exist');
    {goBack()};
  });
  };

  const handleChange01 = (event) => {
    setUserType1(true);
    setUserType2(false);
    setUserType3(false);
    setUserTypeData("Company");
  };
  const handleChange02 = (event) => {
    setUserType1(false);
    setUserType2(true);
    setUserType3(false);
    setUserTypeData("Store");
  };
  const handleChange03 = (event) => {
    setUserType1(false);
    setUserType2(false);
    setUserType3(true);
    setUserTypeData("Individual");
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
      <h1>회원가입</h1>
        <h4>회원 유형</h4>
        <FormGroup>
          <FormControlLabel control={
          <Checkbox checked={UserType1}
              onChange={handleChange01}
              inputProps={{ 'aria-label': 'controlled' }} />}
              label="기업형 : 본사"/>
          <FormControlLabel control={
          <Checkbox checked={UserType2}
              onChange={handleChange02}
              inputProps={{ 'aria-label': 'controlled' }}/>}
              label="기업형 : 매장"/>
          <FormControlLabel control={
          <Checkbox checked={UserType3}
              onChange={handleChange03}
              inputProps={{ 'aria-label': 'controlled' }}/>}
              label="개인형 : 사업자"/>
        </FormGroup>
        <h5>회원 유형에 따른 사용권한이 주어집니다.</h5>

        {UserType1&&<h4>기업 코드 생성</h4>}
        {UserType1&&<TextField label="Create Company Code" required sx={{ mt: -2, mb: 2 }} value={UserCode} onChange={onUserCodeHandler}/>}
        {UserType1&&<h5>해당 기업을 나타낼 코드를 기입해주세요.</h5>}

        {UserType2&&<h4>기업 코드 등록</h4>}
        {UserType2&&<TextField label="Register Company Code" required sx={{ mt: -2, mb: 2 }} value={UserCode} onChange={onUserCodeHandler}/>}
        {UserType2&&<h5>가입하려는 기업의 코드를 등록해주세요.</h5>}

        <h4>아이디</h4>
        <TextField type="email" label="E-mail ID" required sx={{ mt: -2, mb: -1 }} value={UserEmail} onChange={onEmailHandler}/>
        <h5>아이디는 이메일 형식이며 비밀번호 찾기에 사용됩니다.</h5>
        <h4>비밀번호</h4>
        <TextField type="password" label="Password" required sx={{ mt: -1, mb: -1 }} value={UserPassword} onChange={onPasswordHandler}/>
        <h4>비밀번호 재확인</h4>
        <TextField type="password" label="Password:RE" required sx={{ mt: -2, mb: -1 }} value={CirUserPassword} onChange={onCirPasswordHandler}/>
        <h5>비밀번호는 8자리 이상 입력해주세요.</h5>
        <h4>이름</h4>
        <TextField required label="User Name" sx={{ mt: -2, mb: -1 }}  value={UserName} onChange={onNamedHandler}/>
        <h4>매장</h4>
        <TextField label="Store Name" required sx={{ mt: -2, mb: -1 }} value={UserInfo} onChange={onInfoHandler}/>
        <h4>주소</h4>
        <TextField label="Store Adress" required sx={{ mt: -2, mb: -1 }} value={UserAddress} onChange={onAddressHandler}/>
        <h4>번호</h4>
        <TextField label="Phone Number" required sx={{ mt: -2, mb: -1 }} value={UserPhonenumber} onChange={onPhonenumberHandler}/>
        <h5>번호는 "010-0000-0000" 의 형식으로 입력해주세요.</h5>
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 0 }} >
          가입하기
        </Button>
      </Grid>
    </Box>
    </form>

  );
}

export default U_Register;