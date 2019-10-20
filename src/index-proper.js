

import { 
  generateRecipeDOM, 
  getSavedRecipes, 
  removeRecipe, 
  renderRecipes, 
  saveRecipes
} from './recipe-functions'

import uuidv4 from 'uuidv4'


let recipes = getSavedRecipes()
console.log(recipes)
// filters
const filters = {
    searchText: '',
    stockFilter: 'all'
}

// renderRecipes(recipes, filters)

// add event listener to button
document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: [],
        allAvailable: false
    })
    saveRecipes()
    location.assign(`./edit.html#${id}`)
})

// get search input and set filter
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

document.querySelector('#recipe-filter').addEventListener('change', (e) => {
  console.log(e.target.value)
  filters.stockFilter = e.target.value
  renderRecipes(recipes, filters)
})

// sync changes from edit page
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        renderRecipes(recipes, filters)
    }
})


if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  navigator.serviceWorker.register('/sw.js').then(function(registration) {
		// Registration was successful
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  }, function(err) {
		// registration failed :(
		console.log('ServiceWorker registration failed: ', err);
	  });
	});
  }