(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    var key = "xxx";
    var urlBase = "https://xxxxx";


    function FlickrService($http) {

        var api = {
                searchPhotos: searchPhotos
        };
        return api;


        function searchPhotos(searchTerm) {
            return $http.get(urlBase.replace("API_KEY", key).replace("TEXT", searchTerm));
        }

    }

})();