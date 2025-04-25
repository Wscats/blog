define([
    'jquery'
], function ($) {
    'use strict';

    return function (widget) {
        $.widget('mage.validation', widget, {
            /**
             * Handle form validation.
             * Disable focus on first invalid form field on event ticket products.
             *
             * @param {jQuery.Event} event
             * @param {Object} validation
             */
            listenFormValidateHandler: function (event, validation) {
                if (!$('.aw-et-ui-options-validate').length) {
                    this._super(event, validation);
                }
            }
        });

        return $.mage.validation;
    }
});
