'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var captured_node_1 = require('../../src/draggable/captured-node');
var tree_1 = require('../../src/tree');
describe('Captured Node', function() {
  it('should be created with element and tree', function() {
    var element = {};
    var tree = new tree_1.Tree({ value: '42' });
    var capturedNode = new captured_node_1.CapturedNode(element, tree);
    expect(capturedNode.element).toBe(element);
    expect(capturedNode.tree).toBe(tree);
  });
  it('should know how to compare elements', function() {
    var element = {};
    var element2 = {};
    var tree = null;
    var capturedNode = new captured_node_1.CapturedNode(element, tree);
    expect(capturedNode.sameAs(element)).toBe(true);
    expect(capturedNode.sameAs(element2)).toBe(false);
  });
  it('should know whether another element is not a child of current element', function() {
    var contains = jasmine.createSpy('contains').and.returnValue(false);
    var thisNativeElement = {
      contains: contains
    };
    var element = {
      nativeElement: thisNativeElement
    };
    var element2 = {
      nativeElement: {}
    };
    var capturedNode = new captured_node_1.CapturedNode(element, null);
    expect(capturedNode.contains(element2)).toBe(false);
    expect(contains).toHaveBeenCalledWith(element2.nativeElement);
  });
  it('should know whether another element is a child of current element', function() {
    var contains = jasmine.createSpy('contains').and.returnValue(true);
    var thisNativeElement = {
      contains: contains
    };
    var element = {
      nativeElement: thisNativeElement
    };
    var element2 = {
      nativeElement: {}
    };
    var capturedNode = new captured_node_1.CapturedNode(element, null);
    expect(capturedNode.contains(element2)).toBe(true);
    expect(contains).toHaveBeenCalledWith(element2.nativeElement);
  });
  it('should be possible to drop node on element that is not element of current node', function() {
    var contains = jasmine.createSpy('contains').and.returnValue(false);
    var thisNativeElement = {
      contains: contains
    };
    var element = {
      nativeElement: thisNativeElement
    };
    var element2 = {
      nativeElement: {}
    };
    var capturedNode = new captured_node_1.CapturedNode(element, null);
    expect(capturedNode.canBeDroppedAt(element2)).toBe(true);
    expect(contains).toHaveBeenCalledWith(element2.nativeElement);
  });
  it('should not be possible to drop node on itself', function() {
    var contains = jasmine.createSpy('contains').and.returnValue(true);
    var thisNativeElement = {
      contains: contains
    };
    var element = {
      nativeElement: thisNativeElement
    };
    var capturedNode = new captured_node_1.CapturedNode(element, null);
    expect(capturedNode.canBeDroppedAt(element)).toBe(false);
    expect(contains).not.toHaveBeenCalled();
  });
  it('should not be possible to drop node on its child', function() {
    var contains = jasmine.createSpy('contains').and.returnValue(true);
    var thisNativeElement = {
      contains: contains
    };
    var element = {
      nativeElement: thisNativeElement
    };
    var element2 = {
      nativeElement: {}
    };
    var capturedNode = new captured_node_1.CapturedNode(element, null);
    expect(capturedNode.canBeDroppedAt(element2)).toBe(false);
    expect(thisNativeElement.contains).toHaveBeenCalledWith(element2.nativeElement);
  });
});
//# sourceMappingURL=captured-node.spec.js.map
