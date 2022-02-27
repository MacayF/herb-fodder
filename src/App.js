import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsonData from './openrecipes.json';
import InspoCard from './InspoCard.js';



function App() {
  const [meal, setMeal] = useState("");
  const [allMeals, setAllMeals] = useState(["hello"]);
  const loadData = JSON.parse(JSON.stringify(jsonData));

  document.addEventListener("DOMContentLoaded", loadRecipes);

  // creates list of possible recipe names
  function loadRecipes() {
    var newState= [];
    for(var i = 0; i < loadData.recipes.length; i++) {
      const recipe = loadData.recipes[i].name;
      newState.push(recipe);
    }
    setAllMeals(newState);
    console.log(allMeals);
  }


  function search() {
    console.log(meal);
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
        options={allMeals}
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
        {allMeals.map((meal, i)=>{
          // return a inspocard component
          // key needs to be a unique value for each item
          return <InspoCard name={meal} key={i}/>
        })}
      </div>
    </div>
  );
}

export default App;
