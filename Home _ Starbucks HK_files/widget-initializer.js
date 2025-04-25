/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'underscore',
    'jquery',
    'mage/apply/main',
    'Magento_Ui/js/lib/view/utils/dom-observer'
], function (_, $, mage, domObserver) {
    'use strict';

    /**
     * Initializes components assigned to HTML elements.
     *
     *
     * @param {HTMLElement} el
     * @param {Array} data
     * @param {Object} breakpoints
     * @param {Object} currentViewport
     */
    function initializeWidget(el, data, breakpoints, currentViewport) {
        _.each(data, function (config, component) {
            config = config || {};
            config.breakpoints = breakpoints;
            config.currentViewport = currentViewport;
            mage.applyFor(el, config, component);
        });
    }

    return function (data, contextElement) {
        _.each(data.config, function (componentConfiguration, elementPath) {
            domObserver.get(
                elementPath,
                function (element) {
                    var $element = $(element);

                    if (contextElement) {
                        $element = $(contextElement).find(element);
                    }

                    if ($element.length) {
                        initializeWidget($element, componentConfiguration, data.breakpoints, data.currentViewport);
                    }
                }
            );
        });
    };
});
