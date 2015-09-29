var InvoiceHeader = function (classname) 
{
    var self = this;
    InvoiceHeader.SUPER.call (this, classname || InvoiceHeader.CLASS.name);
    
};
LadderContainer.extends (InvoiceHeader);

InvoiceHeader.CLASS= { name : "InvoiceHeader" };

// ===========================================================
// InvoiceBillingAddress

InvoiceHeader.prototype.createBillingAddress = function () 
{
    var self = this;
    
    var newContact = new InvoiceBillingAddress ();
    newContact.init ("Billing Address", "");
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getBillingAddress = function (index) 
{
    var self = this;
    var items = self.getContainers ("", InvoiceBillingAddress.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countBillingAddress = function () 
{
    var self = this;
    return (self.count ("", InvoiceBillingAddress.CLASS.name));
};

// ===========================================================
// InvoiceShippingAddress

InvoiceHeader.prototype.createShippingAddress = function () 
{
    var self = this;
    
    var newContact = new InvoiceShippingAddress ();
    newContact.init ("Shipping Address", "");
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getShippingAddress = function (index) 
{
    var self = this;
    var items = self.getContainers ("", InvoiceShippingAddress.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countShippingAddress = function () 
{
    var self = this;
    return (self.count ("", InvoiceShippingAddress.CLASS.name));
};

// ===========================================================
// CommonName

InvoiceHeader.prototype.createName = function (title, firstname, middlename, lastname, suffix) 
{
    var self = this;
    
    var newContact = new CommonName ();
    newContact.init ("invoice to", "", title, firstname, middlename, lastname, suffix);
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getName = function (index) 
{
    var self = this;
    var items = self.getContainers ("", CommonName.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countName = function () 
{
    var self = this;
    return (self.count ("", CommonName.CLASS.name));
};

// ===========================================================
// CommonContacts

InvoiceHeader.prototype.createContacts = function () 
{
    var self = this;
    
    var newContact = new CommonContacts ();
    newContact.init ("Contact Methods", "" );
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getContacts = function (index) 
{
    var self = this;
    var items = self.getContainers ("", CommonContacts.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countContacts = function () 
{
    var self = this;
    return (self.count ("", CommonContacts.CLASS.name));
};

// ===========================================================
// InvoiceSummary

InvoiceHeader.prototype.createSummary = function () 
{
    var self = this;
    
    var newContact = new InvoiceSummary ();
    newContact.init ("Invoice Summary", "");
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getSummary = function (index) 
{
    var self = this;
    var items = self.getContainers ("", InvoiceSummary.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countSummary = function () 
{
    var self = this;
    return (self.count ("", InvoiceSummary.CLASS.name));
};

// ===========================================================
// Shipping

InvoiceHeader.prototype.createShipping = function () 
{
    var self = this;
    
    var newContact = new Shipping ();
    newContact.init ("Shipping", "");
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getShipping = function (index) 
{
    var self = this;
    var items = self.getContainers ("", Shipping.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countShipping = function () 
{
    var self = this;
    return (self.count ("", Shipping.CLASS.name));
};

// ===========================================================
// Payment

InvoiceHeader.prototype.createPayment = function () 
{
    var self = this;
    
    var newContact = new Payment ();
    newContact.init ("Payment", "");
    self.add (newContact);
    
    return (newContact);
};

InvoiceHeader.prototype.getPayment = function (index) 
{
    var self = this;
    var items = self.getContainers ("", Payment.CLASS.name);
    return (items.getItem (index));
};

InvoiceHeader.prototype.countPayment = function () 
{
    var self = this;
    return (self.count ("", Payment.CLASS.name));
};

