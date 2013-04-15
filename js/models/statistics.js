(function() {
    var Datapoint = CloudWatcher.Model.extend({
        initialize: function() {
            this.normalize();
        },

        normalize: function() {
            this.transform('Timestamp', Date.parse).
                    transform(['Average', 'Maximum', 'Minimum', 'SampleCount', 'Sum'], parseFloat);

            return this;
        }
    }); 

    var Datapoints = CloudWatcher.Collection.extend({
        model: Datapoint,

        sequence: function(statistic) {
            return this.map(function(p) {
                return [p.get('Timestamp'), p.get(statistic)];
            });
        },

        comparator: function(datapoint) {
            return datapoint.get('Timestamp');
        }
    });

    var Statistics = CloudWatcher.Model.extend({
        initialize: function() {
            this.metric = null;
            this.datapoints = this.createDatapoints();

            this.on('sync', this.resetDatapoints);
        },

        getMetric: function() {
            return this.metric;
        },

        setMetric: function(metric) {
            this.metric = metric;
            return this;
        },

        createDatapoints: function() {
            return new Datapoints();
        },

        getDatapoints: function() {
            return this.datapoints;
        },

        resetDatapoints: function() {
            this.datapoints.reset(this.get('Datapoints'));
            return this;
        },

        sequence: function() {
            return this.datapoints.sequence(this.get('Statistic'));
        },

        sync: function(method, model, options) {
            var that = this,
                metric = this.metric,
                client = CloudWatcher.createClient();

            if(method !== 'read') {
                throw new Error('CloudWatcher.Statistics.sync() only supports read.');
            }

            client.getMetricStatistics({
                Namespace: metric.get('Namespace'),
                MetricName: metric.get('MetricName'),
                Dimensions: metric.get('Dimensions'),
                StartTime: new Date(this.get('StartTime')).toISOString(),
                EndTime: new Date(this.get('EndTime')).toISOString(),
                Period: this.get('Period'),
                Statistics: [this.get('Statistic')]
            }, function(data) {
                if(data && options.success) {
                    options.success(data);
                }
                else if(!data && options.error) {
                    options.error(data);
                }

                client = null;
            });
        }
    });

    Statistics.AVERAGE = 'Average';
    Statistics.MAXIMUM = 'Maximum';
    Statistics.MINIMUM = 'Minimum';
    Statistics.SAMPLE_COUNT = 'SampleCount';
    Statistics.SUM = 'Sum';

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.Datapoint = Datapoint;
    CloudWatcher.Datapoints = Datapoints;
    CloudWatcher.Statistics = Statistics;
}());
