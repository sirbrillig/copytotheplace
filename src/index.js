import dotenv from 'dotenv';
import { basename } from 'path';
import { copyAsync, ensureDirAsync } from 'fs-extra-promise';

dotenv.config( { silent: true } );

let copyOptions = {
	copy: copyAsync,
	ensureDir: ensureDirAsync,
	loud: false,
};

function log( message ) {
	if ( copyOptions.loud ) console.log( message );
}

export function copytotheplace( files, place ) {
	log( 'Starting copytotheplace' );
	if ( ! place ) place = process.env.COPYTOTHEPLACE;
	if ( ! place ) {
		log( 'No place specified. Not doing anything.' );
		return Promise.resolve();
	}
	log( `Preparing to copy these files to "${place}": ${files}` );
	return copyOptions.ensureDir( place )
	.then( () => Promise.all( files.map( file => copyFileToDir( file, place ) ) ) )
	.then( () => log( 'Done copying' ) )
	.catch( err => log( err ) );
}

export function config( options ) {
	copyOptions = Object.assign( {}, copyOptions, options );
}

function copyFileToDir( pathToFile, place ) {
	const file = basename( pathToFile );
	return copyOptions.copy( pathToFile, `${place}/${file}` );
}
