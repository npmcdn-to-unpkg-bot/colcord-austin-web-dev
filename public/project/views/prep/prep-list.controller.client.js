(function() {
    angular
        .module("Prepper")
        .controller("PrepListController", PrepListController);

    function PrepListController($routeParams, UserService, PrepService) {
        var vm = this;
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
                        vm.error = error.data;
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
                        PrepService
                            .removeFromPrepToDoList(vm.prepList._id, prepListItem._id)
                            .then(
                                function(response) {
                                    getPrepList();
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
                .addToPrepListCompleted(vm.prepList._id, prepListItem)
                .then(
                    function(response) {
                        PrepService
                            .removeFromPrepInProgressList(vm.prepList._id, prepListItem._id)
                            .then(
                                function(response) {
                                    getPrepList();
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