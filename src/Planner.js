import './App.css';
import './Search.css';
import App from './App.js';
import {useEffect, useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsonData from './openrecipes.json';
import InspoCard from './InspoCard.js';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { appBarClasses } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ReplayOutlined } from '@mui/icons-material';
import TipCard from './TipCard.js';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';



function Planner() {
  const navigate = useNavigate();
  
  function goHome() {
    navigate('/');
  }

  return (
    <div className="App">
      hey this is where the app ends. Imagine theres a planner here. Thanks.
      <button onClick={goHome}>Go Home</button>
    </div>
  );
}

export default Planner;