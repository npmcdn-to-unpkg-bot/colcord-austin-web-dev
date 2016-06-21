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
        vm.submitted = false;

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
        init();


        function createRecipe() {
            vm.submitted = true;
            if (vm.recipe && vm.recipe.name) {
                var newRecipe = {
                    name: vm.recipe.name,
                    prepTime: vm.recipe.prepTime,
                    type: vm.recipe.type,
                    description: vm.recipe.description,
                    ingredients: vm.ingredients,
                    directions: vm.recipe.directions,
                    recent: true
                };
                RecipeService
                    .createRecipe(vm.user.restaurantId, newRecipe)
                    .then(
                        function(response) {
                            vm.success = "Successfully created recipe";
                            vm.submitted = false;
                            $location.url("/user/" + vm.uid + "/recipe/" + response.data);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
            else {
                vm.error = "Recipe Name is Required";
            }
        }

        function addIngredientRow() {
            vm.ingredients.push({_id: (new Date).getTime()});
        }

        function removeIngredient(ingredientId) {
            for(var i in vm.ingredients) {
                if(vm.ingredients[i]._id == ingredientId) {
                    vm.ingredients.splice(i, 1);
                }
            }
        }
    }
    
})();