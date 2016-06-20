module.exports = function(app) {
    app.get('/lectures/hello/:name', helloHandler);
    app.get('/lectures/script', scriptHandler);
    
    var script = [
        {type: 'string'},
        {type: 'boolean'},
        {type: 'string'},
        {type: 'date'},
        {type: 'numeric'},
        {type: 'string'},
        {type: 'numeric'}
    ];
    
    function helloHandler(req, res) {
        var name = req.params.name;
        console.log(name);
        var data = {
            name: name
        };
        res.render("lectures/hello", data);
    }
    
    function scriptHandler(req, res) {
        var data = {
            script: script
        };
        res.render('lectures/script/script', data);
    }
};