/*    ======================================= 
    Copyright 1998 - 2010 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var LadderContainer = function (classname)
{
    var self = this;
    
    LadderContainer.SUPER.call (self, classname || LadderContainer.CLASS.name, LadderProperties.BASETYPE.CONTAINER);
    
    self._nodes = new LadderContainers();
};
LadderProperties.extends (LadderContainer);

LadderContainer.CLASS= { name : "LadderContainer" };
LadderContainer.prototype._nodes = null;

LadderContainer.prototype.Init = function (name, description) 
{
    var self = this;
    
    var basetype = (parent) ?
        LadderProperties.BASETYPE.CONTAINER :
        LadderProperties.BASETYPE.ROOT;
    
    LadderContainer.super.Init.call (self, name, description);
};

// ===============================================================

LadderContainer.prototype.setState = function (thsState) 
{
    var self = this;
    
    var nodes = thsState.nodes;
    for (var index in nodes)
    {        
        var item = nodes[index];

        var instance = new window [item.classname]();
        instance.setState (item);
        instance._GUID = index;
        
        self.add (instance);
    }
};

LadderContainer.prototype.getState = function () 
{
    var self = this;
    var nodes = self._nodes.getNodes();
        
    var rtn = LadderContainer.super.getState.call(self);
    rtn.nodes = {};
    
    for (var index in nodes)
    {
        var guid = nodes[index].getGUID();
        rtn.nodes[guid] = nodes[index].getState();
    }
    
    return (rtn);
};

// ===============================================================

LadderContainer.prototype.add = function (thsInstance) 
{
    var self = this;
    
    thsInstance.parent.Set (self);
    
    self._nodes.add (thsInstance);
};

LadderContainer.prototype.createContainer = function (name, description) 
{
    var self = this;
    
    var newContainer = new LadderContainer ();
    newContainer.Init (name, description);
    self.add (newContainer);
    
    return (newContainer);
};

LadderContainer.prototype.createItem = function (name, description, data) 
{
    var self = this;
    
    var newItem = new LadderItem ();
    newItem.Init (name, description);
    self.add (newItem);
    
    if (data)
        newItem.setState (data);
    
    return (newItem);
};

LadderContainer.prototype.delete = function () 
{
    // for each link in nodes, call delete
};

LadderContainer.prototype.count = function (name, classname) 
{
    var self = this;
    return (self._nodes.count(name, classname));
};

LadderContainer.prototype.exists = function (name, classname) 
{
    var self = this;
    return (self._nodes.count (name, classname) > 0);
};

LadderContainer.prototype.getContainers = function (name, classname) 
{
    var self = this;
    
    // SELECT *
    // FROM _nodes
    // WHERE
    //      ( 
    //          basetype = LadderProperties.BASETYPE.CONTAINER OR
    //          basetype = LadderProperties.BASETYPE.CONTAINER
    //      ) AND
    //      name = name AND
    //      classname = classname
    
    var thsState = self._nodes.getContainers (name, classname);
    var results = new LadderContainers();
    results.setState (thsState);
    return (results);
};

LadderContainer.prototype.getItems = function (name, classname) 
{
    var self = this;
    
    // SELECT *
    // FROM _nodes
    // WHERE
    //      ( 
    //          basetype = LadderProperties.BASETYPE.CONTAINER OR
    //          basetype = LadderProperties.BASETYPE.CONTAINER
    //      ) AND
    //      name = name AND
    //      classname = classname
    
    var thsState = self._nodes.getItems (name, classname);
    var results = new LadderItems();
    results.setState (thsState);
    return (results);
};

LadderContainer.prototype.getContainer = function (index) 
{
    var self = this;
    var containers = self.getContainers ();
    var results = containers.getItem (index);
    return (results);
};

LadderContainer.prototype.getItem = function (index) 
{
    var self = this;
    var containers = self.getItems ();
    var results = containers.getItem (index);
    return (results);
};

LadderContainer.prototype.getNode = function (index) 
{
    var self = this;
    return ( self._nodes.getNode (index) );
};

LadderContainer.prototype.getNodesBy = function (name, classname) 
{
    var self = this;
    return ( self._nodes.getNodesBy (name, classname) );
};




