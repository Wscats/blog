define([
	'jquery',
	'Magezon_Builder/js/vimeo/player'
], function ($, Vimeo) {

	$('.mgz-element-toggle').on('click', '.mgz-toggle-title > span', function(event) {
		$(this).siblings().trigger('click');
	});

	var playvideo = function(element) {
		element.click(function(e) {
			var parent = element.closest('.mgz-video');
			var iframe = parent.find('iframe');
			var video  = parent.find('video');
			if (iframe.length) {
				var videoUrl = iframe.data('src');
				if (videoUrl) {
					iframe.attr('src', videoUrl);
				}
				if (videoUrl) {
					videoUrl += "&autoplay=1";
					iframe.attr('src', videoUrl);
					if (videoUrl.indexOf("vimeo") !=-1) {
						var player = new Vimeo(iframe);
						player.play();
					}
				}
				parent.find('.mgz-video-image-overlay').remove();
			}
			if (video.length) {
				parent.find('.mgz-video-image-overlay').remove();
				video.trigger('play');
			}
		});
	}

	var calFlipboxHeight = function() {
		var maxHeight;
		$(document).find('.mgz-flipbox').each(function(index, el) {
			maxHeight = 0;
			$(this).find('.mgz-flipbox-block-inner').each(function(index, el) {
				if ($(this).height() > maxHeight) {
					maxHeight = $(this).outerHeight();
				}
			});
			if ($(this).data('min-height') && maxHeight < $(this).attr('data-min-height')) {
				maxHeight = $(this).attr('data-min-height');
			}
			$(this).children('.mgz-flipbox-inner').height(maxHeight);
		});
	}

	function commonFunctions() {
		$('.mgz-review-content-more').on('click', function(e) {
			e.preventDefault();
			var parent = $(this).closest('.mgz-review-content');
			var owl = $(this).closest('.owl-carousel');
			parent.find('.mgz-review-content-short').remove();
			parent.find('.mgz-review-content-full').show();
			owl.trigger('refresh.owl.carousel')
		});

		$(document).find('.mgz-video-image-overlay').each(function(index, el) {
			if ($(this).children('i').length) {
				$(this).children('i').click(function(event) {
					playvideo($(this).children('i'));
				});
			} else {
				playvideo($(this));
			}
		});

		$('.mgz-element-single_image .mgz-single-image-caption').on('click', function() {
			$(this).siblings('a').trigger('click');
		});

		$('.mgz-single-image-caption').click(function(event) {
			$(this).siblings('a')[0].click();
		});

		$('.mgz-element-image_carousel .item-content').click(function(event) {
			if($(this).siblings('a').length) $(this).siblings('a')[0].click();
		});
	}

	$(window).on('resize', function() {
		calFlipboxHeight();
	}).resize();

	$('body').on('magezonPageBuilderUpdated', function() {
		calFlipboxHeight();
		commonFunctions();
	});

	$('body').on('magezonBuilderLoaded', commonFunctions);
});