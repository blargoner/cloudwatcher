(function() {
    var MetricView = CloudWatcher.View.extend({
        tagName: 'tr',

        template: Handlebars.templates.metric,

        events: {
            'click .watch': 'click'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        click: function(e) {
            this.model.watch(e.target.checked);
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

        events: {
            'change #settings select': 'change'
        },

        initialize: function() {
            this.range = MetricsPlotterView.DefaultRange;
            this.period = MetricsPlotterView.DefaultPeriod;
            this.statistic = MetricsPlotterView.DefaultStatistic;
            
            this.listenTo(this.collection, 'change:Watched', this.watch);
            this.listenTo(this.collection, 'sync:statistics', this.render);
        },

        watch: function(metric, watched) {
            if(watched) {
                this.fetch(metric);
            }
            else {
                this.render();
            }
        },

        fetch: function(metric) {
            var now = Date.now();
            metric.fetchStatistics(
                now - this.range,
                now,
                this.period,
                this.statistic
            );
            return this;
        },

        fetchAll: function() {
            var that = this;
            this.collection.watched().forEach(function(m) {
                that.fetch(m);
            });
            return this;
        },

        render: function() {
            var $el = this.$el,
                sequences = this.collection.watched().map(function(m) {
                    return m.getStatistics().sequence();
                });

            $el.html(this.template());

            $el.find('#range').val(this.range);
            $el.find('#period').val(this.period);
            $el.find('#statistic').val(this.statistic);

            $.plot($el.find('#plot'), sequences, {
                xaxis: {
                    mode: 'time',
                    timezone: 'UTC'
                }
            });

            return this;
        },
        
        change: function() {
            var $el = this.$el;
            this.range = parseInt($el.find('#range').val(), 10);
            this.period = parseInt($el.find('#period').val(), 10);
            this.statistic = $el.find('#statistic').val();
            this.fetchAll();
        }
    });
    
    MetricsPlotterView.DefaultRange = 86400000;
    MetricsPlotterView.DefaultPeriod = 300;
    MetricsPlotterView.DefaultStatistic = CloudWatcher.Statistics.AVERAGE;

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.MetricView = MetricView;
    CloudWatcher.MetricsView = MetricsView;
    CloudWatcher.MetricsPlotterView = MetricsPlotterView;
}());
