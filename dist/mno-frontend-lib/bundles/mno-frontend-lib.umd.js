(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('mno-frontend-lib', ['exports', '@angular/core'], factory) :
    (factory((global['mno-frontend-lib'] = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MnoFrontendLibService = /** @class */ (function () {
        function MnoFrontendLibService() {
        }
        MnoFrontendLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        MnoFrontendLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ MnoFrontendLibService.ngInjectableDef = i0.defineInjectable({ factory: function MnoFrontendLibService_Factory() { return new MnoFrontendLibService(); }, token: MnoFrontendLibService, providedIn: "root" });
        return MnoFrontendLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MnoFrontendLibComponent = /** @class */ (function () {
        function MnoFrontendLibComponent() {
        }
        /**
         * @return {?}
         */
        MnoFrontendLibComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        MnoFrontendLibComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'mno-frontend-lib',
                        template: "\n    <p>\n      mno-frontend-lib works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        MnoFrontendLibComponent.ctorParameters = function () { return []; };
        return MnoFrontendLibComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MnoFrontendLibModule = /** @class */ (function () {
        function MnoFrontendLibModule() {
        }
        MnoFrontendLibModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [MnoFrontendLibComponent],
                        imports: [],
                        exports: [MnoFrontendLibComponent]
                    },] }
        ];
        return MnoFrontendLibModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.MnoFrontendLibService = MnoFrontendLibService;
    exports.MnoFrontendLibComponent = MnoFrontendLibComponent;
    exports.MnoFrontendLibModule = MnoFrontendLibModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=mno-frontend-lib.umd.js.map