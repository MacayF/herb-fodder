import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function App() {
  const [meal, setMeal] = useState("");

  window.onLoad = loadRecipes();

  function loadRecipes(){
    console.log('loaded');
  }

  function search() {
    console.log(meal);
  }

  return (
    <div className="App">
      <Autocomplete
        disablePortal
        id="search-bar"
        options={['The Godfather', 'Pulp Fiction']}
        sx={{ width: 300 }}
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
    </div>
  );
}

export default App;
