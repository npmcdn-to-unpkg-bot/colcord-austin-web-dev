module.exports = function() {

    
    var userModel = require("./user/user.model.server.js")();
    var websiteModel;
    var pageModel;
    var widgetModel;

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    return models;
};