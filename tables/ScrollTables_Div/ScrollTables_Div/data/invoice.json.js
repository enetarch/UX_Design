var jsonInvoice = function ()
{   return {
    Invoice:
    {
        InvoiceHeader:
        {
            GUID: Utilities.getGUID(),

            CommonName:
            {
                GUID: Utilities.getGUID(),

                title: DataUtilities.CommonName.title(),
                firstName: DataUtilities.CommonName.firstName(),
                middleName: DataUtilities.CommonName.middleName(),
                lastName: DataUtilities.CommonName.lastName(),
                suffix: DataUtilities.CommonName.suffix(),
            },

            InvoiceBillingAddress: 
            {
                GUID: Utilities.getGUID(),

                street1: DataUtilities.CommonAddress.street1(),
                street2: DataUtilities.CommonAddress.street2(),
                city: DataUtilities.CommonAddress.city(),
                state: DataUtilities.CommonAddress.state(),
                zip: DataUtilities.CommonAddress.zip(),
                country: DataUtilities.CommonAddress.country(),          
            },

            InvoiceShippingAddress: 
            {
                GUID: Utilities.getGUID(),

                street1: DataUtilities.CommonAddress.street1(),
                street2: DataUtilities.CommonAddress.street2(),
                city: DataUtilities.CommonAddress.city(),
                state: DataUtilities.CommonAddress.state(),
                zip: DataUtilities.CommonAddress.zip(),
                country: DataUtilities.CommonAddress.country(), 
            },

            CommonContacts: 
            {
               GUID: Utilities.getGUID(),
               CommonContact:
               [
                    {
                        GUID: Utilities.getGUID(),
                        type: DataUtilities.CommonContact.type(),
                        method: DataUtilities.CommonContact.method(),
                    },
                    {
                        GUID: Utilities.getGUID(),
                        type: DataUtilities.CommonContact.type(),
                        method: DataUtilities.CommonContact.method(),
                    },
                    {
                        GUID: Utilities.getGUID(),
                        type: DataUtilities.CommonContact.type(),
                        method: DataUtilities.CommonContact.method(),
                    },
                ],
            },

            InvoiceSummary:
            {
                GUID: Utilities.getGUID(),

                orderNo: DataUtilities.InvoiceSummary.orderNo(),
                webOrderNo: DataUtilities.InvoiceSummary.webOrderNo(),
                status: DataUtilities.InvoiceSummary.status(),
                dateDue: DataUtilities.InvoiceSummary.dateDue(),
                taxable: DataUtilities.InvoiceSummary.taxable(),
                ein: DataUtilities.InvoiceSummary.ein(),
                subtotal: DataUtilities.InvoiceSummary.subtotal(),
                tax: DataUtilities.InvoiceSummary.tax(),
                total: DataUtilities.InvoiceSummary.total(),
            },

            Shipping:
            {
                GUID: Utilities.getGUID(),

                shipped: DataUtilities.Shipping.shipped(),
                shipper: DataUtilities.Shipping.shipper(),
                trackingNo: DataUtilities.Shipping.trackingNo(),
                shipDate: DataUtilities.Shipping.shipDate(),
            },

            Payment:
            {
                GUID: Utilities.getGUID(),
        
                CommonName : 
                {
                    GUID: Utilities.getGUID(),

                    title: DataUtilities.CommonName.title(),
                    firstName: DataUtilities.CommonName.firstName(),
                    middleName: DataUtilities.CommonName.middleName(),
                    lastName: DataUtilities.CommonName.lastName(),
                    suffix: DataUtilities.CommonName.suffix(),
                },

                CommonAddress: 
                {
                    GUID: Utilities.getGUID(),

                    street1: DataUtilities.CommonAddress.street1(),
                    street2: DataUtilities.CommonAddress.street2(),
                    city: DataUtilities.CommonAddress.city(),
                    state: DataUtilities.CommonAddress.state(),
                    zip: DataUtilities.CommonAddress.zip(),
                    country: DataUtilities.CommonAddress.country(),   
                },

                PaymentMethod:
                {
                    GUID: Utilities.getGUID(),

                    cardNo: DataUtilities.PaymentMethod.cardNo(),
                    expires: DataUtilities.PaymentMethod.expires(),
                    cardType: DataUtilities.PaymentMethod.cardType(),
                },
            }
        },

        InvoiceLineitems:
        {
            GUID: Utilities.getGUID(),
    
            InvoiceLineItem:
            [
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
                {
                    GUID: Utilities.getGUID(),
                    
                    quantity: DataUtilities.InvoiceLineItem.quantity(),
                    partNo: DataUtilities.InvoiceLineItem.partNo(),
                    description: DataUtilities.InvoiceLineItem.description(),
                    unit: DataUtilities.InvoiceLineItem.unit(),
                    extended: DataUtilities.InvoiceLineItem.extended(),
                    taxable: DataUtilities.InvoiceLineItem.taxable(),
                },
            ]    
        },
    },};
};

var jsonInvoices = 
{
    Invoices:
    [
        new jsonInvoice(),
        new jsonInvoice (),
        new jsonInvoice (),
        new jsonInvoice (),
        new jsonInvoice (),
    ],
};