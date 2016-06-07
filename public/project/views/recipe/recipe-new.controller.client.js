(function() {
    angular
        .module("Prepper")
        .controller("RecipeNewController", RecipeNewController);

    function RecipeNewController($location, $routeParams, RecipeService, UserService) {
        var vm = this;

        vm.createRecipe = createRecipe;

        vm.uid = $routeParams["uid"];

        function createRecipe() {
            try {
                var newRecipe = {
                    name: vm.recipe.name,
                    prepTime: vm.recipe.prepTime,
                    type: vm.recipe.type,
                    description: vm.recipe.description,
                    ingredients: vm.recipe.ingredients,
                    directions: vm.recipe.directions,
                    restaurantId: vm.recipe.restaurantId,
                    recent: true
                };
                RecipeService
                    .createRecipe(UserService.findUserById(vm.uid).restaurantId, newRecipe)
                    .then(
                        function(response) {
                            vm.success = "Successfully created recipe";
                            console.log(response);
                            $location.url("/user/" + vm.uid + "/recipe/" + response.data._id);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
            catch(err) {
                vm.error = "Error creating recipe";
            }
        }
    }
    
})();