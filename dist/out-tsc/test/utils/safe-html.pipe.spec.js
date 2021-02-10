'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var safe_html_pipe_1 = require('../../src/utils/safe-html.pipe');
var sanitizerSpy;
var safeHtmlPipe;
describe('SafeHtmlPipe', function() {
  beforeEach(function() {
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    safeHtmlPipe = new safe_html_pipe_1.SafeHtmlPipe(sanitizerSpy);
  });
  it('should transform html to the SafeHtml', function() {
    var html = '<a href="#">foo</a>';
    var sanitized = '<a href="#">sanitized</a>';
    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(sanitized);
    var safeHtml = safeHtmlPipe.transform(html);
    expect(safeHtml).toEqual(sanitized);
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });
});
//# sourceMappingURL=safe-html.pipe.spec.js.map
