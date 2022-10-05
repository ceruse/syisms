// mui
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const MO_CountDelete = (param) =>{
    let MoveOutputID = param.moid.row.MoveOutputID;
    const Delete = () => {
        let MoveOutput={MoveOutputID};
        MoveOutput.MoveOutputID=MoveOutputID;

    console.warn("MoveOutput",MoveOutput)
    fetch('/api/Move/deleteMoveproduct',
    {
      method: 'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(MoveOutput)
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

export default MO_CountDelete;