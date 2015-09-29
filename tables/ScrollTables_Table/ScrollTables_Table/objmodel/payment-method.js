/*
    cardNo: "",
    expires: "",
    cardType: "",
*/                

var PaymentMethod = function (classname) 
{
    var self = this;
    
    PaymentMethod.SUPER.call (self, classname || PaymentMethod.CLASS.name);
    
    self.addField ("cardNo");
    self.addField ("expires");
    self.addField ("cardType");
    
    self.cardNo = new SingletonField (self, "cardNo", "1234-1234-1234-1234", self._onFieldSet, self._onFieldGet );
    self.expires  = new SingletonField (self, "expires", "06/16", self._onFieldSet, self._onFieldGet );
    self.cardType  = new SingletonField (self, "cardType", "Visa", self._onFieldSet, self._onFieldGet );
};
LadderItem.extends (PaymentMethod);

PaymentMethod.CLASS= { name : "PaymentMethod" };

PaymentMethod.prototype.cardNo = null;
PaymentMethod.prototype.expires = null;
PaymentMethod.prototype.cardType = null;
    
PaymentMethod.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    PaymentMethod.super._onStateSet (oldValue, newValue);
    
    self.cardNo.Set (newValue.cardNo || "");
    self.expires.Set (newValue.expires || "");
    self.cardType.Set (newValue.cardType || "");
    
    return (true);
};

