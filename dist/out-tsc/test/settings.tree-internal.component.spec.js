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
var safe_html_pipe_1 = require('../src/utils/safe-html.pipe');
var fixture;
var masterInternalTreeEl;
var masterComponentInstance;
var tree = {
  value: 'Master',
  settings: {
    cssClasses: {
      expanded: 'fa fa-caret-down',
      collapsed: 'fa fa-caret-right',
      leaf: 'fa'
    },
    templates: {
      node: '<i class="folder"></i>',
      leaf: '<i class="file"></i>'
    }
  },
  children: [
    { value: 'Servant#1' },
    {
      value: 'Servant#2',
      settings: {
        templates: {
          leaf: '<i class="bla"></i>'
        }
      }
    }
  ]
};
var TestComponent = (function() {
  function TestComponent(treeHolder) {
    this.treeHolder = treeHolder;
    this.tree = tree;
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template: '<div><tree id="master" [tree]="tree"></tree></div>'
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('settings on tree model', function() {
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
        tree_service_1.TreeService
      ]
    });
    fixture = testing_1.TestBed.createComponent(TestComponent);
    masterInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#master'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    masterComponentInstance = masterInternalTreeEl.componentInstance;
    fixture.detectChanges();
  });
  describe('cssClasses setting in tree', function() {
    it('adds appropriate css classes for a expanded node', function() {
      var foldingEl = masterInternalTreeEl.query(platform_browser_1.By.css('.folding'));
      expect(foldingEl.classes).toEqual({ folding: true, fa: true, 'fa-caret-down': true });
    });
    it('adds appropriate css classes for a collapsed node', function() {
      var foldingEl = masterInternalTreeEl.query(platform_browser_1.By.css('.folding'));
      foldingEl.nativeElement.click();
      fixture.detectChanges();
      expect(foldingEl.classes).toEqual({ folding: true, fa: true, 'fa-caret-down': false, 'fa-caret-right': true });
    });
    it('adds appropriate css classes for a leaf', function() {
      var foldingEl = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.folding'))[1];
      expect(foldingEl.classes).toEqual({ folding: true, fa: true });
    });
  });
  describe('templates setting in tree', function() {
    it("puts node templates content to the left of the node's value", function() {
      var _a = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.node-template')),
        masterNodeTemplate = _a[0],
        servant1NodeTemplate = _a[1],
        servant2NodeTemplate = _a[2];
      expect(masterNodeTemplate.nativeElement.innerHTML).toEqual(tree.settings.templates.node);
      expect(servant1NodeTemplate.nativeElement.innerHTML).toEqual(tree.settings.templates.leaf);
      expect(servant2NodeTemplate.nativeElement.innerHTML).toEqual(tree.children[1].settings.templates.leaf);
    });
  });
});
//# sourceMappingURL=settings.tree-internal.component.spec.js.map
