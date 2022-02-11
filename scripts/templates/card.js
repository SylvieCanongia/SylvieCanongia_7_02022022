import { recipes } from "../data/recipes";

const card = () => {
  const cardTemplate = document.querySelector("[data-card-template]");
  const cardContainer = document.querySelector("[data-cards-container");

  const liTemplate = document.querySelector("[data-li-template]");

  function createCard() {
    for (const element of recipes) {
      // Clone the first child (to avoid #fragment element) of the template card
      const card = cardTemplate.content.cloneNode(true).children[0];

      const cardIngredientsList = card.querySelector("[data-ingredients]");

      const cardImg = card.querySelector("[data-image]");
      const cardName = card.querySelector("[data-name]");
      const cardTime = card.querySelector("[data-time]");
      const cardDescription = card.querySelector("[data-description]");

      // Loop creates a clone of the li template for each ingredient of the ingredients list
      for (const item of element.ingredients) {
        const li = liTemplate.content.cloneNode(true).children[0];

        // select of all the elements contained in the li
        const ingredientName = li.querySelector("[data-ingredient]");
        const ingredientQuantity = li.querySelector("[data-quantity]");
        const ingredientUnit = li.querySelector("[data-unit]");

        ingredientName.textContent = item.ingredient;
        ingredientQuantity.textContent = item.quantity;
        ingredientUnit.textContent = item.unit;
        cardIngredientsList.append(li);
      }

      // Inserts the recipe card in its container in the recipes section
      cardContainer.appendChild(card);
      cardName.textContent = element.name;
      cardTime.textContent = element.time;
      cardDescription.textContent = element.description;
    }
  }
  createCard();
};

export { card };
