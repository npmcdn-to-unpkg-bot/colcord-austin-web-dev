(function() {
    angular
        .module("Prepper")
        .controller("RecipeNewController", RecipeNewController);

    function RecipeNewController($location, $routeParams, RecipeService, UserService) {
        var vm = this;

        vm.createRecipe = createRecipe;
        vm.addIngredientRow = addIngredientRow;
        vm.removeIngredient = removeIngredient;

        vm.uid = $routeParams["uid"];
        vm.ingredients = [];

        function createRecipe() {
            try {
                var newRecipe = {
                    name: vm.recipe.name,
                    prepTime: vm.recipe.prepTime,
                    type: vm.recipe.type,
                    description: vm.recipe.description,
                    ingredients: vm.ingredients,
                    directions: vm.recipe.directions,
                    recent: true
                };
                UserService
                    .findUserById(vm.uid)
                    .then(
                        function(response) {
                            RecipeService
                                .createRecipe(response.data.restaurantId, newRecipe)
                                .then(
                                    function(response) {
                                        vm.success = "Successfully created recipe";
                                        $location.url("/user/" + vm.uid + "/recipe/" + response.data._id);
                                    },
                                    function(error) {
                                        vm.error = error.data;
                                    }
                                );
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )

            }
            catch(err) {
                vm.error = "Error creating recipe";
            }
        }

        function addIngredientRow() {
            vm.ingredients.push({_id: (new Date).getTime()});
        }

        function removeIngredient(ingredientId) {
            for(var i in vm.recipe.ingredients) {
                if(vm.recipe.ingredients[i]._id == ingredientId) {
                    vm.recipe.ingredients.splice(i, 1);
                }
            }
        }
    }
    
})();