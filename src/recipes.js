import uuidv4 from 'uuidv4'

let recipes = []

// read existing recipes from localStorage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    if (recipesJSON !== null) {
        return JSON.parse(recipesJSON)
    } else {
        return []
    }
}

// save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: [],
        allAvailable: false
    })
    saveRecipes()
}

// remove recipe from the array
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    
    if (!recipe) {
        return
    }
    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.instructions === 'string') {
        recipe.instructions = updates.instructions
    }

    if (typeof updates.ingredients === 'object') {
        recipe.ingredients = updates.ingredients
    }

    if (typeof updates.allAvailable === 'boolean') {
        recipe.allAvailable = updates.allAvailable
    }

    saveRecipes()

    


}

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, updateRecipe }