module.exports = function(app, models) {


    app.get('/wam/script/:scriptId/statement', statementListController);

    function statementListController(req, res) {
        res.render('wam/statement/statement-list.view.server.ejs');
    }
};