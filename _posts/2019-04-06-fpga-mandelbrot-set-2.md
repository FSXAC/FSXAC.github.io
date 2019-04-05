---
title: "Mandelbrot Set on FPGA Part 2"
published: false
date: 2019-04-06
categories:
  - projects
  - cpen

tags:
  - programming
  - code
  - fpga
  - computer
  - engineering
  - fractal
  - mandelbrot

header:
  teaser: /assets/blog/teaser/fract.jpg
  overlay_image: /assets/blog/fract.jpg
  overlay_filter: 0.8
---


## FPGA Requirements

In this project, I used my DE1-SoC development board. 

As much as I like floating-point modules for their flexibility, for this project, I'm keeping it simple by using fixed point representation for decimal numbers. This means that we cannot "zoom" into the fractal very far, as the fixed-point numbers will underflow. But the benefit is that fixed point number operations are many times more simple. And the operations we need will only take 1 clock cycle!

### Display Adapter

For display output, I used the [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/)[^vga]. Even though this is developed for the DE2 board, this will be functional for us. The resolution this VGA adapter can output is either 160x120 or 320x240. We will use 3-bit colors so only 8 different colors (including black and white).

### Display Adapter Usage

Full details regarding how to interface with the VGA adapter is on the website[^vga]. Here's the gist:

![waveform](/assets/blog/vga-screen-timing.gif)

- We need to drive the VGA core with a 50 MHz clock. On each clock cycle we provide the module with `color` (3 bits) input to specify the color fo the current pixel.
- The 8-bit `x` bus and 7-bit `y` bus specify the pixel we're currently drawing.
- Lastly, `writeEn` enable signal must be on in order for the VGA core to write the input to VGA core's internal memory.


[^vga]: [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/)
