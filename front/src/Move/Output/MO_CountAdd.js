// mui
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const MO_CountAdd = (param) =>{
    let MoveOutputID = param.moid.row.MoveOutputID;

    const Add = () => {
        if(param.moid.row.OutputCount < param.moid.row.ProductCount)
        {
            let MoveOutput={MoveOutputID};
            MoveOutput.MoveOutputID=MoveOutputID;

            console.warn("MoveOutput",MoveOutput)
            fetch('/api/Move/plusmoveproduct/', {
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(MoveOutput)
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

export default MO_CountAdd;