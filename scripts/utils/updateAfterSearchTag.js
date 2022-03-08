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
const updateAfterSearchTag = (recipesData, mainSearchRecipesToDisplay, recipesToDisplay) => {
  // console.log(mainSearchRecipesToDisplay)

  let recipesToDisplayFromTags = [];
  let arrayOfSelectedTags = [];

       // Selects all the tags elements displayed above the dropdowns
      //  to have an updated array of the last tags selected
       const selectedTagsElements = document.querySelectorAll('[data-tag]');
       
      //  console.log(selectedTagsElements)

      // If all the tags above the dropdowns have been deleted
      // reset the displayed recipes
      if (selectedTagsElements.length === 0) {

        // from the value of the main search input if defined
        // by using the recipes of the previous search, memorized in 'mainSearchRecipesToDisplay'
        const searchInputElement = document.querySelector("[data-search]");

        if (searchInputElement.value != '' && searchInputElement.value != undefined) {
          recipeCard(mainSearchRecipesToDisplay);
          // The list of tags in each dropdown is also updated
          dropdowns(mainSearchRecipesToDisplay);
          tagSearch(recipesToDisplay, mainSearchRecipesToDisplay);
          } else {
            // else if no value is entered in the main search
            // reset the interface from all the recipes
            recipeCard(recipes);
            // The list of tags in each dropdown are also updated
            dropdowns(recipes);
            tagSearch(recipes, mainSearchRecipesToDisplay);
          }

      } else {
        // else if there is some selected tags above the dropdowns
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

            const selectedTagLowerCase =
              selectedTag
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")

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


            // =================================
            // ==== Search on the appliances ====

            const isVisibleByAppliance = recipesData[i].appliance.includes(selectedTagLowerCase);
            // console.log(isVisibleByAppliance)
            // console.log(recipesData[i].appliance)

            // if the value is found in the appliance, find the matching recipe in the array of object 'recipes'
            // via the matching id of the recipe

            if (isVisibleByAppliance) {
              const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);
              
              // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);
                continue LoopOnValues;
              }

            // =================================
            // ==== Search on the ustensiles ====

            for (const ustensilsElement of recipesData[i].ustensils) {
              const isVisibleByUstensils = ustensilsElement.includes(selectedTagLowerCase);

              if (isVisibleByUstensils) {
                const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);

                // See if the recipe isn't already in the array recipesToDisplayFromTags to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(recipesToDisplayFromTags, indexOfRecipeToDisplay);
                continue LoopOnValues;
              }
            }
          }
        }
      }

      // Creates the cards of the filtered recipes and displays them
      recipeCard(recipesToDisplayFromTags);

      // The list of tags in each dropdown is also updated
      dropdowns(recipesToDisplayFromTags);
      tagSearch(recipesToDisplayFromTags, mainSearchRecipesToDisplay);
    }

      
}

export { updateAfterSearchTag };