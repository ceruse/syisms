// react
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// dir
import HM_Graph01 from './HM_Graph01';
// back
import axios from "axios";

const now = new Date();
const date = {
  year: now.getFullYear(),
  month: now.getMonth()+1,
  date: now.getDate(),
  hours: now.getHours(),
  minutes: now.getMinutes(),
  day: now.getDay(),
}

// Styles function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));

const HM_Move = () => {
    // react
    const navigate = useNavigate();
    const ref = React.useRef(null);
    // output db
    const [DOposts, setDOposts]=useState([]);
    const [WOposts, setWOposts]=useState([]);
    const [DMposts, setDMposts]=useState([]);
    const [DCOposts, setDCOposts]=useState([]);
    const [MDCOposts, setMDCOposts]=useState([]);
    const [COposts, setCOposts]=useState([]);
    // input db
    const [DIposts, setDIposts]=useState([]);
    const [WIposts, setWIposts]=useState([]);
    // I/O db
    const [MIOOposts, setMIOOposts]=useState([]);
    const [MIOIposts, setMIOIposts]=useState([]);

    // front
    const Font01 = "h7"; // 일,주,월,연 폰트 크기
  
    const goBack = () => {
      navigate('/login/sales/');
    };
    
     useEffect(()=>{
        /* Today Output axios Fetching */
        axios
        .get('/api/move/outputlists') // 미 확정 출고
        .then(res => {
            let DO_Space=0;
            let DO_Data=[];
            let WO_Space=0;
            let WO_Data=[];
            let MIOO_Space=0;
            let MIOO_Data=[];

            if(res.data.output)
            {
                for(let i=0; i<res.data.output.length; i++)
                {
                    if(res.data.output[i].OutputDate.substring(0,4) == date.year)
                    {
                        if(res.data.output[i].OutputDate.substring(5,7) == date.month)
                        {
                            if(res.data.output[i].OutputDate.substring(8,10) == date.date)
                            {
                                DO_Data[DO_Space]=res.data.output[i];
                                DO_Space++;
                            }
                            if(res.data.output[i].OutputDate.substring(8,10) >= date.date-date.day+1 &&
                            res.data.output[i].OutputDate.substring(8,10) <= date.date-(date.day-7))
                            {
                                WO_Data[WO_Space]=res.data.output[i];
                                WO_Space++;
                            }
                            MIOO_Data[MIOO_Space]=res.data.output[i];
                            MIOO_Space++;
                        }
                    }
                }
            }
            // Today Output Fetching
            setDOposts(DO_Data);
            // Week Output Fetching
            setWOposts(WO_Data);
            // Month Output Fetching
            setMIOOposts(MIOO_Data);
        })
        /* Today Input axios Fetching */
        axios
        .get('/api/move/moveoutput') // 미 확정 입고
        .then(res => {
            let DI_Space=0;
            let DI_Data=[];

            if(res.data.result)
            {
                for(let i=0; i<res.data.result.length; i++)
                {
                    if(res.data.result[i].OutputDate.substring(0,4) == date.year)
                    {
                        if(res.data.result[i].OutputDate.substring(5,7) == date.month)
                        {
                            if(res.data.result[i].OutputDate.substring(8,10) == date.date)
                            {
                                DI_Data[DI_Space]=res.data.result[i];
                                DI_Space++;
                            }
                        }
                    }
                }
                // Today Input Fetching
                setDIposts(DI_Data);
            }
        })
        /* Confrim Output list */
        axios
        .get('/api/move/OnlyMeOutputList') // 확정 출고
        .then(res => {
            let DCO_Space=0;
            let DCO_Data=[];
            let MDCO_Space=0;
            let MDCO_Data=[];
            let CO_Space=0;
            let CO_Data=[];

            if(res.data.result)
            {
                for(let i=0; i<res.data.result.length; i++)
                {
                    if(res.data.result[i].OutputDate.substring(0,4) == date.year)
                    {
                        if(res.data.result[i].OutputDate.substring(5,7) == date.month)
                        {
                            if(res.data.result[i].OutputDate.substring(8,10) == date.date)
                            {
                                DCO_Data[DCO_Space]=res.data.result[i];
                                DCO_Space++;
                            }
                            if(res.data.result[i].OutputDate.substring(8,10) >= date.date-date.day+1 &&
                            res.data.result[i].OutputDate.substring(8,10) <= date.date-(date.day-7))
                            {
                                CO_Data[CO_Space]=res.data.result[i];
                                CO_Space++;
                            }
                            MDCO_Data[MDCO_Space]=res.data.result[i];
                            MDCO_Space++;
                        }
                    }
                }
                // Today Output Fetching
                setDCOposts(DCO_Data);
                // Week Output Fetching
                setCOposts(CO_Data);
                // Month Output Fetching
                setMDCOposts(MDCO_Data);
            }
        })
        /* Confrim Input list */
        axios
        .get('/api/move/OnlyMeInputList') // 확정 입고
        .then(res => {
            let DM_Space=0;
            let DM_Data=[];
            let WI_Space=0;
            let WI_Data=[];
            let MIOI_Space=0;
            let MIOI_Data=[];

            if(res.data.result)
            {
                for(let i=0; i<res.data.result.length; i++)
                {
                    if(res.data.result[i].OutputDate.substring(0,4) == date.year)
                    {
                        if(res.data.result[i].OutputDate.substring(5,7) == date.month)
                        {
                            if(res.data.result[i].OutputDate.substring(8,10) == date.date)
                            {
                                DM_Data[DM_Space]=res.data.result[i];
                                DM_Space++;
                            }
                            if(res.data.result[i].OutputDate.substring(8,10) >= date.date-date.day+1 &&
                            res.data.result[i].OutputDate.substring(8,10) <= date.date-(date.day-7))
                            {
                                WI_Data[WI_Space]=res.data.result[i];
                                WI_Space++;
                            }
                            MIOI_Data[MIOI_Space]=res.data.result[i];
                            MIOI_Space++;
                        }
                    }
                }
                // Today Input Fetching
                setDMposts(DM_Data);
                // Week Output Fetching
                setWIposts(WI_Data);
                // Month Input Fetching
                setMIOIposts(MIOI_Data);
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
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Paper elevation={1}>
                                <Grid sx={{ mt: -1, mb: -5 }}>
                                    <h3>이동 현황</h3>
                                </Grid>
                            </Paper>
                                <Grid sx={{ mt: 7, mb: -5 }} container>
                                    <Grid item xs={8}>
                                        <Paper elevation={1}>
                                            <h4>금일 입/출고</h4>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>총 입/출고</h4>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            <Box sx={{ width: '100%', mt: 1, mb: 0 }}>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>미확정 입고</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(DIposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>입고</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(DMposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>금일</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(DMposts?.length+DOposts?.length+DCOposts?.length)+" 건 "}
                                                    {"( 입고 : "+DMposts?.length+" / 출고 : "+(DOposts?.length+DCOposts?.length)+" ) "}
                                                </Typography>
                                            </Grid>
                                            <Grid sx={{ mt: -1, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ width: '100%', mt: -3, mb: 0 }}>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>미확정 출고</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(DOposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>출고</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(DOposts?.length+DCOposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={1}>
                                            <h4>월간</h4>
                                            <Grid sx={{ mt: -2, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                    {(MIOOposts?.length+MIOIposts?.length+MDCOposts?.length)+" 건"}
                                                    {"( 입고 : "+MIOIposts?.length+" / 출고 : "+(MIOOposts?.length+MDCOposts?.length)+" ) "}
                                                </Typography>
                                            </Grid>
                                            <Grid sx={{ mt: -1, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Paper elevation={1}>
                                <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ mt: 0, mb: -4 }}
                                >
                                    <HM_Graph01/>
                                </Grid>
                            </Paper>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Box>
  );
};

export default HM_Move;