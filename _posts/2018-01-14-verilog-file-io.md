---
title: "Verilog RNG, File IO, and Simulation"
date: 2018-01-14
categories: CPEN

author: Muchen He
layout: post
nav_active: /blogs
# tags:
#   - cpen
#   - verilog
#   - python
# toc: true
# toc_label: "Contents"
# toc_icon: list-ul
# header:
#   teaser: /assets/default.jpg
#   overlay_image: /assets/default.jpg
#   overlay_filter: 0.4
---

So, you got your Verilog hardware for a random dice game designed and wired up, it is time to put it to the test.....bench. However, you also want to simulate randomness and do the simulation tons of times and somehow analyize the results later. In this post, I will show you how to do just that. Let's get started.

> **Note**: Though written in Verilog, everything here only works in test benches and are not synthesizble into hardware.

## Random Number Generation

To generate a random number in verilog, we use the `$random()` method in Verilog. If we are interested in generating unsigned integers (which is most of the time), we need to use the `$urandom()` method. The range of the RNG can be specified via parameter by adding `% n` behind the method call, where `n` is the parameter value.

Here is an example of how to use it:

{% highlight Verilog %}
module tb();
    reg [7:0] value;
    initial begin
        $srandom(314);
        value = $urandom() % 100;
    end
endmodule
{% endhighlight %}

In this example, `value` will receive a random value between 0 and 100. Notice that we used the method `$srandom()` to seed the RNG. 

### Ranged RNG

On paper, there exists the method `$urandom_range()` for generating unsigned integer between a certain range. But I didn't find it to work quite well (contact me if there's a better way). The following example demonstrates a ranged randomized delay in the Verilog testbench.

{% highlight Verilog %}
module tb();
    initial begin
        #(10 + $urandom() % 40);
    end
endmodule
{% endhighlight %}

Here I am invoking a delay with a period of a random value between 10 and 40.

## File IO

We are all familiar with staring at the waveforms produced in the simulation for hours. If we want to run say 10, or 100, or even 1000 differnet simulations, it would be quite painful. Thus, it is nice to have the output of a test to be outputted somewhere. Here's how.

### Opening Files

File IO in Verilog is straight forward and is similar to File IO in C. First, we need to instantiate an `integer` component which we will use to reference the file. 

{% highlight Verilog %}
integer file;
{% endhighlight %}

Then we use `$fopen()` method to create a new file to write to. The first parameter is a string and specifies the file name; the second parameter specifies whether we want to read (use `"r"`) or write (use `"w"`). We are creating an output, so we will use write. By default, it will create the file at the project directory.

{% highlight Verilog %}
file = $fopen("output.txt", "w")
{% endhighlight %}

### Writing to File

To write to file, use `$fwrite()` method, which works similarly to the `printf` functions in C. More details can be found [here](https://www.csee.umbc.edu/portal/help/VHDL/verilog/system.html). To put simply, the first paramter is a "pointer" to the file. The second parameter is a string and contains format specifiers. Lastly, the rest of the paramters fills in the format specifies.

{% highlight Verilog %}
$fwrite(file, "%0d + %0d is %0d, minus %0d that's %0d\n", 2, 2, 4, 1, 3);
{% endhighlight %}

### Saving File

Once we are done with file writing, we use `$fclose()` method to close (and save) the file.

{% highlight Verilog %}
$fclose(file);
{% endhighlight %}

### Example

By combining the code above, we have the following Verilog code example:

{% highlight Verilog %}
module tb_fileIO();
    integer file;
    initial begin
        file = $fopen("output.txt", "w");
        $fwrite(file, "%0d + %0d is %0d, minus %0d that's %0d\n", 2, 2, 4, 1, 3);
        $fclose(file);
    end
endmodule
{% endhighlight %}

This creates a file called `output.txt` in our project directory which contains the line `2 + 2 is 4, minus 1 that's 3`.

## Simulation

Now that we know how to generate random numbers and saving to file, we can do something fun. Say we want to play Baccarat, the card game. We want to generate random cards for the player and the dealer until the game finishes. In which the test bench should:

- save the outcome to file
- restart the game
- iterate many many times

First, a `for` loop is used to iterate the game many times. Say we want to play the game 10,000 times, then the code should be:

{% highlight Verilog %}
integer file

initial begin
    // ... some code ...
    
    // open the file using $fopen
    
    for (int i = 0; i < 100000; i = i + 1) begin
        while ( /* game didn't end condition */ ) begin
            // ... Play game ...
        end
        $fwrite(file, "game output");
    end

    // ...
end
{% endhighlight %}

Inside each `for` loop, we also have a nexted `while` loop that keep on toggling the game clock. And some inputs are given at random times (using the RNG as described earlier). 

When the game ends, all the cards on the player and the dealer's hands are written to file as well as who won the game.

Finally, I wrote a short python script that read each row of the exported file from Verilog and verify that the game logic is correct.

## Conclusion

In short, while it is important to cover all cases of a design, writing and testing test-benches could tedious. Using the RNG to simulate the test bench thousands of times, using File-IO to export the file, then analyzing the results in Python is, at least in my personal opinion, much more fun.
