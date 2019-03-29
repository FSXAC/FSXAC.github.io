## FPGA Set Up

In this project, I used my DE1-SoC development board. 

For display output, I used the [VGA adapters from University of Toronto](http://www.eecg.utoronto.ca/~jayar/ece241_06F/vga/). Even though this is developed for the DE2 board, this will be functional for us. The resolution this VGA adapter can output is either 160x120 or 320x240. We will use 3-bit colors so only 8 different colors (including black and white).

As much as I love to dive into floating-point modules, for this project, I'm keeping it simple by using fixed point representation for decimal numbers. This however, means that we cannot "zoom" into the fractal very far, as the fixed-point numbers will underflow.