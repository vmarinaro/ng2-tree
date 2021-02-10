'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var node_editable_directive_1 = require('../../src/editable/node-editable.directive');
var editable_events_1 = require('../../src/editable/editable.events');
var fixture;
var directiveEl;
var directiveInstance;
var TestComponent = (function() {
  function TestComponent() {
    this.tree = {
      value: '42'
    };
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template: '<div id="editableTarget" [nodeEditable]="tree.value"></div>'
      })
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('NodeEditableDirective', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      declarations: [node_editable_directive_1.NodeEditableDirective, TestComponent]
    });
    fixture = testing_1.TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(
      platform_browser_1.By.directive(node_editable_directive_1.NodeEditableDirective)
    );
    directiveInstance = directiveEl.injector.get(node_editable_directive_1.NodeEditableDirective);
  });
  it('should have correctly set "nodeValue" property', function() {
    fixture.detectChanges();
    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.nodeValue).toEqual('42');
  });
  it('should have correctly set "valueChanged" event emitter', function() {
    expect(directiveInstance.valueChanged instanceof core_1.EventEmitter).toBe(true);
  });
  it('should set focus on the host element', function() {
    spyOn(directiveEl.nativeElement, 'focus');
    fixture.detectChanges();
    expect(directiveEl.nativeElement.focus).toHaveBeenCalledTimes(1);
  });
  it('should set value the host element', function() {
    fixture.detectChanges();
    expect(directiveEl.nativeElement.value).toEqual('42');
  });
  it('should apply new value once user pressed enter', function() {
    fixture.detectChanges();
    var expectedNewValue = '12';
    var event = { target: { value: expectedNewValue } };
    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('keyup.enter', event);
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith({ type: 'keyup', value: expectedNewValue });
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });
  it('should apply new value once element under edit looses focus', function() {
    fixture.detectChanges();
    var expectedNewValue = '12';
    var event = { target: { value: expectedNewValue } };
    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('blur', event);
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith({ type: 'blur', value: expectedNewValue });
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });
  it('should cancel editing once escape was pressed during edit', function() {
    fixture.detectChanges();
    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('keyup.esc');
    var event = {
      type: 'keyup',
      value: directiveInstance.nodeValue,
      action: editable_events_1.NodeEditableEventAction.Cancel
    };
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith(event);
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=node-editable.directive.spec.js.map
