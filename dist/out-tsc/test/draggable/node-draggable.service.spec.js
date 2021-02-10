'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var Subject_1 = require('rxjs/Subject');
var node_draggable_service_1 = require('../../src/draggable/node-draggable.service');
var captured_node_1 = require('../../src/draggable/captured-node');
var core_1 = require('@angular/core');
var tree_1 = require('../../src/tree');
describe('NodeDraggableService', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      providers: [node_draggable_service_1.NodeDraggableService]
    });
  });
  it(
    'should have draggable event bus set up',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      expect(nodeDraggableService).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$ instanceof Subject_1.Subject).toBe(true);
    })
  );
  it(
    'should have captured node undefined right after creation',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      var capturedNode = nodeDraggableService.getCapturedNode();
      expect(capturedNode).toBeUndefined();
    })
  );
  it(
    'should fire node dragged event',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');
      var stubCapturedNode = new captured_node_1.CapturedNode(null, new tree_1.Tree({ value: 'Master' }));
      var target = new core_1.ElementRef({});
      nodeDraggableService.fireNodeDragged(stubCapturedNode, target);
      expect(nodeDraggableService.draggableNodeEvents$.next).toHaveBeenCalledTimes(1);
      var event = nodeDraggableService.draggableNodeEvents$.next.calls.argsFor(0)[0];
      expect(event.target).toBe(target);
      expect(event.captured).toBe(stubCapturedNode);
    })
  );
  it(
    'should not fire event if node is static',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      var masterTree = new tree_1.Tree({
        value: 'Master',
        settings: {
          static: true
        }
      });
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');
      var elementRef = new core_1.ElementRef(null);
      nodeDraggableService.fireNodeDragged(new captured_node_1.CapturedNode(elementRef, masterTree), elementRef);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );
  it(
    'should not fire event if there is no tree in captured node',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');
      var elementRef = new core_1.ElementRef(null);
      nodeDraggableService.fireNodeDragged(new captured_node_1.CapturedNode(elementRef, null), elementRef);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );
  it(
    'should capture node',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      var stubCapturedNode = new captured_node_1.CapturedNode(null, null);
      nodeDraggableService.captureNode(stubCapturedNode);
      var actualCapturedNode = nodeDraggableService.getCapturedNode(stubCapturedNode);
      expect(actualCapturedNode).toBe(stubCapturedNode);
    })
  );
  it(
    'should release captured node',
    testing_1.inject([node_draggable_service_1.NodeDraggableService], function(nodeDraggableService) {
      var stubCapturedNode = new captured_node_1.CapturedNode(null, null);
      nodeDraggableService.captureNode(stubCapturedNode);
      expect(nodeDraggableService.getCapturedNode(stubCapturedNode)).toBe(stubCapturedNode);
      nodeDraggableService.releaseCapturedNode();
      expect(nodeDraggableService.getCapturedNode(stubCapturedNode)).toBeNull();
    })
  );
});
//# sourceMappingURL=node-draggable.service.spec.js.map
