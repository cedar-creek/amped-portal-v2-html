var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../utils/classSet", "../utils/hasClass", "./Framework"], function (require, exports, classSet_1, hasClass_1, Framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bootstrap5 = (function (_super) {
        __extends(Bootstrap5, _super);
        function Bootstrap5(opts) {
            return _super.call(this, Object.assign({}, {
                eleInvalidClass: 'is-invalid',
                eleValidClass: 'is-valid',
                formClass: 'fv-plugins-bootstrap5',
                messageClass: 'fv-help-block',
                rowInvalidClass: 'has-danger',
                rowPattern: /^(.*)(col|offset)(-(sm|md|lg|xl))*-[0-9]+(.*)$/,
                rowSelector: '.row',
                rowValidClass: 'has-success',
            }, opts)) || this;
        }
        Bootstrap5.prototype.onIconPlaced = function (e) {
            var parent = e.element.parentElement;
            if (hasClass_1.default(parent, 'input-group')) {
                parent.parentElement.insertBefore(e.iconElement, parent.nextSibling);
            }
            var type = e.element.getAttribute('type');
            if ('checkbox' === type || 'radio' === type) {
                var grandParent = parent.parentElement;
                if (hasClass_1.default(parent, 'form-check')) {
                    classSet_1.default(e.iconElement, {
                        'fv-plugins-icon-check': true,
                    });
                    parent.parentElement.insertBefore(e.iconElement, parent.nextSibling);
                }
                else if (hasClass_1.default(parent.parentElement, 'form-check')) {
                    classSet_1.default(e.iconElement, {
                        'fv-plugins-icon-check': true,
                    });
                    grandParent.parentElement.insertBefore(e.iconElement, grandParent.nextSibling);
                }
            }
        };
        return Bootstrap5;
    }(Framework_1.default));
    exports.default = Bootstrap5;
});
