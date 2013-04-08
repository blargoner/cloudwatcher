$(function() {
    var metrics = new CloudWatcher.Metrics();

    var view = new CloudWatcher.MetricsView({
        collection: metrics,
        el: '#metrics'
    });
});
