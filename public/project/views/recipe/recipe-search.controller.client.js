(function() {
    angular
        .module("Prepper")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($location, $routeParams, Food2ForkService, RecipeService) {
        var vm = this;
        vm.searching = "";
        vm.selectedRecipe = null;
        
        vm.searchRecipes = searchRecipes;
        vm.selectRecipe = selectRecipe;

        vm.uid = $routeParams["uid"];

        function searchRecipes(searchTerm) {
            vm.searching = "searching...";
            Food2ForkService
                .searchRecipes(searchTerm)
                .then(
                    function(response) {
                        var data = response.data;
                        vm.recipes = data.recipes;
                        if (vm.recipes == null) {
                            vm.searching = "search service is temporarily down"
                        }
                        else if (vm.recipes.length) {
                            vm.searching = "";
                        }
                        else {
                            vm.searching = "no recipes found";
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function selectRecipe(recipeId) {
            Food2ForkService
                .selectRecipe(recipeId)
                .then(
                    function(response) {
                        vm.selectedRecipe = response.data.recipe;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();