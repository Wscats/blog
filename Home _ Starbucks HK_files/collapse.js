define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('magezon.mgzCollapse', {
        _create: function () {
            var self = this;

            var $panelList = this.element.children('.mgz-panel');

            var self = this;

            var updateIcon = function(element, active) {
                var iconSelector = $(element).children('i');
                if (active) {
                    if (self.options.icon) iconSelector.removeClass(self.options.icon);
                    if (self.options.activeIcon) iconSelector.addClass(self.options.activeIcon);
                } else {
                    if (self.options.activeIcon) iconSelector.removeClass(self.options.activeIcon);
                    if (self.options.icon) iconSelector.addClass(self.options.icon);
                }
            }

            var loadLazyImg = function(element) {
                element.find('img').each(function(index) {
                    if (!$(this).attr('src') && $(this).attr('data-src')) {
                        $(this).attr('src', $(this).attr('data-src'));
                    }
                });
            }

            $panelList.each(function(index, el) {
                $(this).children('.mgz-panel-heading').find('a').click(function(event) {
                    if (self.options.atLeastOneOpen) {
                        if ($(this).parents('.mgz-panel.mgz-active').length) return false;
                    }

                    var target = $(this);
                    if (self.element.children('.mgz-collapsing').length) return false;
                    var parent   = $(this).closest('.mgz-panel');
                    var hasClass = parent.hasClass('mgz-active');

                    if (!self.options.collapsibleAll) {
                        $panelList.removeClass('mgz-collapsing');
                        $panelList.children('.mgz-panel-body').stop().slideUp(400, function() {
                            parent.removeClass('mgz-in');
                        });
                    }

                    if (hasClass) {
                        parent.addClass('mgz-collapsing');
                        parent.children('.mgz-panel-body').stop().slideUp(400, function() {
                            parent.removeClass('mgz-collapsing');
                            parent.removeClass('mgz-in');
                            parent.removeClass('mgz-active');
                            updateIcon(target, false);
                        });
                    } else {
                        parent.addClass('mgz-collapsing');
                        parent.children('.mgz-panel-body').stop().slideDown(400, function() {
                            if (!self.options.collapsibleAll) {
                                $panelList.removeClass('mgz-active');
                                $panelList.removeClass('mgz-in');
                                $panelList.removeClass('mgz-collapsing');
                                $panelList.each(function(_index, _el) {
                                    updateIcon($(this).find('a').eq(0), false);
                                });
                            }
                            parent.removeClass('mgz-collapsing');
                            parent.addClass('mgz-in');
                            parent.children('.mgz-panel-body').css('height', '');
                            parent.addClass('mgz-active');
                            updateIcon(target, true);
                        });
                        loadLazyImg(parent.children('.mgz-panel-body'));
                        parent.addClass('mgz-active');
                        updateIcon(target, true);
                    }
                    return false;
                });
            });
        }
    });

    return $.magezon.mgzCollapse;
});