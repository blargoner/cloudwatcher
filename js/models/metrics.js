(function() {
    var Metric = CloudWatcher.Model.extend({
        defaults: {
            Watched: false
        },

        initialize: function() {
            this.set('Category', this.category());

            this.statistics = this.createStatistics();
            this.statistics.setMetric(this);
            this.statistics.on('sync', this.onSyncStatistics, this);
        },

        category: function() {
            var namespace = this.get('Namespace'),
                dimensions = this.get('Dimensions') || [];

            return namespace + ':' + dimensions.map(function(d) { return d.Name; }).join(':');
        },

        watched: function() {
            return this.get('Watched');
        },

        watch: function() {
            this.set('Watched', true);
            return this;
        },

        unwatch: function() {
            this.set('Watched', false);
            return this;
        },

        createStatistics: function() {
            return new CloudWatcher.Statistics();
        },

        getStatistics: function() {
            return this.statistics;
        },

        fetchStatistics: function(startTime, endTime, period, statistic) {
            this.statistics.set({
                StartTime: startTime,
                EndTime: endTime,
                Period: period,
                Statistic: statistic
            });

            this.statistics.fetch();

            return this;
        },

        onSyncStatistics: function() {
            this.trigger('sync:statistics');
        }
    });

    var Metrics = CloudWatcher.Collection.extend({
        model: Metric,

        sync: function(method, collection, options) {
            var client = CloudWatcher.createClient();

            if(method !== 'read') {
                throw new Error('CloudWatcher.Metrics.sync() only supports read.');
            }

            options = options || {};

            client.listMetrics({}, function(data) {
                if(data && options.success) {
                    options.success(data);
                }
                else if(!data && options.error) {
                    options.error(data);
                }

                client = null;
            });
        },

        parse: function(response) {
            return response.Metrics;
        },

        comparator: function(metric) {
            return metric.get('Category') + ':' + metric.get('MetricName');
        },

        categories: function() {
            return _.uniq(this.pluck('Category'), true).map(function(c) {
                return {
                    Name: c,
                    Dimensions: c.split(':').slice(1)
                }
            });
        },

        watched: function() {
            return this.where({ Watched: true });
        }
    });

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.Metric = Metric;
    CloudWatcher.Metrics = Metrics;
}());
