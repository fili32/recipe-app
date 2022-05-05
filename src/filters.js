import { getRecipes, getRecipesIngredients } from "./recipes"

const filters = {
    title: ''
}

const setFilter = (newTitle) => {
    filters.title = newTitle
}

const recipeFiltering = () => {
    let recipes = getRecipes()
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase() === filters.title.toLowerCase())
    filteredRecipes.length > 0 ? recipes = [ ...filteredRecipes] : recipes
    return recipes
}

export { recipeFiltering, setFilter }