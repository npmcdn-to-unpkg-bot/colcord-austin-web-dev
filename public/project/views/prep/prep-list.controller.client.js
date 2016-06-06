(function() {
    angular
        .module("Prepper")
        .controller("PrepListController", PrepListController);

    function PrepListController($routeParams, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.getRecipeFromTask = getRecipeFromTask;
        vm.removeFromPrepCompletedList = removeFromPrepCompletedList;
        vm.moveToInProgress = moveToInProgress;
        vm.moveToCompleted = moveToCompleted;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
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

        }
        init();

        function getRecipeFromTask(prepTask) {
            RecipeService
                .findRecipeById(prepTask.recipeId)
                .then(
                    function(response) {
                        console.log("HI");
                    },
                    function(error) {
                        console.log("ERROR");
                    }

                );
                //TODO : FIX THIS
                // .findRecipeById(prepTask.recipeId)
                // .then(
                //     function(response) {
                //         return response.data;
                //     },
                //     function(error) {
                //         vm.error = error.data;
                //     }
                // )
        }

        function removeFromPrepCompletedList(recipeId) {
            PrepService
                .removeFromPrepCompletedList(vm.prepList._id, recipeId)
                .then(
                    function(response) {
                        vm.success = "Item Removed Successfully";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function moveToInProgress(prepListItem) {
            PrepService
                .addToPrepListInProgress(vm.prepList._id, angular.copy(prepListItem))
                .then(
                    function(response) {
                        PrepService
                            .removeFromPrepToDoList(vm.prepList._id, prepListItem.recipeId)
                            .then(
                                function(response) {
                                    vm.success = "Item moved successfully";
                                },
                                function(error) {
                                    vm.error = error.data;
                                }
                            )
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
        function moveToCompleted(prepListItem) {
            PrepService
                .addToPrepListCompleted(vm.prepList._id, angular.copy(prepListItem))
                .then(
                    function(response) {
                        PrepService
                            .removeFromPrepInProgressList(vm.prepList._id, prepListItem.recipeId)
                            .then(
                                function(response) {
                                    vm.success = "Item moved successfully";
                                },
                                function(error) {
                                    vm.error = error.data;
                                }
                            )
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
         
    }
    
})();