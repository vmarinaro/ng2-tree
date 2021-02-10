'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var node_menu_component_1 = require('../../src/menu/node-menu.component');
var node_menu_service_1 = require('../../src/menu/node-menu.service');
var menu_events_1 = require('../../src/menu/menu.events');
var event_utils_1 = require('../../src/utils/event.utils');
var fixture;
var nodeMenuService;
var componentInstance;
describe('NodeMenuComponent', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      declarations: [node_menu_component_1.NodeMenuComponent],
      providers: [node_menu_service_1.NodeMenuService]
    });
    fixture = testing_1.TestBed.createComponent(node_menu_component_1.NodeMenuComponent);
    componentInstance = fixture.debugElement.componentInstance;
    nodeMenuService = testing_1.TestBed.get(node_menu_service_1.NodeMenuService);
  });
  it('should be created by angular', function() {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
  });
  it('should have event emitter properly created', function() {
    expect(fixture.componentInstance.menuItemSelected instanceof core_1.EventEmitter).toBe(true);
  });
  it('should have basic menu items', function() {
    expect(fixture.componentInstance.availableMenuItems.length).toEqual(4);
    expect(fixture.componentInstance.availableMenuItems[0]).toEqual({
      name: 'New tag',
      action: menu_events_1.NodeMenuItemAction.NewTag,
      cssClass: 'new-tag'
    });
    expect(fixture.componentInstance.availableMenuItems[1]).toEqual({
      name: 'New folder',
      action: menu_events_1.NodeMenuItemAction.NewFolder,
      cssClass: 'new-folder'
    });
    expect(fixture.componentInstance.availableMenuItems[2]).toEqual({
      name: 'Rename',
      action: menu_events_1.NodeMenuItemAction.Rename,
      cssClass: 'rename'
    });
    expect(fixture.componentInstance.availableMenuItems[3]).toEqual({
      name: 'Remove',
      action: menu_events_1.NodeMenuItemAction.Remove,
      cssClass: 'remove'
    });
  });
  it('should render basic menu items', function() {
    fixture.detectChanges();
    var menuItems = fixture.debugElement.queryAll(platform_browser_1.By.css('.node-menu-item'));
    expect(menuItems).not.toBeNull();
    expect(menuItems.length).toEqual(4);
    expect(menuItems[0].query(platform_browser_1.By.css('.node-menu-item-icon')).nativeElement.classList).toContain(
      'new-tag'
    );
    expect(menuItems[0].query(platform_browser_1.By.css('.node-menu-item-value')).nativeElement.innerText).toEqual(
      'New tag'
    );
    expect(menuItems[1].query(platform_browser_1.By.css('.node-menu-item-icon')).nativeElement.classList).toContain(
      'new-folder'
    );
    expect(menuItems[1].query(platform_browser_1.By.css('.node-menu-item-value')).nativeElement.innerText).toEqual(
      'New folder'
    );
    expect(menuItems[2].query(platform_browser_1.By.css('.node-menu-item-icon')).nativeElement.classList).toContain(
      'rename'
    );
    expect(menuItems[2].query(platform_browser_1.By.css('.node-menu-item-value')).nativeElement.innerText).toEqual(
      'Rename'
    );
    expect(menuItems[3].query(platform_browser_1.By.css('.node-menu-item-icon')).nativeElement.classList).toContain(
      'remove'
    );
    expect(menuItems[3].query(platform_browser_1.By.css('.node-menu-item-value')).nativeElement.innerText).toEqual(
      'Remove'
    );
  });
  it('should not emit an action on right mouse button click', function() {
    fixture.detectChanges();
    var event = {
      button: event_utils_1.MouseButtons.Right
    };
    var menuItem = fixture.debugElement.query(platform_browser_1.By.css('.node-menu-item'));
    spyOn(componentInstance.menuItemSelected, 'emit');
    menuItem.triggerEventHandler('click', event);
    expect(componentInstance.menuItemSelected.emit).not.toHaveBeenCalled();
  });
  it('should emit an action on left mouse button click', function() {
    fixture.detectChanges();
    var event = {
      button: event_utils_1.MouseButtons.Left
    };
    var menuItem = fixture.debugElement.query(platform_browser_1.By.css('.node-menu-item'));
    spyOn(componentInstance.menuItemSelected, 'emit');
    menuItem.triggerEventHandler('click', event);
    expect(componentInstance.menuItemSelected.emit).toHaveBeenCalledWith({
      nodeMenuItemAction: menu_events_1.NodeMenuItemAction.NewTag,
      nodeMenuItemSelected: 'New tag'
    });
  });
  it('should close menu on any click outside of it', function() {
    fixture.detectChanges();
    spyOn(nodeMenuService.nodeMenuEvents$, 'next');
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.dispatchEvent(event);
    var expectedNodeMenuEvent = {
      sender: event.target,
      action: menu_events_1.NodeMenuAction.Close
    };
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledWith(expectedNodeMenuEvent);
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledTimes(1);
  });
  it('should close menu on any keyup outside of it', function() {
    fixture.detectChanges();
    spyOn(nodeMenuService.nodeMenuEvents$, 'next');
    var event = document.createEvent('Events');
    event.keyCode = event_utils_1.Keys.Escape;
    event.initEvent('keyup', true, true);
    document.dispatchEvent(event);
    var expectedNodeMenuEvent = {
      sender: event.target,
      action: menu_events_1.NodeMenuAction.Close
    };
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledWith(expectedNodeMenuEvent);
    expect(nodeMenuService.nodeMenuEvents$.next).toHaveBeenCalledTimes(1);
  });
  it('should not close menu on event not considered to do so', function() {
    fixture.detectChanges();
    spyOn(nodeMenuService.nodeMenuEvents$, 'next');
    var event = document.createEvent('Events');
    event.initEvent('keyup', true, true);
    document.dispatchEvent(event);
    expect(nodeMenuService.nodeMenuEvents$.next).not.toHaveBeenCalled();
  });
  it('should destroy globally registered event listeners', function() {
    fixture.detectChanges();
    spyOn(nodeMenuService.nodeMenuEvents$, 'next');
    componentInstance.ngOnDestroy();
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var keyboardEvent = document.createEvent('Events');
    keyboardEvent.keyCode = event_utils_1.Keys.Escape;
    keyboardEvent.initEvent('keyup', true, true);
    document.dispatchEvent(keyboardEvent);
    document.dispatchEvent(mouseEvent);
    expect(nodeMenuService.nodeMenuEvents$.next).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=node-menu.component.spec.js.map
