(function() {
    angular
        .module("Prepster")
        .factory("RecipeService", RecipeService);

    function RecipeService() {
        var recipes = [
            {_id: "123",
                name: "Chicken Puff Pastry",
                prepTime: 10,
                type: "sandwich",
                description: "A warm chicken puff with cheddar cheese with avocado on ciabatta bread",
                ingredients: [
                    ["Rotisserie Chicken", 1.5, "Cups"],
                    ["Cheddar Cheese", 1.5, "Cups"],
                    ["Avocado", 1, "Cup"],
                    ["Frozen Puff Pastry", 2, "Sheets (17.25oz package), Thawed"],
                    ["Large Egg", 1, "Cup, Beaten"],
                    ["Dijon Mustard", 0.25, "Cup"]
                ],
                directions: "Cook chicken breast fully. PUFF - Steam cooked chicken breast for 2 minutes. Cut chicken breast in half. Place Cheddar Cheese, chicken breast, and avocado in Ciabatta. Panini press for 2 minutes",
                restaurantId: 12345,
                recent: true
            },
            {_id: "543",
                name: "Beef Broccoli Soup",
                prepTime: 20,
                type: "soup",
                description: "A warm beef soup with cheese",
                ingredients: [
                    ["Beef (ground)", 1.5, "Pounds"],
                    ["Broccoli", 1.5, "Cups"],
                    ["Water", 3, "Cups"],
                    ["Salt", 2, "tbsp"],
                    ["Beef Broth", 2, "Tbsp"]
                ],
                directions: "Cook beef for a while, add into soup form, cook broccoli and beef in frying pan, mix with soup stuff.",
                restaurantId: 12345,
                recent: true
            },
            {_id: "998",
                name: "Beef Chili",
                prepTime: 30,
                type: "soup",
                description: "Our award winning chili",
                ingredients: [
                    ["Beef (ground)", 4, "Pounds"],
                    ["Beans", 4, "Cups"],
                    ["Water", 3, "Cups"],
                    ["Onion", 2, "Cups, Diced"],
                    ["Pepper", 1, "Cups, Diced"]
                ],
                directions: "Cook it all together",
                restaurantId: 12345,
                recent: false
            },
            {_id: "909",
                name: "Chicken Breast",
                prepTime: 25,
                type: "meat",
                description: "Baked chicken breast",
                ingredients: [
                    ["Chicken Breast", 1, "Breast"],
                    ["Salt", 1, "tsp"]
                ],
                directions: "Cook chicken breast fully at 350 degrees Farenheit, let sit for 15 minutes. Salt lightly.",
                restaurantId: 12345,
                recent: true
            }
        ];


        var api = {
            createRecipe: createRecipe,
            findRecipesByRestaurant: findRecipesByRestaurant,
            findRecipeById: findRecipeById,
            updateRecipe: updateRecipe,
            deleteRecipe: deleteRecipe
        };
        return api;

        function createRecipe(restaurantId, recipe) {
            recipe.restaurantId = restaurantId;
            recipes.push(recipe);
        }

        function findRecipesByRestaurant(restaurantId) {
            var result = [];
            for(var i in recipes) {
                if(recipes[i].restaurantId === restaurantId) {
                    result.push(recipes[i]);
                }
            }
            return result;
        }

        function findRecipeById(recipeId) {
            for(var i in recipes) {
                if(recipes[i]._id == recipeId) {
                    return recipes[i];
                }
            }
            return null;
        }

        function updateRecipe(recipeId, recipe) {
            for(var i in recipes) {
                if(recipes[i]._id == recipeId) {
                    recipes[i].name = recipe.name;
                    recipes[i].prepTime = recipe.prepTime;
                    recipes[i].type = recipe.type;
                    recipes[i].description = recipe.description;
                    recipes[i].ingredients = recipe.ingredients;
                    recipes[i].directions = recipe.directions;
                }
            }
        }

        function deleteRecipe(recipeId) {
            for(var i in recipes) {
                if (recipes[i]._id == recipeId) {
                    recipes.splice(i, 1);
                }
            }
        }
    }

})();