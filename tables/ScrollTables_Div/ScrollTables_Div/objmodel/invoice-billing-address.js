var InvoiceBillingAddress = function (classname) 
{
    var self = this;
    InvoiceBillingAddress.SUPER.call (this, classname || InvoiceBillingAddress.CLASS.name);
};
CommonAddress.extends (InvoiceBillingAddress);

InvoiceBillingAddress.CLASS= { name : "InvoiceBillingAddress" };

