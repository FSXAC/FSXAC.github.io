---
layout: default
title: Home
show_footer: false
---

<style>
.decorative-bg {
    z-index: -1;
    position: absolute;
    width: 100%;
}
</style>


<div style="position: relative;">
    <div class='decorative-bg'>
        <svg height="60%" width="100%" viewBox="0 0 200 150" preserveAspectRatio="none">
            <style>
                .heavy {
                    font: bold 100px sans-serif;
                    fill-opacity: .25;
                }
            </style>
            <text x="0" y="75" class="heavy">M</text>
            <text x="55" y="150" class="heavy">H</text>
        </svg>
    </div>

    <div class="row" style="position: absolute; left:0; top: 0">
        <div class="col-md-4 float-left">
        </div>
        <div class="col">
            <h1 class="display-1">Hi</h1>
            {% capture intro %}
            {% include intro.md %}
            {% endcapture %}
            {{ intro | markdownify }}

            <div class="my-5"></div>
            
            {% include contact %}
        </div>
    </div>
</div>
