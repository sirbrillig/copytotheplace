import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { copytotheplace, config } from '../index';

sinonStubPromise( sinon );
chai.use( sinonChai );
const expect = chai.expect;

describe( '.copytotheplace( files, place )', function() {
	it( 'creates the destination directory', function() {
		const copySpy = sinon.spy();
		const ensureDirSpy = sinon.stub().returnsPromise();
		ensureDirSpy.resolves( 'done' );
		config( { copy: copySpy, ensureDir: ensureDirSpy } );
		const files = [ 'one', 'two' ];
		const place = 'dest';
		copytotheplace( files, place );
		expect( ensureDirSpy ).to.have.been.calledWith( place );
	} );

	it( 'copies each file to the place', function() {
		const copySpy = sinon.spy();
		const ensureDirSpy = sinon.stub().returnsPromise();
		ensureDirSpy.resolves( 'done' );
		config( { copy: copySpy, ensureDir: ensureDirSpy } );
		const files = [ 'one', 'two' ];
		const place = 'dest';
		copytotheplace( files, place );
		expect( copySpy ).to.have.been.calledWith( files[0], `${place}/${files[0]}` );
		expect( copySpy ).to.have.been.calledWith( files[1], `${place}/${files[1]}` );
	} );
} );
