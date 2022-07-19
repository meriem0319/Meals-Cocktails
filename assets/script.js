var searchFood = document.querySelector('#food');
var searchResult = document.querySelector('.search-result');
var container = document.querySelector('.container');
var searchInput = "";


searchFood.addEventListener('submit', (event) => {
    event.preventDefault();
    searchInput = event.target.querySelector('input').value;
    fetchAPI();
});



async function fetchAPI() {
    var FoodUrl = `https://api.edamam.com/search?q=${searchInput}&app_id=0b843888&app_key=b2a7b162b5b8c4d3e869210cfd3a4065&to=10`;
    var response = await fetch(FoodUrl);
    var FoodData = await response.json();
    console.log(FoodData);
    generateHTML(FoodData.hits);
}

function generateHTML(foodResult) {
    var showHTML = '';
    foodResult.map(result => {
        showHTML +=
        `
        <div class="product">
                    <img src="${result.recipe.image}" alt="food image">
                    <div class="flex-container">
                        <h1 class="title"> ${result.recipe.label}</h1>
                        <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
                        <a class="save-btn" href="#">Save Recipe</a>
                    </div>
                    <p class="product-info">Total Calories: ${result.recipe.calories.toFixed(0)}</p>                  

                </div>
        `
    })
    searchResult.innerHTML = showHTML;
}


