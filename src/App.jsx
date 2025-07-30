import {useState} from 'react';
import Player from './components/player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx'; 
import GameOver from './components/GameOver.jsx';
import {WINNING_COMBINATIONS} from './components/winningcombinations.js';

function deriveActivePlayer(gameTurns) {
 let currentPlayer = 'X';  // you can't merge two start that's why you directly can't assign player to currentPLayer
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null,null],
    [null, null, null]
]

function App() {
  const [players, setPlayers] = useState({'X' : 'Player 1', 'O' : 'Player 2'});
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  // const [hasWinner, setHasWinner] = userState(false);

  const activePlayer = deriveActivePlayer(gameTurns);

      let gameBoard = [...initialGameBoard.map(array => [...array])]; //deep copy os the initialGameBoard not only a reference to it

    for(const turn of gameTurns){
        const{square, player} = turn;
        const{row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner; 
  for(const winningCombination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[winningCombination[0].row][winningCombination[0].column]// we can extract the information from the gameBoard in the form of combinations 
    const secondSquareSymbol = gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquareSymbol = gameBoard[winningCombination[2].row][winningCombination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]; // we can use the players object to get the name of the player who won

    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIdx, col : colIdx}, player: currentPlayer}, ...prevTurns]; // first item in the array is always the most recent turn.
      return updatedTurns;
    });

  }

  function handleRestart() {
    setGameTurns([]);

  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {...prevPlayers, [playerSymbol]: newName};
    });
  }

  return (
    <main>
      <div id ="game-container">
        <ol id = "players" className = "highlight-player">
          <Player name = "Player 1" symbol = "X" isActive = {activePlayer === 'X'} onChangeName = {handlePlayerNameChange}/>
          <Player name = "Player 2" symbol = "0" isActive = {activePlayer === 'O'} onChangeName = {handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard}/>
      </div>
      <Log turns= {gameTurns}/>
    </main>

    
  )
}

export default App
