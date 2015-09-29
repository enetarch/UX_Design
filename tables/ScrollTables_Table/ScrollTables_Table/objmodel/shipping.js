/*
    shipped: true,
    shipper: "",
    trackingNo: "",
    shipDate: "",
 */

var Shipping = function (classname) 
{
    var self = this;

    Shipping.SUPER.call (self, classname || Shipping.CLASS.name);
    
    self.addField ("shipped");
    self.addField ("shipper");
    self.addField ("trackingNo");
    self.addField ("shipDate");
    
    self.shipped = new SingletonField (self, "shipped", "false", self._onFieldSet, self._onFieldGet);
    self.shipper  = new SingletonField (self, "shipper", "TKD", self._onFieldSet, self._onFieldGet);
    self.trackingNo  = new SingletonField (self, "trackingNo", "1234-1234-1234-1234", self._onFieldSet, self._onFieldGet);
    self.shipDate  = new SingletonField (self, "shipDate", "2014-09-04", self._onFieldSet, self._onFieldGet);
    
};
LadderItem.extends (Shipping);

Shipping.CLASS= { name : "Shipping" };

Shipping.prototype.shipped = null;
Shipping.prototype.shipper = null;
Shipping.prototype.trackingNo = null;
Shipping.prototype.shipDate = null;

    
Shipping.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    Shipping.super._onStateSet (oldValue, newValue);
    
    self.shipped.Set (newValue.shipped || "");
    self.shipper.Set (newValue.shipper || "");
    self.trackingNo.Set (newValue.trackingNo || "");
    self.shipDate.Set (newValue.shipDate || "");
    
    return (true);
};

