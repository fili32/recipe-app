import '../scss/app.scss';
import { createRecipe, loadRecipes } from './recipes';
import { recipeFiltering, setFilter } from './filters'
import { render } from './views'

const filterEl = document.querySelector('.filter-input')
const addRecipeButton = document.getElementById('add-recipe-button')

loadRecipes()
render()

filterEl.addEventListener('change', (e) => {
    const newTitle = e.target.value
    setFilter(newTitle)
    recipeFiltering()
    render()
})

addRecipeButton.addEventListener('click', () => {
    const id = createRecipe('', '', '')
    window.location.href = `http://localhost:8080/edit.html?${id}`
})












