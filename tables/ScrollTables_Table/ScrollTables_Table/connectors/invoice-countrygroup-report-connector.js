var InvoiceCountryGroupReportConnector = function (invoices, table)
{
    var self = this;
    InvoiceCountryGroupReportConnector.SUPER.call (this, invoices, table);
};
ReportConnector.extends (InvoiceCountryGroupReportConnector)


InvoiceCountryGroupReportConnector.countryGroup = 
    {
        "Canada" : "AMR",
        "China" : "APAC",
        "France" : "EMEIA",
        "USA" : "AMR",
        "Mexico" : "AMR",
        "Brazil" : "AMR",
        "Germany" : "EMEIA",
        "Italy" : "EMEIA",
        "Russia" : "EMEIA",
        "Australia" : "APAC",
        "Tiawan": "APAC",
        "Great Britian" : "EMEIA",
        
    };
    
// =================================================================
/*  This model is shared between this object and the view "summary-table-row".
 *  It should be stored somewhere else.  In addition, this model doesn't
 *  allow for the data to be concatinated. For example: the address fields
 *  cannnot be combined into one string for presentation purposes.  Yet.
 */

InvoiceCountryGroupReportConnector.connector = 
{
	columns :
	[
		{ name: "CountryGroup",         type: "string",	length: 40, 	},
		
		{ name: "Country",              type: "string", length: 20,		},

 		{ name: "Count",                type: "integer",	},
        { name: "Total",                type: "currency",	},
		
		{ name: "Status-InQueue",		type: "integer",	},
        { name: "Status-InReview",		type: "integer",	},
        { name: "Status-Shipped",		type: "integer",	},
        { name: "Status-Returned",		type: "integer",	},
        { name: "Status-Other",         type: "integer",	},
	],
    
    results : [],
};
// =================================================================


InvoiceCountryGroupReportConnector.prototype.updateReport = function ()
{
    var self = this;
    
    var model = self.model.Get();
    var table = self.table.Get();
    
    // TODO: build the data model the table expects
    var data = Object.create (InvoiceCountryGroupReportConnector.connector);
    
    //group data by country 
    //count (total), count (status's) 
    
    self.Sort (1); // country
    
    var countrygroup = "";
    var country = "";
    var prevcountry = "";
    var count = 0;
    var total = 0;
    var status_Pending = 0;
    var status_InReview = 0;
    var status_Shipped = 0;
    var status_Returned = 0;
    var status_Other = 0;

    for (var index in model.results)
    {
        var row = model.results[index];
        
        country = row[1];
        if (prevcountry == "")
            prevcountry = country;
        
        if (country != prevcountry)
        {
            countrygroup = InvoiceCountryGroupReportConnector.countryGroup [prevcountry];
            
            var result = 
                [
                    countrygroup,
                    prevcountry, 
                    count,
                    total, 
                    status_Pending, 
                    status_InReview,
                    status_Shipped,
                    status_Returned,
                    status_Other,
                ];

            data.results.push (result);
            
            total = 0;
            count = 0;
            status_Pending = 0;
            status_InReview = 0;
            status_Shipped = 0;
            status_Returned = 0;
            status_Other = 0;
        }
        
        {
            total =+ row[2];
            count ++;

            switch (row[3])
            {
                case "Pending": status_Pending++; break;
                case "InReview": status_InReview++; break;
                case "Shipped": status_Shipped++; break;
                case "Returned": status_Returned++; break;
                default: status_Other++; break;
            }
        }
        
        
        prevcountry = country;
    }
    
    {
        countrygroup = InvoiceCountryGroupReportConnector.countryGroup [prevcountry];

        var result = 
            [
                countrygroup,
                prevcountry, 
                count,
                total, 
                status_Pending, 
                status_InReview,
                status_Shipped,
                status_Returned,
                status_Other,
            ];

        data.results.push (result);
    }
    
    self.report.Set (data);
    if (table)
        table.data.Set (data);
};
    
// ====================================================================





// ====================================================================

InvoiceCountryGroupReportConnector.prototype.Sort = function (column, bAsc)
{
    var self = this;
    
    var prevIndex = -1;
    var data = self.model.Get().results;
    
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

InvoiceCountryGroupReportConnector.prototype.SortReverse = function (start, column, bAsc)
{
    var self = this;
    
    var prevIndex = -1;
    var data = self.model.Get().results;
    
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

InvoiceCountryGroupReportConnector.prototype.compare = function (column, rowprev, row, bAsc)
{
    var self = this;
    
    var model = self.model.Get().results;
    
    var prevdata = model[rowprev] [column];
    var data = model[row] [column];
    
    if (prevdata < data) 
        return ((bAsc) ? -1 : 1);

    if (prevdata > data) 
        return ((bAsc) ? 1 : -1);

    return (0);
};