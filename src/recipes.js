import { v4 as uuidv4 } from 'uuid';
import { render } from './views.js';

let recipes = []
let ingredients = ingredients ? [...new Set(ingredients)] : []

const loadRecipes = () => {
   const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    } catch(e) {
        return []
    }
}

const getRecipes = () => recipes

const setRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = (recipeTitle, ingMsgHowMany, recipeDescription) => {
    const recipesId = uuidv4()

    recipes.push({
    id: recipesId,
    title: recipeTitle,
    msgHowMany: ingMsgHowMany,
    description: recipeDescription,
    ingr: []
    })
    setRecipes()
    render()
    return recipesId
}

const addIngredient = (recipesId, ingrName) => {
    const recipe = recipes.find(recipe => recipe.id == recipesId)
    let index = recipe.ingr.findIndex(x => x.name==ingrName)
    if (index === -1) {
        recipe.ingr.push({name: ingrName, exist: false})
        setRecipes()
    }
}

const removeIngredient = (recipesId, ingrName) => {
    const recipe = recipes.find(recipe => recipe.id == recipesId)
    let index = recipe.ingr.findIndex(x => x.name==ingrName)
    recipe.ingr.splice(index, 1)
    setRecipes()
}

const toggleIngrExist = (checked, recipesId, ingrName) => {
    const recipe = recipes.find(recipe => recipe.id == recipesId)
    let index = recipe.ingr.findIndex(x => x.name==ingrName)
    recipe.ingr[index].exist = checked
    setRecipes()
} 

const msgHowManyIngr = (recipesId) => {
    const recipe = recipes.find(recipe => recipe.id == recipesId)
    const ingrExist = recipe.ingr.filter(ingr => ingr.exist === true)
    console.log(ingrExist)
    if(ingrExist.length === recipe.ingr.length) {
        recipe.msgHowMany = 'You have all the ingredients'
    } else if(ingrExist.length === 0) {
        recipe.msgHowMany = 'You have none of the ingredients'
    } else {
        recipe.msgHowMany = 'You have some of the ingredients'
    }
    setRecipes()
}

const removeRecipe = (recipesId) => {
    const recipeToRemove = recipes.findIndex( recipe => recipe.id === recipesId )
    recipes.splice(recipeToRemove, 1)
    setRecipes()
}

loadRecipes()

export { setRecipes, getRecipes, loadRecipes, createRecipe, addIngredient, removeRecipe, removeIngredient, toggleIngrExist, msgHowManyIngr }