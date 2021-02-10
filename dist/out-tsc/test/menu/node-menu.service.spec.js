'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var testing_1 = require('@angular/core/testing');
var node_menu_service_1 = require('../../src/menu/node-menu.service');
var Subject_1 = require('rxjs/Subject');
var core_1 = require('@angular/core');
var menu_events_1 = require('../../src/menu/menu.events');
var nodeMenuService;
describe('NodeMenuService', function() {
  beforeEach(function() {
    testing_1.TestBed.configureTestingModule({
      providers: [node_menu_service_1.NodeMenuService]
    });
    nodeMenuService = testing_1.TestBed.get(node_menu_service_1.NodeMenuService);
  });
  it('should be created by angular', function() {
    expect(nodeMenuService).not.toBeNull();
    expect(nodeMenuService.nodeMenuEvents$ instanceof Subject_1.Subject).toBe(true);
  });
  it('should fire close menu events', function(done) {
    var elementRef = new core_1.ElementRef({});
    elementRef.nativeElement = {};
    var initiatorElementRef = new core_1.ElementRef({});
    initiatorElementRef.nativeElement = {};
    nodeMenuService.hideMenuStream(elementRef).subscribe(function(e) {
      expect(e.sender).toBe(initiatorElementRef.nativeElement);
      expect(e.action).toBe(menu_events_1.NodeMenuAction.Close);
      done();
    });
    nodeMenuService.hideMenuForAllNodesExcept(initiatorElementRef);
  });
});
//# sourceMappingURL=node-menu.service.spec.js.map
