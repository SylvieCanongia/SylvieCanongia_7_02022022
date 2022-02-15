import { recipes } from "../data/recipes";
import { recipeCard } from './../templates/card.js';

const home =() => {
  // Create the recipe cards with the data of the array 'recipes'
  // and display them on the home page
  recipeCard(recipes);

  // MAIN SEARCH BAR
  
}

home();

export { home };