#!/usr/bin/env node

// External dependencies
var parseArgs = require( 'minimist' );

// Internal dependencies
var copytotheplace = require( '../build/index' );

var helpText = 'copytotheplace is a utility to copy files to a configurable and variable place.\n\n' +
	'Usage: copytotheplace [OPTIONS] <file1> [<file2>...]\n\n' +
	'IMPORTANT NOTE: copytotheplace intentionally fails silently if no destination directory is set.\n' +
	'You can set the destination directory on the command-line, via the COPYTOTHEPLACE environment\nvariable, or by writing COPYTOTHEPLACE=<some directory> to a .env file in this directory.\n\n' +
	'Options:\n' +
	'--place=<path>\tUse <path> as the destination directory.\n' +
	'--loud\tPrint lots of output instead of none.\n';

// Parse command-line arguments
var argv = parseArgs( process.argv.slice( 2 ), {
	boolean: true
} );
if ( ! argv._.length ) {
	console.log( helpText );
	console.error( 'Not doing anything. Please list me some files to copy.' );
	process.exit( 1 );
}

if ( argv.loud ) copytotheplace.config( { loud: true } );
copytotheplace.copytotheplace( argv._, argv.place );
