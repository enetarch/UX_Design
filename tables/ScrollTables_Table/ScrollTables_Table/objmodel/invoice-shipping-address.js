var InvoiceShippingAddress = function (classname) 
{
    var self = this;
    InvoiceShippingAddress.SUPER.call (this, classname || InvoiceShippingAddress.CLASS.name);
    
};
CommonAddress.extends (InvoiceShippingAddress);

InvoiceShippingAddress.CLASS= { name : "InvoiceShippingAddress" };