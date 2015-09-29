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
 
var TableRow = function (selector, args) 
{
    var self = this;
    
    TableRow.SUPER.call (self, selector, args);
    
    var data = args.data || null;
    var showHeader = args.showHeader || false;
    var showFooter = args.showFooter || false;
    var isSelectable = args.isSelectable || false;
    var showRowNo = args.showRowNo || false;
    
    self.data = new Singleton (self, data, self.initColumns);

    self.showHeader = showHeader;
    self.showFooter = showFooter;
    self.isSelectable = isSelectable;
    self.showRowNo = showRowNo;
    self._sortOn = 0;
    
    TableRow._columns = [];
    
    if (data)
        self.initColumns ();
};
Component.extends (TableRow);

TableRow.prototype.showHeader = null;
TableRow.prototype.showFooter = null;

TableRow.prototype.isSelectable = null;
TableRow.prototype.showRowNo = false;
TableRow.prototype._sortOn = 0;

TableRow.prototype._indexData = {};
TableRow.prototype.data = null;

TableRow.prototype._columns = 
    [
        {
            name : "Column Name",
            render : null,
            isVisible : true,
            sortOn : false,
            sortAsc : true,
        },
    ];
    
TableRow._protoColumn = 
    {
        name : "Column Name",
        render : null,
        isVisible : true,
        sorting : false,
        sortAsc : true,
    };

// ==================================================================
// Table Column Functions

TableRow.prototype.nColumns = function () 
{ 
    var self = this;
  
    return (self._columns.length); 
};

TableRow.prototype.nRows = function () 
{ return (1) };

// ==================================================================
TableRow.prototype.Group = function ()
{
    // override this function to draw multiple headers and footers
    // for grouping data results
    
    return (null);
};

TableRow.prototype.showColumn = function (column)
{
    var self = this;
    
    self._columns[columnn].isVisible = true;  
};

TableRow.prototype.hideColumn = function (column)
{
    var self = this;
    
    self._columns[column].isVisible = false;
};

TableRow.prototype.isColumnVisible = function (column)
{
    var self = this;
    
    return (self._columns[column].isVisible);
};

// ==================================================================

TableRow.prototype.initColumns = function ()
{
    var self = this;
    var data = self.data.Get();
    
    self._columns = [];
    
    for (var column in data.columns)
    {
        var columnname = data.columns[column].name;

        self._columns [column] = Object.create (TableRow._protoColumn);

        self._columns [column] = data.columns[column];

        self._columns [column].name = columnname;
        self._columns [column].isVisible = true; 
        self._columns [column].render = self._genericField;
        self._columns [column].sorting = false;
        self._columns [column].sortAsc = false;
    }
};

TableRow.prototype.getColumn = function (column)
{
    var self = this;
    return (self._columns [column]);
};

TableRow.prototype.getColumnName = function (column)
{
    var self = this;
    return (self._columns [column].name);
};

TableRow.prototype.getColumnData = function (column)
{
    var self = this;
    var rtn = "";
    
    var fieldRender = self._columns [column].render;
    if (fieldRender)
        rtn = fieldRender.call (this, column);
    else
        rtn = self._genericField.call (this, column);
    
    return (rtn);
};
TableRow.prototype.formatData = function (value, type)
{
    var self = this;

    switch (type)
    {    
        case "currency": 
            return ( parseFloat(Math.round(value * 100) / 100).toFixed(2) );

        case "boolean": 

        case "integer":  
        case "real":  

        case "datetime": 
        case "GUID":
        
        case "string": 
        default: 
            return (value); 
    }
};

TableRow.prototype._genericField = function (column)
{
    var self = this;
    var columnname = self._columns [column].name;
    var value = self._indexData [columnname].value;
    return (value);
};

