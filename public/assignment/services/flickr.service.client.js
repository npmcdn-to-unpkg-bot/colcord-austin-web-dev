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
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();