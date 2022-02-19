import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const nav = useNavigate();

    return(
        <>
        <h2>
            Home
        </h2>
        <button 
            onClick={() => nav('/setup-game')}>
                Play
            </button>
        </>
    );
}