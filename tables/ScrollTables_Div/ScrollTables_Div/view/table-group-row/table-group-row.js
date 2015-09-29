/* ====================================
 *  Table Row 
 *	- Multiple Rows per header
 * 	- Multiple Rows per data row
 *	- Expand / Contract a Group
 *  	- Sort by Row
 * 	- Highlight a row the mouse is over
 *  	- Multiple Selection
 * 	- Show / Hide Columns
 * 	- 0 or more data columns may relate to 0 or more table columns
 * 	- 
 * 
 *  ====================================
 */
 
var TableGroupRow = function (selector, args) 
{
    var self = this;
    var args = args || { data: null };
    var data = args.data ||  null;
    var showGroupHeader = args.showGroupHeader || false;
    var showGroupFooter = args.showGroupFooter || false;
    var groupHidable = args.groupHidable || false;
    
    TableGroupRow.SUPER.call (self, selector, args);
    
    self.showGroupHeader = showGroupHeader;
    self.showGroupFooter = showGroupFooter;
    self.groupHidable = groupHidable;
    
    self._groupData = [];
    
};
TableRow.extends (TableGroupRow);

TableGroupRow.prototype.__groupData = [];
TableGroupRow.prototype.showHeader = true;
TableGroupRow.prototype.showFooter = true;
TableGroupRow.prototype.groupHidable = true;

TableGroupRow.prototype.addEventHandlers = function ()
{
    var self = this;
    
    $(self._selector + " div.table input#hideGroup").on ("click", 
        function (event) { self._onHideGroup.call (self, event); });
        
    TableGroupRow.super.addEventHandlers.call (this);
};

TableGroupRow.prototype._onHideGroup = function (event)
{
    var self = this;
    
    var $checkbox = $(event.currentTarget);
    var group = $checkbox.attr ("value");
    
    var bshowhide = $checkbox.prop("checked");
    
    var $table = $checkbox.parents ("div.table");
    var $tbody = $table.find ("div.tbody[group='" + group +"']");
    
    $tbody.toggle ();
};

TableGroupRow.prototype.$header = function (row, column)
{
    var self = this;
    
    if ((row == 0) && (column == 0)) 
        return ("");
    
    return (TableGroupRow.super.$header.call (this, row, column));    
}

TableGroupRow.prototype.$footer = function (row, column)
{
    var self = this;
    
    if ((row == 0) && (column == 0)) 
        return ("");
    
    return (TableGroupRow.super.$footer.call (this, row, column));
}

// ==================================================================

TableGroupRow.prototype.Group = function ()
{ return (true); };

// ===================================================================

TableGroupRow.prototype.getGroup = function (row)
{
    var self = this;
    
    group = self.getColumnData (0);
    
    return (group);
};

TableGroupRow.prototype.$groupHeader = function (group)
{
    var self = this;
    
    var $tr = $("<div class='tr thead'>");
    
    if (self.showRowNo)
        $tr.append ("<div class='td'></div>");
    
    if (self.isSelectable)
        if (self.groupHidable)
        { $tr.append ("<div class='td'><input type='checkbox' id='hideGroup' value=" + group + " ></div>"); }
        else
        { $tr.append ("<div class='td'></div>"); }
    
    for (var row in self._groupData)
    {
        var rowData = self._groupData [row];
        for (var column in rowData)
        {
            var data = self.formatData (rowData[column], self._columns[column].type);
            
            if ((row == 0) && (column == 1))
            { $tr.append ("<div class='td'>" + group + "</div>"); }
            else
            { $tr.append ("<div class='td'>" + data + "</div>"); }
        }
    }
    
    return ($tr);
};

TableGroupRow.prototype.$groupFooter = function (group)
{
    var self = this;
    
    var $rtn = $("<div class='tr thead'>");
    
    if (self.showRowNo)
        $rtn.append ("<div class='td'></div>");
    
    if (self.isSelectable)
        $rtn.append ("<div class='td'></div>");
    
    for (var row in self._groupData)
    {
        var rowData = self._groupData [row];
        for (var column in rowData)
        {
            var data = rowData[column];
            
            if ((row == 0) && (column == 1))
            { $rtn.append ("<div class='td'>" + group + "</div>"); }
            else
            { $rtn.append ("<civ class='td'>" + data + "</div>"); }
        }
    }
    
    return ($rtn);
};

TableGroupRow.prototype.reset = function ()
{
    var self = this;
    
    self._groupData = [];
};

TableGroupRow.prototype.aggragate = function (row, column, data)
{
    var self = this;
    
    switch (self._columns[column].type)
    {
        
        case "boolean": 
            self._groupData [row][column] |= data;
            break;
            
        case "currency":    
        case "integer":  
        case "real":  
            self._groupData [row][column] += (0 + data);
            break;
        
        case "datetime": 
        case "GUID":
            // do nothing
            break;
        
        case "string": 
        default: 
            self._groupData [row][column] += data; 
            break;
    }
};

TableGroupRow.prototype.initValue = function (row, column)
{
    var self = this;
    
    switch (self._columns[column].type)
    {
        
        case "boolean": return (false);
        
        case "currency":    
        case "integer":  
        case "real":  return (0);
        
        case "datetime": return (new Date());
        case "GUID": return (Utilities.getGUID());
        
        case "string": 
        default: return ("");
    }
};

// ===================================================================

TableGroupRow.prototype.$row = function (row, column) 
{
    var self = this;
    
    if ((row == 0) && (column == 0)) 
        return ("");
    
     var rtn = self.getColumnData (column);
    
    // aggrigate the data here
    if (!self._groupData [row])
        self._groupData [row] = [];
    
    if (!self._groupData [row][column])
        self._groupData [row][column] = self.initValue (row, column);
    
    // =======================
    
    var aggragate = self._columns [column].aggragate;
    
    if (aggragate)
        aggragate (self._groupData [row][column], rtn);
    else
        self.aggragate (row, column, rtn);
    
    // =======================
     
    var $rtn = $("<div class='td'>" + rtn + "</div>");
	
	return ($rtn);
};

// ==================================================================

TableGroupRow.prototype.compare = function (column, rowprev, row, bAsc)
{
    var self = this;
    
    self.indexData (rowprev);
    var prevdata = 
        self.getColumnData (0) + " " + 
        self.getColumnData (column);
    
    self.indexData (row);
    var data = 
        self.getColumnData (0) + " " + 
        self.getColumnData (column);
    
    if (prevdata < data) 
        return ((bAsc) ? -1 : 1);

    if (prevdata > data) 
        return ((bAsc) ? 1 : -1);

    return (0);
};