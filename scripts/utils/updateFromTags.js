import { recipes } from '../data/recipes';
import { recipeCard } from '../templates/recipeCard';
import { dropdowns } from '../components/dropdowns';
import { tagSearch } from '../components/tagSearch';

/**
   * @param { array } recipesToDisplay Recipes to display after sorting of the recipes
   * @param { number } indexOfRecipeToDisplay The index of the recipe to display
   */
 const pushIfNoDuplicate = (recipesToDisplay, indexOfRecipeToDisplay) => {
  // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
  // if no, push the recipe into the array
  if (!recipesToDisplay.includes(recipes[indexOfRecipeToDisplay])) {
    recipesToDisplay.push(recipes[indexOfRecipeToDisplay]);
  }
};

/**
 * Update the interface when a tag is added by click
 * or removed from above the dropdowns
 * @param { array } recipesData An array of objects containing the data for recipes
 * 
 */
const updateFromTags = (recipesData) => {

  let recipesToDisplayFromTags = [];
  let arrayOfSelectedTags = [];

       // Selects all the tags elements displayed above the dropdowns
      //  to have an updated array of the last tags selected
       const selectedTagsElements = document.querySelectorAll('[data-tag]');

      if (selectedTagsElements.length === 0) {
        // If all the tags above the dropdowns have been deleted
        // reset the displayed recipes

        // Creates the cards of the filtered recipes and displays them
        recipeCard(recipes);
        // The list of tags in each dropdown are also updated
        dropdowns(recipes);

      } else {
        // Pushes all the tags's text of the actual displayed tags into this array
      for (const tagElement of selectedTagsElements) {
        const tagText = tagElement.firstElementChild.textContent;
        if(!arrayOfSelectedTags.includes(tagText)) {
          arrayOfSelectedTags.push(tagText);
        }
      }

      for (let i = 0; i < recipesData.length; i++) {
        // Loop on each value of the arrayOfSelectedTags to see if the value is
        // in the recipe's name, ingredients or description
        LoopOnValues: for (const selectedTag of arrayOfSelectedTags) {
          if (selectedTag !== "") {

            // ============================
            // ==== Search on the name ====

            const selectedTagLowerCase =
              selectedTag
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")

            const isVisibleByName = recipesData[i].name.includes(selectedTagLowerCase);

            // if the value is found in the name, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
            if (isVisibleByName) {
              const indexOfRecipeToDisplay = recipes.findIndex(
                (el) => el.id == recipesData[i].id
              );

              // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
              // if no, push the recipe into the array
              pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);

              continue LoopOnValues;
            }

            // ====================================
             // ==== Search on the ingredients ====

             for (const ingredientElement of recipesData[i].ingredients) {

              const isVisibleByIngredient = ingredientElement.ingredient.includes(selectedTagLowerCase);

              // if the value is found in the ingredients, find the matching recipe in the array of object 'recipes'
              // via the matching id of the recipe
              if (isVisibleByIngredient) {
                const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);

                // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);

                continue LoopOnValues;
              }
            }

            // ===================================
            // ==== Search on the description ====

            const isVisibleByDescription =
              recipesData[i].description.includes(selectedTagLowerCase);

            // if the value is found in the description, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
            if (isVisibleByDescription) {
              const indexOfRecipeToDisplay = recipes.findIndex(
                (el) => el.id == recipesData[i].id
              );

              // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
              // if no, push the recipe into the array
              pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);
              
              continue LoopOnValues;
            }
          }
        }
      }

      // Creates the cards of the filtered recipes and displays them
      recipeCard(recipesToDisplayFromTags);

      // The list of tags in each dropdown are also updated
      dropdowns(recipesToDisplayFromTags);
      tagSearch(recipesToDisplayFromTags);
      }

      
}

export { updateFromTags };