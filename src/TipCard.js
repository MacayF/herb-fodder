import './TipCard.css';
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';

export default function Message(props) {
  // can add other data to messages with props.date etc
  return (
    <div className='card' >
      <div className="pic">
        <img src={props.image}/>
      </div>
      <div className='card-content'>
        <span className='name-tag'>{props.name}</span>
        <div className='stats'>
          <p>Reduces CO2 by 13g</p>
          <p>Reduce Calories to 200</p>
          <Checkbox sx={{ marginLeft: '65%', marginTop: '35%' }}/>
        </div>
      </div>
    </div>
  );
}