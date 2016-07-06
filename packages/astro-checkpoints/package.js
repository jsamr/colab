var coreDependencies = [
    'ecmascript',
    'check',
    'svein:astro-decorators-core@1.0.0',
    'jagi:astronomy@2.0.0'
];

Npm.depends({
    lodash: '4.11.1'
});

Package.describe({
    name: 'svein:astro-checkpoints',
    version: '1.0.0',
    // Brief, one-line summary of the package.
    summary: 'Provides handy security assertions for jagi:astronomy using decorators',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onTest(  function(api) {
    api.use( coreDependencies );
    api.use( [
        'practicalmeteor:mocha',
        'practicalmeteor:chai'
    ] );
    api.mainModule( 'unit-tests.js' );
});

Package.onUse( function( api ) {
    api.versionsFrom( '1.3.4.1' );
    api.use( coreDependencies );
    api.mainModule( 'lib/main.js' );
});