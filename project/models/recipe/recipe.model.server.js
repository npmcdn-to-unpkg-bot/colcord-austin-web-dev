module.exports = function() {

    var mongoose = require("mongoose");

    var RecipeSchema = require("./recipe.schema.server")();
    var Recipe = mongoose.model("Recipe", RecipeSchema);

    var api = {
        createRecipe: createRecipe,
        findRecipeById: findRecipeById,
        findAllRecipesByRestaurantId: findAllRecipesByRestaurantId,
        updateRecipe: updateRecipe,
        deleteRecipe: deleteRecipe
    };
    return api;

    function createRecipe(recipe) {
        return Recipe.create(recipe);
    }
    
    function findRecipeById(recipeId) {
        return Recipe.findById(recipeId);
    }
    
    function findAllRecipesByRestaurantId(restaurantId) {
        return Recipe.find({restaurantId: restaurantId});
    }
    
    function updateRecipe(recipeId, newRecipe) {
        return Recipe.update(
            {_id: recipeId},
            {$set :
                {
                    name: newRecipe.name,
                    prepTime: newRecipe.prepTime,
                    type: newRecipe.type,
                    description: newRecipe.description,
                    ingredients: newRecipe.ingredients,
                    directions: newRecipe.directions,
                    dateModified: Date.now()
                }
            }
        )
    }
    
    function deleteRecipe(recipeId) {
        return Recipe.remove({_id: recipeId});
    }
};