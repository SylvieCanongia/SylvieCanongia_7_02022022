import { tagItem } from '../templates/tagItem';
import { dropdownItem } from "../templates/dropdownsItem";
import { dropdowns } from './dropdowns';

const tagSearch = (recipesToDisplay, recipeCard) => {
  // Selects all the inputs
  const searchTagInputElements = document.querySelectorAll("[data-input]");


  // Selects all the tag wrappers and the tags of the ingredients
  const ingredientsTagWrappers = document.querySelectorAll('[data-ingredients-list] .dropdown-item-wrapper');
  const ingredientsTagsElements = document.querySelectorAll('[data-ingredients-list] [data-dropdown-item]');

  // Selects all the tag wrappers and the tags of the appliance
  const applianceTagWrappers = document.querySelectorAll('[data-appliance-list] .dropdown-item-wrapper');
  const applianceTagsElements = document.querySelectorAll('[data-appliance-list] [data-dropdown-item]');
  
  // Selects all the tag wrappers and the tags of the appliance
  const ustensilsTagWrappers = document.querySelectorAll('[data-ustensils-list] .dropdown-item-wrapper');
  const ustensilsTagsElements = document.querySelectorAll('[data-ustensils-list] [data-dropdown-item]');
  
  let ingredientsTags = [];
  // let applianceTags = [];
  // let ustensilsTags = [];
  
  let newRecipesIngredientsToDisplay = [];
 
  const ingredientsListContainer = document.querySelector('[data-ingredients-list]');
  let ingredientsTagsToDisplay = [];
  // let applianceTagsToDisplay = [];
  // let ustensilsTagsToDisplay = [];

  /**
   *
   * @param {Array} recipesToDisplay Recipes to display after sorting of the recipes from the main Search
   * @param {number} indexOfRecipeToDisplay The index of the recipe to display
   */
   const pushIfNoDuplicate = (newRecipesToDisplay, indexOfIngredientTagToDisplay) => {
    // See if the recipe isn't already in the array newRecipesToDisplay to avoid duplication
    // if no, push the recipe into the array
    if (!newRecipesToDisplay.includes(recipesToDisplay[indexOfIngredientTagToDisplay])) {
      newRecipesToDisplay.push(recipesToDisplay[indexOfIngredientTagToDisplay]);
    }
  };

  // Create the base array from the array of objects 'recipesToDisplay'
  // for sorting the search in dropdowns
  // .toLowerCase => lowercase for all terms
  // .normalize and .replace => remove all the accents / diacritics

  let newRecipesData = JSON.parse(
    JSON.stringify(recipesToDisplay)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );

  // Sorting will be on the properties 'ingredients, appliance, ustensils'
  // So we delete all the others (except the id) to optimize the sorting
  for (let i = 0; i < newRecipesData.length; i++) {
    delete newRecipesData[i].name;
    delete newRecipesData[i].description;
    delete newRecipesData[i].servings;
    delete newRecipesData[i].time;
  }

  // console.log(newRecipesData)

  for (const searchTagInputElement of searchTagInputElements) {
    // Listen the inputs and get the value entered by the user
    // Sets uppercase characters to lowercase and remove accents / diacritics 
    searchTagInputElement.addEventListener("input", (event) => {
      // console.log(searchTagInputElement.value);
      const value = event.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
      let arrayOfValues = value.split(" ");
      console.log(arrayOfValues)

      // empty the array to reset the displayed recipes
      newRecipesToDisplay = [];
      ingredientsTags = [];

       ingredientsTagsToDisplay = [];
      // applianceTagsToDisplay = [];
      // ustensilsTagsToDisplay = [];

      // console.log(event.target);

      if (value.length >= 1) {

        // If the value was entered in the ingredients input
        if(event.target.hasAttribute('data-ingredients-input')) {

          // Reset the lists of the ingredients dropdown to push new sorted items
          ingredientsListContainer.innerHTML = '';

          for (let i = 0; i < newRecipesData.length; i++) {
              LoopOnValues: for (const valueElement of arrayOfValues) {
                if (valueElement !== "") {

                  for (const ingredientElement of newRecipesData[i].ingredients) {
                    console.log(ingredientElement)
                    const isVisibleIngredientTag = ingredientElement.ingredient.includes(valueElement);
                    console.log(isVisibleIngredientTag);
  
                    // If the value is found in the ingredients tags
                    if (isVisibleIngredientTag) {
                      if(!ingredientsTagsToDisplay.includes(ingredientElement.ingredient)) {
                        ingredientsTagsToDisplay.push(ingredientElement.ingredient);

                      // find the matching tag element, in the array of object 'recipesToDisplay' via the matching id of the recipe
                      const indexOfIngredientTagToDisplay = recipesToDisplay.findIndex((el) => el.id == newRecipesData[i].id);

                      // See if the recipe isn't already in the array 'newRecipesToDisplay' to avoid duplication
                      // if no, push the recipe into the array
                      pushIfNoDuplicate(newRecipesToDisplay, indexOfIngredientTagToDisplay);

                      // for each ingredient element, checks if it's not already in the array ingredients tags
                      // to avoid displaying several times the same tag
                      // Then keeps only the ingredients tags that include the value entered in the input
                      // And display them in the ingredients list with the dropdownItem function.
                      for (let i = 0; i < newRecipesToDisplay.length; i++) {
                        for (const ingredientElement of newRecipesToDisplay[i].ingredients) {
                          if (!ingredientsTags.includes(ingredientElement.ingredient)) {
                            ingredientsTags.push(ingredientElement.ingredient);
                            // console.log(ingredientElement.ingredient)

                            if (ingredientElement.ingredient
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")
                              .includes(valueElement)) {
                                dropdownItem(ingredientElement.ingredient, "[data-ingredients-list]");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if(event.target.hasAttribute('data-appliance-input')) {
          for (let i = 0; i < applianceTags.length; i++) {
            LoopOnValues: for (const valueElement of arrayOfValues) {
              if (valueElement !== "") {

              }
            }
            
          }
          
        }

        if(event.target.hasAttribute('data-ustensils-input')) {
          for (let i = 0; i < ustensilsTags.length; i++) {
            LoopOnValues: for (const valueElement of arrayOfValues) {
              if (valueElement !== "") {

              }
            }
            
          }
          
        }

        // console.log(newRecipesToDisplay)

        // Creates the cards of the filtered recipes and displays them
        // recipeCard(newRecipesToDisplay);

        // The list of tags in each dropdown are also updated
        // dropdowns(newRecipesToDisplay);
      } 
      // else {
      // // if entered value is < 3 chars, creates cards and displays all the recipes
      // recipeCard(recipesToDisplay);
      // dropdowns(recipesToDisplay);
      // }
    });
  }
    // });
}
// }

export { tagSearch };