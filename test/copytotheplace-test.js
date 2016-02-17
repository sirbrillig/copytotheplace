import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { copytotheplace, config } from '../index';

chai.use( sinonChai );
const expect = chai.expect;

describe( '.copytotheplace( files, place )', function() {
	it( 'copies each file to the place', function() {
		const copySpy = sinon.spy();
		config( { copy: copySpy } );
		const files = [ 'one', 'two' ];
		const place = 'dest';
		copytotheplace( files, place );
		expect( copySpy ).to.have.been.calledWith( files[0], place );
		expect( copySpy ).to.have.been.calledWith( files[1], place );
	} );
} );
