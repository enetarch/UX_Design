/* ====================================
 *  Table
 *	- Multiple Rows per header
 * 	- Multiple Rows per data row
 *	- Expand / Contract a Group
 *  	- Sort by Row
 * 	- Highlight a row the mouse is over
 *  	- Multiple Selection
 * 	- Show / Hide Columns
 * 	- 
 * 	- 
 * 
 * 	Requires
 * 		Inheritance.js
 * 		Getter / Setter.js
 * 
 *  ====================================
 */
 
// =====================================
// Constructor
/* parameters
 *      selector: string ,
 *      args :
 *      { 
 *          isSelectable: [boolean],
 *          data: [sqlResults],
 *          rowRender: [TableRow],
 *      }
*/

var Table = function (selector, args) 
{
    var self = this;
    
    var args = args || { isSelectable: false, data: {}, rowRender: {}};
    
    var data = args.data || null;
    var rowRender = args.rowRender || new TableRow(null, {data : data});
    var showHeader = args.showHeader || false;
    var showFooter = args.showFooter || false;
    var useLineBar = args.useLineBar || false;
    var isSelectable = args.isSelectable || false;
    var showRowNo = args.showRowNo || false;
    
    self.isSelectable = args.isSelectable || false;

    self.data = new Singleton (self, data, self._onDataSet );
    self.rowRender = new Singleton (self, rowRender, self._onRowRenderSet );
    self.showHeader = showHeader;
    self.showFooter = showFooter;
    self.useLineBar = new Singleton (self, useLineBar, self._onUseLineBarSet );
    self.isSelectable = isSelectable;
    self.showRowNo = showRowNo;
    
    self._selectedRows = [];
    
    Table.SUPER.call (self, selector, args);
};
Component.extends (Table);

// ======================================
// EVENTS

Table.EVENT_TRIGGERS = 
{
    TABLE_DATA_SET : "Table.EVENT_TRIGGERS.TABLE_DATA_SET",
    TABLE_ROWRENDER_SET : "Table.EVENT_TRIGGERS.TABLE_ROWRENDER_SET",
    TABLE_ROW_SELECTED : "Table.EVENT_TRIGGERS.TABLE_ROW_SELECTED",
};

// ======================================
// Variables

Table.prototype.data = null;
Table.prototype.rowRender = null;
Table.prototype.showHeader = null;
Table.prototype.showFooter = null;

Table.prototype.useLineBar = null;
Table.prototype.isSelectable = null;
Table.prototype.showRowNo = false;

Table.prototype._sortOn = 0;
Table.prototype._sortAsc = true;
Table.prototype._selectedRows = [];

// ======================================
// Event Handlers

Table.prototype.addEventHandlers = function ()
{
    var self = this;
/*    
    self.on (self._selector, Table.EVENT_TRIGGERS.TABLE_DATA_SET, 
        function (event) 
        { 
            self.updateView.call (self); 
        });   
    self.on (self._selector, Table.EVENT_TRIGGERS.TABLE_ROWRENDER_SET, 
        function (event) 
        { 
            self.updateView.call (self); 
        });   
*/
}

Table.prototype.removeEventHandlers = function ()
{
    var self = this;
    
    self.off (self._selector, Table.EVENT_TRIGGERS.TABLE_DATA_SET);   
    self.off (self._selector, Table.EVENT_TRIGGERS.TABLE_ROWRENDER_SET);
}

// ======================================
// Event Handlers

Table.prototype.addEventHandlers = function ()
{
    var self = this;
    
    $(self._selector + " div.table input#sortColumn").on ("click", 
        function (event) { self._onSortColumn.call (self, event); });

    $(self._selector + " div.table input#hideColumn").on ("click", 
        function (event) { self._onHideColumn.call (self, event); });

    $(self._selector + " div.table input#selectRow").on ("click", 
        function (event) { self._onSelectRow.call (self, event); });

    $(self._selector + " div.table input#selectallRows").on ("click", 
        function (event) { self._onSelectAllRows.call (self, event); });

    var render = self.rowRender.Get ();
    
    render.addEventHandlers();
    
    Table.super.addEventHandlers.call (self);
};

