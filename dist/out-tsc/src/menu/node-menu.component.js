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
var __param =
  (this && this.__param) ||
  function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var core_1 = require('@angular/core');
var node_menu_service_1 = require('./node-menu.service');
var menu_events_1 = require('./menu.events');
var event_utils_1 = require('../utils/event.utils');
var NodeMenuComponent = (function() {
  function NodeMenuComponent(renderer, nodeMenuService) {
    this.renderer = renderer;
    this.nodeMenuService = nodeMenuService;
    this.menuItemSelected = new core_1.EventEmitter();
    this.availableMenuItems = [
      {
        name: 'New tag',
        action: menu_events_1.NodeMenuItemAction.NewTag,
        cssClass: 'new-tag'
      },
      {
        name: 'New folder',
        action: menu_events_1.NodeMenuItemAction.NewFolder,
        cssClass: 'new-folder'
      },
      {
        name: 'Rename',
        action: menu_events_1.NodeMenuItemAction.Rename,
        cssClass: 'rename'
      },
      {
        name: 'Remove',
        action: menu_events_1.NodeMenuItemAction.Remove,
        cssClass: 'remove'
      }
    ];
    this.disposersForGlobalListeners = [];
  }
  NodeMenuComponent.prototype.ngOnInit = function() {
    this.availableMenuItems = this.menuItems || this.availableMenuItems;
    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
    this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
  };
  NodeMenuComponent.prototype.ngOnDestroy = function() {
    this.disposersForGlobalListeners.forEach(function(dispose) {
      return dispose();
    });
  };
  NodeMenuComponent.prototype.onMenuItemSelected = function(e, selectedMenuItem) {
    if (event_utils_1.isLeftButtonClicked(e)) {
      this.menuItemSelected.emit({
        nodeMenuItemAction: selectedMenuItem.action,
        nodeMenuItemSelected: selectedMenuItem.name
      });
      this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
    }
  };
  NodeMenuComponent.prototype.closeMenu = function(e) {
    var mouseClicked = e instanceof MouseEvent;
    // Check if the click is fired on an element inside a menu
    var containingTarget =
      this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
    if ((mouseClicked && !containingTarget) || event_utils_1.isEscapePressed(e)) {
      this.nodeMenuService.fireMenuEvent(e.target, menu_events_1.NodeMenuAction.Close);
    }
  };
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    NodeMenuComponent.prototype,
    'menuItemSelected',
    void 0
  );
  __decorate([core_1.Input(), __metadata('design:type', Array)], NodeMenuComponent.prototype, 'menuItems', void 0);
  __decorate(
    [core_1.ViewChild('menuContainer'), __metadata('design:type', Object)],
    NodeMenuComponent.prototype,
    'menuContainer',
    void 0
  );
  NodeMenuComponent = __decorate(
    [
      core_1.Component({
        selector: 'node-menu',
        template:
          '\n    <div class="node-menu">\n      <ul class="node-menu-content" #menuContainer>\n        <li class="node-menu-item" *ngFor="let menuItem of availableMenuItems"\n          (click)="onMenuItemSelected($event, menuItem)">\n          <div class="node-menu-item-icon {{menuItem.cssClass}}"></div>\n          <span class="node-menu-item-value">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  '
      }),
      __param(0, core_1.Inject(core_1.Renderer2)),
      __param(1, core_1.Inject(node_menu_service_1.NodeMenuService)),
      __metadata('design:paramtypes', [core_1.Renderer2, node_menu_service_1.NodeMenuService])
    ],
    NodeMenuComponent
  );
  return NodeMenuComponent;
})();
exports.NodeMenuComponent = NodeMenuComponent;
//# sourceMappingURL=node-menu.component.js.map
