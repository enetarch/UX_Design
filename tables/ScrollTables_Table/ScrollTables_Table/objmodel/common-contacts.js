var CommonContacts = function (classname) 
{
    var self = this;
    CommonContacts.SUPER.call (this, classname || CommonContacts.CLASS.name);
};
LadderContainer.extends (CommonContacts);

CommonContacts.CLASS= { name : "CommonContacts" };

CommonContacts.prototype.createContact = function (name, description, type, method) 
{
    var self = this;
    
    var newContact = new CommonContact ();
    newContact.init (name, description, type, method);
    self.add (newContact);
    
    return (newContact);
};

CommonContacts.prototype.getContact = function (index) 
{
    var self = this;
    return (self.item (index));
};

CommonContacts.prototype.countContacts = function () 
{
    var self = this;
    return (self.count ());
};