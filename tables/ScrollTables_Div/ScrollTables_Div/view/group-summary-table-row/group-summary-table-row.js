/* ====================================
* Requires
*   Component
*   TableRow
*/    

// ====================================
// Constructor

var GroupGroupSummaryTableRow = function (selector, args)
{
    var self = this;
    var args = args || { data: null };
    var data = args.data ||  null;
    
    GroupSummaryTableRow.SUPER.call (self, selector, {data : data});
};
TableRow.extends (GroupSummaryTableRow);

// =====================================
// Variables


GroupSummaryTableRow.prototype._genTotal = function (column)
{
    var self = this;
    
    var rtn = self._indexData ["Total"].value;
    
    return (rtn);
};

GroupSummaryTableRow.prototype._genAddress = function (column)
{
    var self = this;
    // this is probably better served as a template??
    
    var rtn = 
        self._indexData ["Street1"].value + "<BR>" + 

        ((self._indexData ["Street2"].value) ?
            self._indexData ["Street2"].value + "<BR>" : "" ) + 
            
        self._indexData ["City"].value + " " + 
            self._indexData ["State"].value + " " +  
            self._indexData ["Zip"].value + "<BR>" + 
        self._indexData ["Country"].value;
    
    return (rtn);
};

GroupSummaryTableRow._columns = 
[	
    { name: "Order", render : GroupSummaryTableRow._genericField, isVisible : true },
    { name: "WebOrder", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "Date", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "FirstName", render : GroupSummaryTableRow._genericField, isVisible : true  },

    { name: "LastName", render : GroupSummaryTableRow._genericField, isVisible : true  },

    { name: "Address", render : GroupSummaryTableRow._genAddress, isVisible : true  },
    
    { name: "Total", render : GroupSummaryTableRow._genTotal, isVisible : true  },
    { name: "IPAddress", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "Status", render : GroupSummaryTableRow._genericField, isVisible : true  },

    { name: "PaymentType", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "CreditCardNo", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "Expiration", render : GroupSummaryTableRow._genericField, isVisible : true  },
    { name: "DateDue", render : GroupSummaryTableRow._genericField, isVisible : true  },
];

// =====================================
// Methods

GroupSummaryTableRow.prototype.initColumns = function ()
{
    var self = this;
    var data = self.data.Get();
    
    self._columns = Object.create (GroupSummaryTableRow._columns);
        
    self._columns[5].render = self._genAddress;
};

GroupSummaryTableRow.prototype.$Draw = function (row, column) 
{
    var self = this;
    
    var $rtn = $("<td>");
    
    $rtn.append (self.getColumnData (column));
    
    // $rtn.append ( data.results[row][column] );
    $rtn.append ("</td>");
    
    return ($rtn);
};

