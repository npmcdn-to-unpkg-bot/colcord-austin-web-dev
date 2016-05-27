(function() {
    angular
        .module("Prepster")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        // vm.updateProfile = updateProfile;
        
        var uid = $routeParams["uid"];
        
        function init() {
            vm.user = angular.copy(UserService.findUserById(uid));
        }
        init();
    }
    
})();