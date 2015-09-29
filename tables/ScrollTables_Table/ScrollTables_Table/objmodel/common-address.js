var CommonAddress = function (classname) 
{
    var self = this;
    
    CommonAddress.SUPER.call (this, classname || CommonAddress.CLASS.name);
    
    self.addField ("street1");
    self.addField ("street2");
    self.addField ("city");
    self.addField ("state");
    self.addField ("zip");
    self.addField ("country");    
    
    self.street1 = new SingletonField (self, "street1", "", self._onFieldSet, self._onFieldGet );
    self.street2  = new SingletonField (self, "street2", "", self._onFieldSet, self._onFieldGet );
    self.city  = new SingletonField (self, "city", "", self._onFieldSet, self._onFieldGet );
    self.state  = new SingletonField (self, "state", "", self._onFieldSet, self._onFieldGet );
    self.zip  = new SingletonField (self, "zip", "", self._onFieldSet, self._onFieldGet );
    self.country  = new SingletonField (self, "country", "", self._onFieldSet, self._onFieldGet );
};
LadderItem.extends (CommonAddress);

CommonAddress.CLASS = { name : "CommonAddress" };

CommonAddress.prototype.street1 = null;
CommonAddress.prototype.street2 = null;
CommonAddress.prototype.city = null;
CommonAddress.prototype.state = null;
CommonAddress.prototype.zip = null;
CommonAddress.prototype.country = null;
    
CommonAddress.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    CommonAddress.super._onStateSet (oldValue, newValue);
    
    self.street1.Set (newValue.street1 || "");
    self.street2.Set (newValue.street2 || "");
    self.city.Set (newValue.city || "");
    self.state.Set (newValue.state || "");
    self.zip.Set (newValue.zip || "" );
    self.country.Set (newValue.country || "");
    
    return (true);
};
