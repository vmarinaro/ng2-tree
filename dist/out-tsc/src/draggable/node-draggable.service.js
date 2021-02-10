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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var draggable_events_1 = require('./draggable.events');
var NodeDraggableService = (function() {
  function NodeDraggableService() {
    this.draggableNodeEvents$ = new Subject_1.Subject();
  }
  NodeDraggableService.prototype.fireNodeDragged = function(captured, target) {
    if (!captured.tree || captured.tree.isStatic()) {
      return;
    }
    this.draggableNodeEvents$.next(new draggable_events_1.NodeDraggableEvent(captured, target));
  };
  NodeDraggableService.prototype.captureNode = function(node) {
    this.capturedNode = node;
  };
  NodeDraggableService.prototype.getCapturedNode = function() {
    return this.capturedNode;
  };
  NodeDraggableService.prototype.releaseCapturedNode = function() {
    this.capturedNode = null;
  };
  NodeDraggableService = __decorate([core_1.Injectable()], NodeDraggableService);
  return NodeDraggableService;
})();
exports.NodeDraggableService = NodeDraggableService;
//# sourceMappingURL=node-draggable.service.js.map
