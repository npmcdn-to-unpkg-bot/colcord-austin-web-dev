(function() {
    angular
        .module("Prepster")
        .controller("PrepListController", PrepListController);

    function PrepListController($routeParams, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.getRecipeFromTask = getRecipeFromTask;
        vm.removeFromPrepCompletedList = removeFromPrepCompletedList;
        vm.moveToInProgress = moveToInProgress;
        vm.moveToCompleted = moveToCompleted;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = UserService.findUserById(vm.uid);
            // vm.recipeBook = RecipeService.findRecipesByRestaurant(vm.user.restaurantId);
            vm.prepList = PrepService.findPrepListByRestaurantId(vm.user.restaurantId);
        }
        init();

        function getRecipeFromTask(prepTask) {
            return RecipeService.findRecipeById(prepTask.recipeId);
        }

        function removeFromPrepCompletedList(recipeId) {
            PrepService.removeFromPrepCompletedList(vm.prepList._id, recipeId);
        }

        function moveToInProgress(prepListItem) {
            PrepService.addToPrepListInProgress(vm.prepList._id, angular.copy(prepListItem));
            PrepService.removeFromPrepToDoList(vm.prepList._id, prepListItem.recipeId);
        }
        function moveToCompleted(prepListItem) {
            PrepService.addToPrepListCompleted(vm.prepList._id, angular.copy(prepListItem));
            PrepService.removeFromPrepInProgressList(vm.prepList._id, prepListItem.recipeId);
        }
         
    }
    
})();