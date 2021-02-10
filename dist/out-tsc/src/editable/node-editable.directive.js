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
var editable_events_1 = require('./editable.events');
var NodeEditableDirective = (function() {
  function NodeEditableDirective(renderer, elementRef) {
    this.renderer = renderer;
    this.elementRef = elementRef;
    /* tslint:enable:no-input-rename */
    this.valueChanged = new core_1.EventEmitter(false);
  }
  NodeEditableDirective.prototype.ngOnInit = function() {
    var nativeElement = this.elementRef.nativeElement;
    if (nativeElement) {
      nativeElement.focus();
    }
    this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
  };
  NodeEditableDirective.prototype.applyNewValue = function(newNodeValue) {
    this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
  };
  NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function(newNodeValue) {
    this.valueChanged.emit({ type: 'blur', value: newNodeValue });
  };
  NodeEditableDirective.prototype.cancelEditing = function() {
    this.valueChanged.emit({
      type: 'keyup',
      value: this.nodeValue,
      action: editable_events_1.NodeEditableEventAction.Cancel
    });
  };
  __decorate(
    [core_1.Input('nodeEditable'), __metadata('design:type', String)],
    NodeEditableDirective.prototype,
    'nodeValue',
    void 0
  );
  __decorate(
    [core_1.Output(), __metadata('design:type', core_1.EventEmitter)],
    NodeEditableDirective.prototype,
    'valueChanged',
    void 0
  );
  __decorate(
    [
      core_1.HostListener('keyup.enter', ['$event.target.value']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [String]),
      __metadata('design:returntype', void 0)
    ],
    NodeEditableDirective.prototype,
    'applyNewValue',
    null
  );
  __decorate(
    [
      core_1.HostListener('blur', ['$event.target.value']),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [String]),
      __metadata('design:returntype', void 0)
    ],
    NodeEditableDirective.prototype,
    'applyNewValueByLoosingFocus',
    null
  );
  __decorate(
    [
      core_1.HostListener('keyup.esc'),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', void 0)
    ],
    NodeEditableDirective.prototype,
    'cancelEditing',
    null
  );
  NodeEditableDirective = __decorate(
    [
      core_1.Directive({
        selector: '[nodeEditable]'
      }),
      __param(0, core_1.Inject(core_1.Renderer2)),
      __param(1, core_1.Inject(core_1.ElementRef)),
      __metadata('design:paramtypes', [core_1.Renderer2, core_1.ElementRef])
    ],
    NodeEditableDirective
  );
  return NodeEditableDirective;
})();
exports.NodeEditableDirective = NodeEditableDirective;
//# sourceMappingURL=node-editable.directive.js.map
