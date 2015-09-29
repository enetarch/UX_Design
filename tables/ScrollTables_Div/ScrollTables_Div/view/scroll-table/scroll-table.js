/*
 * this view controls the scrolling of a table and weather the first header of
 * a table remains visible while the table scrolls.
 */

var ScrollTable = function (selector, args)
{
    var self = this;
    var args = args || {};
    var stickyHeader = args.stickyHeader || false;
    var hScroll = args.hScroll || false;
    var vScroll = args.vScroll || false;
    
    ScrollTable.SUPER.call (self, selector, args);
    
    self.stickyHeader = new Singleton (self, stickyHeader, self._onStickySet);
    self.hScroll = new Singleton (self, hScroll, self._onHScrollSet);
    self.vScroll = new Singleton (self, vScroll, self._onVScrollSet);
    
};
Table.extends (ScrollTable);

ScrollTable.EVENT_TRIGGERS = 
{ 
    TABLE_SET : "ScrollTable.EVENT_TRIGGERS.TABLE_SET",
    UPDATE_TABLE : "ScrollTable.EVENT_TRIGGERS.UPDATE_TABLE",
};

ScrollTable.prototype.stickyHeader = null;
ScrollTable.prototype.hScroll = null;
ScrollTable.prototype.vScroll = null;

ScrollTable.prototype.addEventHandlers = function () 
{
    var self = this;
    
    $(self.selector).on (ScrollTable.EVENT_TRIGGERS.TABLE_SET, 
        function (event) { self.updateView();} );
        
    ScrollTable.super.addEventHandlers.call (this);
};

// ===============================================================
ScrollTable.prototype._sizeColumns = function ()
{
    var self = this;
    var columns = [];
    $(self._selector + " div.scroll-table div.table div.tr").each (function (row, $tr) 
    {
        var $tr = this;
        $($tr).find ("div.td").each (function (column, $td) 
        {
            var $td = this;
            columns[column] = Math.max (columns[column] || 0 , $($td).width());
        });
    });

    
    $(self._selector + " div.scroll-table div.table div.tr").each (function (row, $tr) 
    {
        var $tr = this;        
        $($tr).find ("div.td").each (function (column, $td) 
        {
            var $td = this;
            $($td).width (columns[column]);
            var $div = $("<div style='width:" + columns[column] + "'></div>");
            $($td).append ($div);
        });
        
        var $td = $("<td>&nbsp;</td>");
        $($tr).append ($td);
    });
    
    var totalWidth = $(self._selector + " div.scroll-table div.table").width();        
    $(self._selector + " div.scroll-table div.innerDiv").width (totalWidth);
    

};

ScrollTable.prototype.$Draw = function ()
{
    var self = this;
    
    var $table = ScrollTable.super.$Draw.call(this);
        
    var $scrollTable = $("<div id='scrollTable' class='scroll-table'>");
    var $innerDiv = $("<div id='innerDiv' class='innerdiv'>");
    
    $innerDiv.append ($table);
    $scrollTable.append ($innerDiv);
    
    return ($scrollTable);
};

ScrollTable.prototype.updateView = function ()
{
    var self = this;
    ScrollTable.super.updateView.call (this);
    self._sizeColumns();
}
// ===============================================================

ScrollTable.prototype._onTableSet = function (oldValue, newValue) 
{
    var self = this;
    $(self.selector).trigger (ScrollTable.EVENT_TRIGGERS.TABLE_SET);
    self.updateView();
    return (true);
};

ScrollTable.prototype._onStickySet = function (oldValue, newValue) 
{
    var self = this;
    
    $(self.selector).css ();
    return (true);
};

ScrollTable.prototype._onHScrollSet = function (oldValue, newValue) 
{
    var self = this;
    
    $(self.selector).css ();
    return (true);
};

ScrollTable.prototype._onVScrollSet = function (oldValue, newValue) 
{
    var self = this;
    
    $(self.selector).css ();
    return (true);
};

