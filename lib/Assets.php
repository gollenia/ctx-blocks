<?php
namespace Contexis\Utils;

class Assets {

    public static function register() {
        

        add_action( 'init', function() {
            $dir = __DIR__;

            $script_asset_path = "$dir/../build/index.asset.php";
            if ( ! file_exists( $script_asset_path ) ) {
                  throw new \Error(
                          'You need to run `npm start` or `npm run build` for the "create-block/ctx-blocks" block first.'
                 );
            }
            $index_js     = '../build/index.js';
            $script_asset = require( $script_asset_path );
            wp_register_script(
                  'create-block-ctx-blocks-block-editor',
                  plugins_url( $index_js, __FILE__ ),
                  $script_asset['dependencies'],
                  $script_asset['version']
            );
            wp_set_script_translations( 'create-block-ctx-blocks-block-editor', 'ctx-blocks', plugin_dir_path( __FILE__ ) . '../languages' );
            
            $editor_css = '../build/index.css';

            wp_register_style(
                     'create-block-ctx-blocks-block-editor',
                     plugins_url( $editor_css, __FILE__ ),
                     array(),
                     filemtime( "$dir/$editor_css" )
            );
    
             $style_css = '../build/style-index.css';
             wp_register_style(
                     'create-block-ctx-blocks-block',
                     plugins_url( $style_css, __FILE__ ),
                     array(),
                     filemtime( "$dir/$style_css" )
             );
    
            
        } );

       

        return [
            'style'         => 'create-block-ctx-blocks-block',
            'editor_script' => 'create-block-ctx-blocks-block-editor',
            'editor_style'  => 'create-block-ctx-blocks-block-editor',
        ];
    
    }

   
}
