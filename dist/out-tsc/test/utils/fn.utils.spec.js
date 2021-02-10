'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fn = require('../../src/utils/fn.utils');
describe('fn.utils - multipurpose functions', function() {
  describe('trim', function() {
    it('returns empty string when input value is null or undefined', function() {
      expect(fn.trim(null)).toEqual('');
      expect(fn.trim(undefined)).toEqual('');
    });
    it('uses native trim method under the hood', function() {
      var stringSpy = jasmine.createSpyObj('string', ['trim']);
      stringSpy.trim.and.returnValue('Boo!');
      expect(fn.trim(stringSpy)).toEqual('Boo!');
    });
  });
  describe('once', function() {
    it('executes function only ones', function() {
      var onceTargetSpy = jasmine.createSpy('once');
      var onceExecutableFn = fn.once(onceTargetSpy);
      onceExecutableFn('Hello', ', ', 'World');
      onceExecutableFn('Hello');
      expect(onceTargetSpy).toHaveBeenCalledTimes(1);
      expect(onceTargetSpy).toHaveBeenCalledWith('Hello', ', ', 'World');
      expect(onceTargetSpy).not.toHaveBeenCalledWith('Hello');
    });
  });
  describe('defaultsDeep', function() {
    it('uses empty array if there were no sources given', function() {
      var options = fn.defaultsDeep({ msg: 'Boo!' });
      expect(options).toEqual({ msg: 'Boo!' });
    });
  });
  describe('defaultsDeep', function() {
    it('uses empty array if there were no sources given', function() {
      var options = fn.defaultsDeep({ msg: 'Boo!' });
      expect(options).toEqual({ msg: 'Boo!' });
    });
  });
  describe('includes', function() {
    it('works with strings', function() {
      expect(fn.includes('world', 'rl')).toEqual(true);
      expect(fn.includes('world', 'rrl')).toEqual(false);
    });
  });
});
//# sourceMappingURL=fn.utils.spec.js.map
