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
  icon: 'icon0',
  children: [{ value: 'Servant#1', icon: 'icon1' }, { value: 'Servant#2', icon: 'icon2' }]
};
var TestComponent = (function() {
  function TestComponent(treeHolder) {
    this.treeHolder = treeHolder;
    this.tree = tree;
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template:
          '<div><tree id="master" [tree]="tree"><ng-template let-node><span class="icon">{{node.icon}}</span><span class="value">{{node.value}}</span></ng-template></tree></div>'
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('template for tree', function() {
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
  it('should not render default node', function() {
    var foldingEl = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.node-name'));
    expect(foldingEl.length).toEqual(0);
  });
  it('should render the template', function() {
    var icons = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.icon'));
    expect(icons.length).toEqual(3);
    expect(icons[0].nativeElement.innerHTML).toEqual('icon0');
    expect(icons[1].nativeElement.innerHTML).toEqual('icon1');
    expect(icons[2].nativeElement.innerHTML).toEqual('icon2');
    var values = masterInternalTreeEl.queryAll(platform_browser_1.By.css('.value'));
    expect(values.length).toEqual(3);
    expect(values[0].nativeElement.innerHTML).toEqual('Master');
    expect(values[1].nativeElement.innerHTML).toEqual('Servant#1');
    expect(values[2].nativeElement.innerHTML).toEqual('Servant#2');
  });
});
//# sourceMappingURL=template.tree-internal.component.spec.js.map
