/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(['ko'], function (ko) {
    'use strict';

    return {
        ids: ko.observableArray([]),
        captchaList: ko.observableArray([]),
        tokenFields: ko.observableArray([])
    };
});
