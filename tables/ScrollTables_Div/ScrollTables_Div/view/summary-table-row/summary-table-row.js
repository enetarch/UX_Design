/* ====================================
* Requires
*   Component
*   TableRow
*/    

// ====================================
// Constructor

var SummaryTableRow = function (selector, args)
{
    var self = this;
    var args = args || { data: null };
    var data = args.data ||  null;
    
    SummaryTableRow.SUPER.call (self, selector, {data : data});
};
TableRow.extends (SummaryTableRow);

// =====================================
// Variables


SummaryTableRow.prototype._genTotal = function (column)
{
    var self = this;
    
    var rtn = self._indexData ["Total"].value;
    
    return (rtn);
};

SummaryTableRow.prototype._genAddress = function (column)
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

SummaryTableRow._columns = 
[	
    { name: "Order", render : SummaryTableRow._genericField, isVisible : true },
    { name: "WebOrder", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "Date", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "FirstName", render : SummaryTableRow._genericField, isVisible : true  },

    { name: "LastName", render : SummaryTableRow._genericField, isVisible : true  },

    { name: "Address", render : SummaryTableRow._genAddress, isVisible : true  },
    
    { name: "Total", render : SummaryTableRow._genTotal, isVisible : true  },
    { name: "IPAddress", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "Status", render : SummaryTableRow._genericField, isVisible : true  },

    { name: "PaymentType", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "CreditCardNo", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "Expiration", render : SummaryTableRow._genericField, isVisible : true  },
    { name: "DateDue", render : SummaryTableRow._genericField, isVisible : true  },
];

// =====================================
// Methods

SummaryTableRow.prototype.initColumns = function ()
{
    var self = this;
    var data = self.data.Get();
    
    self._columns = Object.create (SummaryTableRow._columns);
        
    self._columns[5].render = self._genAddress;
};

SummaryTableRow.prototype.$Draw = function (row, column) 
{
    var self = this;
    
    var $rtn = $("<td>");
    
    $rtn.append (self.getColumnData (column));
    
    // $rtn.append ( data.results[row][column] );
    $rtn.append ("</td>");
    
    return ($rtn);
};

