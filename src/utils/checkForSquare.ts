import { Dot as DotType } from "../store/types";

export default function checkForSquare(selectedDots: DotType[]): boolean {

    if (selectedDots.length !== 4) {
        return false;
    } else {
        const minRowIndex = Math.min(...selectedDots.map((dot) => dot.position.rowIndex));
        const maxRowIndex = Math.max(...selectedDots.map((dot) => dot.position.rowIndex));
        const minColIndex = Math.min(...selectedDots.map((dot) => dot.position.colIndex));
        const maxColIndex = Math.max(...selectedDots.map((dot) => dot.position.colIndex));
        
        const firstDot = selectedDots.find((dot) => dot.position.rowIndex === minRowIndex && dot.position.colIndex === minColIndex);
        const secondDot = selectedDots.find((dot) => dot.position.rowIndex === minRowIndex && dot.position.colIndex === maxColIndex);
        const thirdDot = selectedDots.find((dot) => dot.position.rowIndex === maxRowIndex && dot.position.colIndex === maxColIndex);
        const fourthDot = selectedDots.find((dot) => dot.position.rowIndex === maxRowIndex && dot.position.colIndex === minColIndex);
    
        if (
            firstDot?.position.rowIndex === secondDot?.position.rowIndex && 
            firstDot?.position.colIndex === fourthDot?.position.colIndex &&
            thirdDot?.position.rowIndex === fourthDot?.position.rowIndex &&
            thirdDot?.position.colIndex === secondDot?.position.colIndex
        ) {
            return true;
        } else {
            return false;
        }
    }
} 