// react
import { Outlet } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
// dir
import L_TopNav_Off from './L_TopNav_Off';

const Layout = () => {
  return (
    <Box>
        <L_TopNav_Off/>
        <Outlet />
    </Box>
  );
};

export default Layout;