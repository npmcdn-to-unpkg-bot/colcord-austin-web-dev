(function() {
    angular
        .module("Prepper")
        .controller("RecipeViewController", RecipeViewController);

    function RecipeViewController($routeParams, RecipeService, PrepService, TimerService) {
        var vm = this;
        
        vm.addToPrepToDo = addToPrepToDo;
        vm.addTimer = addTimer;
        
        vm.uid = $routeParams["uid"];
        vm.rid = $routeParams["rid"];
        vm.multiplier = 1;
        
        function init() {
            RecipeService
                .findRecipeById(vm.rid)
                .then(
                    function(response) {
                        vm.recipe = response.data;
                        vm.restaurantId = vm.recipe.restaurantId;
                        PrepService
                            .findPrepListByRestaurantId(vm.restaurantId)
                            .then(
                                function(response) {
                                    vm.prepList = response.data;
                                },
                                function(error) {
                                    vm.error = error.data;
                                }
                            )
                    },
                    function(error) {
                        vm.error = error.data;
                    }

                );
        }
        init();
        
        function addToPrepToDo() {
            var newPrepItem = {
                _recipeId: vm.recipe._id,
                name: vm.recipe.name,
                important: false,
                signer: "",
                timeStamp: (new Date).toDateString()};
            PrepService
                .addToPrepListToDo(vm.prepList._id, newPrepItem)
                .then(
                    function(response) {
                        vm.success = "Successfully added recipe to to-do";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        function addTimer(minutes) {
            var newTimer = {
                name: vm.recipe.name, 
                _recipe: vm.recipe._id,
                _user: vm.uid, 
                timeStart: Date.now(), 
                setMinutes: minutes * 60000
            };
            TimerService
                .createTimer(newTimer)
                .then(
                    function(response) {
                        vm.success = "Successfully added timer";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
    
})();