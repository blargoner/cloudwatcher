/**
 * AWS CloudWatch API client
 *
 * @author John Peloquin
 * @copyright (c) 2013 John Peloquin. All rights reserved.
 */
(function() {
    /**
     * Constants
     */
    var METHOD = 'GET',
        PROTOCOL = 'https',
        HOST_PREFIX = 'monitoring',
        HOST_SUFFIX = '.amazonaws.com',
        PATH = '/',
        VERSION = '2010-08-01';

    var LIST_METRICS = 'ListMetrics',
        GET_METRIC_STATISTICS = 'GetMetricStatistics';

    /**
     * Parametrizes request data.
     *
     * @param {String} action action name
     * @param {Object} data data
     * @return {Object} parametrized data
     */
    var _parametrize = function(action, data) {
        data.Action = action;
        data.Version = VERSION;
        return AWSParametrizer.parametrize(data);
    };

    /**
     * Signs parametrized request data.
     *
     * @param {Object} data parametrized data
     * @param {Object} signer signer instance
     * @return {Object} signed data
     */
    var _sign = function(data, signer, region) {
        return signer.sign(data, (new Date()), {
            'verb': METHOD,
            'host': _host(region),
            'uriPath': PATH
        });
    };

    /**
     * Serializes parameters.
     *
     * @param {Object} params parameters
     * @return {String} parameter string
     */
    var _serialize = function(params) {
        var parts = [],
            k, v;

        for(k in params) {
            if(params.hasOwnProperty(k)) {
                v = params[k];
                parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }

        return parts.join('&');
    };

    /**
     * Gets API hostname.
     *
     * @return {String} URL
     */
    var _host = function(region) {
        return HOST_PREFIX + (region ? '.' + region : '') + HOST_SUFFIX;
    };

    /**
     * Gets API URL.
     *
     * @param {Object} params parameters
     * @return {String} URL
     */
    var _url = function(params, region) {
        return PROTOCOL + '://' + _host(region) + PATH + '?' + _serialize(params);
    };

    /**
     * Requests API URL.
     *
     * The callback will be called with the returned JSON data.
     *
     * @param {String} url URL
     * @param {Function} callback callback function
     * @param {Object} XHR XHR interface
     */
    var _request = function(url, callback, XHR) {
        var xhr = new XHR();

        xhr.onreadystatechange = function() {
            var responseXML, responseJSON;

            if(xhr.readyState !== 4) {
                return;
            }

            responseXML = xhr.responseXML;
            responseJSON = (responseXML !== null) ? AWSParser.parse(responseXML) : undefined;

            callback(responseJSON);
        };

        xhr.open(METHOD, url);
        xhr.send();
    };

    /**
     * AWS CloudWatch client.
     *
     * @class AWSCloudWatchClient
     * @constructor
     * @param {String} accessKey AWS access key
     * @param {String} secretKey AWS secret key
     * @param {String} region AWS region
     * @param {Object} XHR XMLHttpRequest interface (optional)
     */
    AWSCloudWatchClient = function(accessKey, secretKey, region, XHR) {
        accessKey = accessKey || '';
        secretKey = secretKey || '';
        XHR = XHR || XMLHttpRequest;

        this._signer = new AWSV2Signer(accessKey, secretKey);
        this._XHR = XHR;
        this._region = region || '';
    };

    /**
     * Requests API action.
     *
     * @param {String} action action name
     * @param {Object} data data
     * @param {Function} callback callback function
     */
    AWSCloudWatchClient.prototype._request = function(action, data, callback) {
        _request(_url(_sign(_parametrize(action, data), this._signer, this._region), this._region), callback, this._XHR);
    };

    /**
     * Requests API action and returns result structure.
     *
     * @param {String} action action name
     * @param {Object} data data
     * @param {Function} callback callback function
     */
    AWSCloudWatchClient.prototype._requestResult = function(action, data, callback) {
        this._request(action, data, function(response) {
            var responseKey = action + 'Response',
                resultKey = action + 'Result';

            callback(response && response[responseKey] && response[responseKey][resultKey]);
        });
    };

    /**
     * List metrics.
     *
     * @param {Object} data data
     * @param {Function} callback callback function
     */
    AWSCloudWatchClient.prototype.listMetrics = function(data, callback) {
        this._requestResult(LIST_METRICS, data, callback);
    };

    /**
     * Gets metric statistics.
     *
     * @param {Object} data data
     * @param {Function} callback callback function
     */
    AWSCloudWatchClient.prototype.getMetricStatistics = function(data, callback) {
        this._requestResult(GET_METRIC_STATISTICS, data, callback);
    };
    
    /**
     * Destroys.
     */
    AWSCloudWatchClient.prototype.destroy = function() {
        delete this._signer;
        delete this._XHR;
    };

}());
