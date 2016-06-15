(function() {
    angular
        .module("Prepper")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($location, $routeParams, Food2ForkService, RecipeService) {
        var vm = this;
        vm.searching = "";
        vm.searchRecipes = searchRecipes;
        // vm.selectRecipe = selectRecipe;

        vm.uid = $routeParams["uid"];
        // vm.wid = $routeParams.wid;
        // vm.pid = $routeParams.pid;
        // vm.wgid = $routeParams.wgid;

        function searchRecipes(searchTerm) {
            vm.searching = "searching...";
            Food2ForkService
                .searchRecipes(searchTerm)
                .then(
                    function(response) {
                        var data = response.data;
                        vm.recipes = data.recipes;
                        if (vm.recipes.length) {
                            vm.searching = "";
                        }
                        else {
                            vm.searching = "no recipes found";
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        // function selectPhoto(photo) {
        //     var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //     url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //     WidgetService
        //         .findWidgetById(vm.wgid)
        //         .then(
        //             function(response) {
        //                 requestUpdateFlickrImage(response, url)
        //             },
        //             function(error) {
        //                 vm.error = error.data;
        //             }
        //         );
        // }
        //
        // // internal helper function for selectPhoto
        // function requestUpdateFlickrImage(response, url) {
        //     var widget = response.data;
        //     widget.url = url;
        //     WidgetService
        //         .updateWidget(vm.wgid, widget)
        //         .then(
        //             function(response) {
        //                 vm.success = "Added Flickr Image";
        //                 $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
        //
        //             },
        //             function(error) {
        //                 vm.error = error.data;
        //             }
        //         )
        // }
    }
})();