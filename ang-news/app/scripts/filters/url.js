/*global news*/
(function (app) {
    "use strict";

    /**
     * @ngdoc filter
     * @name angNewsApp.filter:url
     * @function
     * @description
     * # url
     * Filter in the angNewsApp.
     */
    app.filter("hostnameFromUrl", function () {
        return function (input) {
            var url = document.createElement("a");

            url.href = input;

            return url.hostname;
        };
    });
}(news));
