<?php
/**
 * Plugin Name:     CTX Blocks 
 * Description:     Additional Blocks for Gutenberg
 * Version:         3.1.6
 * Requires at least: 6.7
 * Requires PHP:      8.4
 * Author:          Thomas Gollenia
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ctx-blocks
 *
 * @package         create-block
 */

/**
 * New Block registration making use of the new block.json format.
 */
function ctx_block_init() {

	$dir = __DIR__ . "/build/";

	if ( ! file_exists( $dir . "index.asset.php" ) ) {
		  return;
	}

	$script_asset = require( $dir . "index.asset.php" );

	if(is_admin()) {
		wp_register_script(
			"ctx-blocks-editor",
			plugins_url( '/build/index.js', __FILE__ ),
			$script_asset['dependencies'],
			$script_asset['version']
		);
		wp_set_script_translations( "ctx-blocks-editor", 'ctx-blocks', plugin_dir_path( __FILE__ ) . 'languages' );
		
		wp_register_style(
			"ctx-blocks-editor-style",
			plugins_url( 'build/index.css', __FILE__ ),
			array(),
			$script_asset['version']
		);
	}

	if(!is_admin()) {
		wp_register_style(
			"ctx-blocks-style",
			plugins_url( 'build/style-index.css', __FILE__ ),
			array(),
			$script_asset['version']
		);
		wp_enqueue_script('ctx-blocks-frontend', plugin_dir_url(__FILE__) . "build/frontend.js", [], false, true);
		wp_enqueue_style('ctx-blocks-frontend', plugin_dir_url(__FILE__) . "build/frontend.css", [], false);
	}


	$blocks = [
		'card',
		'button',
		'conditional',
		'description-item',
		'description-list',
		'grid-column',
		'grid-row',
		'progress',
		'svg',
		'section',
		'image'
	];

	foreach($blocks as $block) {
		register_block_type( __DIR__ . '/build/blocks/'.$block );
	}
	
}

add_action( 'init', 'ctx_block_init' );


require_once __DIR__ . '/lib/Posts.php';
require_once __DIR__ . '/lib/Update.php';

function ctx_blocks_load_textdomain() {
	load_plugin_textdomain('ctx-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}
add_action( 'plugins_loaded', 'ctx_blocks_load_textdomain' );



function modify_render_block_defaults($block_content, $block, $instance) {
	if($block['blockName'] !== "core/latest-posts" || !$block['attrs']['animateOnScroll']) {
		return $block_content;
	}
	
	$block_content = str_replace('<ul class="wp-block-latest-posts__list', '<ul class="wp-block-latest-posts__list ctx-animate-children ctx-' . $block['attrs']['animationType'] . ' ', $block_content);
	
    return $block_content; 

}

add_filter( "render_block", "modify_render_block_defaults", 10, 3 );


function ctx_add_class_to_list_block( $block_content, $block ) {

    if ( 'core/list' === $block['blockName'] ) {
        $block_content = new WP_HTML_Tag_Processor( $block_content );
        $block_content->next_tag(); /* first tag should always be ul or ol */
        $block_content->add_class( 'core-block' );
        $block_content->get_updated_html();
    }

    return $block_content;
}
add_filter( 'render_block', 'ctx_add_class_to_list_block', 10, 2 );

new \Contexis\Blocks\Update(
	__FILE__,
	'gollenia',
	'ctx-blocks'
);