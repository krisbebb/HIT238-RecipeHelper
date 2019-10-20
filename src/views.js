import { getFilters } from './filters'
import { getRecipes, removeIngredient, updateIngredient } from './recipes'

// generate DOM structure for recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
   
    // recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }

    containerEl.appendChild(textEl)
    
    recipeEl.addEventListener('click', ()=>{
        location.assign(`./edit.html#${recipe.id}`)

    })
    recipeEl.classList.add('list-group-item')
    containerEl.classList.add('list-group-container')
    
    recipeEl.appendChild(containerEl)

    const availEl = document.createElement('span')

    if (recipe.allAvailable) {
        availEl.textContent = 'In Stock'

    } else {
        availEl.textContent = 'Out of Stock'
    }

    recipeEl.appendChild(availEl)

    return recipeEl
}

// render using filters
const renderRecipes = () => {
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => {
        
        const searchTextMatch = recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()) 
        if (filters.stockFilter === 'inStock') {
            let stockFilterMatch = recipe.allAvailable
            return searchTextMatch && stockFilterMatch 
        } else if (filters.stockFilter === 'outOfStock') {
            let stockFilterMatch = !recipe.allAvailable
            return searchTextMatch && stockFilterMatch 
        } else {
            return searchTextMatch
        }
    })
   
    document.querySelector('#recipes').innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            document.querySelector('#recipes').appendChild(recipeEl)
    
        })
      } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No recipes to show'
        document.querySelector('#recipes').appendChild(messageEl)
      }
    
}

const initialiseEditPage = (recipeId) => {
    const headingElement =  document.querySelector('#recipe-heading')
    const titleElement = document.querySelector('#recipe-title')
    const instructionsElement = document.querySelector('#recipe-instructions')
    // const removeElement = document.querySelector('#remove-recipe')
    // const saveElement = document.querySelector('#save-recipe')
    // const ingredientsElement = document.querySelector('#ingredients')
    // const ingredientsSave = document.querySelector('#ingredients-save')
    // const ingredientsInput = document.querySelector('#ingredients-input')
    // const ingredientsList = document.querySelector("#ingredients-list")
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })

    if (recipe === undefined) {
        location.assign('./index.html')
    }

    headingElement.textContent = recipe.title
    titleElement.value = recipe.title
    instructionsElement.value = recipe.instructions
}

// Get the DOM elements for an individual ingredient
const generateIngredientDOM = (recipeId, ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })

    // Setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('hidden')
    checkbox.checked = ingredient.inStock
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('click', () => {
        updateIngredient(recipe.id, ingredient.item, {
            inStock: !ingredient.inStock
        })
        renderIngredients(recipe.id)
    })
  
    // Setup the ingredient text
    ingredientText.textContent = ingredient.item
    containerEl.appendChild(ingredientText)
  
    // setup container
    ingredientEl.classList.add('list-group-item')
    containerEl.classList.add('list-group-container')
   
    ingredientEl.appendChild(containerEl)

    if (!ingredient.inStock){
        ingredientEl.classList.add('ingredient-outOfStock')
        const stockEl = document.createElement('span')
        stockEl.textContent = "Out Of Stock"
        ingredientEl.appendChild(stockEl)
     }
  
    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('btn', 'btn-danger', 'btn--remove')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(recipe.id, ingredient.item)
        renderIngredients(recipe.id)
    })
   
    return ingredientEl
  }

// Render ingredients
const renderIngredients = (recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })
    const ingredientEl = document.querySelector('#ingredients-list')
   
    ingredientEl.innerHTML = ''
    //////// use getIngredients here
    if (recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
        ingredientEl.appendChild(generateIngredientDOM(recipeId, ingredient))
        
      })
    } else {
      const messageEl = document.createElement('p')
      messageEl.classList.add('empty-message')
      messageEl.textContent = 'No ingredients to show'
      ingredientEl.appendChild(messageEl)
    }
  }

export { generateRecipeDOM, renderRecipes, initialiseEditPage, 
    renderIngredients }