<?php
/**
 * Plugin Name:     CTX Blocks 
 * Description:     Additional Blocks for Gutenberg
 * Version:         3.1.9
 * Requires at least: 6.7
 * Requires PHP:      8.3
 * Author:          Thomas Gollenia
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ctx-blocks
 *
 * @package         create-block
 */

use Contexis\WpGitHubUpdater\WordPressPluginUpdater;

require_once __DIR__ . '/vendor/autoload.php';

function ctx_block_init() {
	$block_directories = glob( __DIR__ . '/build/blocks/*', GLOB_ONLYDIR );

	if ( ! $block_directories ) {
		return;
	}

	foreach ( $block_directories as $block_directory ) {
		register_block_type( $block_directory );
	}
}

add_action( 'init', 'ctx_block_init' );

require_once __DIR__ . '/lib/Posts.php';
require_once __DIR__ . '/lib/Icons.php';


function ctx_blocks_load_textdomain() {
	load_plugin_textdomain('ctx-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}
add_action( 'plugins_loaded', 'ctx_blocks_load_textdomain' );



function modify_render_block_defaults($block_content, $block, $instance) {
	if($block['blockName'] !== "core/latest-posts" || !key_exists('animateOnScroll', $block['attrs'])) {
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

WordPressPluginUpdater::fromPluginFile(
    pluginFile: __FILE__,
    owner: 'gollenia',
    repositoryName: 'ctx-blocks',
)->registerHooks();