import dotenv from 'dotenv';
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
		return;
	}
	log( `Preparing to copy these files to "${place}": ${files}` );
	copyOptions.ensureDir( place )
	.then( () => files.map( file => copyOptions.copy( file, `${place}/${file}` ) ) );
	log( 'Done copying' );
}

export function config( options ) {
	copyOptions = Object.assign( {}, copyOptions, options );
}
