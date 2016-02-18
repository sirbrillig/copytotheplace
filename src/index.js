import dotenv from 'dotenv';
import { copyAsync, ensureDirAsync } from 'fs-extra-promise';

dotenv.config( { silent: true } );

let copyOptions = {
	copy: copyAsync,
	ensureDir: ensureDirAsync,
};

export function copytotheplace( files, place ) {
	if ( ! place ) place = process.env.COPYTOTHEPLACE;
	if ( ! place ) return;
	copyOptions.ensureDir( place )
	.then( () => files.map( file => copyOptions.copy( file, `${place}/${file}` ) ) );
}

export function config( options ) {
	copyOptions = Object.assign( {}, copyOptions, options );
}
