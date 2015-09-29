var CommonContact = function (classname)
{
    var self = this;
    CommonContact.SUPER.call (this, classname || CommonContact.CLASS.name);
    
    self.addField ("type");
    self.addField ("street2");
    
    self.type = new SingletonField (self, "type");
    self.method  = new SingletonField (self, "method");
     
};
LadderItem.extends (CommonContact);

CommonContact.CLASS= { name : "CommonContact" };

CommonContact.prototype.type = null;
CommonContact.prototype.method = null;

CommonContact.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    CommonContact.super._onStateSet (oldValue, newValue);
    
    self.type.Set (newValue.type || "");
    self.method.Set (newValue.method || "");
    
    return (true);
};

CommonContact.prototype.init = function (name, description, type, method) 
{
    var self = this;
    
    CommonContact.SUPER.init.call (this, name, description);
    
    self.setField ("type", type);
    self.setField ("method", method);
};
