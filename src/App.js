import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



function App() {
  const [meal, setMeal] = useState("");
  const [allMeals, setAllMeals] = useState([]);

  window.onLoad = loadRecipes();

  async function loadRecipes(){
    console.log('loaded');
    await fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=vegan", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
        "x-rapidapi-key": "677f84484cmsh1441584038ec2f5p19a6bdjsn0502b775bdc5"
      }
    })
    .then(response => response.json())
    // .then(data => makeDataSet(data))
    .then(data => console.log(data))
    .catch(err => {
      console.error(err);
    });
  }

  function makeDataSet(data) {
    for(var i = 0; i < 10; i++) {
      const recipe = data.hits[i];
      setAllMeals([recipe, ...allMeals]);
      console.log(allMeals);
    }
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
        options={['Meatloaf', 'Tuna Salad Sandwich', 'ceaser salad']}
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
      </div>
    </div>
  );
}

export default App;
