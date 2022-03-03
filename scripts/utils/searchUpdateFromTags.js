import { recipes } from '../data/recipes';
import { recipeCard } from "../templates/recipeCard";
import { dropdowns } from '../components/dropdowns';
import { tagSearch } from '../components/tagSearch';

/**
 * Updtade the recipes and the tags to display after a tag has been clicked
 */
const searchUpdateFromTags = () => {

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
    
    // Selects all the tags displayed in the 3 dropdowns
  const dropdownsTags = document.querySelectorAll('[data-dropdown-item]');
  let arrayOfSelectedTags = [];
  
  let recipesToDisplayFromTags = [];

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

  // Listen each click on a tag
  for (const dropdownTag of dropdownsTags) {

    dropdownTag.addEventListener('click', (event) => {
      recipesToDisplayFromTags = [];

       // Selects all the tags elements displayed above the dropdowns
      //  to have an updated array of the last tags selected
       const selectedTagsElements = document.querySelectorAll('[data-tag]');
      //  console.log(selectedTagsElements)

      // And pushes all the tags's text of the actual displayed tags into this array
      for (const tagElement of selectedTagsElements) {
        const tagText = tagElement.firstElementChild.textContent;
        if(!arrayOfSelectedTags.includes(tagText)) {
          arrayOfSelectedTags.push(tagText);
        }
      }

      // console.log(arrayOfSelectedTags)

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

              // console.log(indexOfRecipeToDisplay)

              // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
              // if no, push the recipe into the array
              pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);
              // console.log(recipesToDisplayFromTags);
              continue LoopOnValues;
            }

            // ====================================
             // ==== Search on the ingredients ====

             for (const ingredientElement of recipesData[i].ingredients) {
              //  console.log(ingredientElement.ingredient)
              // Concat all the terms ingredient, quantity and unit
              // let ingredientTerms = ingredientElement.ingredient
              //   .concat(" ", ingredientElement.quantity)
              //   .concat(" ", ingredientElement.unit);

              // console.log(ingredientTerms)
              const isVisibleByIngredient = ingredientElement.ingredient.includes(selectedTagLowerCase);

              // if the value is found in the ingredients, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
              if (isVisibleByIngredient) {
                const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);

                // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);
                // console.log(recipesToDisplayFromTags);
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

      // console.log(recipesToDisplayFromTags)

      // Creates the cards of the filtered recipes and displays them
      recipeCard(recipesToDisplayFromTags);

      // The list of tags in each dropdown are also updated
      dropdowns(recipesToDisplayFromTags);
      tagSearch(recipesToDisplayFromTags);
    })
  }
}

export { searchUpdateFromTags };