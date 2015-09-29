var Payment = function (classname) 
{
  var self = this;
  
  Payment.SUPER.call (self, classname || Payment.CLASS.name);
};
LadderContainer.extends (Payment);

Payment.CLASS= { name : "Payment" };

// =======================================================

Payment.prototype.createName = function (title, firstname, middlename, lastname, suffix)
{
    var self = this;
    
    var newContact = new CommonName ();
    newContact.init ("payment name", "name of payer", title, firstname, middlename, lastname, suffix);
    self.add (newContact);
    
    return (newContact);    
};

Payment.prototype.getName = function (index) 
{
    var self = this;
    
    var items = self.getItems ("", CommonName.CLASS.name);
    return (items.getItem (index));
};

Payment.prototype.countName = function ()
{
    var self = this;
    return (self.count("", CommonName.CLASS.name));
};

// =======================================================

Payment.prototype.createAddress = function (street1, stree2, city, state, zip, country)
{
    var self = this;
    
    var newContact = new CommonAddress ();
    newContact.init ("payment address", "address of payer", street1, stree2, city, state, zip, country);
    self.add (newContact);
    
    return (newContact);    
};

Payment.prototype.getAddress = function (index) 
{
    var self = this;
    
    var items = self.getItems ("", CommonAddress.CLASS.name);
    return (items.getItem (index));
};

Payment.prototype.countAddress = function ()
{
    var self = this;
    return (self.count("", CommonAddress.CLASS.name));
};

// =======================================================

Payment.prototype.createPaymentMethod = function (cardno, type, expires)
{
    var self = this;
    
    var newContact = new PaymentMethod ();
    newContact.init ("payment method", "method of payment", cardno, type, expires);
    self.add (newContact);
    
    return (newContact);    
};

Payment.prototype.getPaymentMethod = function (index) 
{
    var self = this;
    
    var items = self.getItems ("", PaymentMethod.CLASS.name);
    return (items.getItem (index));
};

Payment.prototype.countPaymentMethods = function ()
{
    var self = this;
    return (self.count("", PaymentMethod.CLASS.name));
};
