import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';

const A_CountRemove = (param) =>{
    let MoveSalesID = param.pid.row.MSID;
    
    const Remove = () => {
        let MoveSales={MoveSalesID};
        MoveSales.MoveSalesID=MoveSalesID;

        if(param.pid.row.SCount>0)
        {
        console.warn("MoveSales",MoveSales)
        fetch('/api/Sales/minusmovesales/', {
          method: 'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(MoveSales)
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp)
          })
        }).catch(()=>{ alert('입력방식이 올바르지 않습니다.');
          console.log('error');
        });
        }
    }

    return (
        <div>
            <IconButton aria-label="CountRemove" onClick={Remove}>
                <RemoveIcon />
            </IconButton>
        </div>
    )
}

export default A_CountRemove;