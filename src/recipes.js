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

const getRecipeById = (id) => {
    return recipes.find((recipe) => recipe.id === id)
}

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

    return id
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
    const recipe = getRecipeById(id)
    
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

const getIngredients = (id) => {
    const recipe = getRecipeById(id)
    const ingredients = recipe.ingredients
    return ingredients
}

const createIngredient = (id, item) => {
    const recipe = getRecipeById(id)
    const ingredient = {
        item: item,
        inStock: false
    }
    recipe.ingredients.push(ingredient)
    setAvailability(id)
}

const updateIngredient = (id, recipeItem, updates) => {
    const recipe = getRecipeById(id)

    const ingredient = recipe.ingredients.find((ingredient) => ingredient.item === recipeItem)
    
    if (!recipe | !ingredient) {
        return
    }

    if (typeof updates.item === 'string') {
        ingredient.item = updates.item
    }

    if (typeof updates.inStock === 'boolean') {
        ingredient.inStock = updates.inStock
    }
    setAvailability(recipe.id)
}

// remove ingredient from the array
const removeIngredient = (id, item) => {
    const recipe = getRecipeById(id)
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
        return ingredient.item === item
    })
    console.log(recipe.ingredients)

    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
    }
    setAvailability(id)
}

const setAvailability = (id) => {
    const recipe = getRecipeById(id)

    if (recipe.ingredients.length === 0) {
        updateRecipe(recipe.id, {
            allAvailable: false
        })
        return
    }

    for (let i = 0; i < recipe.ingredients.length; i++) {
         if (!recipe.ingredients[i].inStock) {
             updateRecipe(recipe.id, {
                 allAvailable: false
             })
             saveRecipes()
             return
         } else {
            updateRecipe(recipe.id, {
                allAvailable: true
            })
             recipe.allAvailable = true
             saveRecipes()
         }
    }
    
 }

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, updateRecipe,
    getIngredients, createIngredient, updateIngredient,
    removeIngredient, setAvailability }