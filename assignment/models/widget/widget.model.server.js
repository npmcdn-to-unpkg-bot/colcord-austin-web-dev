var mongoose = require("mongoose");

module.exports = function() {
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
        // reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {$set :
                {
                    name: widget.name || '',
                    text: widget.text || '',
                    placeholder: widget.placeholder || '',
                    description: widget.description || '',
                    url: widget.url || '',
                    width: widget.width || 100,
                    height: widget.height || 100,
                    rows: widget.rows || 1,
                    size: widget.size || 1,
                    class: widget.class || '',
                    icon: widget.icon || '',
                    deletable: widget.deletable || false,
                    formatted: widget.formatted || false
                }
            }
        );
    }
    
    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};