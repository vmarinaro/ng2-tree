'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var tree_service_1 = require('../src/tree.service');
var Subject_1 = require('rxjs/Subject');
var node_draggable_service_1 = require('../src/draggable/node-draggable.service');
var tree_1 = require('../src/tree');
var tree_events_1 = require('../src/tree.events');
var core_1 = require('@angular/core');
var captured_node_1 = require('../src/draggable/captured-node');
var treeService;
var draggableService;
describe('TreeService', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      providers: [tree_service_1.TreeService, node_draggable_service_1.NodeDraggableService]
    });
    treeService = testing_1.TestBed.get(tree_service_1.TreeService);
    draggableService = testing_1.TestBed.get(node_draggable_service_1.NodeDraggableService);
  });
  it('should be created by angular', function() {
    expect(treeService).not.toBeNull();
    expect(treeService.nodeMoved$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeRemoved$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeRenamed$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeCreated$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeSelected$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeExpanded$ instanceof Subject_1.Subject).toBe(true);
    expect(treeService.nodeCollapsed$ instanceof Subject_1.Subject).toBe(true);
  });
  it('fires node removed events', function() {
    spyOn(treeService.nodeRemoved$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeRemoved(tree);
    expect(treeService.nodeRemoved$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeRemoved$.next).toHaveBeenCalledWith(new tree_events_1.NodeRemovedEvent(tree, -1));
  });
  it('fires node removed events witch corretly identified postion removed node used to have in its parent', function() {
    spyOn(treeService.nodeRemoved$, 'next');
    var child1 = { value: 'Servant#1' };
    var child2 = { value: 'Servant#2' };
    var tree = new tree_1.Tree({ value: 'Master', children: [child1, child2] });
    treeService.fireNodeRemoved(tree.children[1]);
    expect(treeService.nodeRemoved$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeRemoved$.next).toHaveBeenCalledWith(new tree_events_1.NodeRemovedEvent(tree.children[1], 1));
  });
  it('fires node moved events', function() {
    spyOn(treeService.nodeMoved$, 'next');
    var parent = new tree_1.Tree({ value: 'Master Pa' });
    var tree = new tree_1.Tree({ value: 'Master' }, parent);
    treeService.fireNodeMoved(tree, parent);
    expect(treeService.nodeMoved$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeMoved$.next).toHaveBeenCalledWith(new tree_events_1.NodeMovedEvent(tree, parent));
  });
  it('fires node created events', function() {
    spyOn(treeService.nodeCreated$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeCreated(tree);
    expect(treeService.nodeCreated$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCreated$.next).toHaveBeenCalledWith(new tree_events_1.NodeCreatedEvent(tree));
  });
  it('fires node selected events', function() {
    spyOn(treeService.nodeSelected$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeSelected(tree);
    expect(treeService.nodeSelected$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeSelected$.next).toHaveBeenCalledWith(new tree_events_1.NodeSelectedEvent(tree));
  });
  it('fires node renamed events', function() {
    spyOn(treeService.nodeRenamed$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeRenamed('Bla', tree);
    expect(treeService.nodeRenamed$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeRenamed$.next).toHaveBeenCalledWith(
      new tree_events_1.NodeRenamedEvent(tree, 'Bla', tree.value)
    );
  });
  it('fires node expanded events', function() {
    spyOn(treeService.nodeExpanded$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeExpanded(tree);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledWith(new tree_events_1.NodeExpandedEvent(tree));
  });
  it('fires node collapsed events', function() {
    spyOn(treeService.nodeCollapsed$, 'next');
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.fireNodeCollapsed(tree);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledWith(new tree_events_1.NodeCollapsedEvent(tree));
  });
  it('fires events on which other tree should remove selection', function(done) {
    var selectedTree = new tree_1.Tree({ value: 'Master' });
    var tree = new tree_1.Tree({ value: 'Master' });
    treeService.unselectStream(tree).subscribe(function(e) {
      expect(e.node).toBe(selectedTree);
      done();
    });
    treeService.fireNodeSelected(selectedTree);
  });
  it('removes node from parent when when appropriate event fires', function(done) {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    treeService.nodeRemoved$.subscribe(function(e) {
      expect(e.node).toBe(servantNumber1Tree);
      expect(masterTree.children.length).toEqual(1);
      expect(masterTree.children[0]).toBe(servantNumber2Tree);
      done();
    });
    treeService.fireNodeRemoved(servantNumber1Tree);
  });
  it('should produce drag event for the same element and not on captured node children', function(done) {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var tree = new tree_1.Tree({ value: 'tree' });
    var elementRef = new core_1.ElementRef(null);
    treeService.draggedStream(tree, elementRef).subscribe(function(e) {
      expect(e.captured.tree).toBe(masterTree);
      expect(e.captured.element).toBe(elementRef);
      done();
    });
    draggableService.fireNodeDragged(new captured_node_1.CapturedNode(elementRef, masterTree), elementRef);
  });
  it('does not fire "expanded", "collapsed" events for a leaf node', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });
  it('does not fire "expanded", "collapsed" events for a empty node', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: []
    });
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });
  it('fires "expanded" event for expanded tree', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });
  it('fires "collapsed" event for not expanded tree', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    masterTree.switchFoldingType();
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalled();
    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
  });
  it('fires "loadNextLevel" event when expanding node with emitLoadNextLevel property set to true', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: true
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).toHaveBeenCalled();
  });
  it('fires "loadNextLevel" only once', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: true
    });
    masterTree.switchFoldingType();
    masterTree.switchFoldingType();
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).toHaveBeenCalledTimes(1);
  });
  it('fires "loadNextLevel" if children are provided as empty array', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: true,
      children: []
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).toHaveBeenCalled();
  });
  it('not fires "loadNextLevel" if "loadChildren" function is provided', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: true,
      loadChildren: function(callback) {
        setTimeout(function() {
          callback([{ value: '1' }, { value: '2' }, { value: '3' }]);
        });
      }
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).not.toHaveBeenCalled();
  });
  it('not fires "loadNextLevel" if children are provided', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: true,
      children: [{ value: '1' }, { value: '2' }, { value: '3' }]
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).not.toHaveBeenCalled();
  });
  it('not fires "loadNextLevel" event if "emitLoadNextLevel" does not exists', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).not.toHaveBeenCalled();
  });
  it('not fires "loadNextLevel" event if "emitLoadNextLevel" is false', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      emitLoadNextLevel: false
    });
    masterTree.switchFoldingType();
    spyOn(treeService.loadNextLevel$, 'next');
    treeService.fireNodeSwitchFoldingType(masterTree);
    expect(treeService.loadNextLevel$.next).not.toHaveBeenCalled();
  });
  it('not fires "loadNextLevel" event if "emitLoadNextLevel" is false', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    spyOn(treeService.menuItemSelected$, 'next');
    treeService.fireMenuItemSelected(masterTree, 'CustomMenu');
    expect(treeService.menuItemSelected$.next).toHaveBeenCalledWith(
      new tree_events_1.MenuItemSelectedEvent(masterTree, 'CustomMenu')
    );
  });
  it('return null if there is not controller for the given id', function() {
    var controller = treeService.getController('#2');
    expect(controller).toBeNull();
  });
});
//# sourceMappingURL=tree.service.spec.js.map
