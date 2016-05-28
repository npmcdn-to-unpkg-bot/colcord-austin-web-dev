(function() {
    angular
        .module("Prepster")
        .controller("RecipeNewController", RecipeNewController);

    function RecipeNewController($location, $routeParams, RecipeService, UserService) {
        var vm = this;

        vm.createRecipe = createRecipe;

        vm.uid = $routeParams["uid"];

        function createRecipe() {
            try {
                var id = (new Date).getTime();

                var newRecipe = {
                    _id: id,
                    name: vm.recipe.name,
                    prepTime: vm.recipe.prepTime,
                    type: vm.recipe.type,
                    description: vm.recipe.description,
                    ingredients: vm.recipe.ingredients,
                    directions: vm.recipe.directions,
                    restaurantId: vm.recipe.restaurantId,
                    recent: true
                };
                console.log(id);
                RecipeService.createRecipe(UserService.findUserById(vm.uid).restaurantId, newRecipe);
                $location.url("/user/" + vm.uid + "/recipe/" + id);
            }
            catch(err) {
                vm.error = "Error creating recipe";
            }
        }
    }
    
})();