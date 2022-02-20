import { recipes } from '../data/recipes';
import { recipeCard } from '../templates/recipeCard';
import { search } from "../components/search";
import { dropdowns } from './../components/dropdowns'

const home = () => {
// let recipesToDisplay = [];

  // Create the recipe cards with the data of the array 'recipes'
  // and display them on the home page
  recipeCard(recipes);
  dropdowns(recipes);

  // Manage the search in the main searchBar
  search(recipes, recipeCard);
};

home();

export { home };
