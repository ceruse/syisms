// react
import React, { useState, useEffect} from "react";
// mui
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// back
import axios from "axios";

// colum
const columns = [
    {
        field: 'Name',
        headerName: '품명',
        width: 180,
      },
      {
        field: 'Code',
        headerName: '품번',
        width: 240,
      },
      {
        field: 'Count',
        headerName: '수량',
        type: 'number',
        width: 90,
      },
      {
        field: 'Info',
        headerName: '정보',
        width: 150,
      },
];

const P_Search = () => {

    const [Option, setOption] = React.useState(1);
    //useState() - 값이 변화되는 것을 저장
    const [Keyword, setKeyword] = useState(''); //처음 기본값 비우기
    const [P_posts, P_setPosts]=useState([]); // Product DB
    const [Fposts, setFposts]=useState([]); // Filtered Product DB
    const [Plength, setPlength]=useState(P_posts.length); // Product Length
    /* Product DB Fetching */
    useEffect(()=>{
      axios
      .get(
        '/api/product/CompanyProductList'
        )
      .then(res => {
          P_setPosts(res.data.result)
          setPlength(res.data.result.length)
      })
      .catch(err=>{
          console.log(err)
      })
    })
  
    const handleChange = (event) => {
        setOption(event.target.value);
    };

    //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
    const onTextChange = (e) => {
        //e : 이벤트 객체
        setKeyword(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
        setFposts([]);
    }
    //state값을 초기화 시키는 함수
    const onSearch = () => {
        let j=0;
        if(Keyword)
        {
            for(let i=0; i<Plength; i++)
            {
                if(Option)
                {
                    if(Option==1)
                    {
                        if(Keyword == P_posts[i].ProductCode || Keyword == P_posts[i].ProductBarcode)
                        {
                            Fposts[j]=P_posts[i];
                            Fposts[j].id=j+1;
                            j++;
                        }
                    }
                    else if(Option==2 && P_posts[i].UserType=="Company")
                    {
                        if(Keyword == P_posts[i].ProductCode || Keyword == P_posts[i].ProductBarcode)
                        {
                            Fposts[j]=P_posts[i];
                            Fposts[j].id=j+1;
                            j++;
                        }
                    }
                    else if(Option==3 && P_posts[i].UserType=="Store")
                    {
                        if(Keyword == P_posts[i].ProductCode || Keyword == P_posts[i].ProductBarcode)
                        {
                            Fposts[j]=P_posts[i];
                            Fposts[j].id=j+1;
                            j++;
                        }
                    }
                }
            }

        }
    }

    /* MoveSales DB & DataGrid Matching */
    const rowData = Fposts?.map(Fposts=>{
     return{
       id: Fposts?.id,
       Name: Fposts?.ProductName,
       Code: Fposts?.ProductCode,
       Count: Fposts?.ProductCount,
       Info: Fposts?.UserInfo,
     }
     // MUI DataGrid의 Data, Parameter로써의 Data
    })

    
    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
            <Box>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                        <Grid>
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Option}
                                    label="Age"
                                    onChange={handleChange}
                                    >
                                        <MenuItem value={1}>전체</MenuItem>
                                        <MenuItem value={2}>본사</MenuItem>
                                        <MenuItem value={3}>매장</MenuItem>
                                    </Select>
                                </FormControl>
                            <TextField
                            label="Product Code or Barcode"
                            sx={{ mt: 0, mb: 0 }}
                            type="text"
                            onChange={onTextChange}
                            value={Keyword}
                            />
                            <Button variant="text" onClick={onSearch} sx={{ mt: 1, mb: 0 }}>
                                <SearchIcon/>
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
        xs={6}
        >
                        <div style={{ height: 550, width: '100%'}}>
                        <div style={{ display: 'flex', height: '90%' }}>
                          <div style={{ flexGrow: 1 }}>
                          <DataGrid
                          rows={rowData}
                          columns={columns}
                          disableSelectionOnClick
                          hideFooter
                          sx={{m:2}}
                          />
                          </div>
                        </div>
                      </div>
                      </Grid>
        </Grid>
    )
}

export default P_Search;