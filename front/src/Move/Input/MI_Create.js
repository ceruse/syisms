// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// back
import axios from 'axios';
// date
const now = new Date();
const date = {
  year: now.getFullYear(),
  month: now.getMonth()+1,
  date: now.getDate(),
  hours: now.getHours(),
  minutes: now.getMinutes(),
}
// column
const columns = [
  {
      field: 'SalesName',
      headerName: '품명',
      width: 150,
    },
    {
      field: 'SalesCode',
      headerName: '품번',
      width: 150,
    },
    {
      field: 'SalesCount',
      headerName: '수량',
      type: 'number',
      width: 80,
    },
    {
      field: 'SalesPrice',
      headerName: '가격',
      type: 'number',
      width: 110,
    },
];
/* List Array */
const rows = [
  { id: 1, SalesName: 'Jordan', SalesCode: 'TB0A2BBQ',  SalesCount: 1, SalesPrice: 219000},
  { id: 2, SalesName: 'Dunk', SalesCode: 'TB0A2BA1',  SalesCount: 1, SalesPrice: 198000},
  { id: 3, SalesName: 'Uptempo', SalesCode: 'TB0A2CDE',  SalesCount: 1, SalesPrice: 179000},
  { id: 4, SalesName: 'Zoom', SalesCode: 'TB0A2AQ2',  SalesCount: 1, SalesPrice: 129000},
  { id: 5, SalesName: 'Converse', SalesCode: 'TB0A2DDS',  SalesCount: 1, SalesPrice: 89000},
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const M_ICreate = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/login/move');
  
  };
  
  return (
    <Box>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      >
        <h3>입고 등록</h3>
        <Grid container spacing={3} sx={{ mt: -2, mb: 2 }}>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>RT 코드</h4>
                    <TextField label="RT Code" disabled sx={{ mt: -1, mb: 0 }}/>
            </Grid>
            <Grid item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: -1, mb: 0 }}
                xs
                >
                    <h4>입고 등록일</h4>
                    <TextField value={date.year+"/"+date.month+"/"+date.date+"/"+date.hours+":"+date.minutes} disabled sx={{ mt: -1, mb: 0 }}/>
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
                    <TextField label="InputStore" disabled sx={{ mt: -1, mb: 0 }}/>
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
                    <TextField label="OutputStroe" required sx={{ mt: -1, mb: 0 }}/>
            </Grid>
        </Grid>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 0, mb: 0 }}
        >
          <h4>제품 등록</h4>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex',
              alignItems: 'center', width: 400 }}
              >
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <NativeSelect
                    defaultValue={1}
                    inputProps={{
                    name: 'sel',
                    id: 'uncontrolled-native',
                    }}
                    >
                    <option value={1}>전체</option>
                    <option value={2}>품명</option>
                    <option value={3}>품번</option>
                    <option value={4}>속성</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
    
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Product Search"
              inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
              </IconButton>
              <Checkbox {...label} icon={<QrCodeScannerIcon />} checkedIcon={<QrCodeScannerIcon />} />
          </Paper>
        </Grid>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, mb: 0 }}
        >
          <h4>제품 목록</h4>
          <div style={{ height: 318, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              sx={{m:2, mt: 0, mb: 0}}
              />
              </div>
            </div>
          </div>
        </Grid>
        <Grid sx={{mt: 2, mb: 0}}>
            <Button type="submit" variant="contained" onClick={goBack}>
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

export default M_ICreate;