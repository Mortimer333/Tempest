//GLOBAL VARIABLES
var objectTooltipsMort = {};

function createTooltip() {
  var ranges = document.getElementsByClassName("tempestTooltip") // CURRENT INPUT
  var thumbSize;
  //SETTING THE SIZE OF THUMB
  var indexId = 0;
  for (var range of ranges) {
    console.log(range);
    if (range.attributes.thumbsize) {
      thumbSize = range.attributes.thumbsize.value //IF ATTRIBUTE IS SET IT WILL USE ITS VALUE
    } else {
      thumbSize = 9.6; //THE DEFAULT VALUE
    }
    //SETING THE RATION OF SETED VALUE IN INPUT (the procent on which is thumb)
    var ratio = (range.value - range.min) / (range.max - range.min)
    var span = document.createElement("span");
    span.className = "tooltipsTempest";
    span.style.position = "relative";
    span.id = "tooltip" + indexId
    span.innerHTML = range.value;
    //THE ALGORITM WHICH CALCULATES THE POSITION ON WHICH TOOLTIP MUST BE - https://stackoverflow.com/questions/48880523/how-to-precisely-find-thumb-position-of-input-type-range
    var position = ((thumbSize / 2) + (ratio * range.clientWidth) - (ratio * thumbSize));
    var crHTML = range.outerHTML
    range.outerHTML = "<div style='width:100%;'>" + span.outerHTML + "</div>" + crHTML;
    var spanRendered = document.getElementById("tooltip" + indexId);
    var leftValue = spanRendered.style.left.replace(/\D/g, '');
    //AFTER CREATING TOOLTIP WE NEED TO GET THE SIZE OF IT AND SET IT
    spanRendered.style.left = position - (spanRendered.offsetWidth / 2) + "px";
    document.getElementById(range.id).oninput = function(event) {
      showrange(event.target);
    }
    objectTooltipsMort[range.id] = document.getElementById("tooltip" + indexId);
    indexId++;
  }
}


function showrange(evnt) {
  var ranges = document.getElementsByClassName("tempestTooltip") // CURRENT INPUT
  var thumbSize;
  var tooltip;
  tooltip = objectTooltipsMort[evnt.id]
  tooltip.innerHTML = evnt.value;
  //SETTING THE SIZE OF THUMB
  if (evnt.attributes.thumbsize) {
    thumbSize = evnt.attributes.thumbsize.value
  } else {
    //THE DEFAULT VALUE
    thumbSize = 9.6;
  }
  var ratio = (evnt.value - evnt.min) / (evnt.max - evnt.min)
  var position = ((thumbSize / 2) + (ratio * evnt.clientWidth) - (ratio * thumbSize)) - (tooltip.offsetWidth / 2) + "px";
  tooltip.style.left = position;
}

// INVOKING THE FUNCTION
document.addEventListener("DOMContentLoaded", function() {
  createTooltip();
});