Table.prototype._onSortColumn = function (event) 
{
    var self = this;
    var render = self.rowRender.Get();
    
    var $checkbox = $(event.currentTarget);
    var column = $checkbox.attr ("value");
    
    
    if (self._sortOn == column)
    { self._sortAsc = !self._sortAsc; }
    else
    { self._sortAsc = true; }
    
    self._sortOn = column;
    
    $checkbox.toggleClass ("SORT_ASC", self._sortAsc);
    $checkbox.toggleClass ("SORT_DESC", !self._sortAsc);
    
    render.sortOn (self._sortOn, self._sortAsc);
    
    self.updateView();
};

Table.prototype._onHideColumn = function (event) 
{
    var self = this;
    
    var column = $(event.currentTarget).attr ("value");
    var render = self.rowRender.Get();
    
    render.hideColumn (column);
       
    self.updateView();
};

Table.prototype._onSelectRow = function (event) 
{
    var self = this;
    
    var $checkbox = $(event.currentTarget);
    var row = $checkbox.attr ("value");
    var bHighLight = $checkbox.prop("checked");
    
    var $row = $checkbox.parents ("div.tr");
    
    $row.toggleClass ("selected", bHighLight);
    self._selectedRows [row] = bHighLight;
    
    $(self._selector).trigger(Table.EVENT_TRIGGERS.TABLE_ROW_SELECTED, row);
    
};

Table.prototype._onSelectAllRows = function (event) 
{
    var self = this;
    
    var $checkbox = $(event.currentTarget);
    var bChecked = $checkbox.prop ("checked");
    
    var $table = $checkbox.parents ("div.table");
    var $tbody = $table.find ("div.tbody");
    
    $tbody.find ("input[type=checkbox]#selectRow").each (function (index)
    {
        var $checkbox = $(this);
        
        var row = $checkbox.attr ("value");
        $checkbox.prop("checked", bChecked);
        
        var $row = $checkbox.parents ("div.tr");
    
        $row.toggleClass ("selectedRow", bChecked);
        self._selectedRows [row] = bChecked;

        $(self._selector).trigger(Table.EVENT_TRIGGERS.TABLE_ROW_SELECTED, row);
    });
};

Table.prototype.getSelectRows = function () 
{
    var self = this;
    
    var rtn = [];
    for (var index in self._selectedRows)
        if (self._selectedRows[index])
            rtn [index] = true;
    
    return (rtn);
};
// ======================================
// Functions

Table.prototype.$Draw = function ()
{
	var self = this;
        
        self.updateView();
};

