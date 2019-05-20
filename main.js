//GLOBAL VARIABLES
var objectTooltipsMort = {};

function createTooltip() {

// CURRENT INPUT
  var rangesUp = document.getElementsByClassName("tempestTooltipUp")
  var rangesDown = document.getElementsByClassName("tempestTooltipDown")
	var rangesInput = document.getElementsByClassName("tempestTooltipInputUp")
	var rangesInput = document.getElementsByClassName("tempestTooltipInputDown")
  var ranges = [];

  //CREATING ONE MAIN ARRAY WITH ELEMENTS
  for (var i = 0; i < rangesUp.length; i++) {
    ranges.push(rangesUp[i])
  }

  for (var i = 0; i < rangesDown.length; i++) {
    ranges.push(rangesDown[i]);
  }

//SETTING THE SIZE OF THUMB
  var thumbSize;
	//THE SPAN ID WHICH DEFINES CONECTIONS
	var indexId = 0;
	//MAIN FOR
  for (var range of ranges) {
		if(range.id != ""){
	    if (range.attributes.thumbsize) {
	      thumbSize = range.attributes.thumbsize.value //IF ATTRIBUTE IS SET IT WILL USE ITS VALUE
	    } else {
	      thumbSize = 9.6; //THE DEFAULT VALUE
	    }

	    //SETING THE RATION OF SETED VALUE IN INPUT (the procent on which is thumb)
	    var ratio = (range.value - range.min) / (range.max - range.min)
	    var span = document.createElement("span");

	    //ADDING ADEQUATE CLASS TO THE TOOLTIP
	    var classArray = range.className.split(" ");
	    for (var classTempest of classArray) {
	      if (classTempest == "tempestTooltipUp") {
	        span.className = "tooltipsUp";
	      } else if (classTempest == "tempestTooltipDown") {
	        span.className = "tooltipsDown";
	      }
	    }

	    span.style.position = "relative";
	    span.id = "tooltip" + indexId
	    span.innerHTML = range.value;

	    //THE ALGORITM WHICH CALCULATES THE POSITION ON WHICH TOOLTIP MUST BE - https://stackoverflow.com/questions/48880523/how-to-precisely-find-thumb-position-of-input-type-range
	    var position = ((thumbSize / 2) + (ratio * range.clientWidth) - (ratio * thumbSize));
	    var crHTML = range.outerHTML;

	    //CHECKING CLASS
	    for (var classTempest of classArray) {
	      if (classTempest == "tempestTooltipUp") {
	        range.outerHTML = "<div> <div style='width:100%;'>" + span.outerHTML + "</div>" + crHTML + "</div>";
	      } else if (classTempest == "tempestTooltipDown") {
	        range.outerHTML = "<div>" + crHTML + "<div style='width:100%;'>" + span.outerHTML + "</div> </div>";
	      }
	    }

	    var spanRendered = document.getElementById("tooltip" + indexId);
	    var leftValue = spanRendered.style.left.replace(/\D/g, '');

	    //AFTER CREATING TOOLTIP WE NEED TO GET THE SIZE OF IT AND SET IT
	    spanRendered.style.left = position - (spanRendered.offsetWidth / 2) + "px";
	    document.getElementById(range.id).oninput = function(event) {
	      showrange(event.target);
	    }
	    objectTooltipsMort[range.id] = document.getElementById("tooltip" + indexId);
	    indexId++;
	  } else {
			console.log("Input " + range.className + " doesn't have ID. Check the guide - https://github.com/Mortimer333/Tempest/blob/master/README.md#instruction");
		}
	}
}


function showrange(evnt) {

  var ranges = document.getElementsByClassName("tempestTooltip") // CURRENT INPUT
  var thumbSize;
  var tooltip;

  tooltip = objectTooltipsMort[evnt.id]
  tooltip.innerHTML = evnt.value;

  //SETTING THE SIZE OF THUMB
  if (evnt.attributes.thumbsize && evnt.attributes.thumbsize.value != "") {
    thumbSize = evnt.attributes.thumbsize.value
  } else {
    //THE DEFAULT VALUE
    thumbSize = 9.6;
  }
  var ratio = (evnt.value - evnt.min) / (evnt.max - evnt.min)
  var position = ((thumbSize / 2) + (ratio * evnt.clientWidth) - (ratio * thumbSize)) - (tooltip.offsetWidth / 2) + "px";
  tooltip.style.left = position;
}



// CASTING THE FUNCTION
document.addEventListener("DOMContentLoaded", function() {
  createTooltip();
});
