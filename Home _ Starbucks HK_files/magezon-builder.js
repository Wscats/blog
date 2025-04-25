define([
	'jquery',
	'Magezon_Builder/js/vimeo/player',
	'Magezon_Builder/js/parallax',
    'Magezon_Builder/js/responsive-typography',
    'Magezon_Core/js/jquery.magnific-popup.min',
	'waypoints'
], function ($, Vimeo) {

	var mgzInit = function() {

		var height = $(window).height();
		$(document).find('.mgz-row-full-height').each(function(index, el) {
			$(this).css('min-height', height);
			$(this).children('.mgz-element-inner').css('min-height', height);
			$(this).children().children('.mgz-element-row-content').css('min-height', height);
		});

		// ANIMATION
		if ($(".mgz-animated:not(.mgz_start_animation)").length) {
			$(".mgz-animated:not(.mgz_start_animation)").waypoint(function() {
				var self = this;
				var delayTime = 0;
				if ($(this.element).data('animation-delay')) {
					delayTime = $(this.element).data('animation-delay');
				}
				var durationTime = 0;
				if ($(this.element).data('animation-duration')) {
					durationTime = $(this.element).data('animation-duration');
				}
				if (durationTime) $(self.element).css("animation-duration", durationTime + 's');
				setTimeout(function() {
					$(self.element).addClass("mgz_start_animation animated")
				}, delayTime * 1000);
			}, {
				offset: "85%"
			});
		}

		// WAYPOINT
		if ($(".mgz-waypoint").length) {
			$(".mgz-waypoint").waypoint(function() {
				if (!$(this.element).hasClass('mgz-animation-applied')) {
					$(this.element).trigger('mgz:animation:run');
					$(this.element).addClass('mgz-animation-applied');
				}
			}, {
				offset: "85%",
				triggerOnce: true
			});
		}

		$('.magezon-builder').find('.mgz-magnific-link').each(function(index, el) {
			var type = $(this).data('type') ? $(this).data('type') : 'image';
			var options = {
				type: type,
				mainClass: $(this).data('main-class'),
		        removalDelay: 300,
		        fixedContentPos: true,
		        fixedBgPos: true,
		        image: {
					verticalFit: true
				}
			}

			if ($(this).data('zoom')) {
				if (options['mainClass']) {
					options['mainClass'] += ' mfp-no-margins mfp-with-zoom';
				} else {
					options['mainClass'] = 'mfp-no-margins mfp-with-zoom';
				}
				options['zoom'] = {
					enabled: true,
					duration: 300
				};
			}

			$(this).magnificPopup(options);
		});

		$('.magezon-builder').find('.mgz-magnific-gallery').each(function(index, el) {
			var options = {
				delegate: 'a',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mgz-mfp',
				fixedContentPos: true,
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1]
				}
			}
			$(this).magnificPopup(options);
		});

		$('.magezon-builder').find('.mgz-magnific').each(function(index, el) {
			var type = $(this).data('type') ? $(this).data('type') : 'image';
			var options = {};

			switch (type) {
				case 'gallery':
					var delegate = 'a';
					options = {
						delegate: delegate,
						type: 'image',
						tLoading: 'Loading image #%curr%...',
						mainClass: 'mgz-mfp',
						fixedContentPos: true,
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0,1]
						},
						iframe: {
							markup: '<div class="mfp-iframe-scaler">'+
							'<div class="mfp-close"></div>'+
							'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							'<div class="mfp-title"></div>' +
							'<div class="mfp-counter"></div>' +
							'</div>',
							patterns: {
								youtube: {
									index: 'youtube.com/',
									id: 'v=',
									src: 'http://www.youtube.com/embed/%id%?rel=0&autoplay=1'
								}
							}
						},
						callbacks: {
							elementParse: function(item) {
								if (item.el.data('type')) {
									item.type = item.el.data('type');
								}
							},

							markupParse: function(template, values, item) {
								values.title = item.el.attr('title');
							}
						}
					}
					break;

				default:
					options = {
						type: type,
						mainClass: $(this).data('main-class'),
						removalDelay: 300,
						fixedContentPos: true,
						image: {
							verticalFit: true
						},
						image: {
							titleSrc: function(item) {
								var title = item.el.attr('title');
								if (item.el.data('title')) {
									title = item.el.data('title');
								}
								return title;
							}
						}
					}
					if ($(this).data('zoom')) {
						options['zoom'] = {
							enabled: true,
							duration: 300
						};
					}
					break;
			}

			if ($(this).data('zoom')) {
				if (options['mainClass']) {
					options['mainClass'] += ' mfp-no-margins mfp-with-zoom';
				} else {
					options['mainClass'] = 'mfp-no-margins mfp-with-zoom';
				}
				options['zoom'] = {
					enabled: true,
					duration: 300
				};
			}

			$(this).click(function(e) {
				e.preventDefault();
			});
			$(this).magnificPopup(options);
		});

		$('.mgz-magnific').on('click', function() {
			return false;
		});

		$('.mgz-element-single_image .image-content').click(function(event) {
			$(this).siblings('a')[0].click();
		});

		$('.mgz-element-single_image .mgz-single-image-inner').hover(function() {
			var img = $(this).find('img');
			if (img.data('hover')) {
				var src = img.attr('src');
				img.data('src', src);
				img.attr('src', img.data('hover'));
			}
		}, function() {
			var img = $(this).find('img');
			if (img.data('src')) {
				var src = img.data('src');
				img.attr('src', src);	
			}
		});
	}
	$('body').on('magezonBuilderLoaded', mgzInit);
	$(document).on('mgz:init', mgzInit);
	$('body').trigger('magezonBuilderLoaded');
	jQuery(document).ready(function($) {
		$('.magezon-builder').removeClass('magezon-builder-preload');
	});
});