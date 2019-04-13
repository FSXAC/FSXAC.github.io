---
date: 2018-02-07
categories: CPEN 311
title: Debugging Techniques
author: Muchen He
---



- toc
{:toc}


What is **effective debugging**?

Failures are good because they tell you what's going wrong.

**Rule 0**: Don't panic. By following the debugging process, one cannot fail to find the bugs.

**Rule 1**: *Red stuff* is evil. The signals that are red are either driven by nothing or multiple things. The first thing one could do is add all signals to the wave form and observe which signal has unknown state. Use this to track down and fix all the red signals. This technique has the highest payoff to effort ratio.

**Rule 2**: Know **exactly** what to expect. For instance, it's nice to implement the design in software as reference. After that, see which exact pixels does the implementation draw. A test bench is useful, some useful commands for outputting data are: `$display`, `$monitor`, `$time` and `diff`. The payoff is that we will know *exactly* which cycle when we encounters undesired output.

**Rule 3**: Reproduce the problem *reliably*. In testbenches, one should simulate all possible paths. To do this, one can write test cases for all possible path through the design logic. Check the outcome and fail if it's not expected. `$error` would be useful in this case - this will cause the simulation to fail immediately. Finally, the testbench should have tests for **all bugs** ever found, because if you can't prove you fixed it, it ain't fixed.

**Rule 4**: Stop thinking and **look at** what is happening. Look at the wave form, and find the failure (since we know exactly when it occurred). Use "pitchforks" to follow the bad signal to see which part of the design is drawing the bad signal.

**Rule 5**: Practice **defensive coding**. Anticipate bugs. Improve code readability. Think about *invariants* and use **assertion** to kill the program when needed. Unfortunately, the student version of the tool chain doesn't come with assert. We can fake assertions by adding a signal for "assertion"  then make it trigger an always block with `$error` inside. If necessary, surround debug code inside compiler directive `ifdef`.
