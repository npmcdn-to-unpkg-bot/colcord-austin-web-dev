(function() {
    angular
        .module("Prepper")
        .controller("RecipeBookController", RecipeBookController);

    function RecipeBookController($routeParams, $location, RecipeService, UserService, PrepService) {
        var vm = this;
        vm.loadingNew = false;
        vm.addToPrepToDo = addToPrepToDo;
        vm.newRecipe = newRecipe;
        
        vm.uid = $routeParams["uid"];
        vm.recentDate = new Date();
        vm.unlocked = true;
        vm.initialized = false;

        function addDays(theDate, days) {
            // http://stackoverflow.com/questions/3818193/how-to-add-number-of-days-to-todays-date
            return new Date(theDate.getTime() - days*24*60*60*1000);
        }

        vm.recentDate = addDays(vm.recentDate, 3);

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                        return RecipeService
                            .findRecipesByRestaurant(vm.user.restaurantId);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                ).then(
                    function(response) {
                        vm.recipeBook = response.data;
                        return PrepService
                            .findPrepListByRestaurantId(vm.user.restaurantId);
                    },
                    function(error) {
                        vm.unlocked = false;
                        vm.error = "Please add a Restaurant ID to your profile to view and create Recipes";
                    }
                ).then(
                    function(response) {
                        if (response) {
                            vm.prepList = response.data;
                        }
                        else {
                            vm.error = "Please add a Restaurant ID to your profile to view and create Recipes";
                        }
                        vm.initialized = true;
                    },
                    function(error) {
                        vm.error = error.data;
                        vm.initialized = true;
                    }
                )
        }
        init();

        function addToPrepToDo(recipeId, name) {
            var newPrepItem = {
                _recipeId: recipeId,
                name: name,
                important: false,
                notes: "",
                timeStamp: (new Date).toDateString()};

            PrepService
                .addToPrepListToDo(vm.prepList._id, newPrepItem)
                .then(
                    function(response) {
                        vm.success = "Successfully added item to ToDo";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        function newRecipe() {
            vm.loadingNew = true;
            $location.url("/user/" + vm.uid + "/recipe/new");
        }
    }
    
})();