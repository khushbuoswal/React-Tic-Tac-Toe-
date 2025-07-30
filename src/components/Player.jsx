import { useState } from 'react';
export default function Player({name, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
      setIsEditing((editing) => !isEditing); // new state depend on the previous state - not a good practice to do {!isEditing} directly

      if (isEditing) {
      onChangeName(symbol, playerName);
      }
    }
    function handleChange(event){
   
        setPlayerName(event.target.value);

    }

    const btnCaption = isEditing ? 'Save' : 'Edit';

    return (
         <li className = {isActive ? 'active' : undefined}>
          <span className = 'player'>
          {!isEditing ? (
          <span className = "player-name">{playerName}</span>
          ):
          (
            <input type = "text" required value = {playerName} onChange = {handleChange}/>
          )}
          <span className = "player-symbol">{symbol}</span>
          </span>
          <button onClick = {handleEditClick}>{btnCaption}</button>
          </li>
    );
}