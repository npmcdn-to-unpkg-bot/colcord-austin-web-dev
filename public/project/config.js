(function() {
    angular
        .module("Prepster")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/employee-profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/edit", {
                templateUrl: "views/user/employee-profile-edit.view.client.html"
            })
            .when("/user/:uid/prep/prep-list", {
                templateUrl: "views/prep/prep-list.view.client.html"
            })
            .when("/user/:uid/prep/timer-list", {
                templateUrl: "views/timer/timer-list.view.client.html"
            })
            .when("/user/:uid/recipe/new", {
                templateUrl: "views/recipe/recipe-new.view.client.html"
            })
            .when("/user/:uid/recipe/recipe-book", {
                templateUrl: "views/recipe/recipe-book.view.client.html"
            })
            .when("/user/:uid/recipe/:rid", {
                templateUrl: "views/recipe/recipe-view.view.client.html"
            })
            .when("/user/:uid/recipe/:rid/edit", {
                templateUrl: "views/recipe/recipe-edit.view.client.html"
            })

            .otherwise({redirectTo: "views/user/login.view.client.html"})
    }
})();
