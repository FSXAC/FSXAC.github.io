---
title: "Mandelbrot Set on FPGA Part 2"
# published: false
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

use_math: true
---

- toc
{:toc}

## FPGA Requirements

In this project, I used my DE1-SoC development board.

As much as I like floating-point modules for their flexibility, for this project, I'm keeping it simple by using fixed point representation for decimal numbers. This means that we cannot "zoom" into the fractal very far, as the fixed-point numbers will underflow. But the benefit is that fixed point number operations are many times more simple. And the operations we need will only take 1 clock cycle! We will get into this in more detail in a little bit.

<!-- Exerpt -->

### Display Adapter

For display output, I used the [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/)[^vga]. Even though this is developed for the DE2 board, this will be functional for us. The resolution this VGA adapter can output is either 160x120 or 320x240. We will use 3-bit colors so only 8 different colors (including black and white). In this project, we will use 320x240 resolution.

### Display Adapter Usage

Full details regarding how to interface with the VGA adapter is on the website[^vga]. Here's the gist:

![waveform](/assets/blog/vga-screen-timing.gif)

<figure class="figure">
  <img class="figure-img img-fluid" alt="waveform" src="/assets/blog/vga-screen-timing.gif">
  <figcaption class="figure-caption">VGA core interface timing diagram</figcaption>
</figure>

- We need to drive the VGA core with a 50 MHz clock. On each clock cycle we provide the module with `color` (3 bits) input to specify the color of the current pixel.
- The 8-bit `x` bus and 7-bit `y` bus specify the pixel we're currently drawing.
- Lastly, `writeEn` enable signal must be on in order for the VGA core to write the input to VGA core's internal memory.

## Fixed-Point Operations

In this project, we will use 32 bits to represent fixed-point fractional numbers, where the lower 16 bits are fractional, and upper 16 bits are decimal. In other words, the *radix* is in the middle. You can learn more about fixed-point representations [in my notes](/docs/CPEN311/SS9) or on [Wikipedia](https://en.wikipedia.org/wiki/Fixed-point_arithmetic).

### Addition and Subtraction

Addition and subtraction using fixed point numbers are **identical** to normal numbers. We can totally forget about the fact that there is even a decimal point.

> **Example**: 1.5 + 2.25 (using 8 bits)
>
> ```shell
>   0001 1000 # 1.5
> + 0010 0100 # 2.25
> ___________
>   0011 1100 # 3.75
> ```
>
> **Example:** 5.5 - 7.75 (using 8 bits)
>
> ```shell
>   0101 1000 # 5.5
> - 0111 1100 # 7.75
> ___________
>   0101 1000
> + 1000 0100 # -7.75 (2's compliment)
> ___________
>   1101 1100 # -2.25 (2's compliment)
> ```

### Multiplication

For multiplication, it a bit trickier for the reason that the radix shifts. This makes sense because since grade-5 we've been taught that operations like 1.1 (one decimal place) times 2.2 (one decimal place) results in 2.42 (two decimal places).

As a result, we need to be careful about cutting off data when doing multiplication. To be safe, since we are multiplying two numbers, both 32 bits, we shall make the result 64 bits long. Then we will return the center 32 bits in which the radix of input and output would be aligned.

Here is the SystemVerilog implementation of our *multiplication block*:

```verilog
module multiplier(in_a, in_b, out);
    input logic signed [31:0] in_a, in_b;
    output logic signed [31:0] out;

    logic [63:0] product;

    assign product = in_a * in_b;
    assign out = product[47:16];
endmodule
```

Notice we truncate the wire `product` to the center 32 bits `[47:16]`.

<figure class="figure">
  <img class="figure-img img-fluid" width="256px" alt="multiplication block" src="/assets/blog/multblock.png">
  <figcaption class="figure-caption">Multiplication block.</figcaption>
</figure>

## Hardware Design

Recall the algorithm from the last blog post[^part1], our drawing algorithm consists of two nested loops that draw the screen, and an inner loop that computes the complex recursive equation. Combined, it looks something like:

```python
for x from 0 to SCREEN_WIDTH:
    for y from 0 to SCREEN_HEIGHT:
        a = map(x, 0, SCREEN_WIDTH, -2, 1)
        b = map(y, 0, SCREEN_HEIGHT, -1, 1)
        i = 0
        while (i < MAX_ITERATION or not diverged):
            a, b = recurse(a, b)
            i++
```

> **Note** that I have switched $$x_0$$ and $$y_0$$ from the part 1[^part1] to using $$a$$ and $$b$$ to avoid confusion with the pixel `x` and `y`.

To turn this to hardware, let's begin by laying out the *datapath*.

### Pixel Counter

First, we need two registers to keep track of the screen pixel coordinates `x` and `y`. Since our screen resolution will be 320x240, we need 9 unsigned bits for `x` and 8 unsigned bits for `y`.

<figure class="figure">
  <img class="figure-img img-fluid" width="512px" alt="xy registers" src="/assets/blog/xyregs.png">
  <figcaption class="figure-caption">Datapath for X and Y registers</figcaption>
</figure>

The signals `x_init` and `y_init` control if we want to continue increment the value, or reset it to 0. For example, upon start, we want the `x` and `y` both to reset to 0, representing the screen's top left corner, so both `x_init` and `y_init` would be 1. 

There are two comparators on the output of either registers that outputs 1 when `x` or `y` have reached the screen edges. When we have reached the rightmost pixel of the screen (`x_done` is 1), we want to reset `x` to 0, and increment `y`. When both `x_done` and `y_done` are 1, we know the drawing is finished.

The signals labelled here will be hooked up and controlled by a *state machine* module once we are done the datapaths.

### Mapping Block

Before we can do anything with the pixel coordinates to do any calculations, we need to map the pixel coordinates to the coordiantes on the complex plane, As outlined by the algorithm above. Normally, in software the mapping function requires division. Because we're implementing hardware and division is difficult to deal with

### Recursive Variables

Recall the equations for the real and imaginary components are (assuming $$C=a+jb$$):

$$
\begin{aligned}
a_{n+1}&=a_n^2 - b_n^2 + a_0\\
b_{n+1}&=a_n + b_n + b_0
\end{aligned}
$$

Again, I've switched $$x$$ and $$y$$ from part 1 to $$a$$ and $$b$$.




[^vga]: [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/)
[^part1]: [Mandelbrot Set on FPGA part 1](/projects/cpen/2019/fpga-mandelbrot-set/)