import { Dot as DotType } from '../store/types';
import { useDispatch } from 'react-redux';
import { actions } from '../store/gameSlice';  


interface DotProps {
    dot: DotType;
}

const Dot = ({ dot }: DotProps) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        
        dispatch(actions.selectDot(dot));

        console.log(`
            Dot of row ${dot.position.rowIndex} and col ${dot.position.colIndex} clicked!`);
            
        
            
    }

    return (
        <div
            style={{backgroundColor: dot.color}}
            onClick={handleClick}
        >
            {dot.color}
        </div>
    );
}

export default Dot;