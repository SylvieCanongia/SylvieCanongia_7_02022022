import { recipes } from '../data/recipes';

import { updateAfterSearchTag } from './updateAfterSearchTag';

/**
 * Update the recipes and the tags to display after a tag has been clicked
 */
const searchOnTag = (mainSearchRecipesToDisplay, recipesToDisplay) => {
  
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

  // We delete all the properties we don't need (except the id) to optimize the sorting
  for (let i = 0; i < recipesData.length; i++) {
    delete recipesData[i].name;
    delete recipesData[i].description;
    delete recipesData[i].servings;
    delete recipesData[i].time;
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