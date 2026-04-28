<?php
/**
 * Shared icon discovery and rendering for CTX blocks.
 *
 * Icons are discovered from SVG files in these directories, in this priority:
 * 1. child theme: /assets/icons
 * 2. parent theme: /assets/icons
 * 3. plugin: /assets/icons
 *
 * Themes can customize the directories via `ctx_blocks_icon_sources`.
 */

namespace Contexis\Blocks;

final class Icons {

	private static ?array $icons = null;

	public static function init() : void {
		add_action( 'rest_api_init', [ self::class, 'register_rest_routes' ] );
	}

	public static function get_icon_sources() : array {
		$sources = [];

		$sources[] = [
			'type' => 'theme',
			'name' => 'child-theme',
			'path' => trailingslashit( get_stylesheet_directory() ) . 'assets/icons',
			'url'  => trailingslashit( get_stylesheet_directory_uri() ) . 'assets/icons',
		];

		if ( get_template_directory() !== get_stylesheet_directory() ) {
			$sources[] = [
				'type' => 'theme',
				'name' => 'parent-theme',
				'path' => trailingslashit( get_template_directory() ) . 'assets/icons',
				'url'  => trailingslashit( get_template_directory_uri() ) . 'assets/icons',
			];
		}

		$sources[] = [
			'type' => 'plugin',
			'name' => 'plugin',
			'path' => trailingslashit( dirname( __DIR__ ) ) . 'assets/icons',
			'url'  => trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) ) . 'assets/icons',
		];

		$sources = apply_filters( 'ctx_blocks_icon_sources', $sources );

		return is_array( $sources ) ? $sources : [];
	}

	public static function get_icons() : array {
		if ( null !== self::$icons ) {
			return self::$icons;
		}

		self::$icons = [];

		foreach ( array_reverse( self::get_icon_sources() ) as $source ) {
			$path = isset( $source['path'] ) ? (string) $source['path'] : '';
			$url  = isset( $source['url'] ) ? (string) $source['url'] : '';

			if ( '' === $path || ! is_dir( $path ) ) {
				continue;
			}

			$files = glob( trailingslashit( $path ) . '*.svg' );

			if ( ! is_array( $files ) ) {
				continue;
			}

			foreach ( $files as $file ) {
				$name = basename( $file, '.svg' );

				if ( '' === $name ) {
					continue;
				}

				self::$icons[ $name ] = [
					'name'   => $name,
					'label'  => self::format_icon_label( $name ),
					'path'   => $file,
					'url'    => trailingslashit( $url ) . basename( $file ),
					'source' => isset( $source['name'] ) ? (string) $source['name'] : 'custom',
				];
			}
		}

		return self::$icons;
	}

	public static function get_icon( string $name ) : ?array {
		if ( '' === $name ) {
			return null;
		}

		$icons = self::get_icons();

		return $icons[ $name ] ?? null;
	}

	public static function get_icon_svg( string $name, array $args = [] ) : string {
		$icon = self::get_icon( $name );

		if ( ! $icon || empty( $icon['path'] ) || ! file_exists( $icon['path'] ) ) {
			return '';
		}

		$svg = file_get_contents( $icon['path'] );

		if ( ! is_string( $svg ) || '' === trim( $svg ) ) {
			return '';
		}

		$classes = [
			'ctx-icon',
			'ctx-icon--' . sanitize_html_class( $name ),
			isset( $args['class'] ) ? (string) $args['class'] : '',
		];

		return self::add_svg_attributes(
			self::normalize_svg_colors( $svg ),
			[
				'class'       => implode( ' ', array_filter( $classes ) ),
				'aria-hidden' => 'true',
				'focusable'   => 'false',
				'style'       => 'color: currentColor;',
			]
		);
	}

	public static function render_icon( string $name, array $args = [] ) : string {
		$icon = self::get_icon( $name );
		$svg  = self::get_icon_svg( $name, $args );

		if ( '' === $svg ) {
			return '';
		}

		return apply_filters( 'ctx_blocks_render_icon', $svg, $name, $args, $icon );
	}

	public static function register_rest_routes() : void {
		register_rest_route(
			'ctx-blocks/v1',
			'/icons',
			[
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => '__return_true',
				'callback'            => [ self::class, 'get_rest_icons_response' ],
			]
		);
	}

	public static function get_rest_icons_response() : \WP_REST_Response {
		$icons = array_values(
			array_map(
				static function ( array $icon ) : array {
					return [
						'name'   => (string) $icon['name'],
						'label'  => (string) $icon['label'],
						'svg'    => self::get_icon_svg( (string) $icon['name'] ),
						'url'    => (string) $icon['url'],
						'source' => (string) $icon['source'],
					];
				},
				self::get_icons()
			)
		);

		return rest_ensure_response( $icons );
	}

	private static function format_icon_label( string $name ) : string {
		$label = str_replace( [ '-', '_' ], ' ', $name );
		$label = preg_replace( '/\s+/', ' ', $label );

		return ucwords( trim( (string) $label ) );
	}

	private static function add_svg_attributes( string $svg, array $attributes = [] ) : string {
		if ( ! preg_match( '/<svg\b[^>]*>/i', $svg, $matches ) ) {
			return $svg;
		}

		$opening_tag       = $matches[0];
		$attribute_string  = '';

		foreach ( $attributes as $name => $value ) {
			if ( '' === $value || null === $value ) {
				continue;
			}

			$attribute_string .= sprintf( ' %s="%s"', $name, esc_attr( (string) $value ) );
		}

		$replacement = rtrim( substr( $opening_tag, 0, -1 ) . $attribute_string . '>' );

		return preg_replace( '/<svg\b[^>]*>/i', $replacement, $svg, 1 ) ?? $svg;
	}

	private static function normalize_svg_colors( string $svg ) : string {
		$svg = preg_replace( '/\s(fill|stroke)="#[^"]*"/i', ' $1="currentColor"', $svg ) ?? $svg;
		$svg = preg_replace( '/\s(fill|stroke)="rgb\([^)]+\)"/i', ' $1="currentColor"', $svg ) ?? $svg;
		$svg = preg_replace( '/\s(fill|stroke)="rgba\([^)]+\)"/i', ' $1="currentColor"', $svg ) ?? $svg;
		$svg = preg_replace( '/\s(fill|stroke)="#[0-9a-f]{3,8}"/i', ' $1="currentColor"', $svg ) ?? $svg;
		$svg = preg_replace_callback(
			'/style="([^"]*)"/i',
			static function ( array $matches ) : string {
				$style = $matches[1];
				$style = preg_replace( '/fill\s*:\s*([^;"]+)/i', 'fill: currentColor', $style ) ?? $style;
				$style = preg_replace( '/stroke\s*:\s*([^;"]+)/i', 'stroke: currentColor', $style ) ?? $style;

				return ' style="' . trim( $style ) . '"';
			},
			$svg
		) ?? $svg;

		$svg = preg_replace_callback(
			'/\sfill="([^"]*)"/i',
			static function ( array $matches ) : string {
				$value = strtolower( trim( $matches[1] ) );

				if ( '' === $value || 'none' === $value || 'currentcolor' === $value ) {
					return $matches[0];
				}

				return ' fill="currentColor"';
			},
			$svg
		) ?? $svg;

		$svg = preg_replace_callback(
			'/\sstroke="([^"]*)"/i',
			static function ( array $matches ) : string {
				$value = strtolower( trim( $matches[1] ) );

				if ( '' === $value || 'none' === $value || 'currentcolor' === $value ) {
					return $matches[0];
				}

				return ' stroke="currentColor"';
			},
			$svg
		) ?? $svg;

		return $svg;
	}
}

Icons::init();
