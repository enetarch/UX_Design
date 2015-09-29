var InvoiceLineItems = function (classname) 
{
    var self = this;
    InvoiceLineItems.SUPER.call (this, classname || InvoiceLineItems.CLASS.name);
    
};
LadderContainer.extends (InvoiceLineItems);

InvoiceLineItems.CLASS= { name : "InvoiceLineItems" };

InvoiceLineItems.prototype.createLineItem = function (name, description) 
{
    var self = this;
    
    var newItem = new InvoiceLineItem ();
    newItem.init (name, description);
    self.add (newItem);
    
    return (newItem);
};

InvoiceLineItems.prototype.countLineitem = function (index) 
{
    var self = this;
    var items = self.getContainers ("", InvoiceLineitem.CLASS.name);
    return (items.getItem (index));
};

InvoiceLineItems.prototype.countLineitems = function () 
{
    var self = this;
    return (self.count ("", InvoiceLineitem.CLASS.name));
};
