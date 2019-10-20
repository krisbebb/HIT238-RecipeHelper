import 'bootstrap'
import './scss/edit.scss'

import { initialiseEditPage } from './views'
import { createIngredient, setAvailability, updateRecipe, removeRecipe } from './recipes'
import { renderIngredients} from './views'

const titleElement = document.querySelector('#recipe-title')
const instructionsElement = document.querySelector('#recipe-instructions')
const removeElement = document.querySelector('#remove-recipe')
const saveElement = document.querySelector('#save-recipe')
const ingredientsSave = document.querySelector('#ingredients-save')
const ingredientsInput = document.querySelector('#ingredients-input')

// get recipe id from url hash
// load in any saved recipes from localStorage
// get recipe by id or return home if not found
const recipeId = location.hash.substring(1)

initialiseEditPage(recipeId)

setAvailability(recipeId)

renderIngredients(recipeId)

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

instructionsElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        instructions: e.target.value
    })
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('./index.html')
})

saveElement.addEventListener('click', (e) => {

    location.assign('./index.html')
})

ingredientsSave.addEventListener('click', (e) => {
    createIngredient(recipeId, ingredientsInput.value)
    renderIngredients(recipeId)
})

// sync changes across multiple windows
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initialiseEditPage(recipeId)
    }
})

