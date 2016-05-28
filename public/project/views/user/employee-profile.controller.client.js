(function() {
    angular
        .module("Prepper")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        
        var uid = $routeParams["uid"];
        
        function init() {
            vm.user = angular.copy(UserService.findUserById(uid));
        }
        init();
    }
    
})();