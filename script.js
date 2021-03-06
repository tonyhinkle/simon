$(document).ready(function ($) {

    var sequenceArray = [];
    var playerArray = [];
    var simonsTurn = true;
    
    $(".lightPanel").on("click", function(){
        
        //Don't do anything if the player clicks a panel while it is Simon's turn
        if(simonsTurn === true){
            return;
        }

        playerArray.push($(this).data("square"));
        if(comparePlayerArray()){
            lightItUp([this, false]);
        }
	});
    
    function comparePlayerArray(){
     
        for(var i = 0; i < playerArray.length; i++){
            if(playerArray[i] != sequenceArray[i]){
                simonsTurn = true;
                $("#btnStart").text("Start").prop("disabled", false);
                alert("You lose after " + (sequenceArray.length - 1));
                sequenceArray = [];
                playerArray = [];
                return false;
            }
        }
        
        //If this is the last in the sequence, start the next
        if(playerArray.length == sequenceArray.length){
            simonsTurn = true;
            //$("#btnStart").prop("disabled", false);
            playerArray = [];
            setTimeout(fnSimonsTurn, 2000);
        }
        
        return true;
    }
	
	$("#btnStart").on("click", function(){
        fnSimonsTurn();
	});
    
function fnSimonsTurn(){
        simonsTurn = true;
        $(this).text("Go");
        var cellId = "";
        var arrPassThru = [];
                
        $("#btnStart").prop("disabled", true);
        
        //Generate a random number between 1 and 4 and push it into sequenceArray
        sequenceArray.push(Math.floor((Math.random() * 4) + 1));

        //Loop through sequenceArray and light up corresponding table cells
        for(var i = 0; i < sequenceArray.length; i++){
            //First element in the array to pass is the table cell's id
            arrPassThru.push("#c" + sequenceArray[i]);
            
            //Second element in the array is boolean whether it is the last element in simon's array
            arrPassThru.push(i == (sequenceArray.length - 1));
            
            createInterval(lightItUp, arrPassThru, i * 1000);
            arrPassThru = [];
        }
}
    
    function createInterval(f,dynamicParameter,interval) {
        //This function enables variables to be passed through to a function through setTimeout
        setTimeout(function() {
            f(dynamicParameter); 
        }, interval); 
    }
    
    function lightItUp(arr){
        //first element in arr is the id of the element to light up.
        //second element in arr is if this is the last element simon will be lighting up.
        $(arr[0]).fadeTo(200, 1).fadeTo(600, ".5");
        
        //If it was simon's last cell to light up
        if(arr[1] === true){
            simonsTurn = false;
        }
    }
});

var gameOn = false;