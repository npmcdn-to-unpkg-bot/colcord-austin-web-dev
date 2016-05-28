(function() {
    angular
        .module("Prepper")
        .controller("RecipeBookController", RecipeBookController);

    function RecipeBookController($routeParams, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.addToPrepToDo = addToPrepToDo;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = UserService.findUserById(vm.uid);
            vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.user.restaurantId);

        }
        init();

        function addToPrepToDo(recipeId) {
            var newPrepItem = {
                recipeId: recipeId,
                important: false,
                signer: "",
                timeStamp: (new Date).toDateString()};
            PrepService.addToPrepListToDo(vm.prepList._id, newPrepItem);
        }
    }
    
})();