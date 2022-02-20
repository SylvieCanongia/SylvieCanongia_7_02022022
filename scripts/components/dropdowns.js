import { dropdownItem } from "../templates/dropdownsItem";

const dropdowns = (recipesData) => {
  console.log(recipesData);
  let ingredients = [];
  let appliance = [];
  let ustensils = [];
  const ingredientsListContainer = document.querySelector('[data-ingredients-list]');
  const applianceListContainer = document.querySelector('[data-appliance-list]');
  const ustensilsListContainer = document.querySelector('[data-ustensils-list]');

  // Reset the lists of the dropdowns to push new sorted items
  ingredientsListContainer.innerHTML = '';
  applianceListContainer.innerHTML = '';
  ustensilsListContainer.innerHTML = '';

  for (let i = 0; i < recipesData.length; i++) {
    for (const ingredientElement of recipesData[i].ingredients) {
      console.log(!ingredients.includes(ingredientElement.ingredient));
      if (!ingredients.includes(ingredientElement.ingredient)) {
        ingredients.push(ingredientElement.ingredient);
        dropdownItem(ingredientElement.ingredient, "[data-ingredients-list]");
      }
    }

    if (!appliance.includes(recipesData[i].appliance)) {
      appliance.push(recipesData[i].appliance);
      dropdownItem(recipesData[i].appliance, "[data-appliance-list]");
    }

    for (const ustensilElement of recipesData[i].ustensils) {
      if (!ustensils.includes(ustensilElement)) {
        ustensils.push(ustensilElement);
        dropdownItem(ustensilElement, "[data-ustensils-list]");
      }
    }
  }
};

export { dropdowns};
