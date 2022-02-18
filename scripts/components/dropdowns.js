import { dropdownItem } from "../templates/dropdownsItem";

const dropdowns = (recipes) => {
  // console.log(recipes);
  const ingredients = [];
  const appliance = [];
  const ustensils = [];

  for (let i = 0; i < recipes.length; i++) {
    for (const ingredientElement of recipes[i].ingredients) {
      if (!ingredients.includes(ingredientElement.ingredient)) {
        ingredients.push(ingredientElement.ingredient);
        dropdownItem(ingredientElement.ingredient, "[data-ingredients-list]");
      }
    }

    if (!appliance.includes(recipes[i].appliance)) {
      appliance.push(recipes[i].appliance);
      dropdownItem(recipes[i].appliance, "[data-appliance-list]");
    }

    for (const ustensilElement of recipes[i].ustensils) {
      if (!ustensils.includes(ustensilElement)) {
        ustensils.push(ustensilElement);
        dropdownItem(ustensilElement, "[data-ustensils-list]");
      }
    }
  }
};

export { dropdowns };
