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
var node_menu_service_1 = require('../src/menu/node-menu.service');
var node_menu_component_1 = require('../src/menu/node-menu.component');
var node_draggable_service_1 = require('../src/draggable/node-draggable.service');
var node_draggable_directive_1 = require('../src/draggable/node-draggable.directive');
var node_editable_directive_1 = require('../src/editable/node-editable.directive');
var EventUtils = require('../src/utils/event.utils');
var captured_node_1 = require('../src/draggable/captured-node');
var safe_html_pipe_1 = require('../src/utils/safe-html.pipe');
var fixture;
var masterInternalTreeEl;
var masterComponentInstance;
var lordInternalTreeEl;
var lordComponentInstance;
var faceInternalTreeEl;
var faceComponentInstance;
var nodeMenuService;
var nodeDraggableService;
var treeService;
var safeHtml;
var tree = {
  value: 'Master',
  children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
};
var tree2 = {
  value: 'Lord',
  children: [
    {
      value: 'Disciple#1',
      children: [{ value: 'SubDisciple#1' }, { value: 'SubDisciple#2' }]
    },
    { value: 'Disciple#2' }
  ]
};
var tree3 = {
  value: 'Face',
  settings: {
    static: true
  },
  children: [
    {
      value: 'Eyes',
      children: [
        {
          value: 'Retina',
          settings: {
            static: false
          }
        },
        { value: 'Eyebrow' }
      ]
    },
    { value: 'Lips' }
  ]
};
var TestComponent = (function() {
  function TestComponent(treeHolder) {
    this.treeHolder = treeHolder;
    this.tree = tree;
    this.tree2 = tree2;
    this.tree3 = tree3;
    this.settings = {
      rootIsVisible: false
    };
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template:
          '\n    <div><tree id="master" [tree]="tree"></tree></div>\n    <div><tree id="lord" [tree]="tree2"></tree></div>\n    <div><tree id="face" [tree]="tree3" [settings]="settings"></tree></div>\n  '
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('TreeInternalComponent', function() {
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
    masterInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#master'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    masterComponentInstance = masterInternalTreeEl.componentInstance;
    lordInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#lord'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    lordComponentInstance = lordInternalTreeEl.componentInstance;
    faceInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#face'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    faceComponentInstance = faceInternalTreeEl.componentInstance;
    nodeMenuService = testing_1.TestBed.get(node_menu_service_1.NodeMenuService);
    nodeDraggableService = testing_1.TestBed.get(node_draggable_service_1.NodeDraggableService);
    treeService = testing_1.TestBed.get(tree_service_1.TreeService);
    safeHtml = testing_1.TestBed.get(safe_html_pipe_1.SafeHtmlPipe);
    fixture.detectChanges();
  });
  it('should be created by angular', function() {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
    expect(safeHtml).not.toBeNull();
  });
  it('should have properly set tree property', function() {
    expect(masterComponentInstance.tree).toBeDefined();
    expect(masterComponentInstance.tree.value).toEqual('Master');
  });
  it('should unselect selected node when another node is selected', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var allNodeValues = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.node-value'));
    expect(allNodeValues[0].nativeElement.innerText).toEqual('Master');
    allNodeValues[0].triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterComponentInstance.isSelected).toEqual(true);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(true);
    var servantNumber1El = allNodeValues[1].parent.parent.parent.parent;
    var servantNumber2El = allNodeValues[2].parent.parent.parent.parent;
    expect(servantNumber1El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(false);
    expect(servantNumber2El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(false);
    allNodeValues[1].triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterComponentInstance.isSelected).toEqual(false);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(false);
    expect(servantNumber1El.componentInstance.isSelected).toEqual(true);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(true);
    expect(servantNumber2El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(false);
  });
  it('should drag node to the tree (though technically every node IS a tree)', function() {
    var internalTreeChildren = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant1InternalTreeEl = internalTreeChildren[0];
    var servant2InternalTreeEl = internalTreeChildren[1];
    expect(servant1InternalTreeEl.componentInstance.tree.value).toEqual('Servant#1');
    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);
    expect(servant2InternalTreeEl.componentInstance.tree.value).toEqual('Servant#2');
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');
    var capturedNode = new captured_node_1.CapturedNode(
      servant1InternalTreeEl.componentInstance.nodeElementRef,
      servant1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, servant2InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');
    var masterElement = fixture.debugElement.nativeElement;
    var nodeValues = masterElement.querySelectorAll('.node-value');
    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#2');
    expect(nodeValues[2].innerText).toEqual('Servant#1');
  });
  it('should not add node to the children of a sibling branch node', function() {
    var internalTreeChildren = lordInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var disciple1InternalTreeEl = internalTreeChildren[0];
    var disciple2InternalTreeEl = internalTreeChildren[3];
    expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
    expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#2');
    var capturedNode = new captured_node_1.CapturedNode(
      disciple1InternalTreeEl.componentInstance.nodeElementRef,
      disciple1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, disciple2InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(disciple1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(disciple2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#2');
    expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(2);
    expect(disciple2InternalTreeEl.componentInstance.tree.children).toBeNull();
    var lordElement = lordInternalTreeEl.nativeElement;
    var nodeValues = lordElement.querySelectorAll('.node-value');
    expect(nodeValues[0].innerText).toEqual('Lord');
    expect(nodeValues[1].innerText).toEqual('Disciple#2');
    expect(nodeValues[2].innerText).toEqual('Disciple#1');
    expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(nodeValues[4].innerText).toEqual('SubDisciple#2');
  });
  it('should be impossible to drag parent onto its child', function() {
    var internalTreeChildren = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant2InternalTreeEl = internalTreeChildren[1];
    var capturedNode = new captured_node_1.CapturedNode(
      masterComponentInstance.nodeElementRef,
      masterComponentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, servant2InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');
    var masterElement = fixture.debugElement.nativeElement;
    var nodeValues = masterElement.querySelectorAll('.node-value');
    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#1');
    expect(nodeValues[2].innerText).toEqual('Servant#2');
  });
  it('should be possible to drag node from one subtree to another subtree in the same parent tree', function() {
    var internalTreeChildren = lordInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var disciple1InternalTreeEl = internalTreeChildren[0];
    var subDisciple1InternalTreeEl = internalTreeChildren[1];
    var subDisciple2InternalTreeEl = internalTreeChildren[2];
    var disciple2InternalTreeEl = internalTreeChildren[3];
    expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
    expect(subDisciple1InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#1');
    expect(subDisciple2InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#2');
    expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');
    var capturedNode = new captured_node_1.CapturedNode(
      subDisciple1InternalTreeEl.componentInstance.nodeElementRef,
      subDisciple1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, disciple2InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Disciple#2');
    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#2');
    var lordElement = lordInternalTreeEl.nativeElement;
    var nodeValues = lordElement.querySelectorAll('.node-value');
    expect(nodeValues[0].innerText).toEqual('Lord');
    expect(nodeValues[1].innerText).toEqual('Disciple#1');
    expect(nodeValues[2].innerText).toEqual('SubDisciple#2');
    expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(nodeValues[4].innerText).toEqual('Disciple#2');
  });
  it('should be possible to drag node from one subtree to another subtree in different parent trees', function() {
    var lordInternalTreeChildren = lordInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var disciple1InternalTreeEl = lordInternalTreeChildren[0];
    var subDisciple1InternalTreeEl = lordInternalTreeChildren[1];
    var masterInternalTreeChildren = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant1InternalTreeEl = masterInternalTreeChildren[0];
    var capturedNode = new captured_node_1.CapturedNode(
      servant1InternalTreeEl.componentInstance.nodeElementRef,
      servant1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, subDisciple1InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('SubDisciple#2');
    expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');
    var lordElement = lordInternalTreeEl.nativeElement;
    var lordNodeValues = lordElement.querySelectorAll('.node-value');
    expect(lordNodeValues[0].innerText).toEqual('Lord');
    expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
    expect(lordNodeValues[2].innerText).toEqual('Servant#1');
    expect(lordNodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(lordNodeValues[4].innerText).toEqual('SubDisciple#2');
    expect(lordNodeValues[5].innerText).toEqual('Disciple#2');
    var masterElement = masterInternalTreeEl.nativeElement;
    var masterNodeValues = masterElement.querySelectorAll('.node-value');
    expect(masterNodeValues[0].innerText).toEqual('Master');
    expect(masterNodeValues[1].innerText).toEqual('Servant#2');
  });
  it('add node to its children', function() {
    var lordInternalTreeChildren = lordInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var disciple1InternalTreeEl = lordInternalTreeChildren[0];
    var masterInternalTreeChildren = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant1InternalTreeEl = masterInternalTreeChildren[0];
    var capturedNode = new captured_node_1.CapturedNode(
      servant1InternalTreeEl.componentInstance.nodeElementRef,
      servant1InternalTreeEl.componentInstance.tree
    );
    nodeDraggableService.fireNodeDragged(capturedNode, disciple1InternalTreeEl.componentInstance.nodeElementRef);
    fixture.detectChanges();
    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#2');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');
    var lordElement = lordInternalTreeEl.nativeElement;
    var lordNodeValues = lordElement.querySelectorAll('.node-value');
    expect(lordNodeValues[0].innerText).toEqual('Lord');
    expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
    expect(lordNodeValues[2].innerText).toEqual('SubDisciple#1');
    expect(lordNodeValues[3].innerText).toEqual('SubDisciple#2');
    expect(lordNodeValues[4].innerText).toEqual('Servant#1');
    expect(lordNodeValues[5].innerText).toEqual('Disciple#2');
    var masterElement = masterInternalTreeEl.nativeElement;
    var masterNodeValues = masterElement.querySelectorAll('.node-value');
    expect(masterNodeValues[0].innerText).toEqual('Master');
    expect(masterNodeValues[1].innerText).toEqual('Servant#2');
  });
  it('should be possible to collapse node', function() {
    var foldingControl = masterInternalTreeEl.query(platform_browser_1.By.css('.folding'));
    spyOn(masterComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(masterComponentInstance.treeService.nodeCollapsed$, 'next');
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    foldingControl.triggerEventHandler('click');
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
    var children = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(children.length).toEqual(0);
  });
  it('should be possible to expand node', function() {
    var foldingControl = masterInternalTreeEl.query(platform_browser_1.By.css('.folding'));
    spyOn(masterComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(masterComponentInstance.treeService.nodeCollapsed$, 'next');
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    foldingControl.triggerEventHandler('click');
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
    var children = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(children.length).toEqual(0);
    foldingControl.triggerEventHandler('click');
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(masterComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(masterComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
    children = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(children.length).toEqual(2);
  });
  it("shouldn't show root of the tree", function() {
    expect(faceComponentInstance.tree.isRoot()).toEqual(
      true,
      'Element that has rootless class should be a root of the tree'
    );
    var treeUl = faceInternalTreeEl.query(platform_browser_1.By.css('.tree'));
    expect(treeUl.classes['rootless']).toEqual(true, 'Tree with hidden root should have "rootless" css class');
    var valueContainer = faceInternalTreeEl.query(platform_browser_1.By.css('.value-container'));
    expect(valueContainer.classes['rootless']).toEqual(
      true,
      'Element which contains tree value should also have "rootless" css class'
    );
  });
  it('should not propagate root visibility to its children - in other words only root should be modified in the tree and hidden', function() {
    var childEl = faceInternalTreeEl.query(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(childEl.componentInstance.tree.isRoot()).toEqual(false);
    expect(childEl.query(platform_browser_1.By.css('.tree')).classes['rootless']).toEqual(
      false,
      'Only element with root tree node can have rootless class'
    );
    expect(childEl.query(platform_browser_1.By.css('.value-container')).classes['rootless']).toEqual(
      false,
      'Only element with root tree node can have rootless class'
    );
  });
  describe('Static Tree', function() {
    it('should not show menu', function() {
      var event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;
      faceInternalTreeEl.query(platform_browser_1.By.css('.value-container')).triggerEventHandler('contextmenu', event);
      fixture.detectChanges();
      expect(faceComponentInstance.isRightMenuVisible).toEqual(false);
      expect(faceInternalTreeEl.query(platform_browser_1.By.css('.node-menu'))).toEqual(null);
      var childEl = faceInternalTreeEl.query(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      );
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(false);
      expect(childEl.query(platform_browser_1.By.css('.node-menu'))).toEqual(null);
    });
    it("should allow to override static option for it's children", function() {
      var event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;
      var childEl = faceInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      )[1];
      childEl.query(platform_browser_1.By.css('.value-container')).triggerEventHandler('contextmenu', event);
      fixture.detectChanges();
      expect(childEl.componentInstance.tree.value).toEqual('Retina');
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(true);
      expect(childEl.query(platform_browser_1.By.css('.node-menu'))).toBeTruthy();
    });
    it('should not be draggable', function() {
      var internalTreeChildren = faceInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      );
      var eyesEl = internalTreeChildren[0];
      var lipsEl = internalTreeChildren[3];
      expect(eyesEl.componentInstance.tree.value).toEqual('Eyes');
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.value).toEqual('Lips');
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);
      var capturedNode = new captured_node_1.CapturedNode(
        eyesEl.componentInstance.nodeElementRef,
        eyesEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(capturedNode, lipsEl.componentInstance.nodeElementRef);
      fixture.detectChanges();
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);
      expect(faceInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(faceInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Lips');
      var nativeElement = faceInternalTreeEl.nativeElement;
      var nodeValues = nativeElement.querySelectorAll('.node-value');
      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyebrow');
      expect(nodeValues[4].innerText).toEqual('Lips');
    });
  });
});
//# sourceMappingURL=tree-internal.component.spec.js.map
