var commonDependencies =  [
    'ecmascript',
    'svein:serrurier@1.0.0',
    'svein:serrurier-decorators-core@1.0.0'
];


// server side only
Npm.depends({
    'stringify-object': '2.4.0',
     lodash: '4.11.1'
});

Package.describe({
    name: 'svein:serrurier-reporter-paranoid',
    version: '1.0.0',
    // Brief, one-line summary of the package.
    summary: 'A paranoid reporter that store suspect activity (SecurityExceptions) in the database.',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse( function( api ) {
    api.versionsFrom( '1.3.4.1' );
    api.use( commonDependencies );
    api.use( 'http', 'server' );
    api.mainModule( 'lib/server.js', 'server' );
    api.mainModule( 'lib/client.js', 'client' );
});