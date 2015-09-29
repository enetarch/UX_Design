var Component = function (selector, args)
{
    var self = this;
    
    self.GUID = Utilities.getGUID ();
    self._selector = selector;
    
    // self.addEventHandlers();
}
Class.extends (Component);

Component.prototype.GUID = "" ;
Component.prototype._selector = "" ;

// =================================================
// Static Functions




// =================================================
// Dynamic Functions


Component.prototype.addEventHandlers = function () {};
Component.prototype.removeEventHandlers = function () {};

// =================================================

Component.prototype.$Draw = function () {}
Component.prototype.updateView = function () 
{
    var self = this;
    
    $html = self.$Draw ();
    $(self._selector).html ("");
    $(self._selector).html ($html);
    self.addEventHandlers ();
};

// =================================================
// Trigger Functions

Component.prototype.on = function (selector, event, cbFunction) 
{
    var self = this;
    $(selector).on (event, cbFunction);
}
Component.prototype.off = function (selector, event) 
{
    var self = this;
    $(selector).off (event);
}
Component.prototype.trigger = function (event, data)
{
    var self = this;
    $(self._selector).trigger (event, data);
}

// =================================================
