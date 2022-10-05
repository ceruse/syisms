// react
import React, { useState, useEffect } from "react";
// mui
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
// Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: '0',
    headerName: '',
    width: 80,
  },
  {
    field: '1',
    headerName: '0시 ~ 2시',
    width: 100,
  },
  {
    field: '2',
    headerName: '2시 ~ 4시',
    width: 100,
  },
  {
    field: '3',
    headerName: '4시 ~ 6시',
    width: 100,
  },
  {
    field: '4',
    headerName: '6시 ~ 8시',
    width: 100,
  },
  {
    field: '5',
    headerName: '8시 ~ 10시',
    width: 100,
  },
  {
    field: '6',
    headerName: '10시 ~ 12시',
    width: 100,
  },
  {
    field: '7',
    headerName: '12시 ~ 14시',
    width: 100,
  },
  {
    field: '8',
    headerName: '14시 ~ 16시',
    width: 100,
  },
  {
    field: '9',
    headerName: '16시 ~ 18시',
    width: 100,
  },
  {
    field: '10',
    headerName: '18시 ~ 20시',
    width: 100,
  },
  {
    field: '11',
    headerName: '20시 ~ 22시',
    width: 100,
  },
  {
    field: '12',
    headerName: '22시 ~ 24시',
    width: 100,
  },
];

