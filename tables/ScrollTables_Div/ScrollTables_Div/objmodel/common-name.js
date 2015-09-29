var CommonName = function (classname) 
{
    var self = this;
    CommonName.SUPER.call (this, classname || CommonName.CLASS.name);
    
    self.addField ("title");
    self.addField ("firstName");
    self.addField ("middleName");
    self.addField ("lastName");
    self.addField ("suffix");
    
    self.title = new SingletonField (self, "title", "", self._onFieldSet, self._onFieldGet );
    self.firstName  = new SingletonField (self, "firstName", "", self._onFieldSet, self._onFieldGet );
    self.middleName  = new SingletonField (self, "middleName", "", self._onFieldSet, self._onFieldGet );
    self.lastName  = new SingletonField (self, "lastName", "", self._onFieldSet, self._onFieldGet );
    self.suffix  = new SingletonField (self, "suffix", "", self._onFieldSet, self._onFieldGet );
};
LadderItem.extends (CommonName);

CommonName.CLASS= { name : "CommonName" };

CommonName.prototype.title = null;
CommonName.prototype.firstName = null;
CommonName.prototype.middleName = null;
CommonName.prototype.lastName = null;
CommonName.prototype.suffix = null;
    
CommonName.prototype._onStateSet = function (oldValue, newValue) 
{
    var self = this;
    
    CommonName.super._onStateSet (oldValue, newValue);
    
    self.title.Set (newValue.title || "");
    self.firstName.Set (newValue.firstName || "");
    self.middleName.Set (newValue.middleName || "");
    self.lastName.Set (newValue.lastName || "");
    self.suffix.Set (newValue.suffix || "" );
    
    return (true);
};

CommonName.prototype._onStateSet = function (name, description, title, firstname, middlename, lastname, suffix) 
{
    var self = this;
    CommonName.super.init.call (this, name, description);
    
    self.title.Set (title || "");
    self.firstName.Set (firstName || "");
    self.middleName.Set (middleName || "");
    self.lastName.Set (lastName || "");
    self.suffix.Set (suffix || "" );
};