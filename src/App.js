import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function App() {
  const [meal, setMeal] = useState("");

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
        renderInput={(params) => <TextField 
          {...params} 
          label="Search"
          onChangeCapture={(e) => setMeal(e.target.value)}
          onKeyPress={(e) => {
            console.log(e);
            if (e.key === 'Enter') search();
          }} 
        />}
      />
    </div>
  );
}

export default App;
