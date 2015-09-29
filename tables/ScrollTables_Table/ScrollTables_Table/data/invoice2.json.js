
var jsonCommonName = function ()         
{
    var rtn = 
    {
        title: DataUtilities.CommonName.title(),
        firstName: DataUtilities.CommonName.firstName(),
        middleName: DataUtilities.CommonName.middleName(),
        lastName: DataUtilities.CommonName.lastName(),
        suffix: DataUtilities.CommonName.suffix(),
    };
    
    rtn ["classname"] = "CommonName";
    
    return (rtn);
};

var jsonCommonAddress = function (ndx)
{
    var types = 
    [
        "CommonAddress",
        "InvoiceBillingAddress",
        "InvoiceShippingAddress",
        "",
    ];
    
    var rtn = 
    {
        street1: DataUtilities.CommonAddress.street1(),
        street2: DataUtilities.CommonAddress.street2(),
        city: DataUtilities.CommonAddress.city(),
        state: DataUtilities.CommonAddress.state(),
        zip: DataUtilities.CommonAddress.zip(),
        country: DataUtilities.CommonAddress.country(),          
    };
    rtn ["classname"] = types[ndx];
    
    return (rtn);
};

var jsonInvoiceBillingAddress = function ()
{ return (jsonCommonAddress (1)); };

var jsonInvoiceShippingAddress = function ()
{ return (jsonCommonAddress (2)); };

var jsonCommonContact = function ()
{
    var rtn = 
    {
        
        type: DataUtilities.CommonContact.type(),
        method: DataUtilities.CommonContact.method(),
    };
    rtn.classname = "CommonContact";
    
    return (rtn);
};

var jsonCommonContacts = function ()
{
    var rtn = {}
    rtn.classname = "CommonContacts";
    rtn.nodes = {};
    
    rtn.nodes [Utilities.getGUID()] = jsonCommonContact();
    rtn.nodes [Utilities.getGUID()] = jsonCommonContact();
    rtn.nodes [Utilities.getGUID()] = jsonCommonContact();
    
    return (rtn);

};
            
var jsonInvoiceSummary = function ()
{
    var rtn =   
    {
        orderNo: DataUtilities.InvoiceSummary.orderNo(),
        webOrderNo: DataUtilities.InvoiceSummary.webOrderNo(),
        status: DataUtilities.InvoiceSummary.status(),
        dateDue: DataUtilities.InvoiceSummary.dateDue(),
        datePlaced: DataUtilities.InvoiceSummary.datePlaced(),
        ipv4: DataUtilities.InvoiceSummary.IPv4(),
        taxable: DataUtilities.InvoiceSummary.taxable(),
        ein: DataUtilities.InvoiceSummary.ein(),
        subtotal: DataUtilities.InvoiceSummary.subtotal(),
        tax: DataUtilities.InvoiceSummary.tax(),
        total: DataUtilities.InvoiceSummary.total(),
    };
    rtn.classname = "InvoiceSummary";
    
    return (rtn);
};

var jsonShipping = function ()
{
    var rtn = 
    {
        shipped: DataUtilities.Shipping.shipped(),
        shipper: DataUtilities.Shipping.shipper(),
        trackingNo: DataUtilities.Shipping.trackingNo(),
        shipDate: DataUtilities.Shipping.shipDate(),
    };
    rtn.classname = "Shipping";
    
    return (rtn);
};

var jsonPaymentMethod = function ()
{
    var rtn = 
    {
        cardNo: DataUtilities.PaymentMethod.cardNo(),
        expires: DataUtilities.PaymentMethod.expires(),
        cardType: DataUtilities.PaymentMethod.cardType(),
    };
    rtn.classname = "PaymentMethod";
    
    return (rtn);
};

var jsonPayment = function ()
{
    var rtn = {};
    rtn.classname = "Payment";
    rtn.nodes = {};
    
    rtn.nodes [Utilities.getGUID()] = jsonCommonName();
    rtn.nodes [Utilities.getGUID()] = jsonCommonAddress(0);
    rtn.nodes [Utilities.getGUID()] = jsonPaymentMethod();
    
    return (rtn);
};
                
var jsonInvoiceLineItem = function ()
{
    var rtn = 
    {
        quantity: DataUtilities.InvoiceLineItem.quantity(),
        partNo: DataUtilities.InvoiceLineItem.partNo(),
        description: DataUtilities.InvoiceLineItem.description(),
        unit: DataUtilities.InvoiceLineItem.unit(),
        extended: DataUtilities.InvoiceLineItem.extended(),
        taxable: DataUtilities.InvoiceLineItem.taxable(),
    };
    rtn.classname = "InvoiceLineItem";

    return (rtn);
};

var jsonInvoiceLineItems = function ()
{
    var rtn = {};
    rtn.classname = "InvoiceLineItems";
    rtn.nodes = {};
    
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItem();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItem();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItem();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItem();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItem();
    
    return (rtn);
};

var jsonInvoiceHeader = function ()
{
    var rtn = {};
    rtn.classname = "InvoiceHeader";
    rtn.nodes = {};
    
    rtn.nodes [Utilities.getGUID()] = jsonCommonName (),
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceBillingAddress();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceShippingAddress();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceSummary();
    rtn.nodes [Utilities.getGUID()] = jsonCommonContacts();
    rtn.nodes [Utilities.getGUID()] = jsonShipping();
    rtn.nodes [Utilities.getGUID()] = jsonPayment();
    
    return (rtn);
};

var jsonInvoice = function ()
{   
    var rtn = {};
    rtn.classname = "Invoice";
    rtn.nodes = {};
    
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceHeader();
    rtn.nodes [Utilities.getGUID()] = jsonInvoiceLineItems();

    return (rtn);
};

var jsonInvoices = function ()
{
    var rtn = {};
    rtn.classname = "Invoices";
    rtn.nodes = {};
    
    for (var t=0; t<200; t++)
        rtn.nodes [Utilities.getGUID()] = jsonInvoice ();    

    return (rtn);
};

var jsonTree = function ()
{
    var rtn = {};
    rtn [Utilities.getGUID()] = jsonInvoices();
    return (rtn);
};
