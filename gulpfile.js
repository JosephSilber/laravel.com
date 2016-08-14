var elixir = require('laravel-elixir');

require('laravel-elixir-rollup-official');

elixir(function(mix) {
    mix.sass('laravel.scss', 'public/assets/css');

    mix.rollup('laravel/index.js', 'public/assets/js/laravel.js');

    mix.scripts(
        [
            'jquery.js',
            'plugins/prism.js',
            'plugins/bootstrap.js',
            'plugins/scotchPanels.js',
            'plugins/algoliasearch.js',
            'plugins/typeahead.js',
            'plugins/hogan.js',
            'plugins/mousetrap.js',
        ],
        'public/assets/js/libs.js'
    );

    mix.version([
        'assets/css/laravel.css',
        'assets/js/laravel.js',
        'assets/js/libs.js',
    ]);
});
