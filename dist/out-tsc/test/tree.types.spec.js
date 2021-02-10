'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tree_types_1 = require('../src/tree.types');
var tree_data_provider_1 = require('./data-provider/tree.data-provider');
var using = require('jasmine-data-provider');
describe('TreeModelSettings', function() {
  describe('Merge TreeModelSettings', function() {
    using(tree_data_provider_1.TreeDataProvider.treeModelSettings, function(data, description) {
      it(description, function() {
        expect(tree_types_1.TreeModelSettings.merge(data.treeModelA, data.treeModelB)).toEqual(data.result);
      });
    });
  });
});
describe('FoldingType', function() {
  it('should have correct cssClass per folding type', function() {
    expect(tree_types_1.FoldingType.Expanded.cssClass).toEqual('node-expanded');
    expect(tree_types_1.FoldingType.Collapsed.cssClass).toEqual('node-collapsed');
    expect(tree_types_1.FoldingType.Empty.cssClass).toEqual('node-empty');
    expect(tree_types_1.FoldingType.Leaf.cssClass).toEqual('node-leaf');
  });
});
//# sourceMappingURL=tree.types.spec.js.map
