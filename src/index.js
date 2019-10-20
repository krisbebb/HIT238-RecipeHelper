import 'bootstrap'
import { getRecipes, createRecipe, removeRecipe, updateRecipe } from './recipes'
import { getFilters, setFilters } from './filters'
import { renderRecipes } from './views'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'



renderRecipes()


// add event listener to button
document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`./edit.html#${id}`)
})

// get search input and set filter
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

document.querySelector('#recipe-filter').addEventListener('change', (e) => {
    setFilters({
        stockFilter: e.target.value
    })
  renderRecipes()
})

// sync changes from edit page
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})


// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', function() {
// 	  navigator.serviceWorker.register('../sw.js').then(function(registration) {
// 		// Registration was successful
// 		console.log('ServiceWorker registration successful with scope: ', registration.scope);
// 	  }, function(err) {
// 		// registration failed :(
// 		console.log('ServiceWorker registration failed: ', err);
// 	  });
// 	});
//   }


if (
  'serviceWorker' in navigator) {
  const registration = runtime.register();


  // window.addEventListener('load', function() {
  //   // const registration = runtime.register();
  //   	  navigator.serviceWorker.register('/sw.js').then(function(registration) {
  //   		// Registration was successful
  //   		console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //   	  }, function(err) {
  //   		// registration failed :(
  //   		console.log('ServiceWorker registration failed: ', err);
  //   	  });
// })
// registerEvents(registration, {
//   onInstalled: () => {
//     this.pushLog('onInstalled')
//   },
//   onUpdateReady: () => {
//     this.pushLog('onUpdateReady')
//   },

//   onUpdating: () => {
//     this.pushLog('onUpdating')
//   },
//   onUpdateFailed: () => {
//     this.pushLog('onUpdateFailed')
//   },
//   onUpdated: () => {
//     this.pushLog('onUpdated')
//   },
// })
// } else {
// this.pushLog('serviceWorker not available')
}
