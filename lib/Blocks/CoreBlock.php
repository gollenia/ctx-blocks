<?php
namespace Contexis\Blocks;

use \Contexis\Blocks\Block;
use Timber\Timber;

class CoreBlock {

	public static function init() {
		$instance = new self();
		$instance->addFilter();
	}

	public function addFilter() {
		add_filter( 'register_block_type_args', [$this, 'register_block_type_args'], 10, 3 );
	}

	function register_block_type_args( $args, $name ) {
		$template = $this->get_core_template($name);
		if( $template ) {
			$args['template'] = [$template];
			$args['render_callback'] = [$this, 'render'];
		}
		return $args;
	}

    public function render($attributes, $content, $full_data) : string {
		$attributes['content'] = $content;
		$attributes['children'] = $full_data->parsed_block['innerBlocks'] ;
        return Timber::compile($full_data->block_type->template, $attributes);
    }


	public function get_core_template($name) : string {

        $filename = substr($name, strpos($name, "/")+1) . ".twig";
		
		if(file_exists(get_stylesheet_directory() . "/plugins/timber-blocks/core/" . $filename)) {
            return get_stylesheet_directory() . '/plugins/timber-blocks/core/' . $filename;
        }

        if(file_exists(get_template_directory() . "/plugins/timber-blocks/core" . $filename)) {
            return get_template_directory() . '/plugins/timber-blocks/' . $filename;
        }

        if(file_exists(plugin_dir_path( __FILE__ ) . '../../templates/core/' . $filename)) {
            return plugin_dir_path( __FILE__ ) . '../../templates/core/' . $filename;
        }

        return false;
    }



}
