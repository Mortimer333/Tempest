# Tempest


Tempest is very small library created to add tooltips to the <b>input <i>type=range</i></b>. Features for now:

<ul>
  <li>Creates static tooltip over or under input.</li>
  <li>Creates input tooltip over or under input.</li>
  <li>Creates input tooltip or static tooltip over the thumb.</li>
  <li>Allows to choose if the tooltip should be visible on hover or hiden on hover</li>
</ul>


# Instruction

<ul>
  <li>To add the static tooltip to the input just add <b>class</b> <i>"tempestTooltipUp"</i> or <i>"tempestTooltipDown"</i> to the <b>input type=range</b>;</li>
  <li>To add the input tooltip to the input just add <b>class</b> <i>"tempestTooltipInputUp"</i> or <i>"tempestTooltipInputDown"</i> to the <b>input type=range</b>;</li>
  <li>To add the input tooltip or static tooltip to the middle of the input just add <b>class</b> <i>"tempestTooltipMiddle"</i> or <i>"tempestTooltipInputMiddle"</i> to the <b>input type=range</b>;</li>
  <li>To add hover option to tooltip add new attribute <b>tooltipOnHover</b> and set it value accordingly:
    <ul>
      <li><b>"show"</b> to show tooltip on hover;</li>
      <li><b>"hide"</b> to hide tooltip on hover;</li>
    </ul>
  </li>
  <li id="idOfInput">It's very important to add <b>id</b> to the input because that's how the function binds elements (<i>anything for id works</i>);</li>
  <li>If you specified the size of the thumb you need to add new attribute to the input <b>thumbsize</b>, like so:
<p>&#8249;input type="<b>range</b>" name="" value="" min="5" max="15" step="0.5" <b>id="range"</b> class="<b>tempestTooltipDown</b>" <b>thumbsize="16"</b>&#8250;</p>
  </li>
  <li>Because the algorithm uses the size of the thumb so when you don't specify the size of it, it will use the default value (<i>9.6px</i>). <b>Remember to add left and right border of thumb to the size</b>;</li>
  <li>I added a classes to the tooltips so you can customize them without trouble:
    <ul>
      <li><b>.tooltipsUp</b>;</li>
      <li><b>.tooltipsDown</b>;</li>
      <li><b>.tooltipsInputUp</b>;</li>
      <li><b>.tooltipsInputDown</b>;</li>
      <li><b>.tooltipsMiddle</b>;</li>
      <li><b>.tooltipsInputMiddle</b>;</li>
    </ul>
  </li>
  <li>If you don't want to style your tooltips and inputes types=range you can use my <a href="https://github.com/Mortimer333/Tempest/blob/master/style.css">custom styles</a> (<i>created with help of <a href="https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/">CSS Tricks</a></i>).</li>  
</ul>

# More info

<p> The whole function works by creating <b>div</b> over the <b>input</b> and appending to it <b>span</b> which has his <i><b>left</b> css attribute</i> changed on each toggle of input value. So for each <b>input</b> there are created <b>divs</b> as containers and <b>spans</b> as value holders and tooltips.</p>
