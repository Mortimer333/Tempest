# Tempest


Tempest is very small library created to add tooltips to the <b>input <i>type=range</i></b>. For now it adds only tooltips over the thumb of the input. 


# Instruction

<ul>
  <li>To add the tooltip to the input just add <b>class</b> <i>"tempestTooltip"</i> to the element;</li>
  <li>It's very important to add <b>id</b> to the input because thats how the function binds elements (<i>anything works</i>);</li>
  <li>If you specified the size of the thumb you need to add new attribute to the input <b>thumbsize</b>, like so:
<p>&#8249;input type="<b>range</b>" name="" value="" min="5" max="15" step="0.5" <b>id="range"</b> class="<b>tempestTooltip</b>" <b>thumbsize="16"</b>&#8250;</p>
  </li>
  <li>Because the algorithm uses the size of the thumb so when you don't specify the size of it it will use the default value (<i>9.6px</i>);</li>
  <li>I added a class to the tooltip element so you can customize them without trouble - <b>.tooltipsTempest</b>;</li>
</ul>

<b>TL;TR</b>
<p>Create input with <b>class=<i>"tempestTooltip"</i></b>, id and attribute <b>thumbsize</b> if you have changed the size of thumb.</p>

# More info

<p> The whole function works by creating <b>div</b> over the <b>input</b> and has appended <b>span</b> which has his <i><b>left</b> css attribute</i> changed on each toggle of input value. So for each <b>input</b> there are created <b>div</b> as container and <b>span</b> as value holder and tooltip.</p>
