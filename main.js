//GLOBAL VARIABLES
var objectTooltipsMort = {};
var objectInputMort = {};

function updateRangeOnIpute(evnt) {
	var value = evnt.value;
	var range = document.getElementById(objectInputMort[evnt.parentElement.id])
	range.value = value;
	showrange(range)
}

function createTooltip() {

// CURRENT INPUT
  var rangesUp = document.getElementsByClassName("tempestTooltipUp")
  var rangesDown = document.getElementsByClassName("tempestTooltipDown")
	var rangesInputUp = document.getElementsByClassName("tempestTooltipInputUp")
	var rangesInputDown = document.getElementsByClassName("tempestTooltipInputDown")
  var ranges = [];

  //CREATING ONE MAIN ARRAY WITH ELEMENTS
  for (var i = 0; i < rangesUp.length; i++) {
    ranges.push(rangesUp[i])
  }

  for (var i = 0; i < rangesDown.length; i++) {
    ranges.push(rangesDown[i]);
  }

	for (var i = 0; i < rangesInputUp.length; i++) {
		ranges.push(rangesInputUp[i])
	}

	for (var i = 0; i < rangesInputDown.length; i++) {
		ranges.push(rangesInputDown[i])
	}

//SETTING THE SIZE OF THUMB
  var thumbSize;
	//THE SPAN ID WHICH DEFINES CONECTIONS
	var indexId = 0;
	//MAIN FOR
	if (ranges[ranges.length-1] == undefined) {
		ranges.pop()
	}

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
	      } else if (classTempest == "tempestTooltipInputUp") {
	      	var input = document.createElement("input")
					input.type = "text"
					input.id = "tempestInputId" + indexId;
					span.appendChild(input)
					span.className = "tooltipsInputUp";
	      } else if (classTempest == "tempestTooltipInputDown") {
	      	var input = document.createElement("input")
					input.type = "text"
					input.id = "tempestInputId" + indexId;
					span.appendChild(input)
					span.className = "tooltipsInputDown";
	      }
	    }

	    span.style.position = "relative";
	    span.id = "tooltip" + indexId
			for (var classTempest of classArray) {
	      if (classTempest == "tempestTooltipUp" || classTempest == "tempestTooltipDown") {
			    span.innerHTML = range.value;
	      }
	    }

	    //THE ALGORITM WHICH CALCULATES THE POSITION ON WHICH TOOLTIP MUST BE - https://stackoverflow.com/questions/48880523/how-to-precisely-find-thumb-position-of-input-type-range
	    var position = ((thumbSize / 2) + (ratio * range.clientWidth) - (ratio * thumbSize));
	    var crHTML = range.outerHTML;

	    //CHECKING CLASS
	    for (var classTempest of classArray) {
	      if (classTempest == "tempestTooltipUp" || classTempest == "tempestTooltipInputUp") {
	        range.outerHTML = "<div> <div style='width:100%;'>" + span.outerHTML + "</div>" + crHTML + "</div>";
	      } else if (classTempest == "tempestTooltipDown" || classTempest == "tempestTooltipInputDown") {
	        range.outerHTML = "<div>" + crHTML + "<div style='width:100%;'>" + span.outerHTML + "</div> </div>";
	      }
	    }

	    var spanRendered = document.getElementById("tooltip" + indexId);
	    var leftValue = spanRendered.style.left.replace(/\D/g, '');

	    //AFTER CREATING TOOLTIP WE NEED TO GET THE SIZE OF IT AND SET IT
	    spanRendered.style.left = position - (spanRendered.offsetWidth / 2) + "px";
			if (spanRendered.className == "tooltipsInputDown" || spanRendered.className == "tooltipsInputUp") {
				spanRendered.children[0].value = range.value;
				document.getElementById("tempestInputId" + indexId).oninput = function (event) {
					updateRangeOnIpute(event.target)
				}
			}
	    document.getElementById(range.id).oninput = function(event) {
	      showrange(event.target);
	    }
	    objectTooltipsMort[range.id] = document.getElementById("tooltip" + indexId);
			objectInputMort["tooltip" + indexId] = range.id;
	    indexId++;
	  } else {
			console.log("Input doesn't have ID. Check the guide - https://github.com/Mortimer333/Tempest/blob/master/README.md#user-content-idofinput");
			console.log(range);
		}
	}
}


function showrange(evnt) {

  var thumbSize;
  var tooltip;

  tooltip = objectTooltipsMort[evnt.id]
	if (tooltip.className == "tooltipsUp" || tooltip.className == "tooltipsDown") {
		tooltip.innerHTML = evnt.value;
	} else if (tooltip.className == "tooltipsInputUp" || tooltip.className == "tooltipsInputDown") {
		tooltip.children[0].value = evnt.value;
	}

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
