import { dropdownItem } from "../templates/dropdownsItem";

const dropdowns = (recipesData) => {
  let ingredients = [];
  let appliance = [];
  let ustensils = [];
  const ingredientsListContainer = document.querySelector('[data-ingredients-list]');
  const applianceListContainer = document.querySelector('[data-appliance-list]');
  const ustensilsListContainer = document.querySelector('[data-ustensils-list]');

  // =================================================
  // Toggles the dropdown menu and toggles the display
  // of the up and down arrows, on click on the arrow

  const arrowBoxes = document.querySelectorAll('[data-arrowBox]');
  const dropdownWrappers = document.querySelectorAll('.dropdown__input_wrapper');
  // console.log(dropdownWrappers)

  for (const arrowBox of arrowBoxes) {
    arrowBox.addEventListener('click', (event) => {
      const input = arrowBox.previousElementSibling;
      const list = input.closest('.dropdown__input_wrapper').querySelector('[data-dropdown-list]');
      const defaultPlaceholder = arrowBox.previousElementSibling.dataset.placeholder;
      const placeholderExpanded = arrowBox.previousElementSibling.dataset.placeholderExpanded;

      if (arrowBox.previousElementSibling.getAttribute('aria-expanded') == "false") {
        // Before opening the selected list, checks if another list is already opened
        // and close it to avoid having 2 lists opened at the same time
        for (const dropdownWrapper of dropdownWrappers) {
          if (dropdownWrapper.querySelector('[data-input]').getAttribute('aria-expanded') == 'true') {
            console.log('true');
            dropdownWrapper.querySelector('[data-dropdown-list]').classList.remove('show');
            dropdownWrapper.querySelector('[data-input]').setAttribute('aria-expanded',"false");
            dropdownWrapper.querySelector('[data-input]').setAttribute('placeholder', defaultPlaceholder);
            dropdownWrapper.querySelector('[data-arrow]').classList.add('arrow-down');
            dropdownWrapper.querySelector('[data-arrow]').classList.remove('arrow-up');
          }
        }

        // Then the selected list is opened
        list.classList.add('show');
        arrowBox.previousElementSibling.setAttribute('aria-expanded',"true");
        arrowBox.previousElementSibling.setAttribute('placeholder', `Rechercher un ${placeholderExpanded}`);
        arrowBox.firstChild.classList.add('arrow-up');
        arrowBox.firstChild.classList.remove('arrow-down');
        input.focus();
      } else {
        list.classList.remove('show');
        arrowBox.previousElementSibling.setAttribute('aria-expanded',"false");
        arrowBox.previousElementSibling.setAttribute('placeholder', defaultPlaceholder);
        arrowBox.firstChild.classList.add('arrow-down');
        arrowBox.firstChild.classList.remove('arrow-up');
      }
    });
  }

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
