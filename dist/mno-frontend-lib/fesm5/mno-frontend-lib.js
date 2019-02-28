import { Injectable, Component, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MnoFrontendLibService = /** @class */ (function () {
    function MnoFrontendLibService() {
    }
    MnoFrontendLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MnoFrontendLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ MnoFrontendLibService.ngInjectableDef = defineInjectable({ factory: function MnoFrontendLibService_Factory() { return new MnoFrontendLibService(); }, token: MnoFrontendLibService, providedIn: "root" });
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
        { type: Component, args: [{
                    selector: 'mno-mno-frontend-lib',
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
        { type: NgModule, args: [{
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

export { MnoFrontendLibService, MnoFrontendLibComponent, MnoFrontendLibModule };

//# sourceMappingURL=mno-frontend-lib.js.map