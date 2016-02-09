/**
 * @class
 * @classdesc Displays animated waiting indicator without images
 *
 * @author Mark Rolich <mark.rolich@gmail.com>
 * @copyright Mark Rolich 2016
 * @license MIT
 *
 * @throws Throw an exception if DOM element id is undefined or DOM element not found
 *
 * @param {string} elem_id - DOM element ID where ajax loader wil be shown
 * @param {object} [options] AjaxLoader options
 * @param {number} [options.speed=100] animation speed in milliseconds
 * @param {number} [options.count=5] count of symbols to animate
 * @param {string} [options.symbol="."] symbol to animate
 * @param {boolean} [options.keep_value=false] restore the value of DOM element on loader stop or replace it with empty string
 * @param {string} [options.append_value=""] value to append before animating symbols (eg. "Please wait")
 *
 * @example
 * var loader = new AjaxLoader("loader-wrapper");
 * loader.start();
 *
 * var loader1 = new AjaxLoader("loader1-wrapper", {
 *     speed: 50,
 *     count: 10,
 *     symbol: "|",
 *     keep_value: true,
 *     append_value: "Please wait "
 * });
 *
 * loader1.start();
 */
var AjaxLoader = function (elem_id, options) {
    "use strict";

    if (elem_id === undefined) {
        throw "Please specify ajax loader dom element ID";
    }

    if (document.getElementById(elem_id) === null) {
        throw 'DOM element with ID "' + elem_id + '" not found';
    }

    /**
     * @private
     * @type {number}
     * @default null
     */
    var interval = null;

    /**
     * @private
     * @type {Array}
     * @default ['']
     */
    var arr = [''];

    /**
     * @private
     * @type {number}
     * @default 100
     */
    var speed = 100;

    /**
     * @private
     * @type {number}
     * @default 5
     */
    var dotCount = 5;

    /**
     * @private
     * @type {string}
     * @default "."
     */
    var symbol = ".";

    /**
     * @private
     * @type {string}
     * @default ""
     */
    var appendValue = '';

    /**
     * @private
     * @type {boolean}
     * @default false
     */
    var keepValue = false;

    /**
     * @private
     * @type {number}
     * @default 0
     */
    var totalCount = 0;

    /**
     * @private
     * @type {string}
     */
    var value = document.getElementById(elem_id).innerHTML;

    /**
     * @private
     */
    var animate = function () {
        var count = totalCount;

        count = Math.floor(count % dotCount) + 1;
        arr.push('');

        document.getElementById(elem_id).innerHTML = appendValue + arr.join(symbol);

        totalCount += 1;

        if (count === dotCount) {
            arr = [''];
        }
    };

    if (options !== undefined) {
        if (options.speed !== undefined) {
            speed = parseInt(options.speed, 10);
        }

        if (options.count !== undefined) {
            dotCount = parseInt(options.count, 10);
        }

        if (options.symbol !== undefined) {
            symbol = options.symbol;
        }

        if (options.keep_value !== undefined) {
            keepValue = options.keep_value;
        }

        if (options.append_value !== undefined) {
            appendValue = options.append_value;
        }
    }

    /**
     * @public
     * @description Start the loader
     */
    this.start = function () {
        if (interval === null) {
            interval = window.setInterval(animate, speed);
        }
    };

    /**
     * @public
     * @description Pause the loader
     */
    this.pause = function () {
        window.clearInterval(interval);
        interval = null;
    };

    /**
     * @public
     * @description Stop the loader
     */
    this.stop = function () {
        window.clearInterval(interval);

        totalCount = 0;
        interval = null;
        arr = [''];

        document.getElementById(elem_id).innerHTML = (keepValue) ? value : '';
    };
};