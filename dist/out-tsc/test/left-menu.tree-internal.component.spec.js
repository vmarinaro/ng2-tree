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
var menu_events_1 = require('../src/menu/menu.events');
var EventUtils = require('../src/utils/event.utils');
var captured_node_1 = require('../src/draggable/captured-node');
var safe_html_pipe_1 = require('../src/utils/safe-html.pipe');
var fixture;
var masterInternalTreeEl;
var masterComponentInstance;
var leftMenuInternalTreeEl;
var leftMenuComponentInstance;
var staticInternalTreeEl;
var staticComponentInstance;
var nodeMenuService;
var nodeDraggableService;
var treeService;
var tree = {
  value: 'Master',
  settings: {
    leftMenu: true,
    rightMenu: false
  },
  children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
};
var tree2 = {
  value: 'Left Menu',
  children: [
    { value: 'Left Menu Not Set Child' },
    {
      value: 'Inactive',
      settings: {
        leftMenu: false
      },
      children: [{ value: 'Left Menu Inactive Child' }]
    },
    {
      value: 'Active',
      settings: {
        leftMenu: true
      },
      children: [{ value: 'Left Menu Active Child' }]
    },
    {
      value: 'Inactive With Active Children',
      settings: {
        leftMenu: false
      },
      children: [
        {
          value: 'Reactivate Lefft Menu',
          settings: {
            leftMenu: true
          },
          children: [{ value: 'Reactivated Left Menu Children' }]
        }
      ]
    }
  ]
};
var tree3 = {
  value: 'Face',
  settings: {
    static: true,
    leftMenu: true
  },
  children: [
    {
      value: 'Eyes',
      settings: {
        leftMenu: true
      }
    },
    {
      value: 'Retina',
      settings: {
        static: false
      },
      children: [
        {
          value: 'Eyelash',
          settings: {
            leftMenu: true
          }
        },
        {
          value: 'Eyebow',
          settings: {
            leftMenu: false
          },
          children: []
        }
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
  }
  TestComponent = __decorate(
    [
      core_1.Component({
        template:
          '\n    <div><tree id="master" [tree]="tree"></tree></div>\n    <div><tree id="left-menu" [tree]="tree2"></tree></div>\n    <div><tree id="static" [tree]="tree3"></tree></div>\n  '
      }),
      __metadata('design:paramtypes', [core_1.ElementRef])
    ],
    TestComponent
  );
  return TestComponent;
})();
describe('LeftMenu-TreeInternalComponent', function() {
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
    leftMenuInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#left-menu'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    leftMenuComponentInstance = leftMenuInternalTreeEl.componentInstance;
    staticInternalTreeEl = fixture.debugElement
      .query(platform_browser_1.By.css('#static'))
      .query(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent));
    staticComponentInstance = leftMenuInternalTreeEl.componentInstance;
    nodeMenuService = testing_1.TestBed.get(node_menu_service_1.NodeMenuService);
    nodeDraggableService = testing_1.TestBed.get(node_draggable_service_1.NodeDraggableService);
    treeService = testing_1.TestBed.get(tree_service_1.TreeService);
    fixture.detectChanges();
  });
  it('should be created by angular', function() {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
  });
  it('should hide left menu when appropriate event has occurred', function() {
    spyOn(nodeMenuService, 'hideMenuForAllNodesExcept');
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl.query(platform_browser_1.By.css('.node-left-menu')).triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterComponentInstance.isLeftMenuVisible).toEqual(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(nodeMenuService.hideMenuForAllNodesExcept).toHaveBeenCalledTimes(1);
    expect(nodeMenuService.hideMenuForAllNodesExcept).toHaveBeenCalledWith(masterComponentInstance.nodeElementRef);
  });
  it('shouldn`t have a left menu on node and it`s child by default', function() {
    expect(
      leftMenuInternalTreeEl
        .query(platform_browser_1.By.css('.value-container'))
        .queryAll(platform_browser_1.By.css('.node-left-menu')).length
    ).toEqual(0);
    var defaultChildEl = leftMenuInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[0];
    expect(
      defaultChildEl
        .query(platform_browser_1.By.css('.value-container'))
        .queryAll(platform_browser_1.By.css('.node-left-menu')).length
    ).toEqual(0);
  });
  it('shouldn`t have a left menu on node and it`s child when it has a settings - leftMenu to false', function() {
    var inactiveLeftMenuEl = leftMenuInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[1];
    expect(
      inactiveLeftMenuEl
        .query(platform_browser_1.By.css('.value-container'))
        .queryAll(platform_browser_1.By.css('.node-left-menu')).length
    ).toEqual(0);
    var inactiveLeftMenuChildEl = inactiveLeftMenuEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[0];
    expect(
      inactiveLeftMenuChildEl
        .query(platform_browser_1.By.css('.value-container'))
        .queryAll(platform_browser_1.By.css('.node-left-menu')).length
    ).toEqual(0);
  });
  it('should show left menu on node', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var activeLeftMenuEl = leftMenuInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[3];
    activeLeftMenuEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(activeLeftMenuEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menus = activeLeftMenuEl.queryAll(platform_browser_1.By.css('.node-menu'));
    expect(menus.length).toEqual(1);
    expect(menus[0].queryAll(platform_browser_1.By.css('.node-menu-item')).length).toEqual(4);
  });
  it('should show left menu on node`s child, which has a setting leftMenu - true', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var activeLeftMenuEl = leftMenuInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[3];
    var activeLeftMenuChildEl = activeLeftMenuEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    )[0];
    activeLeftMenuEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(activeLeftMenuEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menus = activeLeftMenuEl.queryAll(platform_browser_1.By.css('.node-menu'));
    expect(menus.length).toEqual(1);
    expect(menus[0].queryAll(platform_browser_1.By.css('.node-menu-item')).length).toEqual(4);
  });
  it('should remove node by click on appropriate menu item', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var servantEls = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant1El = servantEls[0];
    servant1El
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(servant1El.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = servant1El.query(platform_browser_1.By.css('.node-menu'));
    var menuItemRemove = menu.query(platform_browser_1.By.css('.remove')).parent;
    var eventRemove = { button: EventUtils.MouseButtons.Left };
    menuItemRemove.triggerEventHandler('click', eventRemove);
    fixture.detectChanges();
    var remainedSevantEls = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(remainedSevantEls.length).toEqual(1);
    expect(remainedSevantEls[0].componentInstance.tree.value).toEqual('Servant#2');
  });
  it('should hide menu on click outside of menu', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var servantEls = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    var servant1El = servantEls[0];
    servant1El
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(servant1El.componentInstance.isLeftMenuVisible).toEqual(true);
    expect(servant1El.query(platform_browser_1.By.css('.node-menu'))).toBeDefined();
    nodeMenuService.fireMenuEvent(null, menu_events_1.NodeMenuAction.Close);
    fixture.detectChanges();
    expect(servant1El.componentInstance.isLeftMenuVisible).toEqual(false);
    expect(servant1El.query(platform_browser_1.By.css('.node-menu'))).toBeNull();
  });
  it('should rename node on enter', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuItemRename = menu.query(platform_browser_1.By.css('.rename')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.value).toEqual('bla');
  });
  it('should rename node on blur', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuItemRename = menu.query(platform_browser_1.By.css('.rename')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('blur', { target: { value: 'bla' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.value).toEqual('bla');
  });
  it('should cancel renaming node on escape pressed', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuItemRename = menu.query(platform_browser_1.By.css('.rename')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.nativeElement.value = '121212';
    inputRename.triggerEventHandler('keyup.esc', { target: { value: 'bla' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.value).toEqual('Master');
  });
  it('should not rename node on empty input', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuItemRename = menu.query(platform_browser_1.By.css('.rename')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('blur', { target: { value: '' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.value).toEqual('Master');
  });
  it('should create a leaf child when NewTag operation activated on a branch node', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuNewTag = menu.query(platform_browser_1.By.css('.new-tag')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('bla');
    expect(
      masterInternalTreeEl
        .queryAll(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent))[2]
        .nativeElement.querySelector('.node-value').innerText
    ).toEqual('bla');
  });
  it('should create a sibling leaf when NewTag operation was activated on a node that is leaf', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    var servant1El = masterInternalTreeEl.query(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    servant1El
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(servant1El.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = servant1El.query(platform_browser_1.By.css('.node-menu'));
    var menuNewTag = menu.query(platform_browser_1.By.css('.new-tag')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeTruthy();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('bla');
    expect(
      masterInternalTreeEl
        .queryAll(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent))[2]
        .nativeElement.querySelector('.node-value').innerText
    ).toEqual('bla');
  });
  it('should not create a node with empty value', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuNewTag = menu.query(platform_browser_1.By.css('.new-tag')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: '\r\n\t ' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.children.length).toEqual(2);
    expect(masterComponentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterComponentInstance.tree.children[1].value).toEqual('Servant#2');
    var servantEls = masterInternalTreeEl.queryAll(
      platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
    );
    expect(servantEls.length).toEqual(2);
    expect(servantEls[0].nativeElement.querySelector('.node-value').innerText).toEqual('Servant#1');
    expect(servantEls[1].nativeElement.querySelector('.node-value').innerText).toEqual('Servant#2');
  });
  it('should create a branch node when NewFolder operation activated', function() {
    var event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;
    masterInternalTreeEl
      .query(platform_browser_1.By.css('.value-container'))
      .query(platform_browser_1.By.css('.node-left-menu'))
      .triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(masterInternalTreeEl.componentInstance.isLeftMenuVisible).toEqual(true);
    var menu = masterInternalTreeEl.query(platform_browser_1.By.css('.node-menu'));
    var menuNewTag = menu.query(platform_browser_1.By.css('.new-folder')).parent;
    var eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);
    fixture.detectChanges();
    var inputRename = masterInternalTreeEl.query(platform_browser_1.By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'Branch' } });
    fixture.detectChanges();
    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('Branch');
    expect(masterComponentInstance.tree.children[2].isBranch()).toEqual(true);
    expect(masterComponentInstance.tree.children[2].children).toBeDefined();
    expect(masterComponentInstance.tree.children[2].children.length).toEqual(0);
    expect(
      masterInternalTreeEl
        .queryAll(platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent))[2]
        .nativeElement.querySelector('.node-value').innerText
    ).toEqual('Branch');
  });
  describe('Static Tree', function() {
    it('should not show left menu', function() {
      expect(
        staticInternalTreeEl
          .query(platform_browser_1.By.css('.value-container'))
          .queryAll(platform_browser_1.By.css('.node-left-menu')).length
      ).toEqual(0);
      var childEl = staticInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      )[0];
      expect(
        childEl
          .query(platform_browser_1.By.css('.value-container'))
          .queryAll(platform_browser_1.By.css('.node-left-menu')).length
      ).toEqual(0);
      var event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Left;
      staticComponentInstance.showLeftMenu(event);
      fixture.detectChanges();
      expect(staticComponentInstance.isLeftMenuVisible).toEqual(false);
      expect(staticInternalTreeEl.query(platform_browser_1.By.css('.node-menu'))).toEqual(null);
    });
    it('should not show left menu when settings leftMenu is false', function() {
      var internalTreeChildren = staticInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      );
      var eyebowEl = internalTreeChildren[3];
      expect(eyebowEl.componentInstance.tree.value).toEqual('Eyebow');
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(1);
      expect(
        eyebowEl
          .query(platform_browser_1.By.css('.value-container'))
          .queryAll(platform_browser_1.By.css('.node-left-menu')).length
      ).toEqual(0);
      var event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Left;
      staticComponentInstance.showLeftMenu(event);
      fixture.detectChanges();
      expect(eyebowEl.componentInstance.isLeftMenuVisible).toEqual(false);
      expect(eyebowEl.query(platform_browser_1.By.css('.node-menu'))).toEqual(null);
    });
    it("should allow to override static option for it's children", function() {
      var event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Left;
      var childEl = staticInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      )[1];
      childEl
        .query(platform_browser_1.By.css('.value-container'))
        .query(platform_browser_1.By.css('.node-left-menu'))
        .triggerEventHandler('click', event);
      fixture.detectChanges();
      expect(childEl.componentInstance.tree.value).toEqual('Retina');
      expect(childEl.componentInstance.isLeftMenuVisible).toEqual(true);
      expect(childEl.query(platform_browser_1.By.css('.node-menu'))).toBeTruthy();
    });
    it('should not be draggable', function() {
      var internalTreeChildren = staticInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      );
      var eyesEl = internalTreeChildren[0];
      var lipsEl = internalTreeChildren[4];
      expect(eyesEl.componentInstance.tree.value).toEqual('Eyes');
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.value).toEqual('Lips');
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(2);
      expect(staticInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(staticInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Lips');
      var capturedNode = new captured_node_1.CapturedNode(
        eyesEl.componentInstance.nodeElementRef,
        eyesEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(capturedNode, lipsEl.componentInstance.nodeElementRef);
      fixture.detectChanges();
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(2);
      expect(staticInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(staticInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Lips');
      var nativeElement = staticInternalTreeEl.nativeElement;
      var nodeValues = nativeElement.querySelectorAll('.node-value');
      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyelash');
      expect(nodeValues[4].innerText).toEqual('Eyebow');
      expect(nodeValues[5].innerText).toEqual('Lips');
    });
    it('should allow to drag and drop not static elements in a static parent', function() {
      var internalTreeChildren = staticInternalTreeEl.queryAll(
        platform_browser_1.By.directive(tree_internal_component_1.TreeInternalComponent)
      );
      var eyelashEl = internalTreeChildren[2];
      var eyebowEl = internalTreeChildren[3];
      expect(eyelashEl.componentInstance.tree.value).toEqual('Eyelash');
      expect(eyelashEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(eyebowEl.componentInstance.tree.value).toEqual('Eyebow');
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(1);
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[0].value).toEqual('Eyelash');
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[1].value).toEqual('Eyebow');
      var capturedNode = new captured_node_1.CapturedNode(
        eyelashEl.componentInstance.nodeElementRef,
        eyelashEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(capturedNode, eyebowEl.componentInstance.nodeElementRef);
      fixture.detectChanges();
      expect(eyelashEl.componentInstance.tree.positionInParent).toEqual(1);
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[0].value).toEqual('Eyebow');
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[1].value).toEqual('Eyelash');
      var nativeElement = staticInternalTreeEl.nativeElement;
      var nodeValues = nativeElement.querySelectorAll('.node-value');
      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyebow');
      expect(nodeValues[4].innerText).toEqual('Eyelash');
      expect(nodeValues[5].innerText).toEqual('Lips');
    });
  });
});
//# sourceMappingURL=left-menu.tree-internal.component.spec.js.map
