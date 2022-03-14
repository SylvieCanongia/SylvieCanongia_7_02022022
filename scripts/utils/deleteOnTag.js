import { recipes } from "../data/recipes";
import { updateAfterDeleteTag } from "./updateAfterDeleteTag";

const deleteOnTag = (mainSearchRecipesToDisplay, recipesToDisplay) => {

  // Selects all the crosses of the tags elements displayed above the dropdowns
  const iconsDelete = document.querySelectorAll('[data-icon-delete]');

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
  }

  for (const iconDelete of iconsDelete) {
    iconDelete.addEventListener('click', (event) => {
      
      event.stopPropagation();
      
      event.currentTarget.closest('[data-tag]').remove();

      updateAfterDeleteTag(recipesData, mainSearchRecipesToDisplay, recipesToDisplay);
    });
  }
}

export { deleteOnTag }