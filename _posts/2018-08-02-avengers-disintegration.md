---
title: Disintegration Effects in Processing
date: 2018-08-02
categories: projects

# TODO: default this
author: Muchen He
layout: post
nav_active: /blog

# tags:
#   - programming
#   - code
#   - processing
#   - avengers
# toc: false
# excerpt: "I Don't Feel So Good"
# header:
#   teaser: /assets/default.jpg
#   overlay_image: /assets/default.jpg
#   overlay_filter: 0.4
---

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

In this small project, my objective is to take an input image and disintegrate it into particles. I will be using [Processing 3](https://processing.org/) because it's easy to do quick graphical interactives and I'm familiar with it.

This is my first implementation and it is a basic and limited one. The image is loaded from file, and a grid of small rectangles are drawn such that it resembles the original image. Here is what it looks like (with black strokes around each rectangle):

![1533335418092]({{"/assets/blog/1533335418092.png"}})

Next, in the 3D space, I applied a transform for each rectangle in the z-axis direction. How much translation is a function of *x* and *y*. In this case, I used the exponential function \\(e^{-kx^2}\\), where \\(x\\) is the horizontal coordinate, and \\(k\\) is some scaling parameter.

![1533335749370]({{"/assets/blog/1533335749370.png"}})

But this looks unnatural, so I made the output of the exponential function define the amplitude of a Perlin noise, a function of *x* and *y*. Along with that, I made it so the more the rectangles gets translated, the smaller it shrinks to give off the decaying effect.

Finally, removing the strokes and decreasing the rectangle size (to 1px) yield some better effect:

![1533336000276]({{"/assets/blog/1533336000276.png"}})
![1533336584637]({{"/assets/blog/1533336584637.png"}})

Remember that parameter \\(k\\) we put on to the transform function? Well we can animate it. I made it start off at 1.0, then each frame multiply it by 90%. This gives off of a slowly disintegrating effect. I also added a 3D interactive camera using `PeasyCam` library so that I can easily move the camera around. Here are the results:

![Results gif]({{"/assets/blog/ezgif-2-a348915694.gif"}})

The source code can be found [here](https://github.com/FSXAC/ProcessingSandbox/tree/master/Disintergrate).