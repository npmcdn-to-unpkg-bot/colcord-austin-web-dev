(function() {
    angular
        .module("Prepper")
        .factory("Food2ForkService", Food2ForkService);

    var key = "e299a830cc2d4f02152b8246d2dacf93";
    var urlBase = "http://food2fork.com/api/search?key=API_KEY&q=TEXT";

    function Food2ForkService($http) {

        var api = {
            searchRecipes: searchRecipes
        };
        return api;


        function searchRecipes(searchTerm) {
            return $http.get("/api/food");
        }

    }

})();