(function() {
    var MetricView = Backbone.View.extend({
        tagName: 'tr',

        template: Handlebars.templates.metric,

        events: {
            'click .metric': 'click'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        click: function(e) {
            e.preventDefault();
            // TODO
        }
    });

    var MetricsView = Backbone.View.extend({
        template: Handlebars.templates.metrics,

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template({
                Categories: this.collection.categories()
            }));

            this.collection.each(this.renderMetric, this);

            return this;
        },

        renderMetric: function(metric) {
            var view = new MetricView({
                model: metric
            });

            this.$el.find(this.categorySelector(metric) + ' .metrics tbody').append(view.render().el);

            return this;
        },

        categorySelector: function(metric) {
            return '.category[data-category="' + metric.get('Category') + '"]';
        }
    });

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.MetricView = MetricView;
    CloudWatcher.MetricsView = MetricsView;
}());
