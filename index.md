---
layout: default
title: Home
---

<style>
.decorative-bg {
    z-index: -1;
    position: absolute;
    width: 100%;
}
</style>

<div class="row mt-5">
    <div class="col-md-4">
    <h2 class="display-2" style="font-family: MHDiary">Hello!</h2>
    </div>
    <div class="col">
    {% capture intro %}
    {% include intro.md %}
    {% endcapture %}
    {{ intro | markdownify }}

    <div class="my-5"></div>
    {% include contact %}
    </div>
</div>