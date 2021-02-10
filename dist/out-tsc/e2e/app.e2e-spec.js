'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (((f = 1), y && (t = y[op[0] & 2 ? 'return' : op[0] ? 'throw' : 'next']) && !(t = t.call(y, op[1])).done))
            return t;
          if (((y = 0), t)) op = [0, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
Object.defineProperty(exports, '__esModule', { value: true });
var app_po_1 = require('./app.po');
var protractor_1 = require('protractor');
describe('Tree App', function() {
  var page;
  beforeEach(function() {
    page = new app_po_1.TreePage();
  });
  it('should have a tree where first node value is "Fonts"', function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            page.navigateTo();
            _a = expect;
            return [4 /*yield*/, page.getFirstNodeValueText()];
          case 1:
            _a.apply(void 0, [_b.sent()]).toEqual('Fonts');
            return [2 /*return*/];
        }
      });
    });
  });
  it('should load node children asynchronously', function() {
    return __awaiter(_this, void 0, void 0, function() {
      var firstAsyncChild, _a, _b, _c;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            page.navigateTo();
            page.getAsyncChildrenNodeFolding().click();
            firstAsyncChild = page.getFirstAsyncChild();
            _a = expect;
            return [4 /*yield*/, protractor_1.browser.isElementPresent(firstAsyncChild)];
          case 1:
            _a.apply(void 0, [_d.sent()]).toBe(true);
            _b = expect;
            return [4 /*yield*/, firstAsyncChild.getText()];
          case 2:
            _b.apply(void 0, [_d.sent()]).toEqual('Input Mono');
            _c = expect;
            return [4 /*yield*/, page.getLastAsyncChild().getText()];
          case 3:
            _c.apply(void 0, [_d.sent()]).toEqual('Source Code Pro');
            return [2 /*return*/];
        }
      });
    });
  });
  it('Should render tree node with HTML tags', function() {
    return __awaiter(_this, void 0, void 0, function() {
      var antiquaNode, _a, attrs, expectations;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            page.navigateTo();
            antiquaNode = page.getAntiquaNode();
            expect(protractor_1.browser.isElementPresent(antiquaNode)).toBeTruthy();
            _a = expect;
            return [4 /*yield*/, antiquaNode.getText()];
          case 1:
            _a.apply(void 0, [_b.sent()]).toEqual('Antiqua');
            attrs = { id: 'antiqua', class: 'test' };
            expectations = Object.keys(attrs).map(function(key) {
              return antiquaNode.getAttribute(key).then(function(value) {
                return expect(value).toEqual(attrs[key]);
              });
            });
            return [2 /*return*/, Promise.all(expectations)];
        }
      });
    });
  });
});
//# sourceMappingURL=app.e2e-spec.js.map
