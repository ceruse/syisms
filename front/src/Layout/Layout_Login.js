// react
import { Outlet } from 'react-router-dom';
// mui
import Box from '@mui/material/Box';
// dir
import L_TopNav_On from './L_TopNav_On';
import L_MiddleNav from './L_MiddleNav';

const Layout = () => {
  return (
    <Box>
        <L_TopNav_On/>
        <Outlet />
        <L_MiddleNav />
    </Box>
  );
};

export default Layout;