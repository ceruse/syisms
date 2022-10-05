import axios from "axios";
import {useEffect} from "react";

// react Lib
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Layout directory
import Layout_Logout from './Layout/Layout_Logout';
import Layout_Login from './Layout/Layout_Login';
// User Directory
import U_Register from './User/U_Register';
import U_Login from './User/U_Login';
import U_FindID from './User/U_FindID';
import U_ViewID from './User/U_ViewID';
import U_FindPW from './User/U_FindPW';
import U_ResetPW from './User/U_ResetPW';
import U_DB from './User/U_DB';
import U_Update from './User/U_Update';
// Main Directory
import H_Main from './Home/H_Main';
// Product Directory
import P_Main from './Product/P_Main';
import P_CMain from './Product/P_CMain';
import P_Create from './Product/CRUD/P_Create';
import P_ViewInf from './Product/CRUD/P_ViewInf';
// Sale Directory
import A_Main from './Sale/A_Main';
import A_SalesConfirm from './Sale/A_SalesConfirm';
// Move Directory
import M_Main from './Move/M_Main';
import MI_Create from './Move/Input/MI_Create';
import MO_Create from './Move/Output/MO_Create';
// Set Directory
import S_Main from './Set/S_Main';
import SC_Create from './Set/Client/SC_Create';
import SA_Update from './Set/Attribute/SA_Update';

const App = () => {

  const callApi = async() => {
    axios.get("/api").then((res)=> console.log(res.data.test));
  }

  useEffect(()=>{
    callApi();
  }, []);

  return (
    <Routes>

      <Route path="/" element={<Layout_Logout />}>
        <Route index element={<U_Login />} />
        <Route path="/fid/01" element={<U_FindID/>} />
        <Route path="/fid/02" element={<U_ViewID/>} />
        <Route path="/fpw/01" element={<U_FindPW/>} />
        <Route path="/fpw/02" element={<U_ResetPW/>} />
        <Route path="/register" element={<U_Register/>} />
      </Route>

      <Route path="/login" element={<Layout_Login />}>
          <Route index element={<H_Main />} />
          <Route path="/login/product" element={<P_Main/>} />
          <Route path="/login/productAll" element={<P_CMain/>} />
          <Route path="/login/product/create" element={<P_Create/>} />
          <Route exact path="/login/product/:no" component={P_ViewInf} />

        <Route path="/login/sales" element={<A_Main/>} />
        <Route path="/login/sales/sales-confirm=0000" element={<A_SalesConfirm/>} />

        <Route path="/login/move" element={<M_Main/>} />
        <Route path="/login/move/input-create" element={<MI_Create/>} />
        <Route path="/login/move/output-create" element={<MO_Create/>} />

        <Route path="/login/set" element={<S_Main/>} />
        <Route path="/login/set/client-create" element={<SC_Create/>} />
        <Route path="/login/set/attribute-update" element={<SA_Update/>} />

        <Route path="/login/user-db" element={<U_DB/>} />
        <Route path="/login/user-db/update" element={<U_Update/>} />
      </Route>
      
    </Routes>
  );
};

export default App;