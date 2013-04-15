/**
 * AWS parametrizer
 *
 * @author John Peloquin
 * @copyright Copyright (c) 2013 John Peloquin. All rights reserved.
 */
(function() {
    /**
     * Constants.
     */
    var MEMBER = 'member';

    /**
     * Determines if a value is undefined or null.
     */
    var _nil = function(v) {
        return (v === undefined || v === null);
    };

    /**
     * Determines if a value is a boolean, number, or string.
     */
    var _val = function(v) {
        return (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string');
    };

    /**
     * Recursively parametrizes an object.
     *
     * @param {Object} input input object
     * @param {Object} output output object
     * @param {String} prefix current prefix
     */
    var _parametrize = function(input, output, prefix) {
        var i, k, p, v;
        for(k in input) {
            if(input.hasOwnProperty(k)) {
                p = prefix + k;
                v = input[k];

                if(_nil(v)) {
                    continue;
                }
                else if(_val(v)) {
                    output[p] = v.toString();
                }
                else if(v instanceof Array) {
                    i = 0;
                    v.forEach(function(e) {
                        if(_nil(e)) {
                            return;
                        }
                        else if(_val(e)) {
                            output[p + '.' + MEMBER + '.' + (i+1)] = e.toString();
                        }
                        else {
                            _parametrize(e, output, p + '.' + MEMBER + '.' + (i+1) + '.');
                        }

                        i++;
                    });
                }
                else {
                    _parametrize(v, output, p + '.');
                }
            }
        }
    };

    /**
     * AWS parametrizer
     *
     * Parametrizes objects for use in AWS API requests.
     *
     * @class AWSParametrizer
     * @static
     */
    AWSParametrizer = {
        /**
         * Returns a parametrization of a simple object, suitable for serialization into
         * parameters for an AWS API request.
         *
         * The input object must be "simple" in that it consists of key/value pairs each
         * of whose values is either a primitive (undefined, null, boolean, number, or
         * string), an array of primitives, a simple object, or an array of simple objects;
         * and it contains no circular references. Undefined and null values are ignored.
         *
         * Example:
         *
         * Input (represented as a JSON string):
         * {
         *     "boolean": true, 
         *     "array": ["foo", "bar"],
         *     "object": {
         *         "integer": 1,
         *         "string": "foo"
         *     },
         *     "objects": [
         *         { "float": 123.45 },
         *         { "boolean": false }
         *     ],
         *     "null": null
         * }
         *
         * Output (represented as a JSON string):
         * {
         *     "boolean": "true",
         *     "array.member.1": "foo",
         *     "array.member.2": "bar",
         *     "object.integer": "1",
         *     "object.string": "foo",
         *     "objects.member.1.float": "123.45",
         *     "objects.member.2.boolean": "false"
         * } 
         *
         * @param {Object} input input object
         * @return {Object} output object
         */
        parametrize: function(input) {
            var output = {};
            _parametrize(input, output, '');
            return output;
        }
    };

}());
