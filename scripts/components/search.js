import { recipeCard } from '../templates/recipeCard';
import { dropdowns } from './dropdowns';
import { tagSearch } from './tagSearch';

/**
 *
 * @param { array } recipes An array of objects containing the data for recipes
 * @param { function } recipeCard Displays all the recipes from the data of the 'recipes'
 *
 * Filters the recipes from the main search box and displays them. Filtering is done by comparing with the name,
 * the ingredients or the description of the recipes data.
 */
const search = (recipes) => {
  const searchInputElement = document.querySelector("[data-search]");

  /**
   * See if the recipe isn't already in the array recipesToDisplay to avoid duplication
   * if no, push the recipe into the array
   * @param { array } recipes Array from which are taken the data of the recipes via their id
   * @param { array } recipesToDisplay Recipes to display after sorting of the recipes from the main Search
   * @param { number } indexOfRecipeToDisplay The index of the recipe to display
   */
  const pushIfNoDuplicate = (recipes, recipesToDisplay, indexOfRecipeToDisplay) => {
    if (!recipesToDisplay.includes(recipes[indexOfRecipeToDisplay])) {
      recipesToDisplay.push(recipes[indexOfRecipeToDisplay]);
    }
  };

  let recipesToDisplay = [];

  // Create the base array from the data of the recipes
  // for sorting the main search results
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

  // We listen to the input and update results for each char > 3 typed
  // The items of the dropdowns are also updated at the same time
  searchInputElement.addEventListener("input", (event) => {

    // Sets uppercase characters to lowercase and remove accents / diacritics
    const value = event.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let arrayOfValues = value.split(" ");

    // empty the array to reset the displayed recipes
    recipesToDisplay = [];

    if (value.length >= 3) {
      for (let i = 0; i < recipesData.length; i++) {

        // Loop on each value of the arrayOfValues to see if the value is
        // in the recipe's name, ingredients or description
        LoopOnValues: for (const valueElement of arrayOfValues) {
          if (valueElement !== "") {
            // ==== Search on the name ====
            const isVisibleByName = recipesData[i].name.includes(valueElement);

            // if the value is found in the name, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
            if (isVisibleByName) {
              const indexOfRecipeToDisplay = recipes.findIndex(
                (el) => el.id == recipesData[i].id
              );

              // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
              // if no, push the recipe into the array
              pushIfNoDuplicate(recipes, recipesToDisplay, indexOfRecipeToDisplay);

              continue LoopOnValues;
            }

            // ==== Search on the ingredients ====

            for (const ingredientElement of recipesData[i].ingredients) {
              // Concat all the terms ingredient, quantity and unit
              let ingredientTerms = ingredientElement.ingredient

              const isVisibleByIngredient = ingredientTerms.includes(valueElement);

              if (isVisibleByIngredient) {
                const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);

                // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(recipes, recipesToDisplay, indexOfRecipeToDisplay);

                continue LoopOnValues;
              }
            }

            // ==== Search on the description ====

            const isVisibleByDescription =
              recipesData[i].description.includes(valueElement);

            // if the value is found in the name, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
            if (isVisibleByDescription) {
              const indexOfRecipeToDisplay = recipes.findIndex(
                (el) => el.id == recipesData[i].id
              );

              // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
              // if no, push the recipe into the array
              pushIfNoDuplicate(recipes, recipesToDisplay, indexOfRecipeToDisplay);

              continue LoopOnValues;
            }
          }
        }
      }

      // The array of recipes for the search by tag is updated
      let mainSearchRecipesToDisplay = [...recipesToDisplay];

      // console.log(recipesToDisplay, mainSearchRecipesToDisplay)

      // Creates the cards of the filtered recipes and displays them
      recipeCard(recipesToDisplay);

      // The list of tags in each dropdown are also updated
      dropdowns(recipesToDisplay);



      tagSearch(recipesToDisplay, mainSearchRecipesToDisplay);

    } else {
      // if entered value is < 3 chars, creates cards and displays all the recipes
      recipeCard(recipes);
      dropdowns(recipes);
      tagSearch(recipes);
    }
  });

};

export { search };
