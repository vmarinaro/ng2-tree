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
var tree_internal_component_1 = require('../src/tree-internal.component');
var tree_component_1 = require('../src/tree.component');
var tree_service_1 = require('../src/tree.service');
var node_menu_service_1 = require('../src/menu/node-menu.service');
var node_menu_component_1 = require('../src/menu/node-menu.component');
var node_draggable_service_1 = require('../src/draggable/node-draggable.service');
var node_draggable_directive_1 = require('../src/draggable/node-draggable.directive');
var node_editable_directive_1 = require('../src/editable/node-editable.directive');
var safe_html_pipe_1 = require('../src/utils/safe-html.pipe');
var fixture;
var componentInstance;
var componentEl;
var TestComponent = (function() {
  function TestComponent() {}
  TestComponent = __decorate(
    [
      core_1.Component({
        template: '\n    <div><tree [tree]="model"></tree></div>\n  '
      })
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('TreeComponent (the one that wraps TreeInternalComponent)', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        tree_internal_component_1.TreeInternalComponent,
        tree_component_1.TreeComponent,
        node_editable_directive_1.NodeEditableDirective,
        node_menu_component_1.NodeMenuComponent,
        node_draggable_directive_1.NodeDraggableDirective,
        safe_html_pipe_1.SafeHtmlPipe
      ],
      providers: [
        node_menu_service_1.NodeMenuService,
        node_draggable_service_1.NodeDraggableService,
        tree_service_1.TreeService,
        safe_html_pipe_1.SafeHtmlPipe
      ]
    });
    fixture = testing_1.TestBed.createComponent(TestComponent);
    componentEl = fixture.debugElement.query(platform_browser_1.By.directive(tree_component_1.TreeComponent));
    componentInstance = componentEl.componentInstance;
    fixture.detectChanges();
  });
  it('should be initialized', function() {
    expect(fixture).not.toBeNull();
    expect(componentInstance.tree).not.toBeFalsy();
  });
  it('should have default empty tree if none was given via input', function() {
    expect(componentInstance.tree.value).toEqual('');
    expect(componentInstance.tree.isRoot()).toEqual(true);
    expect(componentInstance.treeModel).toBeFalsy();
    expect(componentInstance.tree.children).toBeFalsy();
  });
  it('should use given model if it is not falsy', function() {
    fixture.debugElement.componentInstance.model = {
      value: '42'
    };
    fixture.detectChanges();
    expect(componentInstance.tree.value).toEqual('42');
    expect(componentInstance.treeModel.value).toEqual('42');
    expect(componentInstance.rootComponent.controller.tree.value).toEqual('42');
  });
});
//# sourceMappingURL=tree.components.spec.js.map
