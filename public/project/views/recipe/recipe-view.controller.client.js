(function() {
    angular
        .module("Prepster")
        .controller("RecipeViewController", RecipeViewController);

    function RecipeViewController($routeParams, RecipeService) {
        var vm = this;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        
        function init() {
            vm.recipe = angular.copy(RecipeService.findRecipeById(vm.rid));
        }
        init();
    }
    
})();