import './App.css';
import Search from './Search.js';
import Planner from './Planner.js';
import {useEffect, useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsonData from './openrecipes2.json';
import InspoCard from './InspoCard.js';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

export default function Router() {
  const [meal, setMeal] = useState("");
  const [mealNames, setMealNames] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [value, setValue] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App meal={meal} setMeal={setMeal} mealNames={mealNames} setMealNames={setMealNames} allMeals={allMeals} setAllMeals={setAllMeals} value={value} setValue={setValue} />} />
        <Route path="/search" element={<Search meal={meal} setMeal={setMeal} mealNames={mealNames} setMealNames={setMealNames} allMeals={allMeals} setAllMeals={setAllMeals} value={value} setValue={setValue} />} />
        <Route path="/planner" element={<Planner/>} />
      </Routes>
    </BrowserRouter>
  );
}

function App(props) {
  const loadData = JSON.parse(JSON.stringify(jsonData));
  const navigate = useNavigate();
  const letters = [
    {"letter":"A+", "color":"green"},
    {"letter":"A", "color":"green"},
    {"letter":"A-", "color":"green"},
    {"letter":"B+", "color":"darkgoldenrod"},
    {"letter":"B", "color":"darkgoldenrod"},
    {"letter":"B-", "color":"darkgoldenrod"},
    {"letter":"C+", "color":"darkorange"},
    {"letter":"C", "color":"darkorange"},
    {"letter":"C-", "color":"darkorange"}
  ]
  // const [letter, setLetter] = useState({});
  let letter = {};


  // document.addEventListener("DOMContentLoaded", loadRecipes);
  // calls function only once
  useEffect(loadRecipes, []);

  // fills states with meals
  function loadRecipes() {
    // sets mealNames with names of meals
    var newState= [];
    for(var i = 0; i < loadData.recipes.length; i++) {
      const recipe = loadData.recipes[i].name;
      newState.push(recipe);
    }
    props.setMealNames(newState);

    // sets allMeals with meal objects
    var newState= [];
    for(var i = 0; i < loadData.recipes.length; i++) {
      const newRecipe = {
        name: loadData.recipes[i].name,
        url: loadData.recipes[i].url,
        image: loadData.recipes[i].image,
        date: loadData.recipes[i].datePublished,
        description: loadData.recipes[i].description,
      };
      newState.push(newRecipe);
    }
    shuffleArray(newState);
    props.setAllMeals(newState);
  }

  //called when search is entered
  function search() {
    console.log(props.meal);

    navigate('/search')
  }

  //shuffled array passed in (used to shuffle recipes for home screen)
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  function randomLetter() {
    let number = Math.floor(Math.random() * letters.length);
    let randomLetter = letters[number];
    // setLetter(randomLetter);
    letter = randomLetter;
  }


  return (
    <div className="App">
      <div className='header'>
        <img className="logo"/>
        <p>Herb & Fodder</p>
      </div>
      <div className='banner'>
        <p>Help the Planet.</p>
        <p>Help Yourself.</p>
      </div>
      <Autocomplete
        disablePortal
        id="search-bar"
        options={props.mealNames}
        sx={{ width: '23rem', bgcolor: 'white',  filter: 'drop-shadow(0 1mm 1.5mm  rgb(0, 0, 0, 0.1))'}}
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
      <div className='inspo'>
        <p className='inspo-header'>Some Eco-Inspo</p>
        <ImageList variant="masonry" cols={2} gap={'0.2rem'} sx={{ width: '90vw', textAlign: 'center' }}>
          {props.allMeals.slice(0, 100).map((item) => (
            <a href={item.url} target="_blank">
              <ImageListItem key={item.image} sx={{ width: '12rem', marginBottom: '1rem' }}>
                <img className='recipe-card-img'
                  src={`${item.image}?w=248&fit=crop&auto=format`}
                  // srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-image-available-icon-flat-vector.jpg";
                  }}
                  alt={item.name}
                  loading="lazy"
                />
                <div className='subtext'>
                  {item.name}
                  {randomLetter()}
                  <span className='eco-grade' style={{color: letter['color']}}>{letter['letter']}</span>
                </div>
              </ImageListItem>
            </a>
          ))}
        </ImageList>
      </div>
      <Box sx={{ width: 500, position: 'fixed', width: '100vw', bottom: 0, filter: 'drop-shadow(0 0mm 4mm  rgb(0, 0, 0, 0.4))' }}>
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