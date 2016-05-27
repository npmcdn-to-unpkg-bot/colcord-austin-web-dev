(function() {
    angular
        .module("Prepster")
        .controller("RecipeBookController", RecipeBookController);

    function RecipeBookController($routeParams, RecipeService, UserService) {
        var vm = this;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = UserService.findUserById(vm.uid);
            vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
        }
        init();
    }
    
})();