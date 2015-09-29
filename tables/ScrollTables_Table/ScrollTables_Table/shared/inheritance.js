var Class = function (){};

Class.extends = function (newClass)
{
    var self = this;
    
    // copies static functions
    for (var name in self)
        newClass[name] = self[name];
    
    // initialize the dynamic functions list from the prototype
    // parent class prototype list. Each time a new instance is 
    // created, these functions are attached to the class.
    newClass.prototype = Object.create (self.prototype);
    
    newClass.SUPER = self;
    newClass.super = self.prototype;
};

Class.prototype.instanceOf = function (targetClass)
{
    return (targetClass.prototype.isPrototypeOf(this));
    // similar to >superClass instanceof instance
};