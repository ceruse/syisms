// react
import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import View from '@mui/icons-material/Pageview';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// dir
import A_LogView from './A_LogView';

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

const A_View = (param) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="Product View" onClick={handleOpen}>
          <View />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <A_LogView sid = {param.id.row}/>
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
          >
            <Button type="submit" variant="contained" onClick={handleClose}>확인</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default A_View;
