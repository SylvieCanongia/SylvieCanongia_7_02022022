import { recipes } from '../data/recipes';
import { recipeCard } from '../templates/recipeCard';
import { search } from "../components/search";
import { dropdowns, manageDropdowns } from './../components/dropdowns';
import { tagSearch } from '../components/tagSearch';
import { searchUpdateFromTags } from '../utils/searchOnTag';

const home = () => {

  // Create the recipe cards with the data of the array 'recipes'
  // and display them on the home page
  recipeCard(recipes);
  dropdowns(recipes);
  manageDropdowns();

  // Manage the search in the main searchBar
  search(recipes, recipeCard);
  tagSearch(recipes);
};

home();

export { home };
