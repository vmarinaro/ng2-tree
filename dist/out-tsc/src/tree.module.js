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
require('./rxjs-imports');
var core_1 = require('@angular/core');
var tree_component_1 = require('./tree.component');
var tree_internal_component_1 = require('./tree-internal.component');
var common_1 = require('@angular/common');
var node_draggable_directive_1 = require('./draggable/node-draggable.directive');
var node_draggable_service_1 = require('./draggable/node-draggable.service');
var node_editable_directive_1 = require('./editable/node-editable.directive');
var node_menu_component_1 = require('./menu/node-menu.component');
var node_menu_service_1 = require('./menu/node-menu.service');
var tree_service_1 = require('./tree.service');
var safe_html_pipe_1 = require('./utils/safe-html.pipe');
var TreeModule = (function() {
  function TreeModule() {}
  TreeModule = __decorate(
    [
      core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [
          node_draggable_directive_1.NodeDraggableDirective,
          tree_component_1.TreeComponent,
          node_editable_directive_1.NodeEditableDirective,
          node_menu_component_1.NodeMenuComponent,
          tree_internal_component_1.TreeInternalComponent,
          safe_html_pipe_1.SafeHtmlPipe
        ],
        exports: [tree_component_1.TreeComponent],
        providers: [
          node_draggable_service_1.NodeDraggableService,
          node_menu_service_1.NodeMenuService,
          tree_service_1.TreeService
        ]
      })
    ],
    TreeModule
  );
  return TreeModule;
})();
exports.TreeModule = TreeModule;
//# sourceMappingURL=tree.module.js.map
