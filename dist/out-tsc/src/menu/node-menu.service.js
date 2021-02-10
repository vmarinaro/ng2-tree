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
var menu_events_1 = require('./menu.events');
var NodeMenuService = (function() {
  function NodeMenuService() {
    this.nodeMenuEvents$ = new Subject_1.Subject();
  }
  NodeMenuService.prototype.fireMenuEvent = function(sender, action) {
    var nodeMenuEvent = { sender: sender, action: action };
    this.nodeMenuEvents$.next(nodeMenuEvent);
  };
  NodeMenuService.prototype.hideMenuStream = function(treeElementRef) {
    return this.nodeMenuEvents$
      .filter(function(e) {
        return treeElementRef.nativeElement !== e.sender;
      })
      .filter(function(e) {
        return e.action === menu_events_1.NodeMenuAction.Close;
      });
  };
  NodeMenuService.prototype.hideMenuForAllNodesExcept = function(treeElementRef) {
    this.nodeMenuEvents$.next({
      sender: treeElementRef.nativeElement,
      action: menu_events_1.NodeMenuAction.Close
    });
  };
  NodeMenuService = __decorate([core_1.Injectable()], NodeMenuService);
  return NodeMenuService;
})();
exports.NodeMenuService = NodeMenuService;
//# sourceMappingURL=node-menu.service.js.map
