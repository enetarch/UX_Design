var InvoiceLineItem = function (classname) 
{
    var self = this;
    InvoiceLineItem.SUPER.call (this, classname || InvoiceLineItem.CLASS.name);
    
    self.addField ("quantity");
    self.addField ("partno");
    self.addField ("description");
    self.addField ("unit");
    self.addField ("extended");
    self.addField ("taxable");
    
    self.quantity = new SingletonField (self, "quantity", 0, self._onFieldSet, self._onFieldGet );
    self.partno  = new SingletonField (self, "partno", "", self._onFieldSet, self._onFieldGet );
    self.description  = new SingletonField (self, "description", "", self._onFieldSet, self._onFieldGet );
    self.unit  = new SingletonField (self, "unit", 0, self._onFieldSet, self._onFieldGet );
    self.extended  = new SingletonField (self, "extended", 0, self._onFieldSet, self._onFieldGet );
    self.taxable  = new SingletonField (self, "taxable", false, self._onFieldSet, self._onFieldGet );
};
LadderItem.extends (InvoiceLineItem);

InvoiceLineItem.CLASS= { name : "InvoiceLineItem" };

InvoiceLineItem.prototype.quantity = null;
InvoiceLineItem.prototype.partno = null;
InvoiceLineItem.prototype.description = null;
InvoiceLineItem.prototype.unit = null;
InvoiceLineItem.prototype.extended = null;
InvoiceLineItem.prototype.taxable = null;
    
InvoiceLineItem.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    InvoiceLineItem.super._onStateSet (oldValue, newValue);
    
    self.quantity.Set (newValue.quantity || 0);
    self.partno.Set (newValue.partno || "");
    self.description.Set (newValue.description || "");
    self.unit.Set (newValue.unit || 0);
    self.extended.Set (newValue.extended || 0 );
    self.taxable.Set (newValue.taxable || "");
    
    return (true);
};

