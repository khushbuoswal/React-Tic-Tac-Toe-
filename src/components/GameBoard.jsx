

export default function GameBoard({ onSelectSquare, board}) {



    
    /*
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handelSelectSquare(rowIdx, columnIdx, playerSymbol) {

        
        setGameBoard((prevGameBoard) => { // This state updating function when updating your state based on some previous state, It's also strongly recommended that if your state is an object or array, 
            // you update that state in an immutable way, which simply means you create a copy of the old state, so a new object or a new array first and then you just change that copy instead of that 
            // existing object or array. And the reason for that is recommendation is that if your state
            // is an object or an array,you're dealing with a reference value in javascript and therefore if you would be updating it like this you would be updating the old value in memory, even 
            // before this scheduled state update was executed by react. And that would cause some problems with the re-rendering of your component.
            const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
            updatedBoard[rowIdx][columnIdx] = activePlayerSymbol;
            return updatedBoard;
        } );

        onSelectSquare();
    }
        */


    return <ol id = "game-board">
        {board.map((row, rowIdx) => (<li key={rowIdx}>
            <ol>
                {row.map((playerSymbol, colIdx) => (<li key = {colIdx}><button onClick = {() => onSelectSquare(rowIdx, colIdx)} disabled = {playerSymbol !== null}>{playerSymbol}</button> </li>))}
            </ol>
        </li>))}
    </ol>
}