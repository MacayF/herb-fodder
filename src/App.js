import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsonData from './openrecipes.json';
import InspoCard from './InspoCard.js';



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
        <div className='cards'>
          {allMeals.map((meal, i)=>{
            // return a inspocard component
            // key needs to be a unique value for each item
            return <InspoCard {...meal} key={i}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
