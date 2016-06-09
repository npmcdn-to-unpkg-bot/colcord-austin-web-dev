module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function(page) {
                    websiteModel
                        .addPageIdToWebsite(page._id, websiteId)
                        .then(
                            function(response) {
                                res.json(page);
                            },
                            function(error) {
                                res.status(400).send(error);
                            }
                        )
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;

        pageModel
            .updatePage(pageId, page)
            .then(
                function(page) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Unable to update page with ID " + pageId);
                }
            );
    }
    
    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    var websiteId = page._website;

                    websiteModel
                        .removePageIdFromWebsite(pageId, websiteId)
                        .then(
                            function(status) {
                                pageModel
                                    .deletePage(pageId)
                                    .then(
                                        function(status) {
                                            res.sendStatus(200);
                                        },
                                        function(error) {
                                            res.status(404).send("Unable to remove page with ID " + pageId);
                                        }
                                    )
                            },
                            function(error) {
                                res.status(404).send("Unable to remove page ID " + pageId + " from website " + websiteId);
                            }
                        )
                }
            );
    }
};