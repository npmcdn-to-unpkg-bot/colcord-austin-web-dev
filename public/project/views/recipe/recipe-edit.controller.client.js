(function() {
    angular
        .module("Prepster")
        .controller("RecipeEditController", RecipeEditController);

    function RecipeEditController($location, $routeParams, RecipeService) {
        var vm = this;

        vm.updateRecipe = updateRecipe;
        vm.deleteRecipe = deleteRecipe;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        
        function init() {
            vm.recipe = angular.copy(RecipeService.findRecipeById(vm.rid));
        }
        init();

        function updateRecipe() {
            RecipeService.updateRecipe(vm.rid, vm.recipe);
            $location.url("/user/"+ vm.uid + "/recipe/recipe-book");
        }

        function deleteRecipe() {
            WebsiteService.deleteRecipe(vm.rid);
            $location.url("/user/"+ vm.uid + "/recipe/recipe-book");
        }
    }
    
})();