/*    ======================================= 
    Copyright 1998 - 2010 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var LadderNodes = function () 
{
  var self = this;
  
  self.state = new Singleton (self, {}, self._onStateSet, self.onStateGet);
  self._nodes = [];
};
Class.extends (LadderNodes);

LadderNodes.prototype.state = null;
LadderNodes.prototype._nodes = [];

LadderNodes.prototype.getNodes = function ()
{
    var self = this;
    
    return (self._nodes);
};

LadderNodes.prototype._onStateGet = function (savedState) 
{
    var self = this;
    
    // convert self._nodes to JSON
    
    return (self._nodes);
};

LadderNodes.prototype._onStateSet = function (oldState, newState) 
{
    var self = this;
    
    // initialize self._nodes with newState
    
    return (true);
};

LadderNodes.prototype.add = function (node)
{
    var self = this;
    
    self._nodes.push (node);
};

// =======================================================

LadderNodes.prototype.count = function (name, classname)
{
    var self = this;
    var results = 0;

    for (var index in self._nodes)
    {
        var node = self._nodes [index];

        if (name) if (node.getName() != name) continue
        if (classname) if (node.getClass() != classname) continue;

        results++;
    }

    return (results);
};

LadderNodes.prototype.getNodesBy = function (name, classname)
{
    var self = this;
    var results = [];

    for (var index in self._nodes)
    {
        var node = self._nodes [index];
        if (name) if (node.getName() != name) continue
        if (classname) if (node.getClass() != classname) continue;

        results.push (node);        
    }

    return (results);
};

LadderNodes.prototype.getContainers = function (name, classname)
{
    var self = this;
    var results = [];

    for (var index in self._nodes)
    {
        var node = self._nodes [index];
        if (node.isContainer())
        {
            if (name) if (node.getName() != name) continue
            if (classname) if (node.getClass() != classname) continue;

            results.push (node);
        }
    }

    return (results);
};

LadderNodes.prototype.getItems = function (name, classname)
{
    var self = this;
    var results = [];

    for (var index in self._nodes)
    {
        var node = self._nodes [index];
        if (node.isItem())
        {
            if (name) if (node.getName() != name) continue;
            if (classname) if (node.getClass() != classname) continue;

            results.push (node);
        }
    }

    return (results);    
};

// =======================================================

LadderNodes.prototype.getNode = function (index)
{
    var self = this;
    
    var rtn = null;
    if (index >= 0)
        rtn = self._nodes[index];
    
    return (rtn);
};

LadderNodes.prototype.getNodeByName = function (name)
{
    var self = this;
    
    var rtn = null;
    for (var instance in self._nodes)
    {
        rtn = self._nodes[instance];
        if (rtn.name.Get() == name)
            return (rtn);
    }
    
    return (null);
};

LadderNodes.prototype.getNodeByGUID = function (guid)
{
    var self = this;
    
    var rtn = null;
    for (var instance in self._nodes)
    {
        rtn = self._nodes[instance];
        if (rtn.getGUID() == guid)
            return (rtn);
    }
    
    return (null);
};

LadderNodes.prototype.getNodeByClass = function (classname)
{
    var self = this;
    
    var rtn = null;
    for (var instance in self._nodes)
    {
        rtn = self._nodes[instance];
        if (rtn.classname.Get() == classname)
            return (rtn);
    }
    
    return (null);
};