TableRow.prototype.sortOn = function (sortOn, sortAsc)
{
    var self = this;
    
    var data = self.getColumn (self._sortOn);
    data.sorting = false;
    
    self._sortOn = sortOn;
    
    var data = self.getColumn (sortOn);
    data.sorting = true;
    data.sortAsc = sortAsc;
};

// ==================================================================
// Data Column Functions

// indexData is called when I row is about to be drawn, or when 
// or when the data is being sorted.

TableRow.prototype.indexData = function (row)
{
    var self = this;
    var data = self.data.Get();
    
    self._indexData = {};
    
    for (var column in data.columns)
    {
       var columnname = data.columns[column].name;
       var value = data.results[row][column];
       
       self._indexData [columnname] = data.columns[column];
       self._indexData [columnname].value = value; 
    }
};

TableRow.prototype.getIndexData = function (column)
{
    var self = this;
    return (self._indexData[column]);    
}

// ==================================================================

TableRow.prototype.$header = function (row, column) 
{
    var self = this;
    
    var data = self.getColumn (column);
    
	var isChecked = "";
    var sortASC = "";
    if (data.sorting)
    {
        isChecked = "CHECKED";
        sortASC = (data.sortAsc) ? "SORT_ASC" : "SORT_DESC";
    };

    var $td = $("<div class ='td isSortAble ishidable'>");
    var $span1 = $("<span id='" + data.name + "'>" + data.name + "</span>");
    var $sortinput = $("<input type='checkbox' id='sortColumn' class='" + sortASC + "' value=" + column + " " + isChecked + " >");
    var $hidecolumn = $("<input type='checkbox' id='hideColumn' value=" + column + " >");

    $td.append ($span1);
    $td.append ("<BR>");
    $td.append ($sortinput);
    $td.append ($hidecolumn);
    
	return ($td);
};

TableRow.prototype.$footer = function (row, column)
{

};

TableRow.prototype.$row = function (row, column) 
{
    var self = this;
    
	var $rtn = $("<div class='td'>" + self.getColumnData (column) + "</div>");
	
	return ($rtn);
};
 
// ==================================================================

TableRow.prototype.Sort = function (column, bAsc)
{
    var self = this;
    
    var prevIndex = -1;
    var data = self.data.Get().results;
    
    for (var index in data)
    {
        if (prevIndex != -1)
        {
            var rowtemp = null;
            switch (self.compare (column, prevIndex, index, bAsc))
            {
                case -1 : // prev < index .. do nothing
                    break;
                    
                case 0 : // prev == index .. do noting
                    break;
                    
                case 1 : // prev > index
                    { 
                        rowtemp = data[prevIndex]; 
                        data[prevIndex] = data[index]; 
                        data[index] = rowtemp; 
                        
                        self.SortReverse (index, column, bAsc);
                    } break;
            }
        }
        
        prevIndex = index;
    }
};

TableRow.prototype.SortReverse = function (start, column, bAsc)
{
    var self = this;
    
    var prevIndex = -1;
    var data = self.data.Get().results;
    
    for (var index = start; index > -1; index--)
    {
        if (prevIndex != -1)
        {
            var rowtemp = null;
            switch (self.compare (column, prevIndex, index, bAsc))
            {
                case -1 : // prev < index
                    { 
                        rowtemp = data[index]; 
                        data[index] = data[prevIndex]; 
                        data[prevIndex] = rowtemp; 
                    } break;
                
                case 0 : // prev == index .. do nothing
                    break;
                
                case 1 : // prev > index ..  do nothing
                    break;
            }
        }
        
        prevIndex = index;
    }
};

TableRow.prototype.compare = function (column, rowprev, row, bAsc)
{
    var self = this;
    
    self.indexData (rowprev);
    var prevdata = self.getColumnData (column);
    
    self.indexData (row);
    var data = self.getColumnData (column);
    
    if (prevdata < data) 
        return ((bAsc) ? -1 : 1);

    if (prevdata > data) 
        return ((bAsc) ? 1 : -1);

    return (0);
};