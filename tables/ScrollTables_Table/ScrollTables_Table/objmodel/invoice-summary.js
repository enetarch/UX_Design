/*
    orderNo: "",
    webOrderNo: "",
    status: "",
    dateDue: "",
    datePlaced: "",
    ipv4: "",
    taxable: true,
    ein: "",
    subtotal: 0.00,
    tax: 0.00,
    total: 0.00,
*/

var InvoiceSummary = function (classname) 
{
    var self = this;
    InvoiceSummary.SUPER.call (this, classname || InvoiceSummary.CLASS.name);
    
    self.addField ("orderNo");
    self.addField ("webOrderNo");
    self.addField ("status");
    self.addField ("dateDue");
    self.addField ("datePlaced");
    self.addField ("ipv4");
    self.addField ("taxable");
    self.addField ("ein");
    self.addField ("subtotal");
    self.addField ("tax");
    self.addField ("total");
    
    self.orderNo = new SingletonField (self, "orderNo", "", self._onFieldSet, self._onFieldGet );
    self.webOrderNo  = new SingletonField (self, "webOrderNo", "", self._onFieldSet, self._onFieldGet );
    self.status  = new SingletonField (self, "status", "", self._onFieldSet, self._onFieldGet );
    self.dateDue  = new SingletonField (self, "dateDue", "", self._onFieldSet, self._onFieldGet );
    self.datePlaced  = new SingletonField (self, "datePlaced", "", self._onFieldSet, self._onFieldGet );
    self.ipv4  = new SingletonField (self, "ipv4", "", self._onFieldSet, self._onFieldGet );
    self.taxable  = new SingletonField (self, "taxable", false, self._onFieldSet, self._onFieldGet );
    self.ein  = new SingletonField (self, "ein", "", self._onFieldSet, self._onFieldGet );
    self.subtotal  = new SingletonField (self, "subtotal", 0, self._onFieldSet, self._onFieldGet );
    self.tax  = new SingletonField (self, "tax", 0, self._onFieldSet, self._onFieldGet );
    self.total  = new SingletonField (self, "total", 0, self._onFieldSet, self._onFieldGet );
};
LadderItem.extends (InvoiceSummary);

InvoiceSummary.CLASS= { name : "InvoiceSummary" };

InvoiceSummary.prototype.orderNo = null;
InvoiceSummary.prototype.webOrderNo = null;
InvoiceSummary.prototype.status = null;
InvoiceSummary.prototype.dateDue = null;
InvoiceSummary.prototype.datePlaced = null;
InvoiceSummary.prototype.ipv4 = null;
InvoiceSummary.prototype.taxable = null;
InvoiceSummary.prototype.ein = null;
InvoiceSummary.prototype.subtotal = null;
InvoiceSummary.prototype.tax = null;
InvoiceSummary.prototype.total = null;
    
InvoiceSummary.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    InvoiceSummary.super._onStateSet (oldValue, newValue);
    
    self.orderNo.Set (newValue.orderNo || "");
    self.webOrderNo.Set (newValue.webOrderNo || "");
    self.status.Set (newValue.status || "");
    self.dateDue.Set (newValue.dateDue || "");
    self.datePlaced.Set (newValue.datePlaced || "");
    self.ipv4.Set (newValue.ipv4 || "2.2.2.2");
    self.taxable.Set (newValue.taxable || false);
    self.ein.Set (newValue.subtotal || "");
    self.subtotal.Set (newValue.subtotal || 0);
    self.tax.Set (newValue.tax || 0);
    self.total.Set (newValue.total || 0);
    
    return (true);
};

