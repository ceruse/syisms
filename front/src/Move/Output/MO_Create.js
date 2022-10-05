// react
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// back
import axios from "axios";
// dir
import MO_CountAdd from './MO_CountAdd';
import MO_CountMinus from './MO_CountMinus';
import MO_CountDelete from './MO_CountDelete';
// Styles function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));
// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
// style
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
// date
const now = new Date();
const date = {
  year: now.getFullYear(),
  month: now.getMonth()+1,
  date: now.getDate(),
  hours: now.getHours(),
  minutes: now.getMinutes(),
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MO_Create = () => {
  const [open, setOpen] = React.useState(false);
  /* DB */
  const [P_posts, P_setPosts]=useState([]);
  const [Uposts, setUposts]=useState([]);
  const [O_posts, O_setPosts]=useState([]);
  const [Mposts, setMposts]=useState([]);
  /* Length */
  const [Length, setLength]=useState(0); // 
  /* Input Part useState */
  const [User, setUser] = useState(""); // 출고지
  const [TargetKey, setTargetKey] = useState([]); // 입고지 - Key
  const [InputStore, setInputStore] = useState(""); // 입고지 - Info
  let [OutputInfo, setOutputInfo]=useState(''); // 비고
  /* Product Part useState */
  const [SearchProduct, setSearchProduct] = useState(''); // 검색 제품
  const [SearchProductCount, setSearchProductCount] = useState(0) // 검색 제품 수량
  const [TargetSpace, setTargetSpace] = useState(''); // 타겟 제품 위치
  const [TargetError, setTargetError] = useState(false); // 타겟 에러

  const navigate = useNavigate();

  // Route => Move
  const goBack = () => {
    navigate('/login/move');
  };

  // Search Keyword
    const onSearchChange = (e) => {
      setSearchProduct(e.target.value);
      let length;
      /* Product DB Fetching */
        axios
        .get(
          '/api/product/Productlist'
          )
        .then(res => {
          P_setPosts(res.data.result)
          length = res.data.result.length
          if(length)
          {
            for(let i=0; i<length; i++)
            {
              if(res.data.result)
              {
                if(res.data.result[i].ProductCode == e.target.value)
                {
                  setTargetSpace(i);
                  setTargetError(true);
                  setSearchProductCount(res.data.result[i].ProductCount);
                }
              }
            }
          }
        })
        .catch(err=>{
          console.log(err)
        })
  };
  // Search Confirm
  const onSearchReset = () => {
    
    if(!InputStore)
    {
      alert("입고지를 선택해주세요.")
      setSearchProduct('');
    }
    else if(!SearchProduct)
    {
      alert("올바른 제품을 입력해주세요.");
      setSearchProduct('');
    }
    else if(SearchProduct&&TargetError===false)
    {
      alert("검색된 제품이 없습니다.");
      setSearchProduct('');
    }
    else if(SearchProductCount<=0)
    {
      alert("해당 제품의 수량이 없습니다.");
      setSearchProduct('');
    }
    else if(InputStore&&TargetError===true)
    {
      setSearchProduct('');

      const data ={ 
        ProductID:P_posts[TargetSpace].ProductID,
        InputStore:TargetKey,
        ProductName:P_posts[TargetSpace].ProductName,
        ProductCode:P_posts[TargetSpace].ProductCode,
        ProductBarCode:P_posts[TargetSpace].ProductBarCode,
        ProductImport:P_posts[TargetSpace].ProductImport,
        ProductExport:P_posts[TargetSpace].ProductExport,
        ProductCount:P_posts[TargetSpace].ProductCount,
        Attribute:P_posts[TargetSpace].Attribute,
        OutputID:O_posts[O_posts?.length-1]?.OutputID,
        };

      axios.post('/api/Move/addMoveOutput', data)
            .then(response => { 
              console.log(response);
            })
            .catch(()=>{alert('-');
            console.log('already exist');
            });
      
      setTargetSpace('');
      setTargetError(false);
    }
  }

     useEffect(()=>{
      /* Company DB Fetching */
      axios
      .get(
        '/api/Client/CompanyList'
        )
      .then(res => {
          setUposts(res.data.result)
      })
      .catch(err=>{
          console.log(err)
      })
      /* User DB Fetching */
      axios
      .get(
        '/api/mypage/select'
        )
      .then(res => {
        setUser(res.data.UserInfo)
      })
      .catch(err=>{
          console.log(err)
      })
      /* Output DB Fetching */
      axios
      .get('/api/move/outputlist')
      .then(res => {
          O_setPosts(res.data.output)
      })
      .catch(err=>{
          console.log(err)
      })
   },[])
   
    /* Move Output DB Fetching */
     useEffect(()=>{
      if(InputStore)
        {
          axios
          .get('/api/move/moveoutputlist')
          .then(res => {
            setMposts(res.data.output)
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }
    )
    /* Input DB & DataGrid Matching */
     const rowData = Mposts?.map(Mposts=>{
      return{
        MoveOutputID:Mposts?.MoveOutputID,
        ProductID:Mposts?.ProductID,
        ProductName:Mposts?.ProductName,
        ProductCode:Mposts?.ProductCode,
        ProductBarcode:Mposts?.ProductBarcode,
        ProductImport:Mposts?.ProductImport,
        ProductExport:Mposts?.ProductExport,
        OutputCount:Mposts?.SalesCount,
        ProductCount:Mposts?.ProductCount,
        Attribute:Mposts?.Attribute,
        UserID:Mposts?.UserID,
        InputStore:Mposts?.InputStore,
        UserMOID:Mposts?.UserMOID,
        OutputID:Mposts?.OutputID,
        UserType:Mposts?.UserType,
        UserCode:Mposts?.UserCode,
        Confirm:Mposts?.Confirm,
        id:Mposts?.UserMOID,
      }
     },[])
    function confirmoutput(){
      let item={OutputInfo, InputStore}

      if(InputStore&&Mposts[0])
      {
        console.warn("item",item)
        fetch('/api/Move/updateoutputConfirm/', {
          method: 'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then((result) => {
          result.json().then((resp) => {
            setOutputInfo(resp.OutputInfo)
            setInputStore(resp.InputStore)
          })
        }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
          console.log('error');
        });

        console.warn("item",item)
        fetch('/api/Move/updatemoveoutputConfirm/', {
          method: 'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then((result) => {
          result.json().then((resp) => {
            goBack();
          })
        }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
          console.log('error');
        });
      }
      else if(!Mposts[0])
      {
        alert("등록된 제품이 없습니다.");
      }
    }

  // modal
function TargetModal() {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /* Company DB & DataGrid Matching */
   const ClientData = Uposts?.map(Uposts=>{
    return{
      Address: Uposts?.UserAddress,
      Code: Uposts?.UserCode,
      Info: Uposts?.UserInfo,
      Name: Uposts?.UserName,
      Num: Uposts?.UserPhonenumber,
      id: Uposts?.UserID
    }
   },[])

   useEffect(()=>{
    // Client Data Matching
    if(TargetKey)
    {
      for (let i=0; i<Length; i++)
      {
        if(ClientData[i]?.id==TargetKey)
        {
          setInputStore(ClientData[i]?.Info);
        }
      }
    }
 },[])

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleOpen}><SearchIcon/></Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 600 }}>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: -1, mb: 0 }}
          >
          <h3>입고지 선택</h3>
          <Grid sx={{ mt: -2, mb: 0 }} >
          <div style={{ height: 440, width: 420 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
                  rows={ClientData}
                  columns = {[
                    {
                      field: 'Info',
                      headerName: '매장 이름',
                      width: 180,
                    },
                    {
                      field: 'id',
                      headerName: '매장 고유 키',
                      width: 110,
                    }
                  ]}
                  disableSelectionOnClick
                  hideFooter
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  checkboxSelection
                  onSelectionModelChange=
                  {
                    itm => setTargetKey(itm)+setLength(itm)
                  }
                  sx={{m:2}}
                  />
                </div>
              </div>
            </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

useEffect(()=>{
  /* 예외 처리 */
  {
    // 입고지를 본인으로 선택의 경우
    if(TargetKey)
    {
      if(InputStore === User)
      {
        setTargetKey([]);
        setInputStore("");
      }
    }
    // 다중 선택의 경우
    if(TargetKey[1])
    {
      alert("다중 선택은 제한됩니다.");
      setTargetKey([]);
      setInputStore("");
    }
  }
})

  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>출고 등록</h3>
        <Grid container spacing={1} sx={{ mt: -2, mb: 2 }}>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>RT 코드</h4>
                    <TextField  value={"RT-"+(O_posts[O_posts?.length-1]?.OutputID)} disabled sx={{ mt: -1, mb: 0 }}/>
            </Grid>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>출고 등록일</h4>
                    <TextField label="Date" value={date.year+"/"+date.month+"/"+date.date+"/"+date.hours+":"+date.minutes} disabled sx={{ mt: -1, mb: 0 }}/>
            </Grid>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>입고지</h4>
                    <Grid>
                      {InputStore&&<TextField label="Input" value={InputStore} disabled sx={{ mt: -1, mb: 0 }}/>}
                      {!InputStore&&<TargetModal />}
                    </Grid>
            </Grid>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>출고지</h4>
                    <TextField label="Output" value={User} disabled sx={{ mt: -1, mb: 0 }}/>
            </Grid>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                  <h4>비고</h4>
                  <TextField
                    label="Note"
                    type="text"
                    onChange={(e)=>setOutputInfo(e.target.value)}
                    value={OutputInfo}
                    sx={{ mt: -1, mb: 0 } }
                  />
            </Grid>
        </Grid>


          <h4>제품 등록</h4>
          <Box>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 310 }}
        >
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
            onChange={onSearchChange}
            value={SearchProduct}
            />
            <Button variant="contained" onClick={onSearchReset}>
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
        sx={{ mt: 2, mb: 0 }}
        >
          <h4>제품 목록</h4>
          <div style={{ height: 370, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rowData}
              columns = {[
                {
                    field: 'ProductName',
                    headerName: '품명',
                    width: 150,
                  },
                  {
                    field: 'ProductCode',
                    headerName: '품번',
                    width: 220,
                  },
                  {
                    field: 'OutputCount',
                    headerName: '수량',
                    type: 'number',
                    width: 80,
                  },
                  {
                    field: 'Add',
                    headerName: '',
                    width: 0,
                    renderCell: (id) => (
                      <>
                        <MO_CountAdd moid={id}/>
                      </>
                    ),
                  },
                  {
                    field: 'Remove',
                    headerName: '',
                    width: 0,
                    renderCell: (id) => (
                      <>
                        <MO_CountMinus moid={id}/>
                      </>
                    ),
                  },
                  {
                    field: 'UserCode',
                    headerName: '기업 코드',
                    width: 150,
                  },
                  {
                    field: 'Delete',
                    headerName: '',
                    width: 0,
                    renderCell: (id) => (
                      <>
                        <MO_CountDelete moid={id}/>
                      </>
                    ),
                  },
                ]}
              disableSelectionOnClick
              hideFooter
              sx={{m:2, mt: 0, mb: 0}}
              />
              </div>
            </div>
          </div>
        </Grid>
        <Grid sx={{mt: 15, mb: 5}}>
            <Button type="submit" variant="contained" onClick={confirmoutput}>
                등록
            </Button>
            <Button type="submit" variant="contained" onClick={goBack}>
                취소
            </Button>
        </Grid>
      </Grid>
      
  </Box>
  );
};

export default MO_Create;