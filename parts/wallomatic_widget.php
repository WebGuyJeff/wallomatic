<?php


class wallomatic_widget extends WP_Widget {


    /**
     * Construct the wallOMatic widget.
     */
    function __construct() {

        $widget_options = array (
            'classname' => 'wallomatic_widget',
            'description' => 'An automatic wallpaper generating machine!'
        );
        parent::__construct( 'wallomatic_widget', 'WallOMatic', $widget_options );

    }


    /**
     * output wallOMatic widget settings form.
     */
    function form( $instance ) {

        $casecolour = ! empty( $instance['casecolour'] ) ? $instance['casecolour'] : '#3a5524';

        ?>
        <p>
        <label for="<?php echo $this->get_field_id( 'casecolour'); ?>">wallOMatic case colour</label>
        <input class="widefat" type="text" id="<?php echo $this->get_field_id( 'casecolour' ); ?>" name="<?php echo $this->get_field_name( 'casecolour' ); ?>" value="<?php echo esc_attr( $casecolour ); ?>" />
        </p>
        <?php
    }


    /**
     * display the wallOMatic widget on the front end.
     */
    function widget( $args, $instance ) {

        // enqueue the styles
        wp_enqueue_style('wallomatic_widget.css');

        //Check if a colour has been set in admin settings
        $casecolour = $instance['casecolour'];
        if ( ! empty( $casecolour ) ) {
            $inlinecolour = 'style="background-color:' . $casecolour . '"';
        };

        echo $args['before_widget'];
        ?>

        <div class="wallOMatic">
            <div class="wallOMatic_decotop jr--bronze"></div>
            <div class="wallOMatic_case" <?php echo $inlinecolour; ?> >
                <div class="wallOMatic_header">
                      <div class="wallOMatic_bulb"></div>
                      <span class="wallOMatic_name">Wall-O-Matic</span>
                </div>
                <div class="wallOMatic_gauge">
                    <span class="wallOMatic_okLabel">OK</span>
                    <span class="wallOMatic_warnLabel">Warn</span>
                </div>
                <div class="wallOMatic_gauge">
                    <span class="wallOMatic_needle"></span>
                </div>
                <div class="wallOMatic_gauge">
                    <span class="wallOMatic_needle"></span>
                </div>
                <div class="wallOMatic_panel jr--bronze-flat">
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <div class="rivet jr--bronze"></div>
                    <button class="wallOMatic_button"></button>
                </div>
            </div>
        </div>

        <?php
        echo $args['after_widget'];
    }


    /**
     * define the data saved by the wallOMatic widget.
     */
    function update( $new_instance, $old_instance ) {
        $instance = $old_instance;
        $instance['casecolour'] = strip_tags( $new_instance['casecolour'] );
        return $instance;
    }

} // Class wallomatic_widget end

/**
 * Register and load the wallOMatic widget.
 */
function wallomatic_load_widget() {
    register_widget( 'wallomatic_widget' );
}
add_action( 'widgets_init', 'wallomatic_load_widget' );
