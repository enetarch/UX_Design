/*    ======================================= 
    Copyright 1998 - 2010 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var LadderItem = function (classname) 
{
    var self = this;
    
    LadderItem.SUPER.call (self, classname || LadderItem.CLASS.name, LadderProperties.BASETYPE.ITEM);
    
    self._fields = {};
};
LadderProperties.extends (LadderItem);

LadderItem.CLASS= { name : "LadderItem" };
LadderItem.prototype._fields = {};
// =======================================================================

LadderItem.prototype.setState = function (thsState) 
{
    var self = this;
    
    LadderItem.super.setState.call (self, thsState);
    
    for (var fieldname in thsState)
    {
        if (! LadderProperties.reservedField (fieldname)) 
            self.addField (fieldname, thsState [fieldname]);
    }
};

LadderItem.prototype.getState = function () 
{
    var self = this;
    
    var rtn = LadderItem.super.getState.call (self);
    
    for (var index in self._fields)
        rtn [index] = self._fields [index]; 

    return (rtn);
};

// =======================================================================

LadderItem.prototype.Init = function (name, description) 
{
    var self = this;
    
    var basetype = LadderProperties.BASETYPE.ITEM;
    
    LadderItem.super.Init.call (self, name, description);
};

// =======================================================================

LadderItem.prototype.addField = function (fieldname, value)
{
    var self = this;
    
    if (LadderProperties.reservedField (fieldname)) 
        return (false);
    
    self._fields[fieldname] = value || "";
    
    return (true);
};

LadderItem.prototype.getField = function (fieldname)
{
    var self = this;
    
    return (self._fields[fieldname]);
};

LadderItem.prototype.setField = function (fieldname, value)
{
    var self = this;
    
    if (self._fields[fieldname] == undefined)
        return (false);
    
    self._fields[fieldname] = value;
    
    return (true);
};

LadderItem.prototype._onFieldGet = function (fieldname)
{
    var self = this;
    return (self.getField (fieldname));
};

LadderItem.prototype._onFieldSet = function (fieldname, value)
{
    var self = this;
    return (self.setField (fieldname, value));
};
