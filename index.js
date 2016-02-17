import { copy, ensureDir } from 'fs-extra-promise';

let copyOptions = {
	copy,
	ensureDir,
};

export function copytotheplace( files, place ) {
	copyOptions.ensureDir( place )
	.then( () => files.map( file => copyOptions.copy( file, `${place}/${file}` ) ) );
}

export function config( options ) {
	copyOptions = Object.assign( {}, copyOptions, options );
}
