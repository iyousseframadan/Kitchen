const categorySelect = document.getElementById("categorySelect");
const cardsArea = document.getElementById("cardsArea");

const modal = document.getElementById("infoModal");
const closeModalBtn = document.getElementById("modalCloseBtn");
const mealName = document.getElementById("mealName");
const mealImg = document.getElementById("mealImg");
const ingList = document.getElementById("ingList");
const mealSteps = document.getElementById("mealSteps");
const ytLink = document.getElementById("ytLink");

categorySelect.addEventListener("change", function () {
  const category = this.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((data) => {
      showCards(data.meals);
    });
});

function showCards(meals) {
  cardsArea.innerHTML = "";
  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h4>${meal.strMeal}</h4>
    `;

    card.addEventListener("click", () => {
      getMealDetails(meal.idMeal);
    });

    cardsArea.appendChild(card);
  });
}

function getMealDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      mealName.textContent = meal.strMeal;
      mealImg.src = meal.strMealThumb;
      mealSteps.textContent = meal.strInstructions;
      ytLink.href = meal.strYoutube || "#";
      ytLink.style.display = meal.strYoutube ? "inline-block" : "none";

      ingList.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          const li = document.createElement("li");
          li.textContent = `${ing} - ${measure}`;
          ingList.appendChild(li);
        }
      }

      modal.style.display = "flex";
    });
}

closeModalBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
