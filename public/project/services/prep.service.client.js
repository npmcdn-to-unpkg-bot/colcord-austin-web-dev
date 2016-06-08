(function() {
    angular
        .module("Prepper")
        .factory("PrepService", PrepService);

    function PrepService($http) {

        var api = {
            createPrepList: createPrepList,
            findPrepListById: findPrepListById,
            findPrepListByRestaurantId: findPrepListByRestaurantId,
            addToPrepListToDo: addToPrepListToDo,
            addToPrepListInProgress: addToPrepListInProgress,
            addToPrepListCompleted: addToPrepListCompleted,
            removeFromPrepCompletedList: removeFromPrepCompletedList,
            removeFromPrepToDoList: removeFromPrepToDoList,
            removeFromPrepInProgressList: removeFromPrepInProgressList,
            updatePrepList: updatePrepList,
            deletePrepList: deletePrepList
        };
        return api;

        function createPrepList(prepList) {
            return $http.post("/api/prep", prepList);
        }

        function findPrepListById(prepListId) {
            return $http.get("/api/prep/" + prepListId);
        }

        function findPrepListByRestaurantId(restaurantId) {
            return $http.get("/api/restaurant/" + restaurantId + "/prep");
        }

        function addToPrepListToDo(prepListId, ticket) {
            return $http.put("/api/prep/" + prepListId + "/toDo", ticket);
        }

        function addToPrepListInProgress(prepListId, prepItem) {
            for(var i in prepLists) {
                if(prepLists[i]._id === prepListId) {
                    prepItem.timeStamp = (new Date).toDateString();
                    prepLists[i].inProgress.push(prepItem);
                }
            }
        }

        function addToPrepListCompleted(prepListId, prepItem) {
            for(var i in prepLists) {
                if(prepLists[i]._id === prepListId) {
                    prepItem.timeStamp = (new Date).toDateString();
                    prepLists[i].completed.push(prepItem);
                }
            }
        }

        function removeFromPrepCompletedList(prepListId, recipeId) {
            for(var i in prepLists) {
                if(prepLists[i]._id === prepListId) {
                    for(var j in prepLists[i].completed) {
                        if(prepLists[i].completed[j].recipeId == recipeId) {
                            prepLists[i].completed.splice(j, 1);
                        }
                    }
                }
            }
        }

        function removeFromPrepToDoList(prepListId, recipeId) {
            for(var i in prepLists) {
                if(prepLists[i]._id === prepListId) {
                    for(var j in prepLists[i].toDo) {
                        if(prepLists[i].toDo[j].recipeId == recipeId) {
                            prepLists[i].toDo.splice(j, 1);
                        }
                    }
                }
            }
        }

        function removeFromPrepInProgressList(prepListId, recipeId) {
            for(var i in prepLists) {
                if(prepLists[i]._id === prepListId) {
                    for(var j in prepLists[i].inProgress) {
                        if(prepLists[i].inProgress[j].recipeId == recipeId) {
                            prepLists[i].inProgress.splice(j, 1);
                        }
                    }
                }
            }
        }

        function updatePrepList(prepListId, prepList) {
            return $http.put("/api/prep/" + prepListId, prepList);
        }
        
        function deletePrepList(prepListId) {
            return $http.delete("/api/prep/" + prepListId);
        }
        
    }

})();