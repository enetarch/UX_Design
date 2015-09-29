var Invoice = function (classname) 
{
    var self = this;
    Invoice.SUPER.call (this, classname || Invoice.CLASS.name);
    
};
LadderContainer.extends (Invoice);

Invoice.CLASS= { name : "Invoice" };

// ==============================================================

Invoice.prototype.createHeader = function () 
{
    var self = this;
    
    var newHeader = new InvoiceHeader ();
    newHeader.init (name, description);
    self.add (newHeader);
    
    return (newHeader);    
};

Invoice.prototype.getHeader = function (index) 
{
    var self = this;
    var items = self.getContainers ("", InvoiceHeader.CLASS.name);
    return (items.getItem (index));
};

Invoice.prototype.countHeader = function () 
{
    var self = this;
    return (self.count ("", InvoiceHeader.CLASS.name));
};

// ==============================================================

Invoice.prototype.createLineitems = function () 
{
    var self = this;
    
    var newLineitems = new InvoiceLineitems ();
    newContact.init (name, description);
    self.add (newContact);
    
    return (newContact);
};

Invoice.prototype.getLineitems = function () 
{
    var self = this;
    var items = self.getContainers ("", InvoiceLineitems.CLASS.name);
    return (items.getItem (index));
};

Invoice.prototype.countLineitems = function () 
{
    var self = this;
    return (self.count ("", InvoiceLineitems.CLASS.name));
};



