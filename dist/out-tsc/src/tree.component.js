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
var tree_service_1 = require('./tree.service');
var TreeTypes = require('./tree.types');
var tree_1 = require('./tree');
var TreeComponent = (function() {
  function TreeComponent(treeService) {
    this.treeService = treeService;
    this.nodeCreated = new core_1.EventEmitter();
    this.nodeRemoved = new core_1.EventEmitter();
    this.nodeRenamed = new core_1.EventEmitter();
    this.nodeSelected = new core_1.EventEmitter();
    this.nodeUnselected = new core_1.EventEmitter();
    this.nodeMoved = new core_1.EventEmitter();
    this.nodeExpanded = new core_1.EventEmitter();
    this.nodeCollapsed = new core_1.EventEmitter();
    this.loadNextLevel = new core_1.EventEmitter();
    this.nodeChecked = new core_1.EventEmitter();
    this.nodeUnchecked = new core_1.EventEmitter();
    this.menuItemSelected = new core_1.EventEmitter();
    this.subscriptions = [];
  }
  TreeComponent_1 = TreeComponent;
  TreeComponent.prototype.ngOnChanges = function(changes) {
    if (!this.treeModel) {
      this.tree = TreeComponent_1.EMPTY_TREE;
    } else {
      this.tree = new tree_1.Tree(this.treeModel);
    }
  };
  TreeComponent.prototype.ngOnInit = function() {
    var _this = this;
    this.subscriptions.push(
      this.treeService.nodeRemoved$.subscribe(function(e) {
        _this.nodeRemoved.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeRenamed$.subscribe(function(e) {
        _this.nodeRenamed.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeCreated$.subscribe(function(e) {
        _this.nodeCreated.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeSelected$.subscribe(function(e) {
        _this.nodeSelected.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeUnselected$.subscribe(function(e) {
        _this.nodeUnselected.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeMoved$.subscribe(function(e) {
        _this.nodeMoved.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeExpanded$.subscribe(function(e) {
        _this.nodeExpanded.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeCollapsed$.subscribe(function(e) {
        _this.nodeCollapsed.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.menuItemSelected$.subscribe(function(e) {
        _this.menuItemSelected.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.loadNextLevel$.subscribe(function(e) {
        _this.loadNextLevel.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeChecked$.subscribe(function(e) {
        _this.nodeChecked.emit(e);
      })
    );
    this.subscriptions.push(
      this.treeService.nodeUnchecked$.subscribe(function(e) {
        _this.nodeUnchecked.emit(e);
      })
    );
  };
  TreeComponent.prototype.getController = function() {
    return this.rootComponent.controller;
  };
  TreeComponent.prototype.getControllerByNodeId = function(id) {
    return this.treeService.getController(id);
  };
  TreeComponent.prototype.ngOnDestroy = function() {
    this.subscriptions.forEach(function(sub) {
      return sub && sub.unsubscribe();
    });
  };
  TreeComponent.EMPTY_TREE = new tree_1.Tree({ value: '' });
  __decorate([core_1.Input('tree'), __metadata('design:type', Object)], TreeComponent.prototype, 'treeModel', void 0);
  __decorate(
    [core_1.Input(), __metadata('design:type', TreeTypes.Ng2TreeSettings)],
    TreeComponent.prototype,
    'settings',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeCreated',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeRemoved',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeRenamed',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeSelected',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeUnselected',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeMoved',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeExpanded',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeCollapsed',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'loadNextLevel',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeChecked',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'nodeUnchecked',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    TreeComponent.prototype,
    'menuItemSelected',
    void 0
  );
  __decorate(
    [core_1.ViewChild('rootComponent'), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'rootComponent',
    void 0
  );
  __decorate(
    [core_1.ContentChild(core_1.TemplateRef), __metadata('design:type', Object)],
    TreeComponent.prototype,
    'template',
    void 0
  );
  TreeComponent = TreeComponent_1 = __decorate(
    [
      core_1.Component({
        selector: 'tree',
        template:
          '<tree-internal #rootComponent [tree]="tree" [settings]="settings" [template]="template"></tree-internal>',
        providers: [tree_service_1.TreeService]
      }),
      __param(0, core_1.Inject(tree_service_1.TreeService)),
      __metadata('design:paramtypes', [tree_service_1.TreeService])
    ],
    TreeComponent
  );
  return TreeComponent;
  var TreeComponent_1;
})();
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map
