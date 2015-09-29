/* ====================================
 *	Getter / Setter - Singleton Field
 *		this class creates and manages the Get and Set functions
 * 		for a variable. As well as calls functions when values are
 * 		changing.
 * 		
 *  A field variable is stored elsewhere, thus the fieldname is
 *      stored as data, and passed back to the function to 
 *      update the field.
 * 
 * 	Requires
 * 		Inheritance.js
 * 
 *  ====================================
 */
 
 
var SingletonField = function (owner, fieldname, initValue, cbSet, cbGet) 
{
    var self = this;
    
    SingletonField.SUPER.call (self, owner, fieldname, cbSet, cbGet);
    self.Set (initValue);
};
Singleton.extends (SingletonField);
 
SingletonField.prototype.Get = function ()
{
    var self = this;
    if (self._cbGet)
        return (self._cbGet.call (self._owner, self._data));

    return (self._data);
};

SingletonField.prototype.Set = function (newValue) 
{
    var self = this;

    if (self._cbSet)
        return (self._cbSet.call (self._owner, self._data, newValue));
            
};

