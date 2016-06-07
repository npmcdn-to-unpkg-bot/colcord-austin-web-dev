(function() {
    angular
        .module("Prepper")
        .controller("RecipeEditController", RecipeEditController);

    function RecipeEditController($location, $routeParams, RecipeService) {
        var vm = this;

        vm.updateRecipe = updateRecipe;
        vm.deleteRecipe = deleteRecipe;
        vm.addIngredientRow = addIngredientRow;
        vm.removeIngredient = removeIngredient;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        
        function init() {
            RecipeService
                .findRecipeById(vm.rid)
                .then(
                    function(response) {
                        vm.recipe = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        init();

        function updateRecipe() {
            RecipeService
                .updateRecipe(vm.rid, vm.recipe)
                .then(
                    function(response) {
                        $location.url("/user/"+ vm.uid + "/recipe/" + vm.rid);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function deleteRecipe() {
            RecipeService
                .deleteRecipe(vm.rid)
                .then(
                    function(response) {
                        $location.url("/user/"+ vm.uid + "/recipe/recipe-book");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        function addIngredientRow() {
            vm.recipe.ingredients.push({_id: (new Date).getTime()});
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