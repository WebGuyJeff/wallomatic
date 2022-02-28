<?php
/**
 * Wallomatic - Widget
 *
 * @package wallomatic
 * @author Jefferson Real <me@jeffersonreal.com>
 * @copyright Copyright (c) 2021, Jefferson Real
 * @license GPL2+
 * @link https://jeffersonreal.com
 */


class Wallomatic_Widget extends WP_Widget {


    /**
     * Construct the widget.
     */
    function __construct() {

        $widget_options = array (
            'classname' => 'wallomatic_widget',
            'description' => 'An automatic wallpaper generating machine!'
        );
        parent::__construct( 'wallomatic_widget', 'WallOMatic', $widget_options );
        /* second arg is name as it appears in widget picker */
    }


    /**
     * output widget settings form.
     */
    function form( $instance ) {

        $casecolour = ! empty( $instance['casecolour'] ) ? $instance['casecolour'] : '#3a5524';

        ?>
        <p>
        <label for="<?php echo $this->get_field_id( 'casecolour'); ?>">wallomatic case colour</label>
        <input class="widefat" type="text" id="<?php echo $this->get_field_id( 'casecolour' ); ?>" name="<?php echo $this->get_field_name( 'casecolour' ); ?>" value="<?php echo esc_attr( $casecolour ); ?>" />
        </p>
        <?php
    }


    /**
     * display the widget on the front end.
     */
    function widget( $args, $instance ) {

        // enqueue the styles
        wp_enqueue_style('wallomatic_widget_css');

        //Check if a colour has been set in admin settings
        $casecolour = $instance['casecolour'];
        if ( ! empty( $casecolour ) ) {
            $inlinecolour = 'style="background-color:' . $casecolour . '"';
        };

        echo $args['before_widget'];
        ?>

        <div class="wallomatic">
            <div class="wallomatic_decotop jr--bronze"></div>
            <div class="wallomatic_case" <?php echo $inlinecolour; ?> >
                <div class="wallomatic_header">
                      <div class="wallomatic_bulb"></div>
                      <span class="wallomatic_name">Wall-O-Matic</span>
                </div>
                <div class="wallomatic_gauge">
                    <span class="wallomatic_okLabel">OK</span>
                    <span class="wallomatic_warnLabel">Warn</span>
                </div>
                <div class="wallomatic_gauge">
                    <span class="wallomatic_needle"></span>
                </div>
                <div class="wallomatic_gauge">
                    <span class="wallomatic_needle"></span>
                </div>
                <div class="wallomatic_panel jr--bronze-flat">
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <button class="wallomatic_button"></button>
                </div>
            </div>
        </div>

        <?php
        echo $args['after_widget'];
    }


    /**
     * define the data saved by the widget.
     */
    function update( $new_instance, $old_instance ) {
        $instance = $old_instance;
        $instance['casecolour'] = strip_tags( $new_instance['casecolour'] );
        return $instance;
    }

} // Class Wallomatic_Widget end

/**
 * Register and load the widget.
 */
function wallomatic_load_widget() {
    register_widget( 'wallomatic_widget' );
}
add_action( 'widgets_init', 'wallomatic_load_widget' );
