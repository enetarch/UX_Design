var Invoices = function (classname) 
{
  var self = this;
  Invoices.SUPER.call (this, classname || Invoices.CLASS.name);
    
};
LadderContainer.extends (Invoices);

Invoices.CLASS= { name : "Invoices" };

Invoices.prototype.createInvoice = function (name, description) 
{
    var self = this;
    
    var newContact = new CommonContact ();
    newContact.init (name, description, type, method);
    self.add (newContact);
    
    return (newContact);
};

Invoices.prototype.getInvoice = function (index) 
{
    var self = this;
    var items = self.getContainers ("", Invoice.CLASS.name);
    return (items.getItem (index));
};

Invoices.prototype.countInvoices = function () 
{
    var self = this;
    return (self.count ("", Invoice.CLASS.name));
};