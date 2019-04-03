---
title: Synthesizable Verilog
author: Muchen He
---



:floppy_disk: [Go Back](/documents)

<small> Last updated 2018-04-10 by Muchen</small> 

[TOC]

# Synthesizable Verilog

**Recall: What is Verilog?**

Verilog serves two roles:

- **Synthesis**: describe hardware that you ultimately want to create
- **Simulation**: Describe hardware for simulation and tests

## Verilog Design Flow

1. Write code and test bench of a design
2. Simulate the design in *ModelSim*
3. If it appear to work, then "compile" design in *Quartus*; otherwise, go back, fix bugs, and repeat step 2
4. After design has been synthesized, program it onto FPGA
5. If the FPGA appears to work, then the design can be implemented on a large scale; otherwise, go back to step 3 (debug.

> Note that the term **compiles** actually just mean turning Verilog hardware description code into gates (synthesize).

##Synthesizable Language Constructs

The constructs are syntax used in Verilog that are generally synthesizable. Which means they have an *equivalent gate-level implementation* of the construct.

Constructs including:

- Entities and architectures / modules
- Signals, wires, and registers
- Concurrent signal assignments
- Component instantiations
- Processes / `always` blocks such as:
  - `if`/`else` conditional statements
  - `case` statements

The **always** / process blocks are an exception.

### Always / Processes Blocks

The synthesis tool tries its best to find hardware implementation that matches the behavior described in the process using **Pattern Matching**. 

There are three patterns that ALL synthesis tool can understand:

1. Purely combinational
2. Sequential
3. Sequential with asynchronous reset

Thus, any process must be one of these three patterns.

> The important rule for synthesizing `always` blocks is:
>
> **Every process must fall exactly into one of these three categories!**

#### 1. Pure Combinational

A **Pure combinational** block's output only depends on the current input. There are several rules for purely combinational blocks:

1. Every input to the process must be in the **sensitivity list**. 

   > The sensitivity list can be denoted like:
   >
   > ```verilog
   > always @(signals)
   > ```

   In Verilog 2001, a `*` can be used in the sensitivity list. If this a referenced signal is not in the sensitivity list, Quartus will sometimes throw a warning. In SystemVerilog, a `always_comb` can be used instead.

2. Every output must be assigned a value for every possible combinational inputs. (Every possible path through the process must have a designated output value)

   ```verilog
   always @(A or B or SEL)
     if (SEL == 1)
       C = A;
     else
       C = B;
   ```

   Missing items in the sensitivity list will cause *undefined behavior*!

   If not all cases are covered, such as a bad example as shown below. Then a warning is raised in Verilog 2001 and **inferred latches** is synthesized - something that we don't want. In SystemVerilog, an error is thrown and the synthesis is stopped.

   ```verilog
   always_comb
     if (SEL == 1)
       C = A;

   // Error thrown when trying to compile
   ```


#### 2. Sequential

Each output chances ONLY on the rising or falling edge of a single clock. There are two rules:

1. Only the clock edge signals should be in the sensitivity list

2. Only signals that change on the same edge of the same clock should be part of the **same always block**

   An example is:

   ```verilog
   always @(posedge CLK)
     // Some sequential logic ehre	
   ```

> **Note**: sequential circuit with synchronous **reset** falls under this category.

In System Verilog, it is advised to use `always_ff` instead. An example use would be:

```verilog
always_ff @(posedge CLK);
	Q <= D;
```

##### Reset

We need **reset** because when a system is powered up, it could start at some random state, and we need to go back to a known starting point. Systems are not perfect, and we also need a way to reset. 

For debugging, it's convenient to have an option to reset to try again.

There are two kinds of resets:

- **Asynchronous Reset**: this happens instantly. If the reset signal occurs, the machine stops whatever its doing and resets. Since the flip flops resets immediately **regardless** of the clock, it's not a pure sequential circuit.
- **Synchronous Reset**: When reset signal fires, we need to wait until the next clock signal in order for reset to occur. The flip flop only resets on the clock edge. This is why it falls under the *sequential* category.

Here's an example implementation:

```verilog
always @(posedge CLK)
  if (RESET == 1)
    Q <= 0;	// Reset case
  else
    Q <= D; // Normal case
```

#### 3. Sequential with Asynchronous Reset

Recall that asynchronous reset is sensitive to the clock and the reset signal. There is one rule:

1. Sensitivity list includes clock and reset

   ```verilog
   always @(posedge CLK or posedge RESET)
     if (RESET == 1)
       // reset assignments	// reset case
     else
       Q <= D;			       // normal operation
   ```



### More Things to Know About Always Blocks

1. Processes are concurrent statements

   The order of concurrent statements don't matter. Thus changing the order of always blocks won't change the synthesis result. 

2. Do not drive a signal from multiple processes

   An example of a wire being driven by multiple signals:

   ```verilog
   module BAD(input A, input B, input C, input D, output F);
     always @(C, D)
       F = C | D;

     always @(A, B)
       F = A & B;
   endmodule
   ```

