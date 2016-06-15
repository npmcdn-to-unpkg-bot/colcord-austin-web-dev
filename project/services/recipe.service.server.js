var http = require('http');

module.exports = function(app, models) {

    var recipeModel = models.recipeModel;

    var recipes = [
        {_id: "123",
            name: "Chicken Puff Pastry",
            prepTime: 10,
            type: "sandwich",
            description: "A warm chicken puff with cheddar cheese with avocado on ciabatta bread",
            ingredients: [
                {_id: "412", name: "Rotisserie Chicken", amount: 1.5, measure: "Cups"},
                {_id: "222", name: "Cheddar Cheese", amount: 1.5, measure: "Cups"},
                {_id: "441", name: "Avocado", amount: 1, measure: "Cup"},
                {_id: "980", name: "Frozen Puff Pastry", amount: 2, measure: "Sheets (17.25oz package), Thawed"},
                {_id: "612", name: "Large Egg", amount: 1, measure: "Cup, Beaten"},
                {_id: "411", name: "Dijon Mustard", amount: 0.25, measure: "Cup"}
            ],
            directions: "Cook chicken breast fully. PUFF - Steam cooked chicken breast for 2 minutes. Cut chicken breast in half. Place Cheddar Cheese, chicken breast, and avocado in Ciabatta. Panini press for 2 minutes",
            restaurantId: "12345",
            recent: true
        },
        {_id: "543",
            name: "Beef Broccoli Soup",
            prepTime: 20,
            type: "soup",
            description: "A warm beef soup with cheese",
            ingredients: [
                {_id: "993", name: "Beef (ground)", amount: 1.5, measure: "Pounds"},
                {_id: "561", name: "Broccoli", amount: 1.5, measure: "Cups"},
                {_id: "555", name: "Water", amount: 3, measure: "Cups"},
                {_id: "231", name: "Salt", amount: 2, measure: "tbsp"},
                {_id: "563", name: "Beef Broth", amount: 2, measure: "Tbsp"}
            ],
            directions: "Cook beef for a while, add into soup form, cook broccoli and beef in frying pan, mix with soup stuff.",
            restaurantId: "12345",
            recent: true
        },
        {_id: "998",
            name: "Beef Chili",
            prepTime: 30,
            type: "soup",
            description: "Our award winning chili",
            ingredients: [
                {_id: "323", name: "Beef (ground)", amount: 4, measure: "Pounds"},
                {_id: "909", name: "Beans", amount: 4, measure: "Cups"},
                {_id: "331", name: "Water", amount: 3, measure: "Cups"},
                {_id: "889", name: "Onion", amount: 2, measure: "Cups, Diced"},
                {_id: "665", name: "Pepper", amount: 1, measure: "Cups, Diced"}
            ],
            directions: "Cook it all together",
            restaurantId: "12345",
            recent: false
        },
        {_id: "909",
            name: "Chicken Breast",
            prepTime: 25,
            type: "meat",
            description: "Baked chicken breast",
            ingredients: [
                {_id: "339", name: "Chicken Breast", amount: 1, measure: "Breast"},
                {_id: "901", name: "Salt", amount: 1, measure: "tsp"}
            ],
            directions: "Cook chicken breast fully at 350 degrees Farenheit, let sit for 15 minutes. Salt lightly.",
            restaurantId: "12345",
            recent: true
        }
    ];
    
    app.post("/api/recipe", createRecipe);
    app.get("/api/restaurant/:restaurantId/recipe", findAllRecipesByRestaurantId);
    app.get("/api/recipe/:recipeId", findRecipeById);
    app.put("/api/recipe/:recipeId", updateRecipe);
    app.delete("/api/recipe/:recipeId", deleteRecipe);
    app.get("/api/food", food);

    function food(req, res) {
        var searchTerm = req.query['searchterm'];
        searchTerm = searchTerm.replace(/\s+/g, "%20");

        var options = {
            hostname: 'food2fork.com',
            path: '/api/search?key=e299a830cc2d4f02152b8246d2dacf93&q=' + searchTerm
        };
        
        http.request(options, function(response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
                res.send(str);
            });
        }).end();
    }
    //
    function createRecipe(req, res) {
        var newRecipe = req.body;

        recipeModel
            .createRecipe(newRecipe)
            .then(
                function(recipe) {
                    var recipeId = recipe._id;
                    res.status(200).send(recipeId);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function findAllRecipesByRestaurantId(req, res) {
        var restaurantId = req.params.restaurantId;

        recipeModel
            .findAllRecipesByRestaurantId(restaurantId)
            .then(
                function(recipes) {
                    res.json(recipes);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function findRecipeById(req, res) {
        var recipeId = req.params.recipeId;

        recipeModel
            .findRecipeById(recipeId)
            .then(
                function(recipe) {
                    res.json(recipe);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function updateRecipe(req, res) {
        var recipe = req.body;
        var recipeId = req.params.recipeId;

        recipeModel
            .updateRecipe(recipeId, recipe)
            .then(
                function(recipe) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update recipe with ID " + recipeId);
                }
            );
    }
    
    function deleteRecipe(req, res) {
        var recipeId = req.params.recipeId;

        recipeModel
            .deleteRecipe(recipeId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to delete recipe with ID " + recipeId);
                }
            );
    }
};