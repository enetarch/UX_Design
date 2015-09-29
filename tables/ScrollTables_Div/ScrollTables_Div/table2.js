
$(function(){ // When document is loaded and ready
    
    $("div.topleft-corner").width ($("div.lheader").width());
    
    var columns = [];
    $("table.thead tr").each (function (row, $tr) 
    {
        var $tr = this;
        $($tr).find ("td").each (function (column, $td) 
        {
            var $td = this;
            columns[column] = Math.max (columns[column] || 0 , $($td).width());
        });
    });

    $("table.tbody tr").each (function (row, $tr) 
    {
        var $tr = this;
        $($tr).find ("td").each (function (column, $td) 
        {
            var $td = this;
            columns[column] = Math.max (columns[column] || 0 , $($td).width());
        });
    });
    
    // =====================================================
    
    $("table.thead colgroup").each (function (row, $colgroup) 
    {
        var $colgroup = this;
        for (var index in columns) 
            $($colgroup).append ("<col style='width:" + (columns[index]+2) + "px;' >");
    });

    $("table.tbody colgroup").each (function (row, $colgroup) 
    {
        var $colgroup = this;
        for (var index in columns) 
            $($colgroup).append ("<col style='width:" + (columns[index]+2) + "px;' >");
    });

    $("table.thead").css ("table-layout", "fixed");
    $("table.tbody").css ("table-layout", "fixed");
    
    $("table").parent().scroll(function() { // When we scroll in the window
        
        // Move column headers into place
        // $('table.thead tr:first-child td').css('left', - $(this).scrollLeft());
        if ($(this).scrollLeft() != 0)
        $("div.scroll-theader").scrollLeft ( $(this).scrollLeft() );
        
        // Move row headers into place
        // $('table.lhead tr td:first-child').css('top', $(this).scrollTop());
        if ($(this).scrollTop() != 0)
        $("div.scroll-lheader").scrollTop ( $(this).scrollTop() );
        console.log ($(this).scrollLeft(), $(this).scrollTop())
    });
});  
