'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var EventUtils = require('../../src/utils/event.utils');
describe('EventUtils', function() {
  it('should detect whether escape was pressed', function() {
    var escEvent = {
      keyCode: EventUtils.Keys.Escape
    };
    var notEscEvent = {
      keyCode: 42
    };
    expect(EventUtils.isEscapePressed(escEvent)).toBe(true);
    expect(EventUtils.isEscapePressed(notEscEvent)).toBe(false);
  });
  it('should detect mouse right and left button clicks', function() {
    var leftEvent = {
      button: EventUtils.MouseButtons.Left
    };
    var rightEvent = {
      button: EventUtils.MouseButtons.Right
    };
    expect(EventUtils.isLeftButtonClicked(leftEvent)).toBe(true);
    expect(EventUtils.isLeftButtonClicked(rightEvent)).toBe(false);
    expect(EventUtils.isRightButtonClicked(rightEvent)).toBe(true);
    expect(EventUtils.isRightButtonClicked(leftEvent)).toBe(false);
  });
  it('should have correct Keys bindings', function() {
    expect(EventUtils.Keys.Escape).toEqual(27);
  });
  it('should have correct MouseButtons bindings', function() {
    expect(EventUtils.MouseButtons.Left).toEqual(0);
    expect(EventUtils.MouseButtons.Right).toEqual(2);
  });
});
//# sourceMappingURL=event.utils.spec.js.map
