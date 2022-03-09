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
import InfoIcon from '@mui/icons-material/Info';


function Search(props) {
  const navigate = useNavigate();
  const [selectMeal, setSelectMeal] = useState([]);

  useEffect(defineMeal, []);

  //called when search is entered
  function search() {
    console.log(props.meal);
    defineMeal();
  }

  function defineMeal() {
    for(var i = 0; i < props.allMeals.length; i++) {
      if(props.allMeals[i].name == props.meal) {
        setSelectMeal(props.allMeals[i])
        return props.allMeals[i];
      }
    }
  }

  function goHome() {
    navigate('/');
  }

  function goEnd() {
    navigate('/planner');
  }

  return (
    <div className="App">
      <div className='header'>
        <img className="logo" onClick={goHome}/>
        <p onClick={goHome}>Herb & Fodder</p>
      </div>
      <Autocomplete
        disablePortal
        id="search-bar"
        options={props.mealNames}
        sx={{ marginTop: '3rem', width: '23rem', bgcolor: 'white',  filter: 'drop-shadow(0 1mm 1.5mm  rgb(0, 0, 0, 0.1))'}}
        defaultValue={props.meal}
        // sets meal const as input value
        inputValue={props.meal}
        onInputChange={(event, newInputValue) => {
          props.setMeal(newInputValue);
        }}
        renderInput={(params) => <TextField 
          {...params} 
          label="Search"
          //searches on 'enter' keypress
          onKeyPress={(e) => {
            if (e.key === 'Enter') search();
          }}
        />}
      />

      <div className='meal-box'>
        <img className="meal-image" src={selectMeal.image} 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/heart-healthy-food-1580231690.jpg";
          }}/>
        <a href={selectMeal.url} className='info-link' target="_blank"> 
          <div className='info-btn'>
            Recipe
            {<InfoIcon sx={{ color:'white', marginLeft:'0.2rem'}}/>}
          </div>
        </a>
        <div className='meal-text'>
          <p className='meal-name'>{selectMeal.name}</p>
          <p>{selectMeal.description}</p>
        </div>
        <hr/>
        <div className='meal-stats'>
          <p>30g CO2</p>
          <p>350 cal</p>
          <p>Eco-Score: <span id='eco-score'>B+</span></p>
        </div>
      </div>

      <div className='tips'>
        <TipCard
          name='Replace with Impossible Meat' 
          image='https://vegnews.com/media/W1siZiIsIjIxMzIyL1ZlZ05ld3MuSW1wb3NzaWJsZUJ1cmdlcjQuanBnIl0sWyJwIiwiY3JvcF9yZXNpemVkIiwiMTk0NXgxMTUwKzg1KzAiLCIxNjAweDk0Nl4iLHsiZm9ybWF0IjoianBnIn1dLFsicCIsIm9wdGltaXplIl1d/VegNews.ImpossibleBurger4.jpg?sha=2253811381f67b85'
        />
        <TipCard
          name='Substitute in Bell Peppers' 
          image='https://easylowcarb.com/wp-content/uploads/2021/04/FT-Roasted-Bell-Peppers-EasyLowCarb-1.jpg'
        />
        <TipCard
          name='Shop Sustainable Meat' 
          image='https://www.beefmagazine.com/sites/beefmagazine.com/files/styles/article_featured_standard/public/beef%20cattle%20-%20red%20cows%20in%20pasture_branex_iStock_Thinkstock-595151932.jpg?itok=Fo8aiYaa'
        />
      </div>

      <Button 
        variant="contained" 
        endIcon={<AddIcon />}
        sx={{ marginBottom: '6rem', position: 'fixed', bottom: 0, right: '1rem', height: '4rem', backgroundColor: 'rgb(46, 179, 64)', borderRadius: '10rem', fontSize: '1rem', fontWeight: 'bold'}}
        onClick={goEnd}
      >
        Add Meal
      </Button>
      
      <Box sx={{ width: 500, position: 'fixed', width: '100vw', bottom: 0, filter: 'drop-shadow(0 0mm 2mm  rgb(0, 0, 0, 0.4))' }}>
      <BottomNavigation
        showLabels
        value={props.value}
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Planner" icon={<CalendarTodayIcon />} />
      </BottomNavigation>
    </Box>
    </div>
  );
}

export default Search;