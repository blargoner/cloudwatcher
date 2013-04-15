(function() {
    var MetricView = CloudWatcher.View.extend({
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
            this.model.watch();
        }
    });

    var MetricsView = CloudWatcher.View.extend({
        template: Handlebars.templates.metrics,

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
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

    var MetricsPlotterView = CloudWatcher.View.extend({
        template: Handlebars.templates.plotter,

        initialize: function() {
            this.listenTo(this.collection, 'change:Watched', this.watch);
            this.listenTo(this.collection, 'sync:statistics', this.render);
        },

        watch: function(metric, watched) {
            if(watched) {
                // TODO: just testing, fetching averages over 5 minute periods for last 24 hours
                var now = Date.now();
                metric.fetchStatistics(
                    now - 24 * 60 * 60 * 1000,
                    now,
                    5 * 60,
                    CloudWatcher.Statistics.AVERAGE
                );
            }
        },

        render: function() {
            var sequences = this.collection.watched().map(function(m) {
                return m.getStatistics().sequence();
            });

            this.$el.html(this.template());

            $.plot(this.$el.find('#plot'), sequences, {
                xaxis: {
                    mode: 'time',
                    timezone: 'UTC'
                }
            });

            return this;
        }
    });

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.MetricView = MetricView;
    CloudWatcher.MetricsView = MetricsView;
    CloudWatcher.MetricsPlotterView = MetricsPlotterView;
}());
