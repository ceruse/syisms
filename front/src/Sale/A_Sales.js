// react
import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// dir
import A_CountAdd from './A_CountAdd';
import A_CountRemove from './A_CountRemove';
import A_CountDelete from './A_CountDelete';
// back
import axios from "axios";
// Styles function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));
// Barcode button function
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const A_Sales = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  // Sales if Key
  const [key, setKey] = useState(0);
  // Sales Data
  const [SCount, setSCount] = useState(0);
  const [SPrice, setSPrice] = useState(0);
  // Searching useState
  const [text, setText] = useState(''); //처음 기본값 비우기
  // Temporary useState
  const [tempP, setTempP] = useState('');

  const [MS_posts, MS_setPosts]=useState([]); // MoveSales DB
    /* MoveSales DB Fetching */
     useEffect(()=>{
        axios
        .get(
          '/api/Sales/moveSalesList'
          )
        .then(res => {
            MS_setPosts(res.data.result)
            setMSLength(MS_posts.length) // Movesales의 길이를 최신으로 동기
        })
        .catch(err=>{
            console.log(err)
        })
     })

  const [P_posts, P_setPosts]=useState([]); // Product DB
  /* Product DB Fetching */
   useEffect(()=>{
      axios
      .get(
        '/api/product/Productlist'
        )
      .then(res => {
          P_setPosts(res.data.result)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])
     
    // DATABASE Length
    let Plength = P_posts.length; // Product DB의 길이
    const [MSLength, setMSLength] = useState(MS_posts.length); // Movesales DB의 길이
  
    //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
    const onTextChange = (e) => {
      //e : 이벤트 객체
      setText(e.target.value); //이벤트를 받는 타겟의 value값으로 변경

      // Product DB와 타겟 value 값을 비교 참조하여 setTempP의 값을 Matching
      if(e.target.value)
      {
        for(let i = 0; i<Plength; i++)
        {
          // ProductCode를 통한 Matching
          if(P_posts[i].ProductCode == e.target.value)
          {
            setTempP(P_posts[i]);
            setKey(1); // Matching을 알려주는 key
          }
          // ProductBarcode를 통한 Matching
          if(P_posts[i].ProductBarcode == e.target.value)
          {
            setTempP(P_posts[i]);
            setKey(1); // Matching을 알려주는 key
          }
        }
      }
    }

    // Product DB 를 Movesales에 등록하는 함수
    const onConfrim = () => {
      // Product DB 가 있을때만의 예외처리
      if(key==1)
      {
        // 데이터를 등록하기위한 field
        const data ={ 
        ProductID:tempP.ProductID,
        ProductName:tempP.ProductName,
        ProductCode:tempP.ProductCode,
        ProductBarCode:tempP.ProductBarCode,
        ProductImport:tempP.ProductImport,
        ProductExport:tempP.ProductExport,
        ProductCount:tempP.ProductCount,
        };
        // MoveSales 등록을 위한 api 통신
        axios.post('/api/Sales/addMoveSales', data)
        .then(response => { 
          console.log(response);
        })
        .catch(()=>{alert('-');
        console.log('already exist');
        });

        setText(''); // Text Filed 를 초기화
        setKey(0); // 등록 예외처리를 위한 state
      }
    }

    // 판매수량과 판매금액을 동기하는 useEffect
    useEffect(() => {
      let tempCount=0; // Total Count의 임보
      let tempPrice=0; // Total Price의 임보

      for (let j=0; j<MSLength; j++) // &&연산을 통해 값이 있을때만 동기
      {
        // Total Count Calc
        rowData[j]&&(tempCount=tempCount+rowData[j].SCount);
        // Total Price Calc
        rowData[j]&&(tempPrice=tempPrice+(rowData[j].SCount*parseInt(rowData[j].EPrice)));
      }
      setSCount(tempCount); // 표출을 위한 State에 Count를 저장
      setSPrice(tempPrice); // 표출을 위한 State에 Price를 저장
    });
    
    const goA_SalesConfirm = () => {
      if(MSLength!=0)
      {
      // 1. 파라미터로 저장된 값을 포함하여 Sales 값 입력
            const data ={ 
              SalesCount:SCount, 
              SalesPrice:SPrice, 
              };
            axios.post('/api/Sales/addSales', data)
            .then(response => { 
              console.log(response);
            })
            .catch(()=>{alert('-');
            console.log('Some Error');
            });
      
      // 2. Product 재고 빼주는 api를 호출
              let ProductID;
              let item ={ProductID}
          
              console.warn("item",item)
              fetch('/api/Sales/updateCount/', {
                method: 'PUT',
                headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(item)
              }).then((result) => {
                result.json().then((resp) => {
        
                })
              }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
                console.log('error');
              });
      
            navigate('/login/sales/sales-confirm=0000');
      }
      else
      {
        alert("판매할 제품을 등록하세요.")
      }
    };

    /* Product DB & DataGrid Matching */
    const rowData = MS_posts?.map(MS_post=>{
      return{
        MSID: MS_post?.MoveSalesID,
        key: MS_post?.ProductID,
        Name:MS_post?.ProductName,
        Code:MS_post?.ProductCode,
        Barcode:MS_post?.ProductBarcode,
        IPrice:MS_post?.ProductImport,
        EPrice:MS_post?.ProductExport,
        SCount:MS_post?.SalesCount,
        PCount:MS_post?.ProductCount,
        UserID: MS_post?.UserID,
        id: MS_post?.UserMSID,
        SalesID: MS_post?.SalesID,
      }
      // MUI DataGrid의 Data, Parameter로써의 Data
     },[])

  return (
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center">


    <Box>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 310 }}
        >
        {/* content */}
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center">
          <Grid>
            <TextField
            label="Product Code or Barcode"
            sx={{ mt: -1, mb: 0 }}
            type="text"
            onChange={onTextChange}
            value={text}
            />
            <Button variant="contained" onClick={onConfrim}>
              <ArrowUpwardIcon/>
            </Button>
          </Grid>
        </Grid>
        </Paper>
    </Box>


        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={7}
        >
          <div style={{ height: 550, width: '100%'}}>
            <div style={{ display: 'flex', height: '90%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns={[
                {
                  field: 'Name',
                  headerName: '품명',
                  width: 150,
                },
                {
                  field: 'Code',
                  headerName: '품번',
                  width: 220,
                },
                {
                  field: 'SCount',
                  headerName: '수량',
                  type: 'number',
                  width: 80,
                },
                {
                  field: 'Add',
                  headerName: '',
                  width: 40,
                  renderCell: (id) => (
                    // 등록된 물품의 재고를 + 하는 함수
                    <A_CountAdd pid={id}/>
                  ),
                },
                {
                  field: 'Remove',
                  headerName: '',
                  width: 40,
                  renderCell: (id) => (
                    // 등록된 물품의 재고를 - 하는 함수
                    <A_CountRemove pid={id}/>
                  ),
                },
                {
                  field: 'EPrice',
                  headerName: '가격',
                  type: 'number',
                  width: 110,
                },
                {
                  field: 'Delete',
                  headerName: '',
                  width: 40,
                  renderCell: (id) => (
                    // 등록된 물품의 재고를 삭제 하는 함수
                    <A_CountDelete pid={id}/>
                  ),
                },
              ]}
              disableSelectionOnClick
              hideFooter
              sx={{m:2}}
              />
              </div>
            </div>
          </div>
        </Grid>
      <Grid>
      </Grid>


    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 115, left: 0, right: 0 }} elevation={0}>
          <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <h3>판매 수량</h3>
              <Typography variant="h6" color="text.secondary">
                {/* SCount => Sales Total Count */}
                {SCount}
              </Typography>
              </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h3>판매 금액</h3>
            <Typography variant="h6" color="text.secondary">
                {/* SPrice => Sales Total Price */}
                {SPrice}
              </Typography>
              </Item>
        </Grid>
      </Grid>
    </Box>
      </Paper>
      <Paper sx={{ position: 'fixed', bottom: 65, left: 0, right: 0 }} elevation={1}>
        <Grid>
      <Button variant="outlined" size="large" fullWidth onClick={goA_SalesConfirm}>판매 등록</Button>
      </Grid>
      </Paper>
    </Box>
    </Grid>
  );
}

export default A_Sales;