Table.prototype.$Draw = function ()
{
    var self = this;
    var data = self.data.Get();
    var render = self.rowRender.Get();
    var useLineBar = self.useLineBar.Get();
    var useGroups = render.Group();
    
    if (!data) return ("");
    if (!render) return ("");
    
    if (render.data.Get() == null)
        render.data.Set(data);
    
    render.showHeader = self.showHeader;
    render.showFooter = self.showFooter;
    render.showRowNo = self.showRowNo;
    render.isSelectable = self.isSelectable;
    
    render.Sort (self._sortOn, self._sortAsc);
    
    $(self._selector).html ("");
    
    var linebarStyle = "";
    
    if (useLineBar)
        linebarStyle = "lite_line" ;
    
    var $table = $("<div class='table'>");
    
    // ================================================
    // Draw Table Header
    
    // var $thead = $("<div class='thead fixed'>");

    if (render.showHeader)    
    for (var row = 0; row < render.nRows(); row++)
    {
        var $tr = $("<div class='tr thead fixed " + linebarStyle + "'>");
    
        if (self.showRowNo)
            $tr.append ("<div class='td'>_</div>");

        if (self.isSelectable)
            $tr.append ("<div class='td'><input type='checkbox' id='selectallRows'></div>");

        for (var column = 0; column < render.nColumns(); column++)
            if (render.isColumnVisible (column))
                $tr.append (render.$header (row, column) );

        $table.append ($tr);
    }
    
    // $table.append ($thead);
    
    // ================================================
    // Draw Table Body
    
    var group = "";
    var prevgroup = "";
    
    // ================================================
    
    var $tbody =[];
    
    if (useGroups)
        render.reset();
    
    for (var row in data.results)
    {
        render.indexData (row);
        
        if (useGroups)
        {
            group = render.getGroup(row);  
            
            if (prevgroup == "")
                prevgroup = group;
            
            if (group != prevgroup)
            {           
                if (render.showGroupHeader)
                    $table.append (render.$groupHeader (prevgroup));                
            
                for (var index in $tbody)
                    $table.append ($tbody[index]);
                
                if (render.showGroupFooter)
                    $table.append (render.$groupFooter (prevgroup));
                
                render.reset();
                $tbody =[];
            }
         }
            
        if (useLineBar)
            linebarStyle = (row % 2) ? "lite_line" : "dark_line";
        
        for (var rowx = 0; rowx < render.nRows(); rowx++)
        {
            var $tr = $("<div group='" + group + "' class='tr tbody " + linebarStyle + "' >");
            $tr.append ("<div class='td'>" + row + "</div>");

            if (self.isSelectable)
                $tr.append ("<div class='td'><input type='checkbox' id='selectRow' value=" + row + "></div>");
        
            for (var column = 0; column < render.nColumns(); column++)
                if (render.isColumnVisible (column))
                    $tr.append (render.$row(rowx, column));
            
            $tbody.push ($tr);
        };
        
        if (useGroups)
            prevgroup = group;
        
    }
    
    // =========================================
    // Draw last of tabel body collected
    
    if (useGroups)
    {           
        if (render.showGroupHeader)
            $table.append (render.$groupHeader (group));                

        for (var index in $tbody)
            $table.append ($tbody[index]);

        if (render.showGroupFooter)
            $table.append (render.$groupFooter (group));

        render.reset();
        $tbody =[];
    }
    else
    {
        for (var index in $tbody)
            $table.append ($tbody[index]);
    }
    // =========================================
    // Draw Table Footer
    
    // var $tfoot = $("<div='tr tfoot'>");
    
    if (render.showFooter)
    for (var row = 0; row < render.nRows(); row++)
    {
        var $tr = $("<div class='tr " + linebarStyle + "'>");
    
        if (self.showRowNo)
            $tr.append ("<div class='td'>_</div>");

        if (self.isSelectable)
            $tr.append ("<div class='td'><input type='checkbox' id='selectallRows'></div>");

        for (var column = 0; column < render.nColumns(); column++)
            if (render.isColumnVisible (column))
                $tr.append (render.$footer (row, column) );
        
        $table.append ($tr);
    }

    
    // $table.append ($tfoot);

    // =========================================
    // Draw Table 
    
    return ($table);
};


// ====================================================================

Table.prototype._onDataSet = function (oldValue, newValue) 
{
    var self = this;

    self.trigger (Table.EVENT_TRIGGERS.TABLE_DATA_SET);
    
    var render = self.rowRender.Get();
    if (render)
        render.data.Set (self.data.Get());
    
    self.updateView();
};

Table.prototype._onRowRenderSet = function (oldValue, newValue) 
{
    var self = this;

    self.trigger (Table.EVENT_TRIGGERS.TABLE_ROWRENDER_SET);
    
    var render = self.rowRender.Get();
    if (render)
        render.data.Set (self.data.get());
    
    self.updateView();
};

Table.prototype._onUseLineBarSet = function () 
{
    var self = this;
};

Table.prototype._onUseGroupsSet = function () 
{
    var self = this;
};

