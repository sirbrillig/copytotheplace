import { copy } from 'fs-extra-promise';

let copyOptions = {
	copy
};

export function copytotheplace( files, place ) {
	files.map( file => copyOptions.copy( file, place ) );
}

export function config( options ) {
	copyOptions = Object.assign( {}, copyOptions, options );
}
