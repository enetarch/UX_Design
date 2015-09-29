var InvoiceStatusReportConnector = function (invoices, table)
{
    var self = this;
    InvoiceStatusReportConnector.SUPER.call (this, invoices, table);
};
ReportConnector.extends (InvoiceStatusReportConnector)


// =================================================================
/*  This model is shared between this object and the view "summary-table-row".
 *  It should be stored somewhere else.  In addition, this model doesn't
 *  allow for the data to be concatinated. For example: the address fields
 *  cannnot be combined into one string for presentation purposes.  Yet.
 */

InvoiceStatusReportConnector.connector = 
{
	columns :
	[
		
		{ name: "Order",            type: "GUID",		},
        { name: "Country",          type: "string",		length: 20,		},
 		{ name: "Total",            type: "currency",	},
		{ name: "Status-Pending",   type: "string",     length: 20,		},
 	],

    model_paths :
	[
        { name: "Order",		path: [ "InvoiceHeader", "InvoiceSummary"], field: "orderNo"  },
		{ name: "Country",		path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"country" },
 		{ name: "Total",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"total" },
		{ name: "Status",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"status" },

	],
    
    results : [],
};
// =================================================================


InvoiceStatusReportConnector.prototype.updateReport = function ()
{
    var self = this;
    
    var model = self.model.Get();
    var table = self.table.Get();
    
    // TODO: build the data model the table expects
    var data = Object.create (InvoiceStatusReportConnector.connector);
    var paths = data.model_paths;
    
    var invoices = model.getRoot(0);
    
    
    for (var t = 0; t< invoices.count(); t++ )
    {
        var results = [];
        var invoice = invoices.getNode (t);
        
        for (var fieldNDX in paths)
		{
			var column = paths[fieldNDX].name;
            var path = paths[fieldNDX].path;
            var fieldname = paths[fieldNDX].field;
            
            var node = self._getNode (invoice, path);
            
                // results[column] = self._getField(node, fieldname);
                results.push ( self._getField (node, fieldname));
		}
    
        data.results.push (results);
    }
    
    self.report.Set (data);
    if (table)
        table.data.Set (data);
};

InvoiceStatusReportConnector.prototype._getNode = function (root, path)
{
    var self = this;
    var node = root;
    
    for (var index in path)
    {
        var nodes = node.getNodesBy ("", path[index]);
        node = nodes[0];
    }
    
    return (node);
};

InvoiceStatusReportConnector.prototype._getField = function (node, fieldname)
{
    var self = this;
    
    var rtn = "";
    
    if (LadderProperties.reservedField(fieldname))
    {
        switch (fieldname)
        {
            case GUID : rtn = node.getGUID();
            case name : rtn = node.name.Get();
            case description : rtn = node.description.Get();
            case parent : rtn = node.parent.Get().getGUID();
            case classname : rtn = node.classname.Get();
            case basetype : rtn = node.basetype.Get();
        }
    }
    else
        if (node.isItem())
            rtn = node.getField (fieldname);
    
    return (rtn);
};
