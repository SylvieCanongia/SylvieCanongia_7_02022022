import { recipes } from "../data/recipes";
import { updateFromTags } from "./updateFromTags";

const updateOnDeleteTag = () => {

  // Selects all the tags elements displayed above the dropdowns
  //  to have an updated array of the last tags selected
  // const selectedTagsElements = document.querySelectorAll('[data-tag]');
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

  // Sorting will be on the properties 'name, ingredients and description'
  // So we delete all the others (except the id) to optimize the sorting
  for (let i = 0; i < recipesData.length; i++) {
    delete recipesData[i].servings;
    delete recipesData[i].time;
    delete recipesData[i].appliance;
    delete recipesData[i].ustensils;
  }
  
   for (const iconDelete of iconsDelete) {
     iconDelete.addEventListener('click', (event) => {
       event.stopPropagation();
       event.currentTarget.closest('[data-tag]').remove();

       updateFromTags(recipesData);
     })
   }

}

export { updateOnDeleteTag };