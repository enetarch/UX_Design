var DataUtilities = 
{   
    choose : function (aryValues)
    {
        var len = aryValues.length;
        var index = (((Math.random())*len)|0).toString(10);
        return (aryValues [index]);
    },
    
    chooseGUID : Utilities.getGUID,
    chooseBoolean : function ()
    {
        var index = (((Math.random())*2)|0).toString(10);
        return (index > .5);
    },
    
    chooseInteger: function (max)
    {
        var index = 0 + (((Math.random())*max)|0);
        return (index);
    },
    
    chooseReal: function (max)
    {
        return (DataUtilities.chooseInteger(max) + DataUtilities.chooseInteger(100) / 100);
    },
    
    chooseIPv4 : function ()
    {
        return (
            DataUtilities.chooseInteger(255) + "." + 
            DataUtilities.chooseInteger(255) + "." + 
            DataUtilities.chooseInteger(255) + "." + 
            DataUtilities.chooseInteger(255)
            );
    },
    
    chooseDateYMD : function ()
    {
        return (2014 + "-" + DataUtilities.chooseInteger(12) + "-" + DataUtilities.chooseInteger(31));
    },
    
    chooseDateMY : function ()
    {
        return (DataUtilities.chooseInteger(12) + "/" + (14 + DataUtilities.chooseInteger(5)) );
    },
    
    chooseCardNo : function ()
    {
        function S4() 
        { return (((1+Math.random())*0x10000)|0).toString(10).substring(1); }
 
        // then to call it, plus stitch in '4' in the third group
        var cardno = (S4() + "-" + S4() + "-" + S4() + "-" + S4()).toLowerCase();

     return (cardno);
    }, 
    
    chooseStreet : function ()
    {
        var street = 
            DataUtilities.chooseInteger (1000) + " " +
            DataUtilities.choose (["Finkle", "Corgy", "Haight", "23 Avenue", "18th Street", "Van Dyke", "PO Box 12345", "US 101", "Petraro", "Sacromento", "Fillion"]) + " " +
            DataUtilities.choose (["", "Apt 47", "Suite 201", "Office 99"]);
        
        return (street);
    },
    
    chooseTrackingNo : function ()
    {
        function S4() 
        { return (((1+Math.random())*0x10000)|0).toString(16).substring(1); }
 
        // then to call it, plus stitch in '4' in the third group
        var no = (S4() + S4() + S4() + S4()).toLowerCase();

        return (no);
    },
    chooseWord : function (letters, maxWordLengh)
    {
        var maxLen = DataUtilities.chooseInteger (maxWordLengh);
        var rtn = "";
        
        while (rtn.length < maxLen)
            rtn += letters.substr (DataUtilities.chooseInteger (letters.length), 1); 
        
        return (rtn);
    },
    
    chooseWords : function (stringLen)
    {
        var maxLen = DataUtilities.chooseInteger (stringLen);
        var letters = "abcdefghijklmnopquerstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var rtn = DataUtilities.chooseInteger (100) + " ";
        
        while (rtn.length < maxLen)
            rtn += DataUtilities.chooseWord (letters, 10) + " ";
        
        return (rtn);
    },
    
    // =======================================================================
    
    CommonName : 
    {
        title : function () { return (DataUtilities.choose (["Mr","Mrs","Ms",""])); },
        firstName : function () { return (DataUtilities.choose (["Michael","James","Chris","Brian", "Sudeep", "Ralph", "Frank", "Sally", "Sherly", "Jamie", "Janet", "Joyce"])); },
        middleName : function () { return (DataUtilities.choose (["A.","B.","J.","L.", "M.", "N.", "P.", "W.", "S.", "T.", "Z"])); },
        lastName : function () { return (DataUtilities.choose (["Smith","Jones","Williams","Fields", "", "", "", "", "", ])); },
        suffix : function () { return (DataUtilities.choose (["", "PhD","LL","MD","PMP", "MBA", "LS", "CLC", "JD"])); },
    },

    CommonAddress : 
    {
        street1 : function () { return (DataUtilities.chooseStreet ()); },
        street2 : function () { return (DataUtilities.choose (["","Care Of ___", "suite 100",])); },
        city : function () { return (DataUtilities.choose (["Detroit","Cleveland","San Francisco","Washington DC", "Miami", "Huston", "Lansing", "Chicago", "Madison"])); },
        state : function () { return (DataUtilities.choose (["CA","MI","MD","WA", "TX", "TN", "IL", "AL", "FL"])); },
        zip : function () { return (DataUtilities.choose (["94164","48248","01876","87654", "28936", "34345", "88876", "94111", "JD"])); },
        country : function () { return (DataUtilities.choose (["Australia", "Tiawan", "USA", "Canada", "Mexico", "France", "Great Britian", "Germany", "Russia", "Italy", "China"])); },
    },
    
    CommonContact : 
    {
        type  : function () { return (DataUtilities.choose (["cell","telephone","Skype","email", "AIM", "YahooIM", "GoogleVoice", "MSN"])); },
        method : function () { return (DataUtilities.choose (["313-555-1212", "408-970-8825", "mfuhrman@apple.com", "mfuhrman"])); },
    },
    
    InvoiceSummary : 
    {
        orderNo  : function () { return (DataUtilities.chooseGUID ()); },
        webOrderNo : function () { return (DataUtilities.chooseGUID ()); },
        status : function () { return (DataUtilities.choose (["InQueue", "Packing","Complete","InReview","Canceled", "Shipped", "BackOrdered", "Returned"])); },
        dateDue : function () { return (DataUtilities.chooseDateYMD ()); },
        datePlaced : function () { return (DataUtilities.chooseDateYMD ()); },
        IPv4 : function () { return (DataUtilities.chooseIPv4 ()); },
        taxable : function () { return (DataUtilities.chooseBoolean ()); },
        ein: function () { return (DataUtilities.chooseGUID ()); },
        subtotal : function () { return (DataUtilities.chooseReal (100)); },
        tax : function () { return (DataUtilities.chooseReal (100)); },
        total : function () { return (DataUtilities.chooseReal (100)); },
    },
    
    Shipping:
    {
        shipped : function () { return (DataUtilities.chooseBoolean ()); },
        shipper : function () { return (DataUtilities.choose (["USPS","FedEx","UPS","DHL", "Trucking", "Other", "Google Express", "OnTrac"])); },
        trackingNo : function () { return (DataUtilities.chooseTrackingNo ()); },
        shipDate : function () { return (DataUtilities.chooseDateYMD ()); },
    },
    
    PaymentMethod:
    {
        cardNo : function () { return (DataUtilities.chooseCardNo ()); },
        expires : function () { return (DataUtilities.chooseDateMY ()); },
        cardType : function () { return (DataUtilities.choose (["Visa","Master Card","American Express","Discover", "Check", "PayPal", "BitCoin"])); },
    },
    
    InvoiceLineItem:
    {
        quantity : function () { return (DataUtilities.chooseInteger (100)); },
        partNo : function () { return (DataUtilities.chooseInteger (1000)); },
        description : function () { return (DataUtilities.chooseWords (40)); },
        unit : function () { return (DataUtilities.chooseReal (100)); },
        extended : function () { return (DataUtilities.chooseReal (100)); },
        taxable : function () { return (DataUtilities.chooseBoolean ()); },
    },
};