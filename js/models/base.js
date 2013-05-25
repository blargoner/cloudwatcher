(function() {
    Backbone.sync = function() {
        throw new Error('Not implemented.');
    };

    var Model = Backbone.Model.extend({
        transform: function(attrs, fn) {
            var that = this;
            attrs = (attrs instanceof Array) ? attrs : [attrs];
            attrs.forEach(function(a) {
                if(that.has(a)) {
                    that.set(a, fn(that.get(a)), { silent: true });
                }
            });
            return this;
        }
    });

    var Collection = Backbone.Collection.extend({});

    (typeof CloudWatcher === 'undefined') && (CloudWatcher = {});

    CloudWatcher.createClient = function() {
        var awsAccessKey = localStorage['aws_access_key'],
            awsSecretKey = localStorage['aws_secret_key'],
            awsRegion    = localStorage['aws_region'];

        if(!awsAccessKey || !awsSecretKey) {
            throw new Error('CloudWatcher.createClient() requires AWS credentials.');
        }

        return new AWSCloudWatchClient(awsAccessKey, awsSecretKey, awsRegion);
    };

    CloudWatcher.Model = Model;
    CloudWatcher.Collection = Collection;
}());
