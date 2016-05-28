(function() {
    angular
        .module("Prepster")
        .factory("PrepService", PrepService);

    function PrepService() {
        var prepLists = [
            {_id: "123", 
                restaurantId: 12345, 
                toDo: [
                    {recipeId: 123, important: true}
                ], 
                inProgress: [
                    {recipeId: 543, important: true, signer: "AC", timeStamp: (new Date).toDateString()},
                    {recipeId: 998, important: false, signer: "CW", timeStamp: (new Date).toDateString()}
                ], 
                completed: [
                    {recipeId: 909, important: true, signer: "JW", timeStamp: (new Date).toDateString()}
                ]},
            {_id: "444", restaurantId: 44412, toDo: [], inProgress: [], completed: []}
        ];

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
            prepLists.push(prepList);
        }

        function findPrepListById(prepListId) {
            for (var i in prepLists) {
                if (prepLists[i]._id == prepListId) {
                    return prepLists[i];
                }
            }
            return null;
        }

        function findPrepListByRestaurantId(restaurantId) {
            for (var i in prepLists) {
                if (prepLists[i].restaurantId == restaurantId) {
                    return prepLists[i];
                }
            }
            return null;
        }

        function addToPrepListToDo(prepListId, prepItem) {
            for(var i in prepLists) {
                if(prepLists[i]._id == prepListId) {
                    prepLists[i].toDo.push(prepItem);
                }
            }
        }

        function addToPrepListInProgress(prepListId, prepItem) {
            for(var i in prepLists) {
                if(prepLists[i]._id == prepListId) {
                    prepItem.timeStamp = (new Date).toDateString();
                    prepLists[i].inProgress.push(prepItem);
                }
            }
        }

        function addToPrepListCompleted(prepListId, prepItem) {
            for(var i in prepLists) {
                if(prepLists[i]._id == prepListId) {
                    prepItem.timeStamp = (new Date).toDateString();
                    prepLists[i].completed.push(prepItem);
                }
            }
        }

        function removeFromPrepCompletedList(prepListId, recipeId) {
            for(var i in prepLists) {
                if(prepLists[i]._id == prepListId) {
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
                if(prepLists[i]._id == prepListId) {
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
                if(prepLists[i]._id == prepListId) {
                    for(var j in prepLists[i].inProgress) {
                        if(prepLists[i].inProgress[j].recipeId == recipeId) {
                            prepLists[i].inProgress.splice(j, 1);
                        }
                    }
                }
            }
        }

        function updatePrepList(prepListId, prepList) {
            for(var i in prepLists) {
                if(prepLists[i]._id == prepListId) {
                    prepLists[i].toDo = prepList.toDo;
                    prepLists[i].inProgress = prepList.inProgress;
                    prepLists[i].completed = prepList.completed;
                    return true;
                }
            }
            return false;
        }
        
        function deletePrepList(prepListId) {
            for(var i in prepLists) {
                if (prepLists[i]._id == prepListId) {
                    prepLists.splice(i, 1);
                }
            }
        }
        
    }

})();