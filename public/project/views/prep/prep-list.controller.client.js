(function() {
    angular
        .module("Prepper")
        .controller("PrepListController", PrepListController);

    function PrepListController($routeParams, UserService, PrepService) {
        var vm = this;
        vm.removeFromPrepCompletedList = removeFromPrepCompletedList;
        vm.moveToInProgress = moveToInProgress;
        vm.moveToCompleted = moveToCompleted;
        vm.moveBackToToDo = moveBackToToDo;
        vm.sorted = sorted;
        
        vm.uid = $routeParams["uid"];
        vm.unlocked = true;
        
        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                        getPrepList();
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

        }
        init();

        function getPrepList() {
            PrepService
                .findPrepListByRestaurantId(vm.user.restaurantId)
                .then(
                    function(response) {
                        vm.prepList = response.data;
                    },
                    function(error) {
                        vm.unlocked = false;
                        vm.error = "Please add a Restaurant ID to your profile to view items on the PrepList";
                    }
                )
        }

        function removeFromPrepCompletedList(ticket) {
            PrepService
                .removeFromPrepCompletedList(vm.prepList._id, ticket._id)
                .then(
                    function(response) {
                        getPrepList();
                        vm.success = "Item Removed Successfully";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function moveToInProgress(prepListItem) {
            PrepService
                .addToPrepListInProgress(vm.prepList._id, prepListItem)
                .then(
                    function(response) {
                        return PrepService
                            .removeFromPrepToDoList(vm.prepList._id, prepListItem._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                ).then(
                    function(response) {
                        getPrepList();
                        vm.success = "Item moved successfully";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }

        function moveToCompleted(prepListItem) {
            PrepService
                .addToPrepListCompleted(vm.prepList._id, prepListItem)
                .then(
                    function(response) {
                        return PrepService
                            .removeFromPrepInProgressList(vm.prepList._id, prepListItem._id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                ).then(
                    function(response) {
                        getPrepList();
                        vm.success = "Item moved successfully";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function moveBackToToDo(prepListItem) {
            PrepService
                .addToPrepListToDo(vm.prepList._id, prepListItem)
                .then(
                    function(response) {
                        return PrepService
                            .removeFromPrepInProgressList(vm.prepList._id, prepListItem._id)
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                ).then(
                    function(response) {
                        getPrepList();
                        vm.success = "Item moved back successfully";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }


        function sorted(startIndex, endIndex) {
            PrepService
                .reorderToDo(vm.prepList._id, startIndex, endIndex)
                .then(
                    function(response) {
                        vm.success = "Reordering successful";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )

        }
    }
    
})();