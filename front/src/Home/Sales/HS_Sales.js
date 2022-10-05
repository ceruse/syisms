// react
import React, { useState, useEffect } from "react";
// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// back
import axios from "axios";
// dir
import HS_Graph01 from './HS_Graph01';

// Styles function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));

  
const now = new Date();

const date = {
  year: now.getFullYear(),
  month: now.getMonth()+1,
  date: now.getDate(),
  hours: now.getHours(),
  minutes: now.getMinutes(),
  day: now.getDay(),
}
console.log(date.date-31)

const HS_Sales = () => {
/* DB */
    // 일간
    const [SDposts, setSDposts]=useState([]);
    const [SDCount, setSDCount]=useState(0);
    const [SDoutput, setSDoutput]=useState(0);
    // 연간
    const [SYposts, setSYposts]=useState([]);
    const [SYCount, setSYCount]=useState(0);
    const [SYoutput, setSYoutput]=useState(0);
    // 월간
    const [SMposts, setSMposts]=useState([]);
    const [SMCount, setSMCount]=useState(0);
    const [SMoutput, setSMoutput]=useState(0);
    const Font01 = "h7"; // 일,주,월,연 폰트 크기

      useEffect(()=>{
        /* Sales DB Fetching */
        axios
        .get(
          '/api/Sales/SalesList'
          )
        .then(res => {
            if(res.data.result.length !== SDposts.length && res.data.result.length !== 0)
            {
                let tempSD=[], SD_Space=0, SD_Count=0, SD_Output=0;
                let tempSY=[], SY_Space=0, SY_Count=0, SY_Output=0;
                let tempSM=[], SM_Space=0, SM_Count=0, SM_Output=0;

                for(let i=0; i<res.data.result.length; i++)
                {
                    if(res.data.result[i].SalesDate.substring(0,4) == date.year) // Year Equal
                    {
                        if(res.data.result[i].SalesDate.substring(5,7) == date.month) // Month Equal
                        {
                            if(res.data.result[i].SalesDate.substring(8,10) == date.date) // Date Equal
                            {
                                tempSD[SD_Space]=res.data.result[i];
                                SD_Count=SD_Count+res.data.result[i].SalesCount;
                                SD_Output=SD_Output+res.data.result[i].SalesPrice;
                                SD_Space++;
                            }
                            tempSM[SM_Space]=res.data.result[i];
                            SM_Count=SM_Count+res.data.result[i].SalesCount;
                            SM_Output=SM_Output+res.data.result[i].SalesPrice;
                            SM_Space++;
                        }                        
                        tempSY[SY_Space]=res.data.result[i];
                        SY_Count=SY_Count+res.data.result[i].SalesCount;
                        SY_Output=SY_Output+res.data.result[i].SalesPrice;
                        SY_Space++;
                    }
                }
                // SD data
                setSDposts(tempSD);
                setSDCount(SD_Count);
                setSDoutput(SD_Output);
                // SY data
                setSYposts(tempSY);
                setSYCount(SY_Count);
                setSYoutput(SY_Output);
                // SM data
                setSMposts(tempSM);
                setSMCount(SM_Count);
                setSMoutput(SM_Output);
            } 
        })
     },[])

  return (
      <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -2, mb: 0 }}
        >
            <Box sx={{ width: '100%' ,backgroundColor: 'background'}}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Paper elevation={1}>
                                <Grid sx={{ mt: 0, mb: -4 }}>
                                    <h3>매출 분석</h3>
                                </Grid>
                            </Paper>
                            <Box sx={{ width: '100%', mt: 1, mb: 0 }}>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <Grid sx={{ mt: 1, mb: -2 }}>
                                                <h3>일간</h3>
                                            </Grid>
                                        </Paper>
                                        <Paper elevation={1}>
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: 0 }}>
                                                <Grid xs={4}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SDposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SDCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>평균 구매율</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SDCount&&(Math.round(SDCount/SDposts?.length*10)/10)+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid sx={{ mt: 4, mb: -2 }}>
                                                <Divider></Divider>
                                            </Grid>
                                            <h4>매출</h4>
                                            <Grid sx={{ mt: -3, mb: -2 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {SDoutput+" 원"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Paper elevation={1}>
                                            <Grid sx={{ mt: 1, mb: -2 }}>
                                                <h3>월간</h3>
                                            </Grid>
                                        </Paper>
                                        <Paper elevation={1}>
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: 0 }}>
                                                <Grid xs={4}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SMposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SMCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>평균 구매율</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SMCount&&(Math.round(SMCount/SMposts?.length*10)/10)+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid sx={{ mt: 4, mb: -2 }}>
                                                <Divider></Divider>
                                            </Grid>
                                            <h4>매출</h4>
                                            <Grid sx={{ mt: -3, mb: -2 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {SMoutput+" 원"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <Grid sx={{ mt: 1, mb: -2 }}>
                                                <h3>연간</h3>
                                            </Grid>
                                        </Paper>
                                        <Paper elevation={1}>
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: 0 }}>
                                                <Grid xs={4}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SYposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SYCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <h4>평균 구매율</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                            {SYCount&&(Math.round(SYCount/SYposts?.length*10)/10)+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid sx={{ mt: 4, mb: -2 }}>
                                                <Divider></Divider>
                                            </Grid>
                                            <h4>매출</h4>
                                            <Grid sx={{ mt: -3, mb: -2 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {SYoutput+" 원"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Paper elevation={1}>
                                <Grid sx={{ mt: 4, mb: 0 }}>
                                    <h3>시간대 매출</h3>
                                </Grid>
                            </Paper>
                            <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 2, mb: -3 }}
                            >
                                <HS_Graph01 db={SDposts}/>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Box>
  );
};

export default HS_Sales;