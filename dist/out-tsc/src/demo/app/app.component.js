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
var core_1 = require('@angular/core');
var menu_events_1 = require('../../menu/menu.events');
var AppComponent = (function() {
  function AppComponent() {
    this.settings = {
      rootIsVisible: false,
      showCheckboxes: true
    };
    this.disabledCheckboxesSettings = {
      rootIsVisible: false,
      showCheckboxes: true,
      enableCheckboxes: false
    };
    this.fonts = {
      value: 'Fonts',
      settings: {
        isCollapsedOnInit: true
      },
      children: [
        {
          value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
          id: 1,
          settings: {
            static: true
          },
          children: [
            { value: '<a href="#" id="antiqua" class="test">Antiqua</a> with HTML tags.', id: 2 },
            { value: 'DejaVu Serif', id: 3 },
            { value: 'Garamond', id: 4 },
            { value: 'Georgia', id: 5 },
            { value: 'Times New Roman', id: 6 },
            {
              value: 'Slab serif',
              id: 7,
              children: [{ value: 'Candida', id: 8 }, { value: 'Swift', id: 9 }, { value: 'Guardian Egyptian', id: 10 }]
            }
          ]
        },
        {
          value: 'Sans-serif (Right click me - I have a custom menu)',
          id: 11,
          settings: {
            menuItems: [
              { action: menu_events_1.NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
              { action: menu_events_1.NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
              { action: menu_events_1.NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right' }
            ]
          },
          children: [
            { value: 'Arial', id: 12 },
            { value: 'Century Gothic', id: 13 },
            { value: 'DejaVu Sans', id: 14 },
            { value: 'Futura', id: 15 },
            { value: 'Geneva', id: 16 },
            { value: 'Liberation Sans', id: 17 }
          ]
        },
        {
          value: 'Monospace - With ASYNC CHILDREN',
          id: 18,
          // children property is ignored if "loadChildren" is present
          children: [{ value: 'I am the font that will be ignored' }],
          loadChildren: function(callback) {
            setTimeout(function() {
              callback([
                { value: 'Input Mono', id: 19 },
                { value: 'Roboto Mono', id: 20 },
                { value: 'Liberation Mono', id: 21 },
                { value: 'Hack', id: 22 },
                { value: 'Consolas', id: 23 },
                { value: 'Menlo', id: 24 },
                { value: 'Source Code Pro', id: 25 }
              ]);
            }, 5000);
          }
        }
      ]
    };
    this.ffs = {
      value: '/',
      id: 1,
      settings: {
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          empty: 'fa fa-caret-right disabled',
          leaf: 'fa'
        },
        templates: {
          node: '<i class="fa fa-folder-o"></i>',
          leaf: '<i class="fa fa-file-o"></i>'
        }
      },
      children: [
        {
          value: 'bin',
          id: 2,
          children: [
            { value: 'bash', id: 3 },
            { value: 'umount', id: 4 },
            { value: 'cp', id: 5 },
            { value: 'less', id: 6 },
            { value: 'rmdir', id: 7 },
            { value: 'touch', id: 8 },
            { value: 'chgrp', id: 9 },
            { value: 'chmod', id: 10 },
            { value: 'chown', id: 11 },
            { value: 'nano', id: 12 }
          ],
          settings: {
            isCollapsedOnInit: true
          }
        },
        {
          value: 'boot',
          id: 13,
          settings: {
            isCollapsedOnInit: true,
            keepNodesInDOM: true
          },
          children: [
            {
              value: 'grub',
              id: 14,
              children: [
                { value: 'fonts', id: 15 },
                { value: 'gfxblacklist.txt', id: 16 },
                { value: 'grub.cfg', id: 17 },
                { value: 'grubenv', id: 18 },
                { value: 'i386-pc', id: 19 },
                { value: 'locale', id: 20 },
                { value: 'unicode.pf2', id: 21 }
              ]
            },
            {
              value: 'lost+found',
              id: 22,
              children: [],
              settings: {
                checked: true
              }
            },
            { value: 'abi-4.4.0-57-generic', id: 23 },
            { value: 'config-4.4.0-57-generic', id: 24 },
            { value: 'initrd.img-4.4.0-47-generic', id: 25 },
            { value: 'initrd.img-4.4.0-57-generic', id: 26 },
            { value: 'memtest86+.bin', id: 27 },
            { value: 'System.map-4.4.0-57-generic', id: 28 },
            { value: 'memtest86+.elf', id: 29 },
            { value: 'vmlinuz-4.4.0-57-generic', id: 30 },
            { value: 'memtest86+_multiboot.bin', id: 31 }
          ]
        },
        {
          value: 'build-no-left-no-right-menus',
          id: 32,
          settings: {
            leftMenu: false,
            rightMenu: false
          },
          children: [
            {
              value: 'php5-left-menu',
              id: 33,
              settings: {
                leftMenu: true
              }
            },
            {
              value: 'grails-left-menu',
              id: 335,
              settings: {
                leftMenu: true
              }
            },
            {
              value: 'python-right-menu',
              id: 333,
              settings: {
                rightMenu: true
              }
            }
          ]
        },
        { value: 'cdrom', id: 34, children: [] },
        { value: 'dev', id: 35, children: [] },
        {
          value: 'etc',
          id: 36,
          loadChildren: function(callback) {
            console.log('callback function called to load etc`s children');
            setTimeout(function() {
              callback([
                { value: 'apache2', id: 82, children: [] },
                { value: 'nginx', id: 83, children: [] },
                { value: 'dhcp', id: 84, children: [] },
                { value: 'dpkg', id: 85, children: [] }
              ]);
            });
          }
        },
        {
          value: 'home',
          id: 37,
          children: [
            {
              value: 'firstUser',
              id: 38,
              children: [
                {
                  value: 'Documents',
                  id: 39,
                  children: [
                    {
                      value: 'home',
                      id: 40,
                      children: [
                        {
                          value: 'bills',
                          id: 41,
                          children: [
                            { value: '2016-07-01-mobile.pdf', id: 42 },
                            { value: '2016-07-01-electricity.pdf', id: 43 },
                            { value: '2016-07-01-water.pdf', id: 44 },
                            { value: '2016-07-01-internet.pdf', id: 45 },
                            { value: '2016-08-01-mobile.pdf', id: 46 },
                            { value: '2016-10-01-internet.pdf', id: 47 }
                          ]
                        },
                        { value: 'photos', id: 48, children: [] }
                      ]
                    }
                  ]
                },
                { value: 'Downloads', id: 49, children: [] },
                { value: 'Desktop', id: 50, children: [] },
                { value: 'Pictures', id: 51, children: [] },
                {
                  value: 'Music',
                  id: 52,
                  children: [{ value: "won't be displayed" }],
                  loadChildren: function(callback) {
                    setTimeout(function() {
                      callback([
                        { value: '2Cellos', id: 78, children: [] },
                        { value: 'Michael Jackson', id: 79, children: [] },
                        { value: 'AC/DC', id: 80, children: [] },
                        { value: 'Adel', id: 81, children: [] }
                      ]);
                    }, 5000);
                  }
                },
                { value: 'Public', id: 53, children: [] }
              ]
            },
            {
              value: 'secondUser - left menu templates',
              id: 54,
              settings: {
                leftMenu: true
              },
              children: [
                { value: 'Documents', id: 55, children: [] },
                {
                  value: 'Downloads - custom left menu template',
                  id: 56,
                  settings: {
                    templates: {
                      leftMenu: '<i class="fa fa-navicon"></i>'
                    }
                  },
                  children: [
                    { value: 'Actobat3', id: 57 },
                    { value: 'Complib', id: 58 },
                    { value: 'Eudora', id: 59 },
                    { value: 'java', id: 60 },
                    { value: 'drivers', id: 61 },
                    { value: 'kathy', id: 62 }
                  ]
                },
                { value: 'Desktop', id: 63, children: [] },
                { value: 'Pictures', id: 64, children: [] },
                { value: 'Music', id: 65, children: [] },
                { value: 'Public', id: 66, children: [] }
              ]
            }
          ]
        },
        { value: 'lib', id: 67, children: [] },
        { value: 'media', id: 68, children: [] },
        { value: 'opt', id: 69, children: [] },
        { value: 'proc', id: 70, children: [] },
        { value: 'root', id: 71, children: [] },
        { value: 'run', id: 72, children: [] },
        { value: 'sbin', id: 73, children: [] },
        { value: 'srv', id: 74, children: [] },
        { value: 'sys', id: 75, children: [] },
        { value: 'usr', id: 76, children: [] },
        { value: 'var', id: 77, children: [] }
      ]
    };
    this.lastFFSNodeId = 86;
    this.icons = {
      value: 'Icons',
      children: [
        {
          value: 'Web Application Icons',
          children: [
            { value: 'calendar', icon: 'fa-calendar' },
            { value: 'download', icon: 'fa-download' },
            { value: 'group', icon: 'fa-group' },
            { value: 'print', icon: 'fa-print' }
          ]
        },
        {
          value: 'Hand Icons',
          children: [
            { value: 'pointer', icon: 'fa-hand-pointer-o' },
            { value: 'grab', icon: 'fa-hand-rock-o' },
            { value: 'thumbs up', icon: 'fa-thumbs-o-up ' },
            { value: 'thumbs down', icon: 'fa-thumbs-o-down' }
          ]
        },
        {
          value: 'File Type Icons',
          children: [
            { value: 'file', icon: 'fa-file-o' },
            { value: 'audio', icon: 'fa-file-audio-o' },
            { value: 'movie', icon: 'fa-file-movie-o ' },
            { value: 'archive', icon: 'fa-file-zip-o' }
          ]
        }
      ]
    };
    this.custom = {
      settings: {
        menuItems: [
          { action: menu_events_1.NodeMenuItemAction.NewFolder, name: 'Add parent node', cssClass: '' },
          { action: menu_events_1.NodeMenuItemAction.NewTag, name: 'Add child node', cssClass: '' },
          { action: menu_events_1.NodeMenuItemAction.Remove, name: 'Remove node', cssClass: '' },
          { action: menu_events_1.NodeMenuItemAction.Rename, name: 'Rename node', cssClass: '' },
          { action: menu_events_1.NodeMenuItemAction.Custom, name: 'Custom Action', cssClass: '' }
        ]
      },
      value: 'TestParent',
      children: [{ value: 'TestChild', icon: '' }]
    };
  }
  AppComponent_1 = AppComponent;
  AppComponent.logEvent = function(e, message) {
    console.log(e);
    alertify.message(message + ': ' + e.node.value);
  };
  AppComponent.prototype.ngOnInit = function() {
    var _this = this;
    setTimeout(function() {
      _this.pls = {
        value: 'Programming languages by programming paradigm',
        children: [
          {
            value: 'Aspect-oriented programming',
            children: [{ value: 'AspectJ' }, { value: 'AspectC++' }]
          },
          {
            value: 'Object-oriented programming',
            children: [
              {
                value: {
                  name: 'Java',
                  setName: function(name) {
                    this.name = name;
                  },
                  toString: function() {
                    return this.name;
                  }
                }
              },
              { value: 'C++' },
              { value: 'C#' }
            ]
          },
          {
            value: 'Prototype-based programming',
            children: [{ value: 'JavaScript' }, { value: 'CoffeeScript' }, { value: 'TypeScript' }]
          }
        ]
      };
    }, 2000);
  };
  AppComponent.prototype.onNodeRemoved = function(e) {
    AppComponent_1.logEvent(e, 'Removed');
  };
  AppComponent.prototype.onNodeMoved = function(e) {
    AppComponent_1.logEvent(e, 'Moved');
  };
  AppComponent.prototype.onNodeRenamed = function(e) {
    AppComponent_1.logEvent(e, 'Renamed');
  };
  AppComponent.prototype.onNodeCreated = function(e) {
    AppComponent_1.logEvent(e, 'Created');
  };
  AppComponent.prototype.onNodeFFSCreated = function(e, controller) {
    AppComponent_1.logEvent(e, 'Created');
    if (controller) {
      controller.changeNodeId(++this.lastFFSNodeId);
    }
  };
  AppComponent.prototype.onNodeSelected = function(e) {
    AppComponent_1.logEvent(e, 'Selected');
  };
  AppComponent.prototype.onNodeUnselected = function(e) {
    AppComponent_1.logEvent(e, 'Unselected');
  };
  AppComponent.prototype.onMenuItemSelected = function(e) {
    AppComponent_1.logEvent(e, 'You selected ' + e.selectedItem + ' menu item');
  };
  AppComponent.prototype.onNodeExpanded = function(e) {
    AppComponent_1.logEvent(e, 'Expanded');
  };
  AppComponent.prototype.onNodeCollapsed = function(e) {
    AppComponent_1.logEvent(e, 'Collapsed');
  };
  AppComponent.prototype.handleActionOnFFS = function(id, action) {
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  };
  AppComponent.prototype.renameFFS = function(id) {
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.rename('unicode.pf');
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  };
  AppComponent.prototype.setChildrenFFS = function(id) {
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController.setChildren === 'function') {
      treeController.setChildren([
        { value: 'apache2', id: 82, children: [] },
        { value: 'nginx', id: 83, children: [] },
        { value: 'dhcp', id: 84, children: [] },
        { value: 'dpkg', id: 85, children: [] },
        { value: 'gdb', id: 86, children: [] }
      ]);
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  };
  AppComponent.prototype.addChildFFS = function(id, newNode) {
    newNode.id = ++this.lastFFSNodeId;
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.addChild(newNode);
    } else {
      console.log('Controller is absent for a node with id: ' + id);
    }
  };
  AppComponent.prototype.checkFolder = function(id) {
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.check();
    } else {
      console.log('Controller is absent for a node with id: ' + id);
    }
  };
  AppComponent.prototype.uncheckFolder = function(id) {
    var treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.uncheck();
    } else {
      console.log('Controller is absent for a node with id: ' + id);
    }
  };
  __decorate(
    [core_1.ViewChild('treeFonts'), __metadata('design:type', Object)],
    AppComponent.prototype,
    'treeFonts',
    void 0
  );
  __decorate(
    [core_1.ViewChild('treeFFS'), __metadata('design:type', Object)],
    AppComponent.prototype,
    'treeFFS',
    void 0
  );
  AppComponent = AppComponent_1 = __decorate(
    [
      core_1.Component({
        selector: 'app',
        template:
          '\n    <div class="tree-demo-app">\n        <div class="tree-container">\n            <div class="tree-info">\n                <p class="tree-title">Fonts tree</p>\n            </div>\n            <div class="tree-content">\n                <tree #treeFonts\n                      [tree]="fonts"\n                      [settings]="{rootIsVisible: false}"\n                      (menuItemSelected)="onMenuItemSelected($event)"\n                      (nodeRemoved)="onNodeRemoved($event)"\n                      (nodeRenamed)="onNodeRenamed($event)"\n                      (nodeSelected)="onNodeSelected($event)"\n                      (nodeMoved)="onNodeMoved($event)"\n                      (nodeCreated)="onNodeCreated($event)"\n                      (nodeExpanded)="onNodeExpanded($event)"\n                      (nodeCollapsed)="onNodeCollapsed($event)">\n                </tree>\n            </div>\n        </div>\n        <div class="tree-container">\n            <div class="tree-info">\n                <p class="tree-title">Programming languages tree</p>\n                <p class="notice">this tree is loaded asynchronously</p>\n            </div>\n            <div class="tree-content">\n                <tree [tree]="pls"\n                      [settings]="disabledCheckboxesSettings"\n                      (nodeRemoved)="onNodeRemoved($event)"\n                      (nodeRenamed)="onNodeRenamed($event)"\n                      (nodeSelected)="onNodeSelected($event)"\n                      (nodeMoved)="onNodeMoved($event)"\n                      (nodeCreated)="onNodeCreated($event)">\n                </tree>\n            </div>\n        </div>\n        <div class="tree-container tree-container--with-controls">\n            <div class="tree-info">\n                <p class="tree-title">Directory/File structure</p>\n                <p class="notice">this tree has advanced configurations</p>\n            </div>\n            <div class="tree-content">\n                <tree #treeFFS\n                      [tree]="ffs"\n                      (nodeRemoved)="onNodeRemoved($event)"\n                      (nodeRenamed)="onNodeRenamed($event)"\n                      (nodeSelected)="onNodeSelected($event)"\n                      (nodeUnselected)="onNodeUnselected($event)"\n                      (nodeMoved)="onNodeMoved($event)"\n                      (nodeCreated)="onNodeFFSCreated($event)"\n                      (nodeExpanded)="onNodeExpanded($event)"\n                      (nodeCollapsed)="onNodeCollapsed($event)"\n                      [settings]="settings">\n                </tree>\n            </div>\n\n            <div class="tree-controlls">\n                <p class="notice">Tree API exposed via TreeController</p>\n                <button button (click)="handleActionOnFFS(21, \'expandToParent\')">Select \'unicode.pf2\' up to root</button>\n                <button button (click)="handleActionOnFFS(13, \'select\')">Select \'boot\' node</button>\n                <button button (click)="handleActionOnFFS(13, \'unselect\')">Unselect \'boot\' node</button>\n                <button button (click)="handleActionOnFFS(13, \'allowSelection\')">Allow selection of the \'boot\' node</button>\n                <button button (click)="handleActionOnFFS(13, \'forbidSelection\')">Forbid selection of the \'boot\' node</button>\n                <button button (click)="handleActionOnFFS(2, \'collapse\')">Collapse \'bin\' node</button>\n                <button button (click)="handleActionOnFFS(2, \'expand\')">Expand \'bin\' node</button>\n                <button button (click)="renameFFS(21)">Rename \'unicode.pf2\' to \'unicode.pf\'</button>\n                <button button (click)="handleActionOnFFS(12, \'remove\')">Remove \'nano\'</button>\n                <button button (click)="handleActionOnFFS(52, \'reloadChildren\')">Reload Music\'s children</button>\n                <button button (click)="setChildrenFFS(36)">Set \'etc\' children</button>\n                <button button (click)="addChildFFS(2, {value: \'ping\'})">Add a child with name \'ping\' to \'bin\'</button>\n                <button button (click)="addChildFFS(22, {value: \'lost\'})">Add a child with name \'lost\' to \'lost+found\'</button>\n                <button button (click)="addChildFFS(22, {value: \'found\', children: []})">Add a child with name \'found\' to \'lost+found\'</button>\n                <button button (click)="addChildFFS(36, {value: \'found\', children: []})">Add a child with name \'found\' to \'etc\'</button>\n                <button button (click)="addChildFFS(78, {value: \'Voodo People\'})">Add a child with name \'Voodo People\' to \'2Cellos\'</button>\n                <button button (click)="checkFolder(52)">Check Music folder</button>\n                <button button (click)="uncheckFolder(52)">Uncheck Music folder</button>\n            </div>\n        </div>\n        <div class="tree-container">\n            <div class="tree-info">\n                <p class="tree-title">Programming languages tree</p>\n                <p class="notice">this tree is using a custom template</p>\n            </div>\n            <div class="tree-content">\n                <tree [tree]="icons"\n                      [settings]="settings"\n                      (nodeRemoved)="onNodeRemoved($event)"\n                      (nodeRenamed)="onNodeRenamed($event)"\n                      (nodeSelected)="onNodeSelected($event)"\n                      (nodeMoved)="onNodeMoved($event)"\n                      (nodeCreated)="onNodeCreated($event)">\n                    <ng-template let-node>\n                        <i class="fa {{node.icon}}"></i>\n                        <span class="node-name" [innerHTML]="node.value"></span>\n                    </ng-template>\n                </tree>\n            </div>\n        </div>\n        <div>\n            <div class="tree-info">\n                <p class="tree-title">Custom right click GUI tree</p>\n                <p class="notice">this tree is using a custom right click menu</p>\n            </div>\n            <div class="tree-content">\n                <tree [tree]="custom"\n                      (nodeSelected)="onNodeSelected($event)">\n                </tree>\n            </div>\n        </div>\n    </div>\n  ',
        styles: [
          '\n    .tree-info {\n        flex: 1 0 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n      }\n\n      .tree-controlls {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .tree-content {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .tree-container {\n        margin-bottom: 20px;\n\n      }\n\n      .tree-container--with-controls {\n        display: flex;\n        flex-wrap: wrap;\n      }\n\n      .tree-demo-app {\n        display: flex;\n        flex-direction: column;\n        margin-bottom:50px;\n      }\n\n      .tree-title {\n        margin: 0;\n        color: #40a070;\n        font-size: 2em;\n      }\n\n      .notice {\n        color: #e91e63;\n        font-size: 1.2em;\n        font-style: italic;\n      }\n\n      :host /deep/ .fa {\n        cursor: pointer;\n      }\n\n      :host /deep/ .fa.disabled {\n        cursor: inherit;\n        color: #757575;\n      }\n\n      .button {\n        border-radius: 4px;\n        box-shadow: 0 2px 4px 0 #888;\n        background-color: #fff;\n        -webkit-appearance: none;\n        border: 1px solid #000;\n        height: 35px;\n        outline: none;\n      }\n\n      .button-pressed {\n        box-shadow: 0 0 1px 0 #888;\n      }\n\n      .tree-controlls button {\n        margin: 5px;\n      }\n  '
        ]
      })
    ],
    AppComponent
  );
  return AppComponent;
  var AppComponent_1;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
