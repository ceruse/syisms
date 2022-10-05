// mui
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const A_CountAdd = (param) =>{
    let MoveSalesID = param.pid.row.MSID;

    const Add = () => {
      if(param.pid.row.SCount < param.pid.row.PCount)
      {
        let MoveSales={MoveSalesID};
        MoveSales.MoveSalesID=MoveSalesID;

        console.warn("MoveSales",MoveSales)
        fetch('/api/Sales/plusmovesales/', {
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
            <IconButton aria-label="CountAdd" onClick={Add}>
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default A_CountAdd;