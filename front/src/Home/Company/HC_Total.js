// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
// back
import axios from "axios";
import {
  GridToolbarContainer,
  GridToolbarExport, 
} from '@mui/x-data-grid';
// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

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

const HC_Total = () => {
    const navigate = useNavigate();
    const ref = React.useRef(null);
    const Font01 = "h7"; // 일,주,월,연 폰트 크기
    const [User, setUser]=useState("");
    const [Cposts, setCposts]=useState([]);
    const [Sposts, setSposts]=useState([]);
    
    const [I_data, setI_data]=useState([]);
    const [O_data, setO_data]=useState([]);

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
    //이동
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
    // Event
    const [Loading, setLoading]=useState(true);

    
        useEffect(()=>{
        axios
            .get(
            '/api/mypage/select'
            )
            .then(res => {
                setUser(res.data.UserInfo)
            })
            axios
            .get(
            '/api/Client/CompanyList'
            )
            .then(res => {
            setCposts(res.data.result)
            })
            axios
            .get(
              '/api/Sales/TotalSalesList'
              )
            .then(res => {
                if(res.data.result.length != SDposts.length && res.data.result.length != 0)
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
        
       useEffect(()=>{
        if(!rowData[0])
        {
        /* Confrim Input list */
        axios
        .get('/api/move/InputCalcList') // 확정 입고
        .then(res => {
            setI_data(res.data.result);
        })
        /* Confrim Input list */
        axios
        .get('/api/move/OutputCalcList') // 확정 출고
        .then(res => {
            setO_data(res.data.result);
        })
        axios
        .get(
          '/api/Move/TotalCalcList'
          )
        .then(res => {
          let CTposts;

          if(Cposts)
          {
              CTposts=Cposts;
          }
          if(CTposts&&Cposts)
          { 
              for(let i=0; i<CTposts?.length; i++)
              {
                  for(let j=0; j<res?.data?.result?.length; j++)
                  {
                      if(res?.data?.result[j].Info === CTposts[i]?.UserInfo)
                      {
                          if(res.data.result[j].Temp === "일매출")
                          {
                              CTposts[i].dCount=res.data.result[j].Count;
                              CTposts[i].dPrice=res.data.result[j].Price;
                          }
                          else if(res.data.result[j].Temp === "월매출")
                          {
                              CTposts[i].mCount=res.data.result[j].Count;
                              CTposts[i].mPrice=res.data.result[j].Price;
                          }
                      }

                  }
              }
              for(let i=0; i<CTposts?.length; i++)
              {
                if(!CTposts[i].dCount||!CTposts[i].dPrice)
                {
                    CTposts[i].dCount=0;
                    CTposts[i].dPrice=0;
                }
                if(!CTposts[i].mCount||!CTposts[i].mPrice)
                {
                    CTposts[i].mCount=0;
                    CTposts[i].mPrice=0;
                }
              }
          }
          
          // 입고
          let TIdata;
          let Idata=[];
          let Ispace=0;

          if(I_data)
          {
            TIdata=I_data;
          }
          if(I_data&&TIdata)
          {
              for(let i=0; i<TIdata.length; i++)
              {
                if(User !== TIdata[i].Info)
                {
                    Idata[Ispace]=TIdata[i];
                    Ispace++;
                }
              }
              for(let i=0; i<Idata?.length; i++)
              {
                for(let j=0; j<CTposts?.length; j++)
                {
                    if(Idata[i]?.Info === CTposts[j]?.UserInfo)
                    {
                        CTposts[j].Icount=Idata[i].Count;
                    }
                }
              }
              for(let i=0; i<CTposts?.length; i++)
              {
                if(!CTposts[i]?.Icount)
                {
                    CTposts[i].Icount=0;
                }
              }
              setSposts(CTposts);
            }

            // 출고
          let TOdata;
          let Odata=[];
          let Ospace=0;

            if(O_data)
            {
                TOdata=O_data;
            }
            if(O_data)
            {
            if(TOdata)
            {
                for(let i=0; i<TOdata?.length; i++)
                {
                    if(User !== TOdata[i]?.Info)
                    {
                        Odata[Ospace]=TOdata[i];
                        Ospace++;
                    }
                }
                for(let i=0; i<Odata?.length; i++)
                {
                    for(let j=0; j<CTposts?.length; j++)
                    {
                        if(Odata[i]?.Info === CTposts[j]?.UserInfo)
                        {
                            CTposts[j].Ocount=Odata[i].Count;
                        }
                    }
                }
                for(let i=0; i<CTposts?.length; i++)
                {
                    if(!CTposts[i]?.Ocount)
                    {
                        CTposts[i].Ocount=0;
                    }
                }
                    setSposts(CTposts);
                }
            }
        })
        }
        if(rowData[0]?.Tcount)
        {
            setLoading(false)
        } 
       })
     
       /* Client DB & DataGrid Matching */
        const rowData = Sposts?.map(Sposts=>{
                return{
                  Address: Sposts?.UserAddress,
                  Info: Sposts?.UserInfo,
                  dCount: Sposts?.dCount+" 개",
                  dPrice: Sposts?.dPrice+" 원",
                  mCount: Sposts?.mCount+" 개",
                  mPrice: Sposts?.mPrice+" 원",
                  Icount: Sposts?.Icount+" 건",
                  Ocount: Sposts?.Ocount+" 건",
                  Tcount: (parseInt(Sposts?.Icount)+parseInt(Sposts?.Ocount))+" 건",
                  id: Sposts?.UserID
                }
        },[])

  return (
    <Box>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -4, mb: 0 }}
        >
            <Box sx={{ width: '100%' ,backgroundColor: 'background'}}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Paper elevation={1}>
                                <Grid sx={{ mt: 0, mb: -5 }}>
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
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: -2 }}>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SDposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SDCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>평균 구매 개수</h4>
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
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: -2 }}>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SMposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SMCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>평균 구매 개수</h4>
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
                                            <Grid container rowSpacing={2} sx={{ mt: 0, mb: -2 }}>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>결제 건수</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SYposts?.length+" 건"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>제품 판매</h4>
                                                    <Grid sx={{ mt: -3, mb: -2 }}>
                                                        <Typography variant={Font01} color="text.secondary">
                                                        {SYCount+" 개"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={4} sx={{ mt: -2}}>
                                                    <h4>평균 구매 개수</h4>
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
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
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
                                <Grid sx={{ mt: 5, mb: -9 }}>
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
                            <Box sx={{ width: '100%', mt: 0, mb: -1 }}>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={4} sx={{ mt: -1, mb: 0 }}>
                                        <Paper elevation={1}>
                                            <h4>미확정 입고</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(DIposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: -1, mb: 0 }}>
                                        <Paper elevation={1}>
                                            <h4>입고</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(DMposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: -1, mb: 0 }}>
                                        <Paper elevation={1}>
                                            <h4>금일</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(DMposts?.length+DOposts?.length+DCOposts?.length)+" 건 "}
                                                {"( 입고 : "+DMposts?.length+" / 출고 : "+(DOposts?.length+DCOposts?.length)+" ) "}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ width: '100%', mt: -3, mb: 0 }}>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={4} sx={{ mt: -1, mb: -1 }}>
                                        <Paper elevation={1}>
                                            <h4>미확정 출고</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(DOposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: -1, mb: -1 }}>
                                        <Paper elevation={1}>
                                            <h4>출고</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(DOposts?.length+DCOposts?.length)+" 건"}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4} sx={{ mt: -1, mb: -1 }}>
                                        <Paper elevation={1}>
                                            <h4>월간</h4>
                                            <Grid sx={{ mt: -3, mb: 1 }}>
                                                <Typography variant={Font01} color="text.secondary">
                                                {(MIOOposts?.length+MIOIposts?.length+MDCOposts?.length)+" 건"}
                                                {"( 입고 : "+MIOIposts?.length+" / 출고 : "+(MIOOposts?.length+MDCOposts?.length)+" ) "}
                                                </Typography>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Item>
                        <Box sx={{ width: '100%' ,backgroundColor: 'background'}}>
                            <Grid container rowSpacing={2}>
                                <Grid item xs={12}>
                                    <Item>
                                        <Paper elevation={1}>
                                            <Grid sx={{ mt: -1.5, mb: -1.5 }}>
                                                <h3>매장별 데이터</h3>
                                            </Grid>
                                        </Paper>
                                        <Box sx={{ width: '100%', mt: 0, mb: 0 }}>
                                            <div style={{ height: 340, width: '100%' }}>
                                            <div style={{ display: 'flex', height: '100%' }}>
                                                <div style={{ flexGrow: 1 }}>
                                                <DataGrid
                                                    rows={rowData}
                                                    columns = {[
                                                        {
                                                          field: 'Info',
                                                          headerName: '매장 이름',
                                                          width: 100,
                                                        },
                                                        {
                                                          field: 'Address',
                                                          headerName: '매장 주소',
                                                          width: 160,
                                                        },
                                                        {
                                                          field: 'dPrice',
                                                          headerName: '일간 매출',
                                                          type: 'number',
                                                          width: 120,
                                                        },
                                                        {
                                                          field: 'dCount',
                                                          headerName: '일간 제품 판매',
                                                          type: 'number',
                                                          width: 120,
                                                        },
                                                        {
                                                          field: 'mPrice',
                                                          headerName: '월간 매출',
                                                          type: 'number',
                                                          width: 120,
                                                        },
                                                        {
                                                          field: 'mCount',
                                                          headerName: '월간 제품 판매',
                                                          type: 'number',
                                                          width: 120,
                                                        },
                                                        {
                                                          field: 'Icount',
                                                          headerName: '일간 입고',
                                                          type: 'number',
                                                          width: 100,
                                                        },
                                                        {
                                                          field: 'Ocount',
                                                          headerName: '일간 출고',
                                                          type: 'number',
                                                          width: 100,
                                                        },
                                                        {
                                                          field: 'Tcount',
                                                          headerName: '일간 총 이동',
                                                          type: 'number',
                                                          width: 100,
                                                        }
                                                      ]}

                                                    disableSelectionOnClick
                                                    hideFooter
                                                    components=
                                                    {{
                                                        LoadingOverlay: LinearProgress,
                                                        Toolbar: CustomToolbar
                                                    }}
                                                      loading={Loading}
                                                    sx={{m:0}}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        </Box>
    </Box>
  );
};

export default HC_Total;