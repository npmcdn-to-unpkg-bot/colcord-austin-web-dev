(function() {
    angular
        .module("Prepper")
        .controller("RecipeBookController", RecipeBookController);

    function RecipeBookController($routeParams, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.addToPrepToDo = addToPrepToDo;
        
        vm.uid = $routeParams["uid"];
        console.log("uid" + vm.uid);
        
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                        console.log(vm.user);
                        console.log("here res id " + vm.user.restaurantId);

                        RecipeService
                            .findRecipesByRestaurant(vm.user.restaurantId)
                            .then(
                                function(response) {
                                    vm.recipeBook = response.data;
                                    PrepService
                                        .findPrepListByRestaurantId(vm.user.restaurantId)
                                        .then(
                                            function(response) {
                                                vm.prepList = response.data;
                                            },
                                            function(error) {
                                                vm.error = error.data;
                                            }
                                        )
                                },
                                function(error) {
                                    vm.error = error.data;
                                }
                            );
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )


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