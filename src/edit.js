import '../scss/app.scss';
import { getRecipes, removeIngredient, setRecipes, addIngredient, removeRecipe, toggleIngrExist, msgHowManyIngr } from './recipes';
import { getIdOfURL, renderRecipe } from './views';

const titleFormEl = document.getElementById('recipe-title-input')
const descriptionFormEl = document.getElementById('steps-textarea')
const ingredientsEl = document.getElementById('ingredients')
const inputIngredientEl = document.querySelector('.input-ingr')
const createIngrButtonEl = document.getElementById('create-button-addon')
const removeRecipeButton = document.getElementById('remove-button-recipe')
let recipe = getRecipes().find(recipe => recipe.id ===  getIdOfURL())

renderRecipe()

titleFormEl.addEventListener('change', (e) => {
    let newTitle = e.target.value
    recipe.title = newTitle
    setRecipes()
})

descriptionFormEl.addEventListener('change', (e) => {
    let newDesription = e.target.value
    recipe.description = newDesription
    setRecipes()
})

createIngrButtonEl.addEventListener('click', () => {
    if(inputIngredientEl.value==='') {
        createIngrButtonEl.disabled=true
    } else {
        createIngrButtonEl.disabled=false
        addIngredient(recipe.id, inputIngredientEl.value)
        renderRecipe()
        inputIngredientEl.value = ''
    }
})

window.onclick = e => {
    if(e.target.innerText === 'remove') {
        const id = e.target.id
        removeIngredient(recipe.id, id)
        renderRecipe()
    } 
    if(e.target.className.search('check') != -1) {
        toggleIngrExist( e.target.checked, recipe.id, e.target.id)
        msgHowManyIngr(recipe.id)
    }
} 

removeRecipeButton.addEventListener('click', () => {
    removeRecipe(recipe.id)
    window.location.href = "http://localhost:8080/index.html"
})


