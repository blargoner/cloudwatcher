(function() {
    var MetricsView = Backbone.View.extend({
        template: Handlebars.templates.metrics,

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template(this.collection.toCategorizedJSON()));
        }
    });

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.MetricsView = MetricsView;
}());
