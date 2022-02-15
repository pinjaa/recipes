import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from './Recipe'

const URL = 'https://api.spoonacular.com/recipes/'
const API = ''

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [ingredient, setIngredient] = useState('pasta');


  useEffect(() => {
    
    const address = URL + 'complexSearch' + '?apiKey=' + API + '&includeIngredients=' + ingredient + '&addRecipeInformation=true'
    
    axios.get(address)
      .then((response) => {
        setError(null);
        setIsLoaded(true);
        setItems(response.data.results);
      }).catch(error => {
        alert(error);
      })
  }, [ingredient]);

  function close() {
    setSelectedItem(null);
  }

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  function getSearch(e) {
    e.preventDefault();
    setIngredient(search);
    setSearch("");
  }
  
  if(selectedItem != null) {
    return <Recipe
      title={selectedItem.title}
      image={selectedItem.image}
      minutes={selectedItem.readyInMinutes}
      instructions = {selectedItem.sourceUrl}
      source = {selectedItem.sourceName}
      
      close={close}
    />;

  }
  else if(error) {
    return <p>{error.message}</p>;
  }
  else if(!isLoaded) {
    return <p>Loading...</p>;
  }
  else {
    return (
      <div id='container'>

        <form onSubmit={getSearch}>
          <h3>Search recipes by ingredient</h3>
          <p>You can search with multiple ingredients at once, <br></br> use comma between ingredients for example: banana, vanilla, chocolate</p>
          <input type="text"  onChange={updateSearch} />
          <button type="submit">Search</button>
        </form>


        {items.map((item) => (
          <div key={item.title} onClick={e => setSelectedItem(item)}>
            <h3>{item.title}</h3>
            <img src={item.image} />
            <p>Cooking time: {item.readyInMinutes} minutes</p>
            
          </div>
        ))}

        
      </div>
    );
  }

}

export default App;
