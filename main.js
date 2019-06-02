//GLOBAL VARIABLES
var objectTooltipsMort = {};
var objectInputMort = {};

function updateRangeOnInpute(evnt) {
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
	var rangesMiddle = document.getElementsByClassName("tempestTooltipMiddle")
	var rangesInputMiddle = document.getElementsByClassName("tempestTooltipInputMiddle")
	var rangesMort = [];

  //CREATING ONE MAIN ARRAY WITH ELEMENTS
  for (var i = 0; i < rangesUp.length; i++) {
    rangesMort.push(rangesUp[i])
  }

  for (var i = 0; i < rangesDown.length; i++) {
    rangesMort.push(rangesDown[i]);
  }

	for (var i = 0; i < rangesInputUp.length; i++) {
		rangesMort.push(rangesInputUp[i])
	}

	for (var i = 0; i < rangesInputDown.length; i++) {
		rangesMort.push(rangesInputDown[i])
	}

	for (var i = 0; i < rangesMiddle.length; i++) {
		rangesMort.push(rangesMiddle[i])
	}

	for (var i = 0; i < rangesInputMiddle.length; i++) {
		rangesMort.push(rangesInputMiddle[i])
	}

//SETTING THE SIZE OF THUMB
  var thumbSize;
	//THE SPAN ID WHICH DEFINES CONECTIONS
	var indexId = 0;

	if (rangesMort[rangesMort.length-1] == undefined) {
		rangesMort.pop()
	}

	//MAIN FOR
  for (var range of rangesMort) {
		if(range.id != ""){
	    if (range.attributes.thumbsize) {
	      thumbSize = range.attributes.thumbsize.value //IF ATTRIBUTE IS SET IT WILL USE ITS VALUE
	    } else {
	      thumbSize = 9.6; //THE DEFAULT VALUE
	    }

	    //SETING THE RATION OF SETED VALUE IN INPUT (the procent on which is thumb)
	    var ratio = (range.value - range.min) / (range.max - range.min)
	    var span = document.createElement("span");
			span.style.position = "relative";

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
	      } else if (classTempest == "tempestTooltipMiddle") {
	      	span.className = "tooltipsMiddle";
					span.style.position = "absolute";
	      } else if (classTempest == "tempestTooltipInputMiddle") {
	      	var input = document.createElement("input")
					input.type = "text"
					input.id = "tempestInputId" + indexId;
					span.appendChild(input)
					span.className = "tooltipsInputMiddle";
					span.style.position = "absolute";
	      }
	    }
	    span.id = "tooltip" + indexId
			for (var classTempest of classArray) {
	      if (classTempest == "tempestTooltipUp" || classTempest == "tempestTooltipDown" || classTempest == "tempestTooltipMiddle") {
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
	      } else if (classTempest == "tempestTooltipMiddle" || classTempest == "tempestTooltipInputMiddle") {
	        range.outerHTML = "<div style='position:relative;'> <div style='width:100%;'>" + span.outerHTML + "</div>" + crHTML + "</div>";
	      }
	    }

	    var spanRendered = document.getElementById("tooltip" + indexId);
	    var leftValue = spanRendered.style.left.replace(/\D/g, '');

	    //AFTER CREATING TOOLTIP WE NEED TO GET THE SIZE OF IT AND SET IT
	    spanRendered.style.left = position - (spanRendered.offsetWidth / 2) + "px";
			if (spanRendered.className == "tooltipsInputDown" || spanRendered.className == "tooltipsInputUp" || spanRendered.className == "tooltipsInputMiddle") {
				spanRendered.children[0].value = range.value;
				document.getElementById("tempestInputId" + indexId).oninput = function (event) {
					updateRangeOnInpute(event.target)
				}
			}

			if (range.attributes.tooltipOnHover) {
				if (range.attributes.tooltipOnHover.value == "show") {
					spanRendered.style.opacity = "0"
					document.getElementById(range.id).addEventListener("mouseover", function (event) {
						event.target.previousSibling.children[0].style.opacity = "1"
					})
					document.getElementById(range.id).addEventListener("mouseout", function (event) {
						event.target.previousSibling.children[0].style.opacity = "0"
					})
				} else if (range.attributes.tooltipOnHover.value == "hide") {
					document.getElementById(range.id).addEventListener("mouseover", function (event) {
						event.target.previousSibling.children[0].style.opacity = "0"
					})
					document.getElementById(range.id).addEventListener("mouseout", function (event) {
						event.target.previousSibling.children[0].style.opacity = "1"
					})
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


function tooltipsMiddleShower() {
	//FUNCTION FOR DISAPEARING
	var tooltipsMiddle = document.getElementsByClassName('tooltipsMiddle')
	for (var tootltip of tooltipsMiddle) {
		tootltip.addEventListener("mouseover", function () {
			tootltip.style.visibility = "hidden";
		})
		tootltip.parentElement.nextSibling.addEventListener("mouseleave", function () {
			tootltip.style.visibility = "visible";
		})
	}
}

function showrange(evnt) {
  var thumbSize;
  var tooltip;

  tooltip = objectTooltipsMort[evnt.id]
	if (tooltip.className == "tooltipsUp" || tooltip.className == "tooltipsDown" ||  tooltip.className == "tooltipsMiddle") {
		tooltip.innerHTML = evnt.value;
	} else if (tooltip.className == "tooltipsInputUp" || tooltip.className == "tooltipsInputDown" ||  tooltip.className == "tooltipsInputMiddle") {
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
	tooltipsMiddleShower();
});

window.onresize = function() {
// CURRENT INPUT
  var rangesUp = document.getElementsByClassName("tempestTooltipUp")
  var rangesDown = document.getElementsByClassName("tempestTooltipDown")
	var rangesInputUp = document.getElementsByClassName("tempestTooltipInputUp")
	var rangesInputDown = document.getElementsByClassName("tempestTooltipInputDown")
	var rangesMort = [];

  //CREATING ONE MAIN ARRAY WITH ELEMENTS
  for (var i = 0; i < rangesUp.length; i++) {
    rangesMort.push(rangesUp[i])
  }

  for (var i = 0; i < rangesDown.length; i++) {
    rangesMort.push(rangesDown[i]);
  }

	for (var i = 0; i < rangesInputUp.length; i++) {
		rangesMort.push(rangesInputUp[i])
	}

	for (var i = 0; i < rangesInputDown.length; i++) {
		rangesMort.push(rangesInputDown[i])
	}

	for (var i = 0; i < rangesMort.length; i++) {
		showrange(rangesMort[i])
	}
}
