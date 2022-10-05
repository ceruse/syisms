import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const A_CountDelete = (param) =>{
    let MoveSalesID = param.pid.row.MSID;

    const Delete = () => {
        let MoveSales={MoveSalesID};
        MoveSales.MoveSalesID=MoveSalesID;

    console.warn("MoveSales",MoveSales)
    fetch('/api/Sales/deleteMoveSales',
    {
      method: 'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(MoveSales)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
      })
    }).catch(()=>{ alert('ERR');
      console.log('error');
    });
        }

    return (
        <div>
            <IconButton aria-label="CountDelete" onClick={Delete}>
                <ClearIcon />
            </IconButton>
        </div>
    )
}

export default A_CountDelete;