define([
    'jquery',
    'jquery/validate',
    'mage/translate'
], function ($) {
    'use strict';
    return function () {

        $.validator.addMethod(
            'validate-starbucksPassword',
            function (v) {
                var pass;

                if (v == null) {
                    return false;
                }
                //strip leading and trailing spaces
                pass = $.trim(v);

                if (!pass.length) {
                    return true;
                }

                return !(pass.length > 0 && pass.length < 8);
            },
            $.mage.__('Invalid password'),
        );
        $.validator.addMethod(
            'mobileHK',
            function (v, ele) {
                let area = $(ele).siblings('.re-mobile-select');
                let type = false;
                if (area.val() === '+852') {
                    type = /^((?!999)([2569])\d{3})\s(\d{4})$/.test(v);
                } else if (area.val() === '+853') {
                    v = v.replace(/\s/g, "");
                    type = /^\d{4}\d{4}$/.test(v);
                }
                return $.mage.isEmptyNoTrim(v) || !isNaN($.mage.parseNumber(v)) && type;
            },
            $.mage.__('Invalid mobile number')
        );

        $.validator.addMethod('sbRequired',
            function (v) {
                return !$.mage.isEmpty(v);
            }, $.mage.__('This field is a required')
        );
        $.validator.addMethod('sbEmail',
            function (v) {
                return $.mage.isEmptyNoTrim(v) || /^([a-zA-Z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(v); //eslint-disable-line max-len
            },
            $.mage.__('Invalid email')
        );
        $.validator.addMethod('verification-code',
            function (v) {
                return $.mage.isEmptyNoTrim(v) || !isNaN($.mage.parseNumber(v)) && /^[0-9]{6}$/.test(v);
            },
            $.mage.__('Please enter 6 characters in this field.')
        );
        $.validator.addMethod('sb-validate-cpassword',
            function () {
                let conf = $($('.validate-cpassword')[0]),
                    pass = false,
                    passwordElements, i, passwordElement;

                passwordElements = $('.validate-password');

                for (i = 0; i < passwordElements.length; i++) {
                    passwordElement = $(passwordElements[i]);

                    if (passwordElement.closest('form').attr('id') === conf.closest('form').attr('id')) {
                        pass = passwordElement;
                    }
                }
                return pass.val() === conf.val();
            },
            $.mage.__('Confirm password dose not match')
        );
    }
});
