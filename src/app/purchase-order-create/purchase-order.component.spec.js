"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var invoice_component_1 = require("./invoice.component");
describe('InvoiceComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [invoice_component_1.InvoiceCreateComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(invoice_component_1.InvoiceCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=invoice.component.spec.js.map