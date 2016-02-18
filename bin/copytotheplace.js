#!/usr/bin/env node

// External dependencies
var parseArgs = require( 'minimist' );

// Internal dependencies
var copytotheplace = require( '../build/index' );

var helpText = 'copytotheplace is a utility to move files to a configurable and variable place.\n\n' +
	'Options:\n' +
	'--place=<path>\tUse <path> as the destination directory.\n';

// Parse command-line arguments
var argv = parseArgs( process.argv.slice( 2 ), {
	boolean: true
} );
if ( ! argv._.length ) {
	console.log( helpText );
	console.error( 'Not doing anything. Please list me some files to copy.' );
	process.exit( 1 );
}

copytotheplace.copytotheplace( argv._, argv.place );
