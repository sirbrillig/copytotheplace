import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { copytotheplace, config } from '../src/index';

sinonStubPromise( sinon );
chai.use( sinonChai );
const expect = chai.expect;

describe( '.copytotheplace( files, place )', function() {
	const copySpy = sinon.spy();
	const ensureDirSpy = sinon.stub().returnsPromise();
	const files = [ 'one', 'two' ];
	const place = 'dest';

	before( function() {
		ensureDirSpy.resolves( 'done' );
		config( { copy: copySpy, ensureDir: ensureDirSpy } );
	} );

	it( 'creates the destination directory', function() {
		copytotheplace( files, place );
		expect( ensureDirSpy ).to.have.been.calledWith( place );
	} );

	it( 'copies each file to the destination', function() {
		copytotheplace( files, place );
		expect( copySpy ).to.have.been.calledWith( files[0], `${place}/${files[0]}` );
		expect( copySpy ).to.have.been.calledWith( files[1], `${place}/${files[1]}` );
	} );
} );

describe( '.copytotheplace( files )', function() {
	const copySpy = sinon.spy();
	const ensureDirSpy = sinon.stub().returnsPromise();
	const files = [ 'one', 'two' ];
	const place = 'dest';

	before( function() {
		ensureDirSpy.resolves( 'done' );
		config( { copy: copySpy, ensureDir: ensureDirSpy } );
	} );

	it( 'fails silently if no COPYTOTHEPLACE environment variable is set', function() {
		delete process.env.COPYTOTHEPLACE;
		copytotheplace( files );
		expect( ensureDirSpy ).to.not.have.been.called;
		expect( copySpy ).to.not.have.been.called;
	} );

	it( 'creates the destination directory in the COPYTOTHEPLACE environment variable', function() {
		process.env.COPYTOTHEPLACE = place;
		copytotheplace( files );
		expect( ensureDirSpy ).to.have.been.calledWith( place );
	} );

	it( 'copies each file to the destination in the COPYTOTHEPLACE environment variable', function() {
		process.env.COPYTOTHEPLACE = place;
		copytotheplace( files );
		expect( copySpy ).to.have.been.calledWith( files[0], `${place}/${files[0]}` );
		expect( copySpy ).to.have.been.calledWith( files[1], `${place}/${files[1]}` );
	} );
} );
