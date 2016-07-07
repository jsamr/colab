var commonDependencies =  [
    'ecmascript',
    'check',
    'jag:pince@0.0.9',
    'jagi:astronomy@2.0.0'
];

Npm.depends({
    lodash: '4.11.1'
});

Package.describe({
    name: 'svein:serrurier-decorators-core',
    version: '1.0.0',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onTest(  function( api ) {
    api.use( commonDependencies );
    api.use( [
        'practicalmeteor:mocha',
        'practicalmeteor:chai'
    ] );
    api.mainModule( 'unit-tests.js' );
});

Package.onUse( function( api ) {
    api.versionsFrom( '1.3.4.1' );
    api.use( commonDependencies );
    api.mainModule( 'lib/main.js' );
});