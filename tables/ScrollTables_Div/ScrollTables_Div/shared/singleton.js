/* ====================================
 *	Getter / Setter - Singleton
 *		this class creates and manages the Get and Set functions
 * 		for a variable. As well as calls functions when values are
 * 		changing.
 * 
 * 	Requires
 * 		Inheritance.js
 * 
 *  ====================================
 */
 
 
var Singleton = function (owner, initValue, cbSet, cbGet) 
{
    var self = this;

    self._owner = owner;
    self._data = initValue;
    self._cbSet = cbSet;
    self._cbGet = cbGet;
};
Class.extends (Singleton);

Singleton.prototype._owner;
Singleton.prototype._data;
Singleton.prototype._cbSet;
Singleton.prototype._cbGet;
 
Singleton.prototype.Get = function ()
{
    var self = this;
    if (self._cbGet)
        return (self._cbGet.call (self._owner, self._data));

    return (self._data);
};

Singleton.prototype.Set = function (newValue) 
{
    var self = this;
    var oldValue = self._data;
    self._data = newValue;
    
    if (self._cbSet)
        self._cbSet.call (self._owner, oldValue, newValue);
};

