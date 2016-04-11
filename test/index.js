import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();
import yamlFile from '../src/';
describe('yamlFile', () => {

  it('returns a function', () => {
    yamlFile().should.be.a('function');
  });

  describe('output function', () => {
    let process = null;
    let subFunction = null;
    beforeEach(() => {
      process = chai.spy((contents) => contents);
      subFunction = yamlFile(process);
    });

    it('calls the given function when called', () => {
      subFunction('');
      process.should.have.been.called(1);
    });

    it('calls the given function with the given contents as YAML', () => {
      subFunction('foo: a\nbar: true');
      process.should.have.been.called.with.exactly({ foo: 'a', bar: true });
    });

    it('returns contents of process, stringified as YAML', () => {
      process = chai.spy(() => ({ bar: false, baz: 1 }));
      subFunction = yamlFile(process);
      subFunction('')
        .should.equal('bar: false\nbaz: 1\n');
    });

    it('calls the given function with the remaining args verbatum', () => {
      subFunction('', 1, 2, 3);
      process.should.have.been.called.with.exactly({}, 1, 2, 3);
    });

    it('can override indent with `indent` option', () => {
      process = chai.spy(() => ({ bar: { baz: 1 } }));
      subFunction = yamlFile(process, { indent: 2 });
      subFunction('')
        .should.equal('bar:\n  baz: 1\n');
      subFunction = yamlFile(process, { indent: 4 });
      subFunction('')
        .should.equal('bar:\n    baz: 1\n');
    });

  });

});
