// react
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// back
import axios from "axios";

// ex img
import prImg from './ex.png';

const P_ViewInf = (paramPVI) => {
  const [PV_posts, PV_setPosts]=useState([]);

  /* Product View DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/product/Productlist'
        )
      .then(res => {
        PV_setPosts(res.data.result[paramPVI.pid-1])
      })
      .catch(err=>{
          console.log(err)
      })
   })

  return (
    <Grid>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>제품 정보</h3>
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
        <Grid sx={{ mt: -2, mb: -2 }}>
          <h3>정보</h3>
        </Grid>
        <b1>품명</b1>
        <Typography variant="body1" color="text.secondary">
          {PV_posts.ProductName}
        </Typography>
       <b1>품번</b1>
        <Typography variant="body1" color="text.secondary">
          {PV_posts.ProductCode}
        </Typography>
       <b1>구매가</b1>
        <Typography variant="body1" color="text.secondary">
          {PV_posts.ProductImport}
        </Typography>
       <b1>판매가</b1>
        <Typography variant="body1" color="text.secondary">
          {PV_posts.ProductExport}
        </Typography>
       <b1>재고</b1>
        <Typography variant="body1" color="text.secondary">
          {PV_posts.ProductCount}
        </Typography>
        <Grid sx={{ mt: -2, mb: -2 }}>
          <h3>비고</h3>
        </Grid>
          <Typography variant="body1" color="text.secondary">
            {PV_posts.Attribute}
          </Typography>
      </Grid>
       
      </CardContent>
    </Card>
      
    </Grid>
    </Grid>
  );
};

export default P_ViewInf;