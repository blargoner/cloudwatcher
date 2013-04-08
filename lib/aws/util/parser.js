/**
 * AWS XML parser
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
     * Recursively parses an XML element
     *
     * @param {Element} el XML element
     * @return {String|Array|Object} parsed element
     */
    var _parseElement = function(el) {
        var output, c;

        if(el.childElementCount === 0) {
            output = el.textContent;
        }
        else if(el.firstElementChild.nodeName === MEMBER) {
            output = [];
            for(c = el.firstElementChild; c !== null; c = c.nextElementSibling) {
                output.push(_parseElement(c));
            }
        }
        else {
            output = {};
            for(c = el.firstElementChild; c !== null; c = c.nextElementSibling) {
                output[c.nodeName] = _parseElement(c);
            }
        }

        return output;
    };

    /**
     * AWS parser
     *
     * Parses AWS XML into objects.
     *
     * @class AWSParser
     * @static
     */
    AWSParser = {
        /**
         * Parses an AWS XML document.
         *
         * Example:
         *
         * Input (represented as an XML string):
         * <Response>
         *     <Result>
         *         <Items>
         *             <member>
         *                 <Name>Item 1</Name>
         *                 <Description>The first item.</Description>
         *             </member>
         *             <member>
         *                 <Name>Item 2</Name>
         *                 <Description>The second item.</Description>
         *             </member>
         *         </Items>
         *         <Token>ABC</Token>
         *     </Result>
         *     <Metadata>
         *         <RequestId>123</RequestId>
         *     </Metadata>
         * </Response>
         *
         * Output (represented as a JSON string):
         * {
         *     "Response": {
         *         "Result": {
         *             "Items": [
         *                 {
         *                     "Name": "Item 1",
         *                     "Description": "The first item."
         *                 },
         *                 {
         *                     "Name": "Item 2",
         *                     "Description": "The second item."
         *                 }
         *             ],
         *             "Token": "ABC"
         *         },
         *         "Metadata": {
         *             "RequestId": "123"
         *         }
         *     }
         * }
         * 
         * @param {Document} doc XML document node
         * @return {Object} parsed document
         */
        parse: function parse(doc) {
            var output = {},
                root = doc.documentElement;

            output[root.nodeName] = _parseElement(root);

            return output;
        }
    };

}());

