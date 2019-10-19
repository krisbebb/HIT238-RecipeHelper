import { getRecipes, createRecipe, removeRecipe, updateRecipe } from './recipes'
import { getFilters, setFilters } from './filters'

// console.log(getRecipes());
// createRecipe()
// removeRecipe('da91720f-0546-4902-a0d1-6c0c314630fb')
// updateRecipe('09349fae-e24b-4a24-af97-7ae9b3ea6540', {
//     title: 'new recipe',
//     instructions: 'boilwater',
//     ingredients: ['milk'],
//     allAvailable: true
// })
// console.log(getRecipes());

console.log(getFilters())
setFilters({
    searchText: 'foodstuff',
    stockFilter: 'outOfStock'
})
console.log(getFilters())

