$(document).ready(function ($) {

    sequenceArray = [];
    
    $("td").on("click", function(){
		$(this).css("opacity", "1").fadeTo(600, ".25");
	});
	
	$("#btnStart").on("click", function(){
		
        $(this).text("Go");
        var cellId = "";
        
        //Generate a random number between 1 and 4 and push it into sequenceArray
        sequenceArray.push(Math.floor((Math.random() * 4) + 1));

        //Loop through sequenceArray and light up corresponding table cells
        for(var i = 0; i < sequenceArray.length; i++){
            cellId = "c" + sequenceArray[i];
            setTimeout(function(){
                $("#" + cellId).css("opacity", "1").fadeTo(600, ".25")
            }, i * 1000, cellId);
        }
        
	});
});

