
// read existing recipes from localStorage
const getSavedRecipes = () => {
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

// remove recipe from the array
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}

// generate DOM structure for recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    // const button = document.createElement('button')
    
    // delete recipe button
    // button.textContent = 'x'
    // recipeEl.appendChild(button)
    // button.addEventListener('click', (e) => {
    //     removeRecipe(recipe.id)
    //     saveRecipes(recipes)
    //     renderRecipes(recipes, filters)
    // })

    // recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }

    containerEl.appendChild(textEl)

    
    // textEl.setAttribute('href', `./edit.html#${recipe.id}`)
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
const renderRecipes = function(recipes, filters) {
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

// export { removeRecipe }