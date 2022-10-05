// mui
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

const MO_CountMinus = (param) =>{
    let MoveOutputID = param.moid.row.MoveOutputID;

    const Minus = () => {
        if(param.moid.row.OutputCount > 0)
        {
            let MoveOutput={MoveOutputID};
            MoveOutput.MoveOutputID=MoveOutputID;

            console.warn("MoveOutput",MoveOutput)
            fetch('/api/Move/minusmoveproduct/', {
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
            <IconButton aria-label="CountMinus" onClick={Minus}>
                <RemoveIcon />
            </IconButton>
        </div>
    )
}

export default MO_CountMinus;