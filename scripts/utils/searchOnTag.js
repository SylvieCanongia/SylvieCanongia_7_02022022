import { recipes } from '../data/recipes';
// import { recipeCard } from "../templates/recipeCard";
// import { dropdowns } from '../components/dropdowns';
// import { tagSearch } from '../components/tagSearch';

import { updateAfterSearchTag } from './updateAfterSearchTag';

/**
 * Update the recipes and the tags to display after a tag has been clicked
 */
const searchOnTag = (mainSearchRecipesToDisplay, recipesToDisplay) => {
    // console.log(recipesToDisplay)
    // Selects all the tags displayed in the 3 dropdowns
  const dropdownsTags = document.querySelectorAll('[data-dropdown-item]');

  // Create the base array of data 'recipesData' from the data of the recipes
  // .toLowerCase => lowercase for all terms
  // .normalize and .replace => remove all the accents / diacritics

  let recipesData = JSON.parse(
    JSON.stringify(recipes)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );

  // Sorting will be on the properties 'ingredients, appliance, ustensils'
  // So we delete all the others (except the id) to optimize the sorting
  for (let i = 0; i < recipesData.length; i++) {
    delete recipesData[i].name;
    delete recipesData[i].description;
    delete recipesData[i].servings;
    delete recipesData[i].time;
    // delete recipesData[i].appliance;
    // delete recipesData[i].ustensils;
  }

  // Listen each click on a tag
  for (const dropdownTag of dropdownsTags) {

    dropdownTag.addEventListener('click', (event) => {
      event.stopPropagation();
      updateAfterSearchTag(recipesData, mainSearchRecipesToDisplay, recipesToDisplay);
    }, { once: true });
  }
}

export { searchOnTag };