define([
	'jquery'
], function ($) {

	// Source: https://gist.github.com/sulmanpucit/9b4db482fd3201e14e8686465d011def

	// Calculate the responsive type values for font size and line height for all heading tags
	var calculateResponsiveTypeValues = function( $siteWidth, $customSensitivity, $customMinimumFontSizeFactor, $customMobileBreakPoint, $elements ) {

		// Setup options
		var $sensitivity           = $customSensitivity || 1,
		    $minimumFontSizeFactor = $customMinimumFontSizeFactor || 1.5,
		    $bodyFontSize          = parseInt( jQuery( 'body' ).css( 'font-size' ) ),
		    $minimumFontSize       = $bodyFontSize * $minimumFontSizeFactor,
		    $mobileBreakPoint      = ( $customMobileBreakPoint || 0 === $customMobileBreakPoint ) ? $customMobileBreakPoint : 800,
		    $windowSiteWidthRatio,
		    $resizeFactor;

		var calculateValues = function() {
			var $siteWidth;

			// Get the site width for responsive type
			if ( jQuery( window ).width() >= $mobileBreakPoint ) {

			// If we are below $mobileBreakPoint of viewport width, set $mobileBreakPoint as site width
			} else {
				$siteWidth = $mobileBreakPoint;
			}

			// The resizing factor can be finetuned through a custom sensitivity; values below 1 decrease resizing speed
			$windowSiteWidthRatio = jQuery( window ).width() / $siteWidth;
			$resizeFactor         = 1 - ( ( 1 - $windowSiteWidthRatio ) * $sensitivity );

			// If window width is smaller than site width then let's adjust the headings
			if ( jQuery( window ).width() <= $siteWidth ) {

				// Loop over all heading tegs
				jQuery( $elements ).each( function() {

					// Only decrease font-size if the we stay above $minimumFontSize
					if ( jQuery( this ).data( 'fontsize' ) * $resizeFactor > $minimumFontSize ) {
						jQuery( this ).css( {
							'font-size': Math.round( jQuery( this ).data( 'fontsize' ) * $resizeFactor * 1000 ) / 1000,
							'line-height': ( Math.round( jQuery( this ).data( 'lineheight' ) * $resizeFactor * 1000 ) / 1000 ) + 'px'
						});

					// If decreased font size would become too small, natural font size is above $minimumFontSize, set font size to $minimumFontSize
					} else if ( jQuery( this ).data( 'fontsize' ) > $minimumFontSize ) {
						jQuery( this ).css( {
							'font-size': $minimumFontSize,
							'line-height': ( Math.round( jQuery( this ).data( 'lineheight' ) * $minimumFontSize / jQuery( this ).data( 'fontsize' ) * 1000 ) / 1000 ) + 'px'
						});
					}
				});

			// If window width is larger than site width, delete any resizing styles
			} else {
				jQuery( $elements ).each( function() {

					// If initially an inline font size was set, restore it
					if ( jQuery( this ).data( 'inline-fontsize' ) ) {
						jQuery( this ).css( 'font-size', jQuery( this ).data( 'fontsize' ) );

					// Otherwise remove inline font size
					} else {
						jQuery( this ).css( 'font-size', '' );
					}

					// If initially an inline line height was set, restore it
					if ( jQuery( this ).data( 'inline-lineheight' ) ) {
						jQuery( this ).css( 'line-height', jQuery( this ).data( 'lineheight' ) + 'px' );

					// Otherwise remove inline line height
					} else {
						jQuery( this ).css( 'line-height', '' );
					}

				});
			}
		};

		calculateValues();

		jQuery( window ).on( 'resize orientationchange', calculateValues );
	};

	var elements = $('*[data-inline-fontsize=true]');
	calculateResponsiveTypeValues( 1240, true, 1.15, 768, elements);

	jQuery( window ).on( 'mgzResponsiveTypography', function() {
		var elements = $('*[data-inline-fontsize=true]');
		calculateResponsiveTypeValues( 1240, true, 1.15, 768, elements);		
	} );
});