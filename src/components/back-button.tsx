import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../assets/back.svg';

export function BackButton() {
    let navigate = useNavigate();

    return <div className="back-button">
        <button type="button" onClick={()=> navigate(-1)}>
            <BackIcon />
            Voltar
        </button>
    </div>
}