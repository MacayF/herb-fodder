import './App.css';
import {useState} from 'react'
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



function App() {
  const [meal, setMeal] = useState("");
  const [mealNames, setMealNames] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const loadData = JSON.parse(JSON.stringify(jsonData));
  const [value, setValue] = useState(0);

  document.addEventListener("DOMContentLoaded", loadRecipes);

  // fills states with meals
  function loadRecipes() {
    // sets mealNames with names of meals
    var newState= [];
    for(var i = 0; i < loadData.recipes.length; i++) {
      const recipe = loadData.recipes[i].name;
      newState.push(recipe);
    }
    setMealNames(newState);

    // sets allMeals with meal objects
    var newState= [];
    for(var i = 0; i < loadData.recipes.length; i++) {
      const newRecipe = {
        name: loadData.recipes[i].name,
        url: loadData.recipes[i].url,
        image: loadData.recipes[i].image,
        date: loadData.recipes[i].datePublished,
      };
      newState.push(newRecipe);
    }
    shuffleArray(newState);
    setAllMeals(newState);
  }


  function search() {
    console.log(meal);
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
let className = 'menu';



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
        options={mealNames}
        sx={{ width: '23rem', bgcolor: 'white',  filter: 'drop-shadow(0 1mm 1.5mm  rgb(0, 0, 0, 0.1))'}}
        // sets meal const as input value
        inputValue={meal}
        onInputChange={(event, newInputValue) => {
          setMeal(newInputValue);
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
          {allMeals.slice(0, 100).map((item) => (
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
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <Box sx={{ width: 500, position: 'fixed', width: '100vw', bottom: 0, filter: 'drop-shadow(0 0mm 4mm  rgb(0, 0, 0, 0.4))' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
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

export default App;
