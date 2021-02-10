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
var tree_internal_component_1 = require('../src/tree-internal.component');
var tree_component_1 = require('../src/tree.component');
var tree_service_1 = require('../src/tree.service');
var tree_controller_1 = require('../src/tree-controller');
var node_menu_service_1 = require('../src/menu/node-menu.service');
var node_menu_component_1 = require('../src/menu/node-menu.component');
var node_draggable_service_1 = require('../src/draggable/node-draggable.service');
var node_draggable_directive_1 = require('../src/draggable/node-draggable.directive');
var node_editable_directive_1 = require('../src/editable/node-editable.directive');
var EventUtils = require('../src/utils/event.utils');
var safe_html_pipe_1 = require('../src/utils/safe-html.pipe');
var index_1 = require('../index');
var fn_utils_1 = require('../src/utils/fn.utils');
var fixture;
var lordTreeInstance;
var lordInternalTreeNative;
var lordInternalTreeInstance;
var lordInternalTreeDebugElement;
var nodeMenuService;
var nodeDraggableService;
var treeService;
var treeLord = {
  value: 'Lord',
  id: 1,
  children: [
    {
      value: 'Disciple#1',
      id: 2,
      loadChildren: function(onLoaded) {
        onLoaded([{ value: 'Newborn#1' }, { value: 'Newborn#2' }]);
      }
    },
    {
      value: 'Disciple#2',
      id: 3,
      children: [{ value: 'SubDisciple#1', id: 4 }, { value: 'SubDisciple#2', id: 5 }]
    }
  ]
};
var TestComponent = (function() {
  function TestComponent(treeHolder) {
    this.treeHolder = treeHolder;
    this.settings = new index_1.Ng2TreeSettings();
    this.treeLord = treeLord;
    this.settings.enableCheckboxes = true;
    this.settings.showCheckboxes = true;
  }
  __decorate(
    [core_1.ViewChild('lordTreeInstance'), __metadata('design:type', Object)],
    TestComponent.prototype,
    'lordTreeComponent',
    void 0
  );
  TestComponent = __decorate(
    [
      core_1.Component({
        template: '\n  <div><tree id="lord" #lordTreeComponent [tree]="treeLord" [settings]="settings"></tree></div>\n'
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('TreeController', function() {
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
    lordInternalTreeDebugElement = fixture.debugElement.query(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    lordTreeInstance = fixture.componentInstance.lordTreeComponent;
    lordInternalTreeInstance = lordInternalTreeDebugElement.componentInstance;
    lordInternalTreeNative = lordInternalTreeDebugElement.nativeElement;
    treeService = lordInternalTreeInstance.treeService;
    nodeMenuService = testing_1.TestBed.get(node_menu_service_1.NodeMenuService);
    nodeDraggableService = testing_1.TestBed.get(node_draggable_service_1.NodeDraggableService);
    fixture.detectChanges();
  });
  it('should have properly set tree controller property', function() {
    expect(treeService.getController(lordInternalTreeInstance.tree.id)).toBeDefined();
  });
  it('can check a node', function() {
    var controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isChecked()).toBe(false);
    controller.check();
    fixture.detectChanges();
    expect(controller.isChecked()).toBe(true);
  });
  it('can uncheck a node', function() {
    var controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isChecked()).toBe(false);
    controller.check();
    fixture.detectChanges();
    controller.uncheck();
    fixture.detectChanges();
    expect(controller.isChecked()).toBe(false);
  });
  it('forbids selection', function() {
    var controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isSelectionAllowed()).toBe(true);
    controller.forbidSelection();
    fixture.detectChanges();
    expect(controller.isSelectionAllowed()).toBe(false);
  });
  it('allows selection', function() {
    var controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isSelectionAllowed()).toBe(true);
    controller.forbidSelection();
    fixture.detectChanges();
    expect(controller.isSelectionAllowed()).toBe(false);
    controller.allowSelection();
    fixture.detectChanges();
    expect(controller.isSelectionAllowed()).toBe(true);
  });
  it('checks all the children down the branch', function() {
    var tree = lordInternalTreeInstance.tree;
    var controller = treeService.getController(tree.id);
    controller.check();
    fixture.detectChanges();
    var checkChildChecked = function(children, checked) {
      return fn_utils_1.isEmpty(children)
        ? checked
        : children.every(function(child) {
            return child.checked && checkChildChecked(child.children, child.checked);
          });
    };
    expect(checkChildChecked(tree.children, tree.checked)).toBe(true, 'All the children should be checked');
  });
  it('unchecks all the children down the branch', function() {
    var tree = lordInternalTreeInstance.tree;
    var controller = treeService.getController(tree.id);
    controller.check();
    fixture.detectChanges();
    controller.uncheck();
    fixture.detectChanges();
    var checkChildChecked = function(children, checked) {
      return fn_utils_1.isEmpty(children)
        ? checked
        : children.every(function(child) {
            return child.checked && checkChildChecked(child.children, child.checked);
          });
    };
    expect(checkChildChecked(tree.children, tree.checked)).toBe(false, 'All the children should be unchecked');
  });
  it(
    'detects indetermined node',
    testing_1.fakeAsync(function() {
      var tree = lordInternalTreeInstance.tree;
      var controller = treeService.getController(tree.id);
      var childController = treeService.getController(tree.children[0].id);
      childController.check();
      fixture.detectChanges();
      testing_1.tick();
      expect(childController.isChecked()).toBe(true, 'Node should be checked');
      expect(controller.isIndetermined()).toBe(true, 'Node should be in indetermined state');
    })
  );
  it('knows when node is selected', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordController.isSelected()).toBe(false);
    clickOn(lordInternalTreeDebugElement, event);
    fixture.detectChanges();
    expect(lordController.isSelected()).toBe(true);
  });
  it('knows how to select a node', function() {
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordController.isSelected()).toBe(false);
    lordController.select();
    fixture.detectChanges();
    expect(lordController.isSelected()).toBe(true);
  });
  it('selects a node only if it is not already selected', function() {
    spyOn(treeService.nodeSelected$, 'next');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.select();
    lordController.select();
    lordController.select();
    fixture.detectChanges();
    expect(lordController.isSelected()).toBe(true);
    expect(treeService.nodeSelected$.next).toHaveBeenCalledTimes(1);
  });
  it('knows how to collapse a node', function() {
    spyOn(treeService.nodeCollapsed$, 'next');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordController.isCollapsed()).toEqual(false);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    lordController.collapse();
    fixture.detectChanges();
    expect(lordController.isCollapsed()).toEqual(true);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(0);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });
  it('collapses a node only if it is expanded', function() {
    spyOn(treeService.nodeCollapsed$, 'next');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.collapse();
    lordController.collapse();
    lordController.collapse();
    fixture.detectChanges();
    expect(lordController.isCollapsed()).toBe(true);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });
  it('knows how to expand a node', function() {
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.collapse();
    fixture.detectChanges();
    spyOn(treeService.nodeExpanded$, 'next');
    expect(lordController.isExpanded()).toEqual(false);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(0);
    lordController.expand();
    fixture.detectChanges();
    expect(lordController.isExpanded()).toEqual(true);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
  });
  it('expands a node only if it is collapsed', function() {
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.collapse();
    fixture.detectChanges();
    lordController.expand();
    lordController.expand();
    expect(lordController.isExpanded()).toBe(true);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });
  it('knows how to rename a node', function() {
    expect(nodeNameOf(lordInternalTreeDebugElement)).toEqual('Lord');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.rename('Master Lord');
    fixture.detectChanges();
    expect(nodeNameOf(lordInternalTreeDebugElement)).toEqual('Master Lord');
  });
  it('knows how to remove a node', function() {
    var child = firstChildOf(lordInternalTreeDebugElement);
    expect(nodeNameOf(child)).toEqual('Disciple#1');
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    var childController = treeService.getController(child.componentInstance.tree.id);
    childController.remove();
    fixture.detectChanges();
    expect(nodeNameOf(firstChildOf(lordInternalTreeDebugElement))).toEqual('Disciple#2');
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(3);
  });
  it('knows how to add a new child', function() {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    var childController = treeService.getController(lordInternalTreeInstance.tree.id);
    childController.addChild({
      value: 'N',
      children: [{ value: 'N1' }, { value: 'N2' }]
    });
    fixture.detectChanges();
    var children = childrenOf(lordInternalTreeDebugElement);
    expect(nodeNameOf(children[6])).toEqual('N2');
    expect(children.length).toEqual(7);
  });
  it('does not add a child if async children of the target node were not loaded', function() {
    var child = childrenOf(lordInternalTreeDebugElement)[0];
    expect(child.componentInstance.tree.value).toEqual('Disciple#1');
    expect(childrenOf(child).length).toEqual(0);
    var childController = treeService.getController(child.componentInstance.tree.id);
    childController.addChild({ value: 'N' });
    fixture.detectChanges();
    expect(childrenOf(child).length).toEqual(0);
  });
  it('knows how to change node id', function() {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    var childController = treeService.getController(lordInternalTreeInstance.tree.id);
    childController.changeNodeId('Boom!');
    expect(lordInternalTreeInstance.tree.id).toEqual('Boom!');
    expect(childController).toBe(treeService.getController('Boom!'));
  });
  it('throws an error if new id is not given', function() {
    var childController = treeService.getController(lordInternalTreeInstance.tree.id);
    try {
      childController.changeNodeId(null);
      fail('Should throw an error if id is not given');
    } catch (error) {
      expect(error.message).toEqual('You should supply an id!');
    }
  });
  it('throws an error if controller for a given id already exists', function() {
    var childController = treeService.getController(lordInternalTreeInstance.tree.id);
    try {
      childController.changeNodeId(lordInternalTreeInstance.tree.id);
      fail('Should throw an error if controller for a given id already exists');
    } catch (error) {
      expect(error.message).toEqual('Controller already exists for the given id: 1');
    }
  });
  it('knows how to reload async children', function() {
    spyOn(lordInternalTreeInstance.tree, 'reloadChildren');
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.reloadChildren();
    expect(lordInternalTreeInstance.tree.reloadChildren).toHaveBeenCalledTimes(1);
  });
  it('knows how to set children for a node', function() {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    var childController = treeService.getController(lordInternalTreeInstance.tree.id);
    childController.setChildren([{ value: 'N1' }, { value: 'N2' }]);
    fixture.detectChanges();
    var children = childrenOf(lordInternalTreeDebugElement);
    expect(children.length).toEqual(2);
    expect(children[0].componentInstance.tree.value).toEqual('N1');
    expect(children[1].componentInstance.tree.value).toEqual('N2');
  });
  it('does not set children for the leaf', function() {
    var children = childrenOf(lordInternalTreeDebugElement);
    expect(children.length).toEqual(4);
    var child = children[3];
    expect(child.componentInstance.tree.value).toEqual('SubDisciple#2');
    expect(child.componentInstance.tree.hasChildren()).toBe(false);
    var childController = treeService.getController(child.componentInstance.tree.id);
    childController.setChildren([{ value: 'N1' }, { value: 'N2' }]);
    fixture.detectChanges();
    expect(childrenOf(child).length).toEqual(0);
  });
  it('knows how to transfer a node into a BeingRenamed state', function() {
    var lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordInternalTreeInstance.tree.isBeingRenamed()).toEqual(false);
    lordController.startRenaming();
    fixture.detectChanges();
    expect(lordInternalTreeInstance.tree.isBeingRenamed()).toEqual(true);
  });
  it('knows how to convert a tree to tree model', function() {
    var model = { value: 'bla' };
    var tree = {
      toTreeModel: jasmine.createSpy('tree.toTreeModel').and.returnValue(model)
    };
    var controller = new tree_controller_1.TreeController({ tree: tree, treeService: null });
    var actualModel = controller.toTreeModel();
    expect(actualModel).toBe(model);
  });
});
function nodeNameOf(internalTreeDebugElement) {
  return internalTreeDebugElement.query(platform_browser_1.By.css('.node-name')).nativeElement.innerHTML;
}
function nodeValueElementOf(internalTreeDebugElement) {
  return internalTreeDebugElement.query(platform_browser_1.By.css('.node-value'));
}
function childrenOf(internalTreeDebugElement) {
  return internalTreeDebugElement.queryAll(
    platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
  );
}
function firstChildOf(internalTreeDebugElement) {
  return internalTreeDebugElement.query(
    platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
  );
}
function clickOn(internalTreeDebugElement, event) {
  nodeValueElementOf(internalTreeDebugElement).triggerEventHandler('click', event);
}
//# sourceMappingURL=tree-controller.spec.js.map
