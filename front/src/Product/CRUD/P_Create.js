// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// ex img
import prImg from './ex.png';
// dir
import P_Create_ImgUp from './P_Create_ImgUp';
// back
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const P_Create = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/login/product');
  };

  const [ProductName, setProductName] = useState("");
  const [ProductCode, setProductCode] = useState("");
 //const [ProductBarcode, setProductBarcode] = useState("");
  const [ProductImport, setProductImport] = useState("");
  const [ProductExport, setProductExport] = useState("");
  const [ProductCount, setProductCount] = useState("");
  const [Attribute, setAttribute] = useState("");


  const onProductName = ({ target: { value } }) => setProductName(value);
  const onProductCode = ({ target: { value } }) => setProductCode(value);
 // const onProductBarcode = ({ target: { value } }) => setProductBarcode(value);
  const onProductImport = ({ target: { value } }) => setProductImport(value);
  const onProductExport = ({ target: { value } }) => setProductExport(value);
  const onProductCount = ({ target: { value } }) => setProductCount(value);

  const onAttribute = ({ target: { value } }) => setAttribute(value);
  
  const handleSubmit = (event) => {
  
    event.preventDefault();
    const data ={ 
      ProductName:ProductName, 
      ProductCode:ProductCode,
    //ProductBarcode:ProductBarcode,
      ProductImport:ProductImport,
      ProductExport:ProductExport,
      ProductCount:ProductCount,
      Attribute:Attribute,
    };

    axios.post('/api/product/addproduct', data)
    .then(response => { 
      console.log(response);
      {goBack()};
    })
    .catch(()=>{alert('-');
    console.log('already exist');
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
        <h3>재고 등록</h3>
      </Grid>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: -3, mb: 0 }}
      >
      <Card sx={{ maxWidth: 345, mt: 3, mb: -1}}>
      <CardMedia
        component="img"
        height="180"
        image={prImg}
        alt="Product Image"
      />
      <CardContent>
        <Divider>사진</Divider>
        <P_Create_ImgUp />
        <h5>카메라 아이콘을 누르면 사진 등록이 가능합니다.</h5>
        <Divider>정보</Divider>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <h4>품명</h4>
          <TextField label="Product Name" required sx={{ mt: -2, mb: -2 }} value={ProductName} onChange={onProductName}/>
          <h4>품번</h4>
          <TextField label="Product Code" required sx={{ mt: -2, mb: 1 }} value={ProductCode} onChange={onProductCode}/>
          <Grid sx={{ mt: 0, mb: -2 }}>
          <Checkbox {...label} icon={<QrCodeScannerIcon />} checkedIcon={<QrCodeScannerIcon />} />
          <Button type="submit" variant="contained">생성</Button>
          </Grid>
          <h5>'생성' 버튼을 누르면 '품번'이 자동으로 생성됩니다.</h5>
        </Grid>
      <Divider>가격</Divider>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <h4>구매가</h4>
          <TextField label="Buy Price" required sx={{ mt: -2, mb: -2 }} value={ProductImport} onChange={onProductImport}/>
          <h4>판매가</h4>
          <TextField label="Sell Price" required sx={{ mt: -2, mb: 1 }} value={ProductExport} onChange={onProductExport}/>
      </Grid>
      <Divider>수량</Divider>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <h4>재고</h4>
          <TextField label="Product Count" required sx={{ mt: -2, mb: 2 }} value={ProductCount} onChange={onProductCount}/>
      </Grid>
      <Divider>비고</Divider>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <TextField label="Attribute Label" sx={{ mt: 1, mb: 1 }} value={Attribute} onChange={onAttribute}/>
      </Grid>
      <Divider></Divider>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
          <Grid sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" >
                확인
              </Button>
              <Button type="cancel" variant="contained" onClick={goBack}>
                취소
              </Button>
            </Grid>
      </Grid>
      </CardContent>
      </Card>
    </Grid>
  </Box>
  </form>
  );
  };
export default P_Create;