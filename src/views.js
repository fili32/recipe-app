import { recipeFiltering } from './filters'
import { getRecipes } from './recipes'

const render = () => {
    let recipes = recipeFiltering()
    console.log(recipes)
    const recipesEl = document.getElementById('all-recipes')
    recipesEl.innerHTML=""
  
    if(recipes.length > 0) {
        const recipeEl = document.getElementById('recipe-card')
        recipes.forEach(recipe => {
            const hrefEl = `http://localhost:8080/edit.html?${recipe.id}`
            let titleTextEl = document.createTextNode(recipe.title)
            let ingredientsMsgTextEl = document.createTextNode(recipe.msgHowMany)
            let cardEl = document.createElement('a')
            cardEl.classList.add("card", "border-secondary", "mb-3", "mt-3", "recipe-card")
            cardEl.setAttribute('href', hrefEl)
            let bodyEl = document.createElement('div')
            bodyEl.classList.add("card-body")
            let titleEl = document.createElement('h5')
            titleEl.classList.add("card-title", "recipe-title")
            let ingredientsMsgEl = document.createElement('p')
            ingredientsMsgEl.classList.add("card-text", "recipe-body")
            recipesEl.appendChild(cardEl)
            cardEl.appendChild(bodyEl)
            bodyEl.appendChild(titleEl)
            bodyEl.appendChild(ingredientsMsgTextEl)
            titleEl.appendChild(titleTextEl)
            bodyEl.appendChild(ingredientsMsgEl)
            ingredientsMsgEl.appendChild(ingredientsMsgTextEl)
        })

    } else {
        const noRecipesEl = document.createTextNode("There is no recipes")
        const paragraph = document.createElement("p")
        paragraph.classList.add("display-6")
        paragraph.appendChild(noRecipesEl)
        recipesEl.appendChild(paragraph) 
    }
}

const getIdOfURL = () => {
    const url = window.location.href
    const indexQuestionmark = url.indexOf('?')
    const hash = indexQuestionmark != -1 ? url.substring(indexQuestionmark+1) : ''
    return hash
}

const renderRecipe = () => {
    let recipe = getRecipes().find(recipe => recipe.id ===  getIdOfURL())
    const titleFormEl = document.getElementById('recipe-title-input')
    const descriptionFormEl = document.getElementById('steps-textarea')
    const ingredientsEl = document.getElementById('ingredients')
    titleFormEl.value = recipe.title
    descriptionFormEl.value = recipe.description
    ingredientsEl.innerHTML = ''
    if(recipe.ingr.length > 0) {
        recipe.ingr.forEach(ingredient => {
            const ingrName = ingredient.name.toLowerCase().replace(' ', '-', -1)
            console.log('name', ingrName)
            const addIngrEl = document.createElement('div')
            addIngrEl.classList.add('input-group', 'mb-3', 'ingredient')
            ingredientsEl.appendChild(addIngrEl)
            const checkboxEl = document.createElement('div')
            checkboxEl.classList.add('input-group-text')
            checkboxEl.setAttribute('aria-describedby', 'remove-button-addon')
            addIngrEl.appendChild(checkboxEl)
            const checkboxInputEl = document.createElement('input')
            checkboxInputEl.setAttribute('type', 'checkbox')
            checkboxInputEl.classList.add('form-check-input', 'mt-0', ingrName)
            checkboxInputEl.setAttribute('id', ingrName)
            checkboxEl.appendChild(checkboxInputEl)
            checkboxInputEl.checked = ingredient.exist
            const ingrTextEl = document.createElement('input')
            ingrTextEl.classList.add('form-control', 'ingredients-text')
            ingrTextEl.setAttribute('type', 'text')
            ingrTextEl.setAttribute('value', ingredient.name)
            addIngrEl.appendChild(ingrTextEl)
            const removeIngrButton = document.createElement('button')
            removeIngrButton.setAttribute('type', 'button')
            removeIngrButton.classList.add('btn', 'btn-outline-secondary', 'remove-ingr-button')
            removeIngrButton.setAttribute('id', ingrName)
            removeIngrButton.innerHTML = 'remove'
            addIngrEl.appendChild(removeIngrButton)
        })
    }
}

export { render, renderRecipe, getIdOfURL }