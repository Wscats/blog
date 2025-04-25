define([
    'jquery',
    'jquery-ui-modules/widget',
    'Magezon_Core/js/owl.carousel.min'
], function ($) {
    'use strict';

/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

    /**
     * Creates the animate plugin.
     * @class The Navigation Plugin
     * @param {Owl} scope - The Owl Carousel
     */
    var Animate = function(scope) {
        this.core = scope;
        this.core.options = $.extend({}, Animate.Defaults, this.core.options);
        this.swapping = true;
        this.previous = undefined;
        this.next = undefined;

        this.handlers = {
            'change.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name == 'position') {
                    this.previous = this.core.current();
                    this.next = e.property.value;
                }
            }, this),
            'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
                if (e.namespace) {
                    this.swapping = e.type == 'translated';
                }
            }, this),
            'translate.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
                    this.swap();
                }
            }, this)
        };

        this.core.$element.on(this.handlers);
    };

    /**
     * Default options.
     * @public
     */
    Animate.Defaults = {
        animateOut: false,
        animateIn: false
    };

    /**
     * Toggles the animation classes whenever an translations starts.
     * @protected
     * @returns {Boolean|undefined}
     */
    Animate.prototype.swap = function() {

        if (this.core.settings.items !== 1) {
            return;
        }

        if (!$.support.animation || !$.support.transition) {
            return;
        }

        this.core.speed(0);

        var left,
            clear = $.proxy(this.clear, this),
            previous = this.core.$stage.children().eq(this.previous),
            next = this.core.$stage.children().eq(this.next),
            incoming = this.core.settings.animateIn,
            outgoing = this.core.settings.animateOut;

        if (this.core.current() === this.previous) {
            return;
        }

        if (outgoing) {
            left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
            previous.one($.support.animation.end, clear)
                .css( { 'left': left + 'px' } )
                .addClass('animated owl-animated-out')
                .addClass(outgoing);
        }

        if (incoming) {
            next.one($.support.animation.end, clear)
                .addClass('animated owl-animated-in')
                .addClass(incoming);
        }
    };

    Animate.prototype.clear = function(e) {
        $(e.currentTarget).css( { 'left': '' } )
            .removeClass('animated owl-animated-out owl-animated-in')
            .removeClass(this.core.settings.animateIn)
            .removeClass(this.core.settings.animateOut);
        this.core.onTransitionEnd();
    };

    /**
     * Destroys the plugin.
     * @public
     */
    Animate.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this.core.$element.off(handler, this.handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);


    $.widget('magezon.slider', {
        options: {
            item_xs: 1,
            item_sm: 1,
            item_md: 1,
            item_lg: 1,
            item_xl: 1,
            items: 3,
            // loop: false,
            // center: false,
            // rewind: false,
            // checkVisibility: true,
            
            // mouseDrag: true,
            // touchDrag: true,
            // pullDrag: true,
            // freeDrag: false,
            
            // margin: 0,
            // stagePadding: 0,
            
            // merge: false,
            // mergeFit: true,
            // autoWidth: false,
            
            // startPosition: 0,
            // rtl: false,
            
            // smartSpeed: 250,
            // fluidSpeed: false,
            // dragEndSpeed: false,
            
            // responsive: {},
            // responsiveRefreshRate: 200,
            // responsiveBaseElement: window,
            
            // fallbackEasing: 'swing',
            // slideTransition: '',
            
            // info: false,
            
            // nestedItemSelector: false,
            // itemElement: 'div',
            // stageElement: 'div',
            
            // refreshClass: 'owl-refresh',
            // loadedClass: 'owl-loaded',
            // loadingClass: 'owl-loading',
            // rtlClass: 'owl-rtl',
            responsiveClass: 'owl-responsive',
            // dragClass: 'owl-drag',
            // itemClass: 'owl-item',
            // stageClass: 'owl-stage',
            // stageOuterClass: 'owl-stage-outer',
            // grabClass: 'owl-grab',
            // autoHeight: true,
            navText: ['<i class="fas mgz-fa-angle-left"/>','<i class="fas mgz-fa-angle-right"/>'],
            // animateOut: '',
            // animateIn: ''
        },

        _create: function () {

            var self = this;
            var options = this.options;

            var calculateHeights = function() {
                var sliderWidth = self.element.width();
                var sliderWidth = 1240;

                if (self.element.data( 'slider_width' )) {
                    sliderWidth = self.element.data( 'slider_width' );
                }

                var sliderHeight = parseInt( self.element.data( 'slider_height' ) );
                var aspectRatio = sliderHeight / sliderWidth;

                if ( aspectRatio < 0.5 ) aspectRatio = 0.5;

                var compareWidth = $('#maincontent').width();
                var compareWidth = self.element.closest('.mgz-element').width();
                sliderHeight = aspectRatio * compareWidth;

                if ( sliderHeight > parseInt( self.element.data( 'slider_height' ) ) ) {
                    sliderHeight = parseInt( self.element.data( 'slider_height' ) );
                }
                if ( sliderHeight < 200 ) {
                    sliderHeight = 200;
                }
                self.element.find('.mgz-carousel-item').height(sliderHeight);
            }
            calculateHeights();
            $( window ).on( 'resize orientationchange', calculateHeights );

            options['responsive'] = {
                0: {'items': parseInt(options.item_xs)},
                544: {'items': parseInt(options.item_sm)},
                768: {'items': parseInt(options.item_md)},
                992: {'items': parseInt(options.item_lg)},
                1200: {'items': parseInt(options.item_xl)}
            };
            
            function setAnimation ( _elem, _InOut ) {
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                _elem.each(function() {
                    var $elem = $(this);
                    var $animationType = 'animated ' + $elem.data( 'animate-' + _InOut );
                    var $animationDelay = $elem.data('animate-delay') ? $elem.data('animate-delay') + 's' : 0;
                    $elem.css('-webkit-animation-delay', $animationDelay)
                    .css('-moz-animation-delay', $animationDelay)
                    .css('-ms-animation-delay', $animationDelay)
                    .css('-o-animation-delay', $animationDelay)
                    .css('animation-delay', $animationDelay);
                    $elem.addClass($animationType).one(animationEndEvent, function () {
                        $elem.removeClass($animationType);
                    });
                });
            }

            var firstSlide   = this.element.find('.item:eq(0)');
            var $elemsToanim = firstSlide.find("[data-animate-in]");
            setAnimation ($elemsToanim, 'in');

            var playVideo = function() {
                var video = self.element.find(".active video");
                if (video.length && video.data('autoplay')) {
                    video.trigger('play');
                }
            }

            this.element.on('initialized.owl.carousel', function() {
                playVideo();
            });

            var owl = this.element.owlCarousel(options);

            owl.on('change.owl.carousel', function(event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animate-out]");
                setAnimation ($elemsToanim, 'out');
            });

            owl.on('changed.owl.carousel', function(event) {
                var $currentItem = $('.owl-item', owl).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animate-in]");
                setAnimation ($elemsToanim, 'in');
                self.element.find('.owl-item').removeClass('owl-fadeUp-out');
                playVideo();
            });

            if (options.owl_active) {
                owl.trigger("to.owl.carousel", [options.owl_active - 1, 0]);
            }
        }
    });

    return $.magezon.slider;
});