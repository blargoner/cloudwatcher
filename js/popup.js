$(function() {
    var metrics = new CloudWatcher.Metrics();

    new CloudWatcher.MetricsView({
        collection: metrics,
        el: '#metrics'
    });

    new CloudWatcher.MetricsPlotterView({
        collection: metrics,
        el: '#plotter'
    });

    metrics.fetch();
});
