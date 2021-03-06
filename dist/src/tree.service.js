'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tree_events_1 = require('./tree.events');
var Subject_1 = require('rxjs/Subject');
var core_1 = require('@angular/core');
var node_draggable_service_1 = require('./draggable/node-draggable.service');
var fn_utils_1 = require('./utils/fn.utils');
var TreeService = (function() {
  function TreeService(nodeDraggableService) {
    this.nodeDraggableService = nodeDraggableService;
    this.nodeMoved$ = new Subject_1.Subject();
    this.nodeRemoved$ = new Subject_1.Subject();
    this.nodeRenamed$ = new Subject_1.Subject();
    this.nodeCreated$ = new Subject_1.Subject();
    this.nodeSelected$ = new Subject_1.Subject();
    this.nodeUnselected$ = new Subject_1.Subject();
    this.nodeExpanded$ = new Subject_1.Subject();
    this.nodeCollapsed$ = new Subject_1.Subject();
    this.menuItemSelected$ = new Subject_1.Subject();
    this.loadNextLevel$ = new Subject_1.Subject();
    this.nodeChecked$ = new Subject_1.Subject();
    this.nodeUnchecked$ = new Subject_1.Subject();
    this.nodeIndetermined$ = new Subject_1.Subject();
    this.controllers = new Map();
    this.nodeRemoved$.subscribe(function(e) {
      return e.node.removeItselfFromParent();
    });
  }
  TreeService.prototype.unselectStream = function(tree) {
    return this.nodeSelected$.filter(function(e) {
      return tree !== e.node;
    });
  };
  TreeService.prototype.fireNodeRemoved = function(tree) {
    this.nodeRemoved$.next(new tree_events_1.NodeRemovedEvent(tree, tree.positionInParent));
  };
  TreeService.prototype.fireNodeCreated = function(tree) {
    this.nodeCreated$.next(new tree_events_1.NodeCreatedEvent(tree));
  };
  TreeService.prototype.fireNodeSelected = function(tree) {
    this.nodeSelected$.next(new tree_events_1.NodeSelectedEvent(tree));
  };
  TreeService.prototype.fireNodeUnselected = function(tree) {
    this.nodeUnselected$.next(new tree_events_1.NodeUnselectedEvent(tree));
  };
  TreeService.prototype.fireNodeRenamed = function(oldValue, tree) {
    this.nodeRenamed$.next(new tree_events_1.NodeRenamedEvent(tree, oldValue, tree.value));
  };
  TreeService.prototype.fireNodeMoved = function(tree, parent) {
    this.nodeMoved$.next(new tree_events_1.NodeMovedEvent(tree, parent));
  };
  TreeService.prototype.fireMenuItemSelected = function(tree, selectedItem) {
    this.menuItemSelected$.next(new tree_events_1.MenuItemSelectedEvent(tree, selectedItem));
  };
  TreeService.prototype.fireNodeSwitchFoldingType = function(tree) {
    if (tree.isNodeExpanded()) {
      this.fireNodeExpanded(tree);
      if (this.shouldFireLoadNextLevel(tree)) {
        this.fireLoadNextLevel(tree);
      }
    } else if (tree.isNodeCollapsed()) {
      this.fireNodeCollapsed(tree);
    }
  };
  TreeService.prototype.fireNodeExpanded = function(tree) {
    this.nodeExpanded$.next(new tree_events_1.NodeExpandedEvent(tree));
  };
  TreeService.prototype.fireNodeCollapsed = function(tree) {
    this.nodeCollapsed$.next(new tree_events_1.NodeCollapsedEvent(tree));
  };
  TreeService.prototype.fireLoadNextLevel = function(tree) {
    this.loadNextLevel$.next(new tree_events_1.LoadNextLevelEvent(tree));
  };
  TreeService.prototype.fireNodeChecked = function(tree) {
    this.nodeChecked$.next(new tree_events_1.NodeCheckedEvent(tree));
  };
  TreeService.prototype.fireNodeUnchecked = function(tree) {
    this.nodeUnchecked$.next(new tree_events_1.NodeUncheckedEvent(tree));
  };
  TreeService.prototype.draggedStream = function(tree, element) {
    return this.nodeDraggableService.draggableNodeEvents$
      .filter(function(e) {
        return e.target === element;
      })
      .filter(function(e) {
        return !e.captured.tree.hasChild(tree);
      });
  };
  TreeService.prototype.setController = function(id, controller) {
    this.controllers.set(id, controller);
  };
  TreeService.prototype.deleteController = function(id) {
    if (this.controllers.has(id)) {
      this.controllers.delete(id);
    }
  };
  TreeService.prototype.getController = function(id) {
    if (this.controllers.has(id)) {
      return this.controllers.get(id);
    }
    return null;
  };
  TreeService.prototype.hasController = function(id) {
    return this.controllers.has(id);
  };
  TreeService.prototype.shouldFireLoadNextLevel = function(tree) {
    var shouldLoadNextLevel =
      tree.node.emitLoadNextLevel &&
      !tree.node.loadChildren &&
      !tree.childrenAreBeingLoaded() &&
      fn_utils_1.isEmpty(tree.children);
    if (shouldLoadNextLevel) {
      tree.loadingChildrenRequested();
    }
    return shouldLoadNextLevel;
  };
  TreeService.prototype.fireNodeIndetermined = function(tree) {
    this.nodeIndetermined$.next(new tree_events_1.NodeIndeterminedEvent(tree));
  };
  TreeService.decorators = [{ type: core_1.Injectable }];
  /** @nocollapse */
  TreeService.ctorParameters = function() {
    return [
      {
        type: node_draggable_service_1.NodeDraggableService,
        decorators: [{ type: core_1.Inject, args: [node_draggable_service_1.NodeDraggableService] }]
      }
    ];
  };
  return TreeService;
})();
exports.TreeService = TreeService;
//# sourceMappingURL=tree.service.js.map
