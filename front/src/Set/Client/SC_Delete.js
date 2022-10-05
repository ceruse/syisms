// react
import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

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

const SC_Delete = (param) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ClientID = param.pid.row.key;

  function DeleteClient() {
    let client={ClientID}
    client.ClientID=ClientID;

    console.warn("client",client)
    fetch('/api/client/deleteClient',
    {
      method: 'DELETE',
      headers:
      {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(client)
    }).then((result) =>
    {
      result.json().then((resp) => {
        console.warn(resp)
        handleClose()
      })
    }).catch(()=>{ alert('ERR');
      console.log('error');
    });
 }

  return (
    <div>
      <IconButton aria-label="SC Delete" onClick={handleOpen}>
          <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
            <Box>
              {/* Delete S */}
              {/* Client ID Param => {param.pid.row.id} */}
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <h3>거래처 삭제</h3>
                            <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: -2, mb: 1 }}
                            >
                                <h4>해당 거래처를 삭제하시겠습니까?</h4>
                                {/* Store Name */}
                                {param.pid.row.StoreName}
                            </Grid>
                </Grid>
                {/* Delete E */}
            </Box>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2, mb: 1 }}
            >
                <Grid>
                    <Button type="submit" variant="contained" onClick={DeleteClient}>확인</Button>
                    <Button type="submit" variant="contained" onClick={handleClose}>취소</Button>
                </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default SC_Delete;