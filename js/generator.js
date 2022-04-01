/**
 * Wallomatic - Generator Script
 *
 * This script calculates and builds the child elements before inserting into DOM.
 *
 * @package wallomatic
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2021, Jefferson Real
 * @license GPL2+
 * @link https://jeffersonreal.uk
 */

( function wallomatic_plugin() {
"use strict";

	const wall = document.createElement( 'div' );
	wall.setAttribute('class', 'wallomatic_wall');
	wall.setAttribute('style', 'position: fixed; top: -10em; height: calc(100% + 20em);');
	wall.innerHTML = '<div class="wallomatic_overlay"></div>';

	let generate = function() {

		/**
		 * Plugin settings.
		 * 
		 * These will eventually be exposed to the user via UI setting controls.
		 * 
		 */
		const columns		= Math.floor( ( Math.random() * ( 16 - 6 + 1 ) ) + 6 );
		const cellAspect  = 0.50;
		const radius	  	= ( Math.floor( ( Math.random() * 20 ) + 1 + 1 ) ) / 10;
		const skewX	   	= Math.floor( ( Math.random() * ( 40 - 10 + 1 ) ) + 10 );
		const skewY	   	= Math.floor( ( Math.random() * ( 40 - 10 + 1 ) ) + 10 );
		const colours	 	= [ "#fd6a42", "#b1e8f2", "#ffb908", "#fff" ];

		const cellWidth = parseFloat( 100 / columns ).toFixed( 2 );
		let cellHeight = parseFloat( ( wall.offsetWidth / columns ) * cellAspect ).toFixed( 2 );
		let rowCurrent = 0;
		let right = 0;
		let bottom = 0;
		let rowColours = [];
		let resizeTimer = null;

		const head = document.querySelector( 'head' );
		head.insertAdjacentHTML( "beforeend", "<style>.wallomatic_cell{width:" + cellWidth + "%;height:" + cellHeight + "px;border-radius:" + radius + "rem;transform:skew(" + skewY + "deg," + skewX + "deg)}.wallomatic_cell:nth-child(odd){transform:skew(-" + skewY + "deg,-" + skewX + "deg);}</style>" );

		let wallomatic_colours = ( array ) => {
			let colourPool = [];
			function removeFromPool( a ) {
				let r = colourPool.indexOf( a );
				colourPool.splice( r, 1 );
				return;
			}
			for ( let n = 0; n < ( columns ); n++ ) {
				colourPool = Array.from( colours );
				if ( colourPool.indexOf( array[ n ] ) !== -1 ) {
					removeFromPool( array[ n ] );
				}
				if ( colourPool.indexOf( array[ n - 1 ] ) !== -1 ) {
					removeFromPool( array[ n - 1 ] );
				}
				array[ n ] = colourPool[ Math.floor( Math.random() * colourPool.length ) ];
			}
		}

		let wallomatic_grid = () => {
			let containerHeight = wall.offsetHeight;
			let rowQty = Math.ceil( containerHeight / cellHeight );
			if ( rowQty > rowCurrent ) {
				let rowDeficit = rowQty - rowCurrent;
					if ( rowDeficit > 250 ) { /* Deficit error threshold */
						console.log( "wallomatic [Error] Deficit threshold exceeded, aborting." );
						return;
					}
					for ( let i = 0; i < rowDeficit; i++ ) {
						right = 0;
						wallomatic_colours( rowColours );
						for ( let i = 0; i < columns; i++ ) {
							wall.insertAdjacentHTML( "beforeend", "<div class=\"wallomatic_cell\" style=\"right:" + right + "%;bottom:" + bottom + "px;background: " + rowColours[i] + ";\"></div>");
							right = parseFloat( ( ( +right ) + ( +cellWidth ) ).toFixed( 1 ) );
						}
						bottom = parseFloat( ( ( +bottom ) + ( +cellHeight ) ).toFixed( 1 ) );
					}
					rowCurrent = rowCurrent + rowDeficit;
					//console.log("Wallomatic [Notice] Built " + rowDeficit + " rows. Current grid " + columns + " x " + rowCurrent + ", " + (columns * rowCurrent) + " cells.");
			}
		};
		wallomatic_grid();

		const resized = () => {
			if( resizeTimer !== null ) window.clearTimeout( resizeTimer );
			resizeTimer = window.setTimeout( () => {
				wallomatic_grid();
			}, 100);
		};
		window.onresize = resized;
	};

	
	/**
	 * Clean up wall children and build a new grid (new wallpaper pattern).
	 *
	 */
	const dump_cells = () => {
		return new Promise ( ( resolve ) => {
			while ( wall.childNodes.length > 1 ) {
				wall.removeChild( wall.lastChild );
				if ( wall.childNodes.length === 1 ) resolve( 'no more cells' );
			}
		} );
	};
	const new_wall = async () => {
		await dump_cells();
		generate();
	};


	/**
	 * If the widget exists, add a listener to the button.
	 *
	 */
	const widget_button = document.querySelector( '.wallomatic_button' );
	if( widget_button ) widget_button.addEventListener( 'click', new_wall );


	/**
	 * Poll for doc ready state, then append wall and generate.
	 *
	 */
	let init = setInterval( () => {
		if( document.readyState === 'complete' ) {
			clearInterval( init );
			document.body.appendChild( wall );
			if( !!document.querySelector( '.wallomatic_wall' ) ){
				generate();
			}
		}
	}, 100);

})();