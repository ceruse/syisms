// reactj
import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Styled function
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
  }));
// colum
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

const MI_View = () => {
    const navigate = useNavigate();
    const ref = React.useRef(null);
  
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
            <h3>출고 내역</h3>
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
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                        RT Code
                    </Typography>
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
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                        Output Date
                    </Typography>
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
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                        Input Store
                    </Typography>
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
                    <Typography variant="body1" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                        Output Store
                    </Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: -2, mb: 0 }}
        >
        <h4>출고 제품</h4>
        <div style={{ height: 370, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              components={{ Toolbar: GridToolbar }}
              sx={{m:2, mt: 0, mb: 0}}
              />
              </div>
            </div>
          </div>
        </Grid>
    </Box>
  );
};

export default MI_View;