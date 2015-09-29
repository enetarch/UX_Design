var ReportConnector = function (invoices, table)
{
    var self = this;
    self.model = new Singleton (self, invoices, self._onModelChanged);
    self.table = new Singleton (self, table, self._onTableChanged);
    self.report = new Singleton (self, null, self._onReportChanged);
    
    $(document).on (document, ReportConnector.EVENT_TRIGGERS.UPDATE_REQUESTED, 
        function (event) 
        { 
            self.updateReport.call (self); 
        });   
};
Class.extends (ReportConnector)

ReportConnector.EVENT_TRIGGERS = 
{
    UPDATE_REQUESTED : "ReportConnector.EVENT_TRIGGERS.UPDATE_REQUESTED",
};

ReportConnector.prototype.model = null;
ReportConnector.prototype.table = null;
ReportConnector.prototype.report = null;

// =================================================================
/*  This model is shared between this object and the view "summary-table-row".
 *  It should be stored somewhere else.  In addition, this model doesn't
 *  allow for the data to be concatinated. For example: the address fields
 *  cannnot be combined into one string for presentation purposes.  Yet.
 */

ReportConnector.connector = 
{
	columns :
	[
		{ name: "FieldName", type: "GUID", length: 40, },
	],

    model_paths :
	[
		{ name: "Order",		path: [ "InvoiceHeader", "InvoiceSummary"], field: "orderNo"  },
	],
    
    results : 
    [
        /* [ field[s] ], */
    ],
};
// =================================================================


ReportConnector.prototype.updateReport = function ()
{
    var self = this;
    
    var model = self.model.Get();
    var table = self.table.Get();
    
    // TODO: build the data model the table expects
    var data = Object.create (ReportConnector.connector);
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

ReportConnector.prototype._getNode = function (root, path)
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

ReportConnector.prototype._getField = function (node, fieldname)
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

ReportConnector.prototype._onUpdateRequested = function (event)
{
    var self = this;
    self.updateTable();
};

ReportConnector.prototype._onModelChanged = function (oldValue, newValue)
{
    var self = this;
    return (true);
};

ReportConnector.prototype._onTableChanged = function (oldValue, newValue)
{
    var self = this;
    return (true);
};

ReportConnector.prototype._onReportChanged = function (oldValue, newValue)
{
    var self = this;
    return (true);
};