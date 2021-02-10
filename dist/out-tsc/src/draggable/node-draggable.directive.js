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
var node_draggable_service_1 = require('./node-draggable.service');
var captured_node_1 = require('./captured-node');
var tree_1 = require('../tree');
var NodeDraggableDirective = (function() {
  function NodeDraggableDirective(element, nodeDraggableService, renderer) {
    this.element = element;
    this.nodeDraggableService = nodeDraggableService;
    this.renderer = renderer;
    this.disposersForDragListeners = [];
    this.nodeNativeElement = element.nativeElement;
  }
  NodeDraggableDirective_1 = NodeDraggableDirective;
  NodeDraggableDirective.prototype.ngOnInit = function() {
    if (!this.tree.isStatic()) {
      this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this))
      );
      this.disposersForDragListeners.push(
        this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this))
      );
    }
  };
  NodeDraggableDirective.prototype.ngOnDestroy = function() {
    /* tslint:disable:typedef */
    this.disposersForDragListeners.forEach(function(dispose) {
      return dispose();
    });
    /* tslint:enable:typedef */
  };
  NodeDraggableDirective.prototype.handleDragStart = function(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    this.nodeDraggableService.captureNode(new captured_node_1.CapturedNode(this.nodeDraggable, this.tree));
    e.dataTransfer.setData('text', NodeDraggableDirective_1.DATA_TRANSFER_STUB_DATA);
    e.dataTransfer.effectAllowed = 'move';
  };
  NodeDraggableDirective.prototype.handleDragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  NodeDraggableDirective.prototype.handleDragEnter = function(e) {
    e.preventDefault();
    if (this.containsElementAt(e)) {
      this.addClass('over-drop-target');
    }
  };
  NodeDraggableDirective.prototype.handleDragLeave = function(e) {
    if (!this.containsElementAt(e)) {
      this.removeClass('over-drop-target');
    }
  };
  NodeDraggableDirective.prototype.handleDrop = function(e) {
    e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    this.removeClass('over-drop-target');
    if (!this.isDropPossible(e)) {
      return false;
    }
    if (this.nodeDraggableService.getCapturedNode()) {
      return this.notifyThatNodeWasDropped();
    }
  };
  NodeDraggableDirective.prototype.isDropPossible = function(e) {
    var capturedNode = this.nodeDraggableService.getCapturedNode();
    return capturedNode && capturedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
  };
  NodeDraggableDirective.prototype.handleDragEnd = function(e) {
    this.removeClass('over-drop-target');
    this.nodeDraggableService.releaseCapturedNode();
  };
  NodeDraggableDirective.prototype.containsElementAt = function(e) {
    var _a = e.x,
      x = _a === void 0 ? e.clientX : _a,
      _b = e.y,
      y = _b === void 0 ? e.clientY : _b;
    return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
  };
  NodeDraggableDirective.prototype.addClass = function(className) {
    var classList = this.nodeNativeElement.classList;
    classList.add(className);
  };
  NodeDraggableDirective.prototype.removeClass = function(className) {
    var classList = this.nodeNativeElement.classList;
    classList.remove(className);
  };
  NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function() {
    this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
  };
  NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
  __decorate(
    [core_1.Input(), __metadata('design:type', core_1.ElementRef)],
    NodeDraggableDirective.prototype,
    'nodeDraggable',
    void 0
  );
  __decorate(
    [core_1.Input(), __metadata('design:type', tree_1.Tree)],
    NodeDraggableDirective.prototype,
    'tree',
    void 0
  );
  NodeDraggableDirective = NodeDraggableDirective_1 = __decorate(
    [
      core_1.Directive({
        selector: '[nodeDraggable]'
      }),
      __param(0, core_1.Inject(core_1.ElementRef)),
      __param(1, core_1.Inject(node_draggable_service_1.NodeDraggableService)),
      __param(2, core_1.Inject(core_1.Renderer2)),
      __metadata('design:paramtypes', [
        core_1.ElementRef,
        node_draggable_service_1.NodeDraggableService,
        core_1.Renderer2
      ])
    ],
    NodeDraggableDirective
  );
  return NodeDraggableDirective;
  var NodeDraggableDirective_1;
})();
exports.NodeDraggableDirective = NodeDraggableDirective;
//# sourceMappingURL=node-draggable.directive.js.map