const HS_Graph01 = (param) => {
  // Filtered DB
  const [a, ]=useState([]);
  const [b, ]=useState([]);
  const [c, ]=useState([]);
  const [d, ]=useState([]);
  const [e, ]=useState([]);
  const [f, ]=useState([]);
  const [g, ]=useState([]);
  const [h, ]=useState([]);
  const [z, ]=useState([]); // 16~18
  const [j, ]=useState([]);
  const [k, ]=useState([]);
  const [l, ]=useState([]);
  // Product Count
  const [aP, setaP]=useState(0);
  const [bP, setbP]=useState(0);
  const [cP, setcP]=useState(0);
  const [dP, setdP]=useState(0);
  const [eP, seteP]=useState(0);
  const [fP, setfP]=useState(0);
  const [gP, setgP]=useState(0);
  const [hP, sethP]=useState(0);
  const [zP, setzP]=useState(0);
  const [jP, setjP]=useState(0);
  const [kP, setkP]=useState(0);
  const [lP, setlP]=useState(0);
  // Price
  const [aO, setaO]=useState(0);
  const [bO, setbO]=useState(0);
  const [cO, setcO]=useState(0);
  const [dO, setdO]=useState(0);
  const [eO, seteO]=useState(0);
  const [fO, setfO]=useState(0);
  const [gO, setgO]=useState(0);
  const [hO, sethO]=useState(0);
  const [zO, setzO]=useState(0);
  const [jO, setjO]=useState(0);
  const [kO, setkO]=useState(0);
  const [lO, setlO]=useState(0);

  useEffect(()=>{
    if(true)
    {
      let as=0, bs=0, cs=0, ds=0, es=0, fs=0, gs=0, hs=0, zs=0, js=0, ks=0, ls=0;
      let asP=0, bsP=0, csP=0, dsP=0, esP=0, fsP=0, gsP=0, hsP=0, zsP=0, jsP=0, ksP=0, lsP=0;
      let asO=0, bsO=0, csO=0, dsO=0, esO=0, fsO=0, gsO=0, hsO=0, zsO=0, jsO=0, ksO=0, lsO=0;

      for(let i=0; i<param.db.length; i++)
      {
        if(param.db[i].SalesDate.substring(11,13)>=0 && param.db[i].SalesDate.substring(11,13)< 2)
        {
          a[as]=param.db[i];
          asP=asP+param.db[i].SalesCount;
          asO=asO+param.db[i].SalesPrice;
          setaP(asP);
          setaO(asO);
          as++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=2 && param.db[i].SalesDate.substring(11,13)<4)
        {
          b[bs]=param.db[i];
          bsP=bsP+param.db[i].SalesCount;
          bsO=bsO+param.db[i].SalesPrice;
          setbP(bsP);
          setbO(bsO);
          bs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=4 && param.db[i].SalesDate.substring(11,13)<6)
        {
          c[cs]=param.db[i];
          csP=csP+param.db[i].SalesCount;
          csO=csO+param.db[i].SalesPrice;
          setcP(csP);
          setcO(csO);
          cs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=6 && param.db[i].SalesDate.substring(11,13)<8)
        {
          d[ds]=param.db[i];
          dsP=dsP+param.db[i].SalesCount;
          dsO=dsO+param.db[i].SalesPrice;
          setdP(dsP);
          setdO(dsO);
          ds++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=8 && param.db[i].SalesDate.substring(11,13)<10)
        {
          es[bs]=param.db[i];
          esP=esP+param.db[i].SalesCount;
          esO=esO+param.db[i].SalesPrice;
          seteP(esP);
          seteO(esO);
          es++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=10 && param.db[i].SalesDate.substring(11,13)<12)
        {
          f[fs]=param.db[i];
          fsP=fsP+param.db[i].SalesCount;
          fsO=fsO+param.db[i].SalesPrice;
          setfP(fsP);
          setfO(fsO);
          fs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=12 && param.db[i].SalesDate.substring(11,13)<14)
        {
          g[gs]=param.db[i];
          gsP=gsP+param.db[i].SalesCount;
          gsO=gsO+param.db[i].SalesPrice;
          setgP(gsP);
          setgO(gsO);
          gs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=14 && param.db[i].SalesDate.substring(11,13)<16)
        {
          h[hs]=param.db[i];
          hsP=hsP+param.db[i].SalesCount;
          hsO=hsO+param.db[i].SalesPrice;
          sethP(hsP);
          sethO(hsO);
          hs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=16 && param.db[i].SalesDate.substring(11,13)<18)
        {
          z[zs]=param.db[i];
          zsP=zsP+param.db[i].SalesCount;
          zsO=zsO+param.db[i].SalesPrice;
          setzP(zsP);
          setzO(zsO);
          zs++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=18 && param.db[i].SalesDate.substring(11,13)<20)
        {
          j[js]=param.db[i];
          jsP=jsP+param.db[i].SalesCount;
          jsO=jsO+param.db[i].SalesPrice;
          setjP(jsP);
          setjO(jsO);
          js++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=20 && param.db[i].SalesDate.substring(11,13)<22)
        {
          k[ks]=param.db[i];
          ksP=ksP+param.db[i].SalesCount;
          ksO=ksO+param.db[i].SalesPrice;
          setkP(ksP);
          setkO(ksO);
          ks++;
        }
        if(param.db[i].SalesDate.substring(11,13)>=22 && param.db[i].SalesDate.substring(11,13)<=24)
        {
          l[ls]=param.db[i];
          lsP=lsP+param.db[i].SalesCount;
          lsO=lsO+param.db[i].SalesPrice;
          setlP(lsP);
          setlO(lsO);
          ls++;
        }
      }
    }
  })

  return (
    <>
      <div style={{ height: 250, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid
              rows = {[
                { id: 1, 0: '건수', 1: a.length+" 건", 2:b.length+" 건", 3: c.length+" 건", 4: d.length+" 건", 5: e.length+" 건", 6: f.length+" 건",
                7: g.length+" 건", 8: h.length+" 건", 9: z.length+" 건", 10: j.length+" 건", 11: k.length+" 건", 12: l.length+" 건"},

                { id: 2, 0: '제품', 1: aP+" 개", 2: bP+" 개", 3: cP+" 개", 4: dP+" 개", 5: eP+" 개", 6: fP+" 개",
                7: gP+" 개", 8: hP+" 개", 9: zP+" 개", 10: jP+" 개", 11: kP+" 개", 12: lP+" 개"},
                { id: 3, 0: '매출', 1: aO+" 원", 2: bO+" 원", 3: cO+" 원", 4: dO+" 원", 5: eO+" 원", 6: fO+" 원",
                7: gO+" 원", 8: hO+" 원", 9: zO+" 원", 10: jO+" 원", 11: kO+" 원", 12: lO+" 원"},
              ]}
              columns={columns}
              disableSelectionOnClick
              hideFooter
              components={{ Toolbar: CustomToolbar }}
              sx={{m:11,mt: -1, mb: 0}}
              
              initialState={{
                sorting: {
                  sortModel: [
                    {
                      field: 'Code',
                      sort: 'desc',
                    },
                  ],
                },
              }}
              />
              </div>
            </div>
          </div>
    </>
  );
};

export default HS_Graph01;