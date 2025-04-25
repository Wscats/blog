define([
 	'jquery',
 	'jarallax',
 	'jarallaxVideo',
], function ($) {

	var $wnd = $(window);
	var $doc = $(document);
	
	var throttle = function ( delay, noTrailing, callback, debounceMode ) {
		/*
		 * After wrapper has stopped being called, this timeout ensures that
		 * `callback` is executed at the proper times in `throttle` and `end`
		 * debounce modes.
		 */
		var timeoutID;
		var cancelled = false;

		// Keep track of the last time `callback` was executed.
		var lastExec = 0;

		// Function to clear existing timeout
		function clearExistingTimeout () {
			if ( timeoutID ) {
				clearTimeout(timeoutID);
			}
		}

		// Function to cancel next exec
		function cancel () {
			clearExistingTimeout();
			cancelled = true;
		}


		// `noTrailing` defaults to falsy.
		if ( typeof noTrailing !== 'boolean' ) {
			debounceMode = callback;
			callback = noTrailing;
			noTrailing = undefined;
		}

		/*
		 * The `wrapper` function encapsulates all of the throttling / debouncing
		 * functionality and when executed will limit the rate at which `callback`
		 * is executed.
		 */
		function wrapper () {

			var self = this;
			var elapsed = Date.now() - lastExec;
			var args = arguments;

			if (cancelled) {
				return;
			}

			// Execute `callback` and update the `lastExec` timestamp.
			function exec () {
				lastExec = Date.now();
				callback.apply(self, args);
			}

			/*
			 * If `debounceMode` is true (at begin) this is used to clear the flag
			 * to allow future `callback` executions.
			 */
			function clear () {
				timeoutID = undefined;
			}

			if ( debounceMode && !timeoutID ) {
				/*
				 * Since `wrapper` is being called for the first time and
				 * `debounceMode` is true (at begin), execute `callback`.
				 */
				exec();
			}

			clearExistingTimeout();

			if ( debounceMode === undefined && elapsed > delay ) {
				/*
				 * In throttle mode, if `delay` time has been exceeded, execute
				 * `callback`.
				 */
				exec();

			} else if ( noTrailing !== true ) {
				/*
				 * In trailing throttle mode, since `delay` time has not been
				 * exceeded, schedule `callback` to execute `delay` ms after most
				 * recent execution.
				 *
				 * If `debounceMode` is true (at begin), schedule `clear` to execute
				 * after `delay` ms.
				 *
				 * If `debounceMode` is false (at end), schedule `callback` to
				 * execute after `delay` ms.
				 */
				timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
			}

		}

		wrapper.cancel = cancel;

		// Return the wrapper function.
		return wrapper;

	}

	var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);

	var wndW = 0;
	var wndH = 0;
		wndW = $wnd.width();
		wndH = $wnd.height();
	$wnd.on( 'resize load orientationchange', function() {
		wndW = $wnd.width();
	    wndH = $wnd.height();
	});

	/**
	 * In Viewport checker
	 * return visible percent from 0 to 1
	 *
	 * @param {Object} $item - jQuery object.
	 * @param {Bool} returnRect - return array with result and rect.
	 *
	 * @return {Mixed} - in viewport flag.
	 */
	function isInViewport( $item, returnRect ) {
	    var rect = $item[ 0 ].getBoundingClientRect();
	    var result = 1;

	    if ( rect.right <= 0 || rect.left >= wndW ) {
	        result = 0;
	    } else if ( rect.bottom < 0 && rect.top <= wndH ) {
	        result = 0;
	    } else {
	        var beforeTopEnd = Math.max( 0, rect.height + rect.top );
	        var beforeBottomEnd = Math.max( 0, rect.height - ( rect.top + rect.height - wndH ) );
	        var afterTop = Math.max( 0, -rect.top );
	        var beforeBottom = Math.max( 0, rect.top + rect.height - wndH );

	        if ( rect.height < wndH ) {
	            result = 1 - ( ( afterTop || beforeBottom ) / rect.height );
	        } else if ( beforeTopEnd <= wndH ) {
	            result = beforeTopEnd / wndH;
	        } else if ( beforeBottomEnd <= wndH ) {
	            result = beforeBottomEnd / wndH;
	        }
	        result = result < 0 ? 0 : result;
	    }
	    if ( returnRect ) {
	        return [ result, rect ];
	    }
	    return result;
	}


	/**
	 * Mouse Parallax
	 */
	var $parallaxMouseList = false;
	var parallaxMouseTimeout;
	var parallaxMouseFirstRun = 1;

	// run parallax animation
	function parallaxMouseRun( x, y, deviceOrientation ) {
	    var data;
	    var itemX;
	    var itemY;
	    $parallaxMouseList.each( function() {
	        var $this = $( this );
	        data = $this.data( 'parallax-mouse-data' );

	        // don't animate if block isn't in viewport
	        if ( typeof data !== 'object' || ( ! data.is_in_viewport && ! ( deviceOrientation && parallaxMouseFirstRun ) ) ) {
	            return;
	        }

	        // device acceleration calculate
	        if ( deviceOrientation ) {
	            itemX = -data.size * x;
	            itemY = -data.size * y;

	        // mouse calculate
	        } else {
	            itemX = ( data.rect.width - ( x - data.rect.left ) ) / data.rect.width;
	            itemY = ( data.rect.height - ( y - data.rect.top ) ) / data.rect.height;
	            if ( itemX > 1 || itemX < 0 || itemY > 1 || itemY < 0 ) {
	                itemX = 0.5;
	                itemY = 0.5;
	            }
	            itemX = data.size * ( itemX - 0.5 ) * 2;
	            itemY = data.size * ( itemY - 0.5 ) * 2;
	        }

	        // if first run orientation on device, set default values without animation
	        if ( deviceOrientation && parallaxMouseFirstRun ) {
	            $this.css( {
	                transform: `translateX(${ itemX }px) translateY(${ itemY }px) translateZ(0)`,
	            } );
	        } else {
	            $this.css( {
	                transition: `transform ${ deviceOrientation ? 2 : data.speed }s  cubic-bezier(0.22, 0.63, 0.6, 0.88)`,
	                transform: `translateX(${ itemX }px) translateY(${ itemY }px) translateZ(0)`,
	            } );
	        }
	    } );
	    parallaxMouseFirstRun = 0;
	}
	var throttledParallaxMouseRun = throttle( 200, ( x, y, deviceOrientation ) => {
	    parallaxMouseRun( x, y, deviceOrientation );
	});

	window.mgzParallaxMouse = function ( force ) {
	    function run() {
	        var $newParallax = $( '.mgz-parallax.mgz-parallax-mouse-parallax' ).children( '.mgz-parallax-inner' );
	        if ( $newParallax.length ) {
	            // add new parallax blocks
	            if ( $parallaxMouseList ) {
	                $parallaxMouseList = $newParallax;

	                // first init parallax
	            } else {
	                $parallaxMouseList = $newParallax;

	                if ( isMobile && window.DeviceOrientationEvent ) {
	                    $wnd.on( 'deviceorientation', ( event ) => {
	                        throttledParallaxMouseRun( event.originalEvent.gamma / 90, event.originalEvent.beta / 180, true );
	                    } );

	                // no smooth on firefox
	                } else {
	                    $wnd.on( 'mousemove', ( event ) => {
	                        throttledParallaxMouseRun( event.clientX, event.clientY );
	                    } );
	                }
	            }
	        }

	        // update data for parallax blocks
	        if ( $parallaxMouseList ) {
	            $parallaxMouseList.each( function() {
					var $this   = $( this );
					var $elem   = $( this ).closest('.mgz-element');
					var $parent = $this.parent();
					var size    = parseFloat( $parent.attr( 'data-parallax-mouse-parallax-size' ) ) || 30;
					var speed   = parseFloat( $parent.attr( 'data-parallax-mouse-parallax-speed' ) ) || 10000;
	                $this.data( 'parallax-mouse-data', {
	                    is_in_viewport: isInViewport( $parent ) ? $elem.is( ':visible' ) : 0,
	                    rect: $parent[ 0 ].getBoundingClientRect(),
	                    size,
	                    speed: speed / 1000,
	                } );
	                $this.css( {
	                    left: -size,
	                    right: -size,
	                    top: -size,
	                    bottom: -size,
	                } );
	            } );
	        }
	    }

	    // run force without timeout
	    clearTimeout( parallaxMouseTimeout );
	    if ( force ) {
	        run();
	    } else {
	        parallaxMouseTimeout = setTimeout( parallaxMouseTimeout, 100 );
	    }
	}
	$wnd.on( 'resize scroll orientationchange load', window.mgzParallaxMouse );

	setInterval( window.mgzParallaxMouse, 3000 );

	$(document).find('.mgz-parallax').each(function(index, el) {
		var $this           = $( this );
		var backgroundType  = $this.attr( 'data-background-type' );
		var imageBgSize     = $this.attr( 'data-parallax-image-background-size' );
		var imageBgPosition = $this.attr( 'data-parallax-image-background-position' );
		var video           = false;
		var videoStartTime  = 0;
		var videoEndTime    = 0;
		var videoVolume     = 0;
		var videoLoop       = true;
		var videoAlwaysPlay = true;
		var videoMobile     = false;
		var parallax        = $this.attr( 'data-parallax-type' );
		var parallaxSpeed   = $this.attr( 'data-parallax-speed' );
		var parallaxMobile  = $this.attr( 'data-parallax-mobile' ) === 'true' || $this.attr( 'data-parallax-mobile' ) === '1';

        // video type
        if ( backgroundType === 'yt_vm_video' || backgroundType === 'video' ) {
			video           = $this.attr( 'data-parallax-video' );
			videoStartTime  = parseFloat( $this.attr( 'data-parallax-video-start-time' ) ) || 0;
			videoEndTime    = parseFloat( $this.attr( 'data-parallax-video-end-time' ) ) || 0;
			videoVolume     = parseFloat( $this.attr( 'data-parallax-video-volume' ) ) || 0;
			videoLoop       = $this.attr( 'data-parallax-video-loop' ) !== 'false';
			videoAlwaysPlay = $this.attr( 'data-parallax-video-always-play' ) === 'true';
			videoMobile     = $this.attr( 'data-parallax-video-mobile' ) === '1' || $this.attr( 'data-parallax-video-mobile' ) === 'true';

            if ( video && ! parallax && ! parallaxSpeed ) {
				parallax       = 'scroll';
				parallaxSpeed  = 1;
				parallaxMobile = videoMobile;
            }
        }

        // prevent if no parallax and no video
        if ( ! parallax && ! video ) return;

        var jarallaxParams = {
        	automaticResize: true,
        	type: parallax,
        	speed: parallaxSpeed,
        	disableParallax() {
        		return parallaxMobile ? false : isMobile;
        	},
        	disableVideo() {
        		return videoMobile ? false : isMobile;
        	},
        	imgSize: imageBgSize || 'cover',
        	imgPosition: imageBgPosition || '50% 50%',
        };

        if ( imageBgSize === 'pattern' ) {
			jarallaxParams.imgSize   = 'auto';
			jarallaxParams.imgRepeat = 'repeat';
        }

        if ( video ) {
			jarallaxParams.speed                = parallax ? parallaxSpeed : 1;
			jarallaxParams.videoSrc             = video;
			jarallaxParams.videoStartTime       = videoStartTime;
			jarallaxParams.videoEndTime         = videoEndTime;
			jarallaxParams.videoVolume          = videoVolume;
			jarallaxParams.videoLoop            = videoLoop;
			jarallaxParams.videoPlayOnlyVisible = ! videoAlwaysPlay;
        }
		jarallax($this.children( '.mgz-parallax-inner' ), jarallaxParams);
	});
});