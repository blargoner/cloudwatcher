(function() {
    var Metric = Backbone.Model.extend({
        initialize: function() {
            this.set('Category', this.category());
        },

        category: function() {
            var namespace = this.get('Namespace'),
                dimensions = this.get('Dimensions') || [];

            return namespace + ':' + dimensions.map(function(d) { return d.Name; }).join(':');
        }
    });

    var Metrics = Backbone.Collection.extend({
        model: Metric,

        sync: function(method, collection, options) {
            var awsAccessKey = localStorage['aws_access_key'],
                awsSecretKey = localStorage['aws_secret_key'],
                client = new AWSCloudWatchClient(awsAccessKey, awsSecretKey);

            if(!awsAccessKey || !awsSecretKey) {
                throw new Error('CloudWatcher.Metrics.sync() requires AWS credentials.');
            }

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
        }
    });

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.Metric = Metric;
    CloudWatcher.Metrics = Metrics;
}());
