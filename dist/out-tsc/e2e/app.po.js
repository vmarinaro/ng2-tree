'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var protractor_1 = require('protractor');
var TreePage = (function() {
  function TreePage() {}
  TreePage.prototype.navigateTo = function() {
    return protractor_1.browser.get('/');
  };
  TreePage.prototype.getFirstNodeValueText = function() {
    return protractor_1.element(protractor_1.by.css('.node-value')).getText();
  };
  TreePage.prototype.getFirstAsyncChild = function() {
    return protractor_1.element.all(protractor_1.by.css('.node-value')).get(19);
  };
  TreePage.prototype.getLastAsyncChild = function() {
    return protractor_1.element.all(protractor_1.by.css('.node-value')).get(25);
  };
  TreePage.prototype.getAsyncChildrenNodeFolding = function() {
    return protractor_1.element.all(protractor_1.by.css('.folding')).get(18);
  };
  TreePage.prototype.getAntiquaNode = function() {
    return protractor_1.element(protractor_1.by.id('antiqua'));
  };
  return TreePage;
})();
exports.TreePage = TreePage;
//# sourceMappingURL=app.po.js.map
