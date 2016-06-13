(function() {
    angular
        .module("Prepper")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/employee-profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/edit", {
                templateUrl: "views/user/employee-profile-edit.view.client.html",
                controller: "ProfileEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/prep/prep-list", {
                templateUrl: "views/prep/prep-list.view.client.html",
                controller: "PrepListController",
                controllerAs: "model"
            })
            .when("/user/:uid/prep/timer-list", {
                templateUrl: "views/timer/timer-list.view.client.html",
                controller: "TimerListController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipe/new", {
                templateUrl: "views/recipe/recipe-new.view.client.html",
                controller: "RecipeNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipe/recipe-book", {
                templateUrl: "views/recipe/recipe-book.view.client.html",
                controller: "RecipeBookController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipe/:rid", {
                templateUrl: "views/recipe/recipe-view.view.client.html",
                controller: "RecipeViewController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipe/:rid/edit", {
                templateUrl: "views/recipe/recipe-edit.view.client.html",
                controller: "RecipeEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/recipe/:rid/edit/search", {
                templateUrl: "views/recipe/recipe-search.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model"
            })

            //default route - login
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
