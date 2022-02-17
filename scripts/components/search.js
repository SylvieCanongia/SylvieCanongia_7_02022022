/**
 *
 * @param {Object} recipes An array of objects containing the data for recipes
 * @param {function} recipeCard Displays all the recipes based on the data of the 'recipes'
 *
 * The function 'search' filters the recipes from the main search box and dsisplays them. Filtering is done by comparing with the name,
 * the ingredients or the description of the recipes data.
 */
const search = (recipes, recipeCard) => {
  const searchInputElement = document.querySelector("[data-search]");

  // Create the base array from the object recipes
  // for sorting the main search results
  // .toLowerCase => lowercase for all terms
  // .normalize and .replace => remove all the accents / diacritics

  let recipesData = JSON.parse(
    JSON.stringify(recipes)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );
  let recipesToDisplay = [];

  // Sorting will be on the properties 'name, ingredients and description'
  // So we delete all the others (except the id) to optimize the sorting
  for (let i = 0; i < recipesData.length; i++) {
    delete recipesData[i].servings;
    delete recipesData[i].time;
    delete recipesData[i].appliance;
    delete recipesData[i].ustensils;
  }

  // We listen to the input
  searchInputElement.addEventListener("input", (event) => {
    // Remove uppercase characters and accents / diacritics
    const value = event.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let arrayOfValues = value.split(" ");

    // empty the array to reset the displayed recipes
    recipesToDisplay = [];

    if (value.length >= 3) {
      for (let i = 0; i < recipesData.length; i++) {
        // Loop on each value of the arrayOfValues to see if the value is in the recipe's name
        LoopOnValues: for (valueElement of arrayOfValues) {
          if (valueElement !== "") {
            const isVisibleByName = recipesData[i].name.includes(valueElement);

            // if the value is found in the name, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe
            if (isVisibleByName) {
              const indexOfRecipeToDisplay = recipes.findIndex(
                (el) => el.id == recipesData[i].id
              );

              // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
              // if no, push the recipe into the array
              if (!recipesToDisplay.includes(recipes[indexOfRecipeToDisplay])) {
                recipesToDisplay.push(recipes[indexOfRecipeToDisplay]);
              }
              continue LoopOnValues;
            }

            // let isVisibleByIngredient = false;

            // console.log(recipesData[i].ingredients);
            for (let ingredientElement of recipesData[i].ingredients) {
              let ingredientTerms = ingredientElement.ingredient
                .concat(" ", ingredientElement.quantity)
                .concat(" ", ingredientElement.unit);
              const isVisibleByIngredient =
                ingredientTerms.includes(valueElement);

              // console.log(isVisibleByIngredient);

              if (isVisibleByIngredient) {
                const indexOfRecipeToDisplay = recipes.findIndex(
                  (el) => el.id == recipesData[i].id
                );

                // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
                // if no, push the recipe into the array
                if (
                  !recipesToDisplay.includes(recipes[indexOfRecipeToDisplay])
                ) {
                  recipesToDisplay.push(recipes[indexOfRecipeToDisplay]);
                }
                continue LoopOnValues;
              }
            }
          }
        }
      }
      // Creates the cards of the filtered recipes and displays them
      recipeCard(recipesToDisplay);
    } else {
      // if entered value is < 3 chars, creates cards and displays all the recipes
      recipeCard(recipes);
    }
  });
};

export { search };
