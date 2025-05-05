<?php
namespace Contexis\Blocks;

class Update {

    private $plugin_file;
    private $plugin_slug;
    private $repo_owner;
    private $repo_name;

    public function __construct(string $plugin_file, string $repo_owner, string $repo_name) {

        if ((defined('WP_DEBUG') && WP_DEBUG) || defined('CTX_DEV_SERVER')) {
            return;
        }

        $this->plugin_file = $plugin_file;
        $this->plugin_slug = plugin_basename($plugin_file);
        $this->repo_owner = $repo_owner;
        $this->repo_name = $repo_name;

        add_filter('site_transient_update_plugins', [$this, 'check_for_update']);
        add_filter('plugins_api', [$this, 'plugin_info'], 10, 3);
		register_activation_hook(__FILE__, function() { delete_transient('ghup_' . md5(...)); });
    }

    private function get_latest_version() : string {
        $cache_key = 'ghup_' . md5($this->repo_owner . '/' . $this->repo_name);
        $cached = get_transient($cache_key);
		
		if (is_admin() && strpos($_SERVER['REQUEST_URI'], 'plugins.php')) {
			delete_transient($cache_key);
			$cached = false;
		}
		
		if ($cached) return $cached;
		
        $response = wp_remote_get("https://github.com/$this->repo_owner/$this->repo_name/releases/latest", [
			'redirection' => 0,
			'timeout'     => 5,
		]);

		if (is_wp_error($response) || !isset($response['headers']['location'])) {
            return get_plugin_data($this->plugin_file)['Version'];
        }
		$location = $response['headers']['location'];
		if (preg_match('~/tag/(v?\d+\.\d+\.\d+)~', $location, $matches)) {
			$latest_version = ltrim($matches[1], 'v');
		}
        set_transient($cache_key, $latest_version, HOUR_IN_SECONDS);
		
        return $latest_version;
    }

    public function check_for_update($transient) {
		if(!is_object($transient) || !isset($transient->checked)) return $transient;
		if (!array_key_exists($this->plugin_slug, (array) $transient->checked)) return $transient;
		
        $new_version = $this->get_latest_version();
        $current_version = $transient->checked[$this->plugin_slug];

        if (!version_compare($new_version, $current_version, '>')) return $transient;
		$plugin_data = get_plugin_data($this->plugin_file);

		$transient->response[$this->plugin_slug] = (object)[
			'slug' => dirname($this->plugin_slug),
			'plugin' => $this->plugin_slug,
			'new_version' => $new_version,
			'url' => $plugin_data['PluginURI'],
			'package' => "https://github.com/{$this->repo_owner}/{$this->repo_name}/releases/download/v{$new_version}/{$this->repo_name}.zip",
			'requires' => $plugin_data['RequiresWP'],
			'tested' => $plugin_data['Tested'],
			'last_updated' => $plugin_data['LastUpdated'],
			'requires_php' => $plugin_data['RequiresPHP'],
		];

        return $transient;
    }

    public function plugin_info($res, string $action, object $args) {

        if ($action !== 'plugin_information' || $args->slug !== dirname($this->plugin_slug)) {
            return $res;
        }

        $release = $this->get_latest_version();
        if (!$release) return $res;

        $info = new \stdClass();
        $info->name = basename(dirname($this->plugin_file));
        $info->slug = dirname($this->plugin_slug);
        $info->version = ltrim($release);
        $info->author = 'Thomas Gollenia';
        $info->homepage = "https://github.com/{$this->repo_owner}/{$this->repo_name}";
        $info->download_link = "https://github.com/{$this->repo_owner}/{$this->repo_name}/archive/refs/tags/{$release}.zip";
        $info->sections = [
            'description' => file_get_contents(dirname($this->plugin_file) . '/readme.md'),
			'changelog' => 'See changelog on <a href="https://github.com/'.$this->repo_owner.'/'.$this->repo_name.'/releases">GitHub</a>'
        ];

        return $info;
    }
}

