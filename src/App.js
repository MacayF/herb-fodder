import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsonData from './openrecipes.json';
import InspoCard from './InspoCard.js';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



function App() {
  const [meal, setMeal] = useState("");
  const [mealNames, setMealNames] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const loadData = JSON.parse(JSON.stringify(jsonData));

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
        sx={{ width: 330, bgcolor: 'white' }}
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
        <ImageList variant="masonry" cols={2} gap={8}>
          {allMeals.map((item) => (
            <ImageListItem key={item.image}>
              <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                // srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725184-stock-illustration-image-available-icon-flat-vector.jpg";
                }}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.name}
                subtitle={item.date}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => {
                      window.open(item.url);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default App;
