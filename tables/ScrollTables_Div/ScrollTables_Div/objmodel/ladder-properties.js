/*    ======================================= 
    Copyright 1998 - 2010 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var LadderProperties = function (classname, basetype) 
{
    var self = this;
    
    self._GUID = Utilities.getGUID();
    self.name = new Singleton (self, "");
    self.description = new Singleton (self, "");
    self.parent = new Singleton (self, null);
    self.classname = new Singleton (self, classname || "" );
    self.basetype = new Singleton (self, basetype || LadderProperties.BASETYPE.UNKNOWN);
};
Class.extends (LadderProperties);

// ==========================================

LadderProperties.BASETYPE =
{
    UNKNOWN : 0,
    ROOT : 1,
    CONTAINER : 2,
    ITEM : 3,
};

LadderProperties._reservedFieldNames = 
{ 
    GUID : true, 
    name : true,
    description : true,
    classname : true,
    basetype : true,
    parent : true,
};

// ==========================================

LadderProperties.prototype._GUID = "";
LadderProperties.prototype.name = null;
LadderProperties.prototype.description = null;
LadderProperties.prototype.parent = null;
LadderProperties.prototype.classname = null;
LadderProperties.prototype.baseType = null;

// ==========================================

LadderProperties.prototype.setState = function (thsState) 
{
    var self = this;
    
    // self._GUID = thsState.GUID;
    self.name.Set (thsState.name || "");
    self.description.Set (thsState.description || "");
    // self.basetype.Set (thsState.basetype || LadderProperties.BASETYPE.UNKNOWN);
};

LadderProperties.prototype.getState = function () 
{
    var self = this;
    
    var rtn = 
    {
        GUID : self._GUID,
        name : self.name.Get(),
        description : self.description.Get(),
        classname : self.classname.Get(),
        basetype : self.basetype.Get(),
        parent : (self.parent.Get()) ? self.parent.Get()._GUID : "",
    };
    
    return (rtn);    
};


LadderProperties.reservedField = function (fieldname)
{
    return (LadderProperties._reservedFieldNames [fieldname] || false);
}
// ==========================================

LadderProperties.prototype.Init = function (name, description)
{
  var self = this;
  
  self.name.Set (name);
  self.description.Set (description);
};

// ==========================================

LadderProperties.prototype.isContainer = function () 
{
    var self = this;
    
    var basetype = self.basetype.Get();
    return 
    (
            (basetype == LadderProperties.BASETYPE.ROOT) &&
            (basetype == LadderProperties.BASETYPE.CONTAINER)
    );
};

LadderProperties.prototype.isItem = function () 
{
    var self = this;
    
    var basetype = self.basetype.Get();
    return (basetype == LadderProperties.BASETYPE.ITEM);    
};

// ==========================================

LadderProperties.prototype.getGUID = function () 
{ 
    var self = this;
    return (self._GUID);
};

LadderProperties.prototype.getClass = function () 
{ 
    var self = this;
    return (self.classname.Get());
};

LadderProperties.prototype.getParent = function () 
{
    var self = this;
    return (self.parent.Get());
};

LadderProperties.prototype.getPath = function () 
{
    var self = this;
    var aryPath = [];
    aryPath[0] = self.GUID.Get();
    
    if (!self.getParent.Get())
        return (aryPath);
    
    var parent = self.getParent.Get();
    var t = 1;
    while (parent)
    {
        aryPath[t] = parent.GUID.Get();
        t++;
        parent = parent.getParent.Get();
    }
    
    aryPath.reverse();
    
    return (aryPath);
};

