/*    ======================================= 
    Copyright 1998 - 2010 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var Ladder = function () 
{
    var self = this;
    
    self.state = new Singleton (self, {}, self._onStateSet)
    self._roots = new LadderContainers();
};
Class.extends (Ladder);

Ladder.prototype.state = null;
Ladder.prototype._roots = null;

// ===============================================================

Ladder.prototype.setState = function (thsState)
{
    var self = this;
    
    self._roots = new LadderContainers ();

    for (var index in thsState)
    {
        var classname = thsState[index].classname;

        var instance = new window [classname] ();
        instance.setState (thsState[index]);
        instance._GUID = index;
        
        self._roots.add (instance);
    }
}

Ladder.prototype.getState = function ()
{
    var self = this;
    
    var nodes = self._roots.getNodes();
    var rtn = {};
    
    for (var index in nodes)
    {
        var guid = nodes[index].getGUID();
        rtn [guid] = nodes[index].getState();
    }
    
    return (rtn);
}

// ===============================================================

Ladder.prototype._onStateSet = function (oldState, newState) 
{
    // traverse the JSON structure contained in thsState
    // and build out the Object Model maintained by 
    // Ladder.
    
    self._roots = new LadderNodes ();
    
    for (var index in newState)
    {
        var instances = new window [classname] ();
        instance.state.set (newState [classname]);
        self._roots.add (instance);
    }
};

Ladder.prototype.getRoots = function () 
{
    var self = this;
    return (self._roots);
};

Ladder.prototype.createRoot = function (name, description)
{
    var self = this;
    
    newContainer = new LadderContainer ();
    newContainer.Init (name, description);
    self._roots.add (newContainer);
    
    return (newContainer);
};

Ladder.prototype.getRoot = function (index, guid, name) 
{
    var self = this;
    
    var rootContainer = self._roots.getNode (index);
    
    return (rootContainer);        
};

Ladder.prototype.getRootByGUID = function (guid) 
{
    var self = this;
    
    var rootContainer = self._roots.getNodeByGUID (guid);
    
    return (rootContainer);        
};

Ladder.prototype.getRootByName = function (name) 
{
    var self = this;
    
    var rootContainer = self._roots.getNodeByName (name);
    
    return (rootContainer);        
};

Ladder.prototype.getRootByClass = function (classname) 
{
    var self = this;
    
    var rootContainer = self._roots.getNodeByClass (classname);
    
    return (rootContainer);        
};

Ladder.prototype.getNode = function (guid, name)
{
    var self = this;
    
}

