(function() {
    angular
        .module("Prepper")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        
        vm.uid = $routeParams["uid"];
        
        function init() {
            vm.user = angular.copy(UserService.findUserById(vm.uid));
        }
        init();
    }
    
})();