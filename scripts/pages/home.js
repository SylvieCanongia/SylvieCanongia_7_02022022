import { recipes } from "../data/recipes";
import { recipeCard } from './../templates/card';
import { searchBar } from './../utils/searchBar';

const home =() => {
  // Create the recipe cards with the data of the array 'recipes'
  // and display them on the home page
  recipeCard(recipes);

  // MAIN SEARCH BAR
  searchBar();
}

home();

export { home };