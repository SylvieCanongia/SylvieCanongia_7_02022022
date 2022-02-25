import { tagItem } from '../templates/tagItem';
import { dropdownItem } from "../templates/dropdownsItem";
import { dropdowns } from './dropdowns';
import { searchFromTags } from '../utils/searchFromTags';

const tagSearch = (recipesToDisplay, recipeCard) => {
  // Selects all the inputs
  // const searchTagInputElements = document.querySelectorAll("[data-input]");
  const ingredientsInputElement = document.querySelector('[data-ingredients-input');
  const applianceInputElement = document.querySelector('[data-appliance-input');
  const ustensilsInputElement = document.querySelector('[data-ustensils-input');
  let dropdownsTags = document.querySelectorAll('[data-dropdown-item]');

  const tagsContainerAboveDropdowns = document.querySelector('[data-tags-container]');
  let tagsDisplayedAboveMenus = [];
  const tagTemplate = document.querySelector("[data-tag-template]");

  // Selects all the tag wrappers and the tags of the ingredients
  // const ingredientsTagWrappers = document.querySelectorAll('[data-ingredients-list] .dropdown-item-wrapper');
  // const ingredientsTagsElements = document.querySelectorAll('[data-ingredients-list] [data-dropdown-item]');

  // Selects all the tag wrappers and the tags of the appliance
  // const applianceTagWrappers = document.querySelectorAll('[data-appliance-list] .dropdown-item-wrapper');
  // const applianceTagsElements = document.querySelectorAll('[data-appliance-list] [data-dropdown-item]');
  
  // Selects all the tag wrappers and the tags of the ustensils
  // const ustensilsTagWrappers = document.querySelectorAll('[data-ustensils-list] .dropdown-item-wrapper');
  // const ustensilsTagsElements = document.querySelectorAll('[data-ustensils-list] [data-dropdown-item]');
  
  let ingredientsTags = [];
  let applianceTags = [];
  let ustensilsTags = [];
  
  // let newRecipesIngredientsToDisplay = [];
 
  const ingredientsListContainer = document.querySelector('[data-ingredients-list]');
  let ingredientsTagsToDisplay = [];

  const applianceListContainer = document.querySelector('[data-appliance-list]');
  let applianceTagsToDisplay = [];

  const ustensilsListContainer = document.querySelector('[data-ustensils-list]');
  let ustensilsTagsToDisplay = [];

  // ==========
  // FUNCTIONS
  // ==========

  /**
   * @param {Array} recipesToDisplay Recipes to display after sorting of the recipes from the main Search
   * @param {number} indexOfRecipeToDisplay The index of the recipe to display
   */
   const pushIfNoDuplicate = (newRecipesToDisplay, indexOfTagToDisplay) => {
    // See if the recipe isn't already in the array newRecipesToDisplay to avoid duplication
    // if no, push the recipe into the array
    if (!newRecipesToDisplay.includes(recipesToDisplay[indexOfTagToDisplay])) {
      newRecipesToDisplay.push(recipesToDisplay[indexOfTagToDisplay]);
    }
  };

  const displayTagAboveDropdowns = () => {
    dropdownsTags = document.querySelectorAll('[data-dropdown-item]');

    for (const dropdownsTag of dropdownsTags) {
      dropdownsTag.addEventListener('click', (event) => {

        // Selects all the tag elements displayed above the dropdowns
        const tagsAboveDropdowns = document.querySelectorAll('[data-tag]');
        // Creates an array that will permit to compare the tags text to avoid duplication
        const tagsToDisplayAboveDropdowns = [];
        // And pushes all the tags's text of the actual displayed tags into this array
        for (const tag of tagsAboveDropdowns) {
          tagsToDisplayAboveDropdowns.push(tag.firstElementChild.textContent);
        }

        // Clones the first child of the tag template (to avoid #fragment element)
        const tagClone = tagTemplate.content.cloneNode(true).children[0];

        // inserts the tag text into the cloned tag element
        tagClone.firstElementChild.textContent = event.currentTarget.textContent;

        // Selects the wrapper of the dropdown's tags's list
        const tagCloneListWrapper = event.currentTarget.closest('[data-list]');

        // Set the background color of the tag
        if(tagCloneListWrapper.hasAttribute('data-ingredients-list')) {
          tagClone.style.backgroundColor = 'hsl(215, 88%, 57%)';
        }
        
        if (tagCloneListWrapper.hasAttribute('data-appliance-list')){
          tagClone.style.backgroundColor = 'hsl(152, 60%, 63%)';
        }

        if (tagCloneListWrapper.hasAttribute('data-ustensils-list')){
          tagClone.style.backgroundColor = 'hsl(6, 81%, 63%)';
        }

        // Displays the selected tag above the dropdowns avoiding duplication
        // by comparing the text of the tags of the array 'tagsToDisplay' and the text of the clicked tag
        if(!tagsToDisplayAboveDropdowns.includes(event.currentTarget.textContent)) {
          // Then append the tag into its container
          tagsContainerAboveDropdowns.append(tagClone);
        }  
      })
    }
  }

  // =============
  // END FUNCTIONS
  // =============

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

  // Listen the inputs and get the value entered by the user
  // Sets uppercase characters to lowercase and remove accents / diacritics 
  ingredientsInputElement.addEventListener("input", (event) => {
    const value = event.currentTarget.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    let arrayOfValues = value.split(" ");

    // empty the array to reset the displayed recipes
    newRecipesToDisplay = [];
    ingredientsTags = [];

    ingredientsTagsToDisplay = [];

    console.log(arrayOfValues)
    if(value.length = 0 || value === "") {
      recipeCard(recipesToDisplay);
      dropdowns(recipesToDisplay);
      
    } else {

        // Reset the lists of the ingredients dropdown to push new sorted items
        ingredientsListContainer.innerHTML = '';

        for (let i = 0; i < newRecipesData.length; i++) {
          LoopOnValues: for (const valueElement of arrayOfValues) {
            if (valueElement !== "") {

              for (const ingredientElement of newRecipesData[i].ingredients) {
                // console.log(ingredientElement)
                const isVisibleIngredientTag = ingredientElement.ingredient.includes(valueElement);
                // console.log(isVisibleIngredientTag);

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
                    // And display them in the ingredients list with the dropdownItem() function.
                    for (let i = 0; i < newRecipesToDisplay.length; i++) {
                      for (const ingredientElement of newRecipesToDisplay[i].ingredients) {
                        if (!ingredientsTags.includes(ingredientElement.ingredient)) {
                          ingredientsTags.push(ingredientElement.ingredient);

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
    displayTagAboveDropdowns();
  });

    // Listen the inputs and get the value entered by the user
    // Sets uppercase characters to lowercase and remove accents / diacritics 
  applianceInputElement.addEventListener("input", (event) => {
    const value = event.target.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    let arrayOfValues = value.split(" ");

    // empty the array to reset the displayed recipes
    newRecipesToDisplay = [];
    // ingredientsTags = [];
    applianceTags = [];

    applianceTagsToDisplay = [];

    if(value.length = 0 || value === "") {
      recipeCard(recipesToDisplay);
      dropdowns(recipesToDisplay);
    } else {
      // Reset the lists of the appliance dropdown to push new sorted items
      applianceListContainer.innerHTML = '';

      for (let i = 0; i < newRecipesData.length; i++) {
        LoopOnValues: for (const valueElement of arrayOfValues) {
          if (valueElement !== "") {
        
            const isVisibleApplianceTag = newRecipesData[i].appliance.includes(valueElement);

            // If the value is found in the appliance tags
            if (isVisibleApplianceTag) {
              if(!applianceTagsToDisplay.includes(newRecipesData[i].appliance)) {
                applianceTagsToDisplay.push(newRecipesData[i].appliance);

                // find the matching tag element, in the array of object 'recipesToDisplay' via the matching id of the recipe
                const indexOfAppliancetTagToDisplay = recipesToDisplay.findIndex((el) => el.id == newRecipesData[i].id);

                // See if the recipe isn't already in the array 'newRecipesToDisplay' to avoid duplication
                // if no, push the recipe into the array
                pushIfNoDuplicate(newRecipesToDisplay, indexOfAppliancetTagToDisplay);

                // for each appliance element, checks if it's not already in the array appliance tags
                // to avoid displaying several times the same tag
                // Then keeps only the appliance tags that include the value entered in the input
                // And displays them in the appliance list with the dropdownItem() function.
                for (let i = 0; i < newRecipesToDisplay.length; i++) {

                  if (!applianceTags.includes(newRecipesToDisplay[i].appliance)) {
                    applianceTags.push(newRecipesToDisplay[i].appliance);

                    if (newRecipesToDisplay[i].appliance
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(valueElement)) {
                        dropdownItem(newRecipesToDisplay[i].appliance, "[data-appliance-list]");
                    }
                  }
                }
              }
            }
          }
        } 
      }  
    }
    displayTagAboveDropdowns();
  });

  // Listen the inputs and get the value entered by the user
  // Sets uppercase characters to lowercase and remove accents / diacritics 
  ustensilsInputElement.addEventListener("input", (event) => {
    const value = event.target.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    let arrayOfValues = value.split(" ");

    // empty the array to reset the displayed recipes
    newRecipesToDisplay = [];
    
    ustensilsTags = [];

    ustensilsTagsToDisplay = [];
      
    if(value.length = 0 || value === "") {
      recipeCard(recipesToDisplay);
      dropdowns(recipesToDisplay);
    } else {
      // Reset the lists of the ustensils dropdown to push new sorted items
      ustensilsListContainer.innerHTML = '';
      
        for (let i = 0; i < newRecipesData.length; i++) {
          LoopOnValues: for (const valueElement of arrayOfValues) {
            if (valueElement !== "") {

              for (const ustensilsElement of newRecipesData[i].ustensils) {
                const isVisibleUstensilsTag = ustensilsElement.includes(valueElement);

                // If the value is found in the ustensils tags
                if (isVisibleUstensilsTag) {
                  if(!ustensilsTagsToDisplay.includes(ustensilsElement)) {
                    ustensilsTagsToDisplay.push(ustensilsElement);

                    // find the matching tag element, in the array of object 'recipesToDisplay'
                    // via the matching id of the recipe
                    const indexOfUstensilTagToDisplay = recipesToDisplay.findIndex((el) => el.id == newRecipesData[i].id);

                    // See if the recipe isn't already in the array 'newRecipesToDisplay' to avoid duplication
                    // if no, push the recipe into the array
                    pushIfNoDuplicate(newRecipesToDisplay, indexOfUstensilTagToDisplay);

                    // for each ustensils element, checks if it's not already in the array ustensilsTags
                    // to avoid displaying several times the same tag
                    // Then keeps only the ustensils tags that include the value entered in the input
                    // And display them in the ustensils's dropodown list with the dropdownItem() function.
                    for (let i = 0; i < newRecipesToDisplay.length; i++) {
                      for (const ustensilsElement of newRecipesToDisplay[i].ustensils) {
                        if (!ustensilsTags.includes(ustensilsElement)) {
                          ustensilsTags.push(ustensilsElement);

                          if (ustensilsElement
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .includes(valueElement)) {
                            dropdownItem(ustensilsElement, "[data-ustensils-list]");
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
    displayTagAboveDropdowns();
  });

  displayTagAboveDropdowns();

  



  


  // ==================================================================
  // UPDATES THE DISPLAYED RECIPES in function of the selected tags
    //   // Updates the displayed recipes in function of the selected tags
    //   searchFromTags();

      // ==== Search on the ingredients ====

      //   for (const ingredientElement of recipesData[i].ingredients) {
      //   // Concat all the terms ingredient, quantity and unit
      //   let ingredientTerms = ingredientElement.ingredient
      //     .concat(" ", ingredientElement.quantity)
      //     .concat(" ", ingredientElement.unit);
      //   const isVisibleByIngredient = ingredientTerms.includes(valueElement);

      //   if (isVisibleByIngredient) {
      //     const indexOfRecipeToDisplay = recipes.findIndex((el) => el.id == recipesData[i].id);

      //     // See if the recipe isn't already in the array recipesToDisplay to avoid duplication
      //     // if no, push the recipe into the array
      //     pushIfNoDuplicate(recipesToDisplay, indexOfRecipeToDisplay);
      //   }
      // }
}

export { tagSearch };