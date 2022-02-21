import { dropdownItem } from "../templates/dropdownsItem";

const dropdowns = (recipesData) => {
  let ingredients = [];
  let appliance = [];
  let ustensils = [];
  const ingredientsListContainer = document.querySelector('[data-ingredients-list]');
  const applianceListContainer = document.querySelector('[data-appliance-list]');
  const ustensilsListContainer = document.querySelector('[data-ustensils-list]');

  // ======================================================================
  // Change the text of the placeholders when dropdowns are expanded or not

  const dropdownsInputs = document.querySelectorAll('[aria-expanded]');
  
  for (const input of dropdownsInputs) {
    // Change the placeholder when a dropdown expands on click
    input.addEventListener('click', (event) => {
      console.log(event.currentTarget.nextElementSibling.firstChild)
      const defaultPlaceholder = event.currentTarget.dataset.placeholder;
      const placeholderExpanded = event.currentTarget.dataset.placeholderExpanded;
      console.log(event.currentTarget.nextSibling);
      if(event.currentTarget.ariaExpanded == 'true') {
        event.currentTarget.setAttribute('placeholder', `Rechercher un ${placeholderExpanded}`) &
        event.currentTarget.nextElementSibling.firstChild.classList.add('arrow-up') &
        event.currentTarget.nextElementSibling.firstChild.classList.remove('arrow-down')
      } else {
        event.currentTarget.setAttribute('placeholder', defaultPlaceholder) &
        event.currentTarget.nextElementSibling.firstChild.classList.add('arrow-down') &
        event.currentTarget.nextElementSibling.firstChild.classList.remove('arrow-up')
      }
    });

    // Set the default placeholder when the dropdown loses the focus.
    input.addEventListener('blur', (event) => {
      const defaultPlaceholder = event.currentTarget.dataset.placeholder;
      event.currentTarget.setAttribute('placeholder', defaultPlaceholder);
    });
  }

  // ==============================================================
  // Put  a down arrow or an up arrow to open or close the dropdown

  // const arrows = document.querySelectorAll('[data-arrow]');
  // console.log(arrows)

  // for (const arrow of arrows) {
  //   arrow.addEventListener('click', (event) => {
  //     console.log(event.currentTarget.parentNode.nextElementSibling.classList)
  //     if (event.currentTarget.classList.contains('arrow-down')) {
  //       event.currentTarget.classList.add('arrow-up') &
  //       event.currentTarget.classList.remove('arrow-down')
  //     } else {
  //       event.currentTarget.classList.add('arrow-down') &
  //       event.currentTarget.classList.remove('arrow-up')
  //   }
  //   });
  // }

  // =========================================================
  // Reset the lists of the dropdowns to push new sorted items
  ingredientsListContainer.innerHTML = '';
  applianceListContainer.innerHTML = '';
  ustensilsListContainer.innerHTML = '';

  for (let i = 0; i < recipesData.length; i++) {
    for (const ingredientElement of recipesData[i].ingredients) {
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
