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
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var node_draggable_directive_1 = require('../../src/draggable/node-draggable.directive');
var node_draggable_service_1 = require('../../src/draggable/node-draggable.service');
var captured_node_1 = require('../../src/draggable/captured-node');
var tree_1 = require('../../src/tree');
var fixture;
var directiveEl;
var directiveInstance;
var nodeDraggableService;
var TestComponent = (function() {
  function TestComponent(draggableTarget) {
    this.draggableTarget = draggableTarget;
    this.tree = new tree_1.Tree({
      value: '42'
    });
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template: '<div id="draggableTarget" [nodeDraggable]="draggableTarget" [tree]="tree"></div>'
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('NodeDraggableDirective', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      declarations: [node_draggable_directive_1.NodeDraggableDirective, TestComponent],
      providers: [node_draggable_service_1.NodeDraggableService]
    });
    fixture = testing_1.TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(
      platform_browser_1.By.directive(node_draggable_directive_1.NodeDraggableDirective)
    );
    directiveInstance = directiveEl.injector.get(node_draggable_directive_1.NodeDraggableDirective);
    nodeDraggableService = testing_1.TestBed.get(node_draggable_service_1.NodeDraggableService);
  });
  it('should have correctly set "tree" property', function() {
    fixture.detectChanges();
    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.tree.value).toEqual('42');
  });
  it('should have correctly set "nodeDraggable" property', function() {
    fixture.detectChanges();
    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.nodeDraggable).toBe(fixture.componentInstance.draggableTarget);
  });
  it('should have correctly set "element" property', function() {
    fixture.detectChanges();
    var draggableElement = directiveEl.nativeElement;
    expect(directiveInstance.element.nativeElement).toBe(draggableElement);
  });
  it('should make host draggable', function() {
    fixture.detectChanges();
    var draggableElement = directiveEl.nativeElement;
    expect(draggableElement.draggable).toBe(true);
  });
  it('should add appropriate class on "dragenter"', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 0;
    dragenterEvent.y = 0;
    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);
    directiveEl.triggerEventHandler('dragenter', dragenterEvent);
    expect(document.elementFromPoint).toHaveBeenCalledWith(0, 0);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(true);
  });
  it('should not add appropriate class if "dragenter" was triggered on element which is not child or target element itself', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 1;
    dragenterEvent.y = 2;
    spyOn(document, 'elementFromPoint').and.returnValue(null);
    directiveEl.triggerEventHandler('dragenter', dragenterEvent);
    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(false);
  });
  it('should use clientX, clientY properties on event if there are no x and y properties', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.clientX = 42;
    dragenterEvent.clientY = 12;
    spyOn(document, 'elementFromPoint');
    directiveEl.triggerEventHandler('dragenter', dragenterEvent);
    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.clientX, dragenterEvent.clientY);
  });
  it('should set dropEffect to "move" on dragover', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.dataTransfer = {};
    directiveEl.triggerEventHandler('dragover', dragenterEvent);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.dataTransfer.dropEffect).toBe('move');
  });
  it('should captutre a node on dragstart', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation']);
    dragenterEvent.dataTransfer = jasmine.createSpyObj('dataTransfer', ['setData']);
    directiveEl.triggerEventHandler('dragstart', dragenterEvent);
    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    var capturedNode = nodeDraggableService.getCapturedNode();
    expect(capturedNode.element).toBe(directiveInstance.nodeDraggable);
    expect(capturedNode.tree).toBe(directiveInstance.tree);
    expect(dragenterEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'text',
      node_draggable_directive_1.NodeDraggableDirective.DATA_TRANSFER_STUB_DATA
    );
    expect(dragenterEvent.dataTransfer.effectAllowed).toBe('move');
  });
  it('should remove "over-drop-target" class on dragleave if dragging left target element', function() {
    fixture.detectChanges();
    var dragenterEvent = { x: 1, y: 2 };
    spyOn(document, 'elementFromPoint').and.returnValue(null);
    var draggableElementClassList = directiveEl.nativeElement.classList;
    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
    directiveEl.triggerEventHandler('dragleave', dragenterEvent);
    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
  });
  it('should not remove "over-drop-target" dragging is happening on element', function() {
    fixture.detectChanges();
    var dragenterEvent = { x: 1, y: 2 };
    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);
    var draggableElementClassList = directiveEl.nativeElement.classList;
    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
    directiveEl.triggerEventHandler('dragleave', dragenterEvent);
    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
  });
  it('should release captured node on "dragend" and get rid of "over-drop-target" class', function() {
    fixture.detectChanges();
    var draggableElementClassList = directiveEl.nativeElement.classList;
    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
    spyOn(nodeDraggableService, 'releaseCapturedNode');
    directiveEl.triggerEventHandler('dragend');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
    expect(nodeDraggableService.releaseCapturedNode).toHaveBeenCalled();
  });
  it('should handle drop event: prevent default action and stop event propagation', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);
    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(null);
    directiveEl.triggerEventHandler('drop', dragenterEvent);
    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });
  it('should handle drop event: remove "over-drop-target" class', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);
    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(null);
    spyOn(directiveEl.nativeElement.classList, 'remove');
    directiveEl.triggerEventHandler('drop', dragenterEvent);
    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledWith('over-drop-target');
    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });
  it("should handle drop event: do not notify that node was dropped if it is not a target's child element or target itself", function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);
    spyOn(nodeDraggableService, 'fireNodeDragged');
    var capturedNode = new captured_node_1.CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(null);
    directiveEl.triggerEventHandler('drop', dragenterEvent);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });
  it('should handle drop event: should notfy about successfully dropped node', function() {
    fixture.detectChanges();
    var dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);
    spyOn(nodeDraggableService, 'fireNodeDragged');
    var capturedNode = new captured_node_1.CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);
    directiveEl.triggerEventHandler('drop', dragenterEvent);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(3);
    expect(nodeDraggableService.fireNodeDragged).toHaveBeenCalledTimes(1);
    var fireCapturedNode = nodeDraggableService.fireNodeDragged.calls.argsFor(0)[0];
    var fireTarget = nodeDraggableService.fireNodeDragged.calls.argsFor(0)[1];
    expect(fireCapturedNode).toBe(capturedNode);
    expect(fireTarget).toBe(directiveInstance.nodeDraggable);
  });
  it('TODO: should not make tree draggable if it is static', function() {});
});
//# sourceMappingURL=node-draggable.directive.spec.js.map
