// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import View from '@mui/icons-material/Pageview';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
// ex img
import prImg from './ex.png';

// dir
import P_ViewInf from './P_ViewInf';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



function UpdateModal(param) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    {console.log(param.pid.id)}
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let [ProductID, setProductID]=useState(param.pid.key);
  let [ProductName, setProductName]=useState(param.pid.Name);
  let [ProductCode, setProductCode]=useState(param.pid.Code);
  let [ProductImport, setProductImport]=useState(param.pid.IPrice);
  let [ProductExport, setProductExport]=useState(param.pid.EPrice);
  let [ProductCount, setProductCount]=useState(param.pid.Count);
  let [Attribute, setAttribute]=useState(param.pid.Att);

  useEffect(()=>{
  })


  function UpdateProduct(){
    let item={ProductID,ProductName,ProductCode,ProductImport,ProductExport,ProductCount,Attribute}
  
    console.warn("item",item)
    fetch('/api/product/updateProduct/', {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        setProductID(resp.ProductID)
        setProductName(resp.ProductName)
        setProductCode(resp.ProductCode)
        setProductImport(resp.ProductImport)
        setProductExport(resp.ProductExport)
        setProductCount(resp.ProductCount)
        setAttribute(resp.Attribute)
        console.log(item)
        {handleClose()};
      })
    }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
      console.log('error');
    });
   }




  return (
    <React.Fragment>
      <Button type="update" variant="contained" onClick={handleOpen}>수정</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        scroll
      >
        <Box sx={{ ...style, flex: 1}}>
        <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <Grid sx={{ mt: -3, mb: -2 }}>
          <h3>제품 수정</h3>
        </Grid>
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
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <TextField required label="품명" sx={{ mt: -1, mb: 1 }} value={ProductName} onChange={(e)=>setProductName(e.target.value)}/>
        <TextField required label="품번" sx={{ mt: 0, mb: 1 }} value={ProductCode} onChange={(e)=>setProductCode(e.target.value)}/>
        <TextField required label="구매가" sx={{ mt: 0, mb: 1 }} value={ProductImport} onChange={(e)=>setProductImport(e.target.value)}/>
        <TextField required label="판매가" sx={{ mt: 0, mb: 1 }} value={ProductExport} onChange={(e)=>setProductExport(e.target.value)}/>
        <TextField required label="재고" sx={{ mt: 0, mb: -1 }} value={ProductCount} onChange={(e)=>setProductCount(e.target.value)}/>
        <TextField label="Attribute" required sx={{ mt: 2, mb: 1 }} value={Attribute} onChange={(e)=>setAttribute(e.target.value)}/>
      
      </Grid>
      </CardContent>
    </Card>

    </Grid>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 0, mb: -1 }}
          >
            <Grid>
              <Button type="submit" variant="contained" onClick={UpdateProduct}>확인</Button>
              <Button type="submit" variant="contained" onClick={handleClose}>취소</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function DeleteModal(param) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  
  function DeleteProduct() {
    const ProductID = param.pid.key;
    let product={ProductID}
      product.ProductID=ProductID;
    console.warn("product",product)
    fetch('/api/product/deleteProduct', {
      method: 'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(product)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        handleClose()
        navigate('/login');
        navigate('/login/product');
      })
    }).catch(()=>{ alert('ERR');
      console.log('error');
    });
 }
  
  return (
    <React.Fragment>
      <Button type="delete" variant="contained" onClick={handleOpen}>삭제</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        scroll
      >
        <Box sx={{ ...style, width: 400 }}>
        <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>제품 삭제</h3>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -2, mb: 1 }}
        >
          <h4>해당 제품을 삭제하시겠습니까?</h4>
          {/*Product Name*/}
          {param.pid.Name}
        </Grid>
        </Grid>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Grid>
              <Button type="submit" variant="contained" onClick={DeleteProduct}>확인</Button>
              <Button type="submit" variant="contained" onClick={handleClose}>취소</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function P_View(paramPV) {
  const [open, setOpen] = React.useState(false);
  const returnTemporary = 0;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="Product View" onClick={handleOpen}>
          <View />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, flex: 1 }}>
          <P_ViewInf pid={paramPV.pid.id}/>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Grid sx={{ mt: 3, mb: -1 }}>
              <UpdateModal pid={paramPV.pid.row}/>
              <DeleteModal pid={paramPV.pid.row}/>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}