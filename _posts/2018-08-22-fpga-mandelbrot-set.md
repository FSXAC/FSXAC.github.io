---
author: Muchen He
categories:
  - projects
  - cpen
date: 2019-03-27
title: "FPGA Mandelbrot Set"

tags:
  - programming
  - code
  - fpga
  - computer
  - engineering
  - fractal
  - mandelbrot

header:
  overlay_image: /assets/blog/default.jpg
  overlay_filter: 0.4

use_math: true
---

After learning about using the VGA modules for the DE1-SoC FPGA development board in one of my CPEN-311 labs, I wanted to make something cooler than just a circle or a triangle. How about a fractal?

<!-- excerpt -->

## Mandelbrot Set Fractal

Put simply, it's a set of complex numbers such that $$Z_n=Z_{n-1}^2+C$$ where $$C$$ is the complex number in question, does not diverge. Assuming $$Z_0=0$$.


Consider $$C=i$$, then 

Now consider $$C=1$$, then $$Z_1=0+1=1$$, $$Z_2=2$$, $$Z_3=5$$, and so on. We see that the function quickly diverges. 

What is interesting is we project the complex plane onto our computer display. A pixel would therefore be a complex number. Then we can map how quickly a specific complex number in the plane to a color. If the number corresponds to a pixel does not diverge, we can set the color of that pixel to black.

This is how we get those colorful fractal arts.



## FPGA Set Up

In this project, I used my DE1-SoC development board. 

For display output, I used the [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/). Even though this is developed for the DE2 board, this will be functional for us. The resolution this VGA adapter can output is either 160x120 or 320x240. We will use 3-bit colors so only 8 different colors (including black and white).

As much as I love to dive into floating-point modules, for this project, I'm keeping it simple by using fixed point representation for decimal numbers. This however, means that we cannot "zoom" into the fractal very far, as the fixed-point numbers will underflow.


## The Algorithm

As pretty as the fractal itself seems, the algorithm is actually not that difficult. It's probably one of the easier projects to do on the FPGA involving graphics as we only have to keep track of a few position states. (as opposted to games, which can have many more states)
