var jsonOrderSummary =  
{
	columns :
	[
		{ 
			name: "Order",
			type: "GUID",
		},
		{ 
			name: "WebOrder",
			type: "string",
			length: 40,
		},
		{ 
			name: "Date",
			type: "DateTime",
		},
		{ 
			name: "FirstName",
			type: "string",
			length: 20,
		},
		{ 
			name: "LastName",
			type: "string",
			length: 20,
		},
		
		{ 
			name: "Street1",
			type: "string",
			length: 40,
		},
		{ 
			name: "Street2",
			type: "string",
			length: 40,
		},
		{ 
			name: "City",
			type: "string",
			length: 20,
		},
		{ 
			name: "State",
			type: "string",
			length: 40,
		},
		{ 
			name: "Zip",
			type: "string",
		},
		{ 
			name: "Country",
			type: "string",
			length: 20,
		},
		{ 
			name: "Total",
			type: "currency",
		},
		{ 
			name: "IPAddress",
			type: "ipv4",
			length: 8,
		},
		{ 
			name: "Status",
			type: "integer",
		},
		{ 
			name: "PaymentType",
			type: "integer",
		},
		{ 
			name: "CreditCardNo",
			type: "string",
			length: 16,
		},
		{ 
			name: "Expiration",
			type: "string",
			length: 4,
		},
		{ 
			name: "DateDue",
			type: "DateTime",
		},
		
	],
	results :
	[
		// Order, WebOrder, Date, FirstName, LastName, Street1, Street2, City, State, Zip, Country, Total, IPAddress, Status, PaymentType, CreditCardNo, Expiration, DateDue
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "123456", "wo9876543", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 19.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "234561", "wo3987654", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 28.65, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "345612", "wo4398765", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 13.23, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
		[ "456123", "wo5439876", "2014-08-31", "Michael J.", "Fuhrman", "PO Box 64-0662", "", "San Francisco", "CA", "94164-0662", "USA", 100.95, "192.168.0.1", "INREVIEW", "Visa", "1234-5678-1234-5678", "1016", "2014-09-05" ],
        ]
};
