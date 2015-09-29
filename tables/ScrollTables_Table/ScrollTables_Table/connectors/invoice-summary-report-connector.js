var InvoiceSummaryReportConnector = function (invoices, table)
{
    var self = this;
    InvoiceSummaryReportConnector.SUPER.call (this, invoices, table);
};
ReportConnector.extends (InvoiceSummaryReportConnector)

// =================================================================
/*  This model is shared between this object and the view "summary-table-row".
 *  It should be stored somewhere else.  In addition, this model doesn't
 *  allow for the data to be concatinated. For example: the address fields
 *  cannnot be combined into one string for presentation purposes.  Yet.
 */

InvoiceSummaryReportConnector.connector = 
{
	columns :
	[
		{ name: "Order",		type: "GUID",		},
		{ name: "WebOrder",		type: "string",     length: 40,		},
		{ name: "Date",			type: "DateTime",	},
		{ name: "FirstName",	type: "string",		length: 20,		},
        
		{ name: "LastName",		type: "string",		length: 20,		},
		
		{ name: "Street1",		type: "string",		length: 40,		},
		{ name: "Street2",		type: "string",		length: 40,		},
		{ name: "City",			type: "string",		length: 20,		},
		{ name: "State",		type: "string",		length: 40,		},
		{ name: "Zip",			type: "string",		},
		{ name: "Country",		type: "string",		length: 20,		},

 		{ name: "Total",		type: "currency",	},
		{ name: "IPAddress",	type: "ipv4",		length: 8,		},
		{ name: "Status",		type: "integer",	},

		{ name: "PaymentType",	type: "integer",	},
		{ name: "CreditCardNo",	type: "string",		length: 16,		},
		{ name: "Expiration",	type: "string",		length: 4,		},
		{ name: "DateDue",		type: "DateTime",	},		
	],

    model_paths :
	[
		{ name: "Order",		path: [ "InvoiceHeader", "InvoiceSummary"], field: "orderNo"  },
		{ name: "WebOrder",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"webOrderNo" },
		{ name: "Date",			path: [ "InvoiceHeader", "InvoiceSummary"], field:"datePlaced" },
        
		{ name: "FirstName",	path: [ "InvoiceHeader", "CommonName"], field:"firstName" },
		{ name: "LastName",		path: [ "InvoiceHeader", "CommonName"], field:"lastName" },
		
		{ name: "Street1",		path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"street1" },
		{ name: "Street2",		path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"street2" },
		{ name: "City",			path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"city" },
		{ name: "State",		path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"state" },
		{ name: "Zip",			path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"zip" },
		{ name: "Country",		path: [ "InvoiceHeader", "InvoiceBillingAddress"], field:"country" },

 		{ name: "Total",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"total" },
		{ name: "IPAddress",	path: [ "InvoiceHeader", "InvoiceSummary"], field:"ipv4" },
		{ name: "Status",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"status" },

		{ name: "PaymentType",	path: [ "InvoiceHeader", "Payment", "PaymentMethod"], field:"cardType" },
		{ name: "CreditCardNo",	path: [ "InvoiceHeader", "Payment", "PaymentMethod"], field:"cardNo" },
		{ name: "Expiration",	path: [ "InvoiceHeader", "Payment", "PaymentMethod"], field:"expires" },
        
		{ name: "DateDue",		path: [ "InvoiceHeader", "InvoiceSummary"], field:"dateDue" },
	],
    
    results : [],
};
// =================================================================


InvoiceSummaryReportConnector.prototype.updateReport = function ()
{
    var self = this;
    
    var model = self.model.Get();
    var table = self.table.Get();
    
    // TODO: build the data model the table expects
    var data = Object.create (InvoiceSummaryReportConnector.connector);
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
        table.data.Set(data);
};

InvoiceSummaryReportConnector.prototype._getNode = function (root, path)
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

InvoiceSummaryReportConnector.prototype._getField = function (node, fieldname)
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
