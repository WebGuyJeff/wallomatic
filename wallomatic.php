<?php
/**
 * Plugin Name: wallOMatic
 * Plugin URI: https://jeffersonreal.com
 * Description: The Automatic Wallpaper Machine!
 * Version: 0.2
 * Author: Jefferson Real
 * Author URI: https://jeffersonreal.com
 * License: GPL2
 *
 * @package wallomatic
 * @author Jefferson Real <me@jeffersonreal.com>
 * @copyright Copyright (c) 2021, Jefferson Real
 * @license GPL2+
 */

/**
 * wallOMatic randomly generates wallpaper on load.
 *
 * Builds a randomly generated wallpaper on each page load or by manual operation
 * via the wallOMatic widget. Builds a pattern array of CSS shapes using the params
 * provided.
 *
 * @return void
 */

/**
 * Register the wallOMatic the wallOMatic scripts and styles
 */
function wallomatic_scriptsNstyles() {
    wp_register_script( 'wallomatic.js', plugins_url ( 'js/wallomatic.js', __FILE__ ), array( 'jquery' ), '0.5', true );
    wp_register_style( 'wallomatic_wall.css', plugins_url ( 'css/wallomatic_wall.css', __FILE__ ), array(), '0.5', 'all' );
    wp_register_style( 'wallomatic_widget.css', plugins_url ( 'css/wallomatic_widget.css', __FILE__ ), array(), '0.5', 'all' );
}
add_action( 'wp_enqueue_scripts', 'wallomatic_scriptsNstyles' );


/**
* Init the wallOMatic widget
*/
include( plugin_dir_path( __FILE__ ) . 'parts/wallomatic_widget.php');


function shortcode_wallomatic() {
    //enqueue contact form and styles
	wp_enqueue_script( 'wallomatic.js');
	wp_enqueue_style( 'wallomatic_wall.css');
    //include the form template with the widget vars
    //custom function defined in wallomatic.php
}
add_shortcode( 'wallomatic', 'shortcode_wallomatic' );
