---
title: Datapath I
author: Muchen He
---



**TODO: Finish Notes**



:floppy_disk: [Go Back](/documents)

<small> Last updated 2018-04-10 by Muchen</small> 

[TOC]

> **Lecture side notes:**
>
> Consider the following **common mistakes**:
>
> ```verilog
> module m(..., output x);
>   always_comb
>     x = ...;
> endmodule
> ```
>
> This will not compile because the `output` needs to be a `reg` or `logic`.

# Datapath I: Introduction

## General Design

In the real world, a simplest system have two parts: a controller (finite state machine) and a datapath. The system gets system data inputs and system control inputs. The controller handles all the control signals which also controls the datapath. The datapath handles system data inputs and gives the controller status signals.



## Power Function Example

Consider **power function** that takes an integer $x$ to an arbitrary power of $n$ such that the module outputs $x^n$. We could design the hardware such that the output is fed-back to the input of a multiplier block until we're done.

One possible algorithm is:

```
P = 1
CNT = N-1
while (CNT >= 0) do
	P = P * X
	CNT = CNT - 1
end while
```

> **Note**: An implementation of this algorithm in Verilog won't synthesize. We have to use a smaller process design

Here is a datapath for this design consists of a multiplier block attached to a register block in series, which is hooked up back to the multiplier block. 

One thing wrong is that there is no **initial conditions**. So we add a `1` input for when it starts. In which case we also need to consider when to assert this `1`.

We also need a way to find out when to end. For this, we may want to use a counter.

The output of the power function module also contains a `done` bit to indicate that the output is valid. 

A **state machine** would be appropriate to control everything here since there are many cases.

![1536854517032](assets/1536854517032.png)

Now we can try implementing this in Verilog:

```verilog
module power(A, X, S, CLK, P, DONE);
  input [7:0] A, X;
  input S, CLK;
  output [7:0] P;
  output DONE;
  
  reg [7:0] P;
  reg Z, SEL, SELA;
  reg [7:0] CNT;
  reg DONE;
  
  enum {INIT, COMPUTE, FINISHED} CURRENT_STATE;
  
  always_ff @(posedge CLK)
    case (CURRENT_STATE)
      INIT: if (S == 1) CURRENT_STATE = COMPUTE;
      COMPUTE: if (Z == 1) CURRENT_STATE = FINISHED;
      defualt: if (S == 0) CURRENT_STATE = INIT;
    endcase
  
  always_comb
    case (CURRENT_STATE)
      INIT: {SEL, SELA, DONE} = 3'b110;
      COMPUTE: {SEL, SELA, DONE} = 3'b000;
      default: {SEL, SELA, DONE} = 3'001;
    endcase
  
endmodule
```

> **Note**: even thought `Z`, `SEL`, etc wires are instantiated as a `reg`, they won't actually be synthesized as a register because they're inside the `always_comb` block.

> **Tip**: Use `enum` to enumerate possible values the `CURRENT_STATE` can be

The component that does the computation would have the Verilog:

```verilog
// Determines initial condition
always_ff @(posedge CLK)
  if (SEL == 1)
    P <= 1;
  else
    P <= X * P;

// Insert rest of the code
```

> **Note**: we are using the `<=` non-blocking assignment. Because the problematic statement is `P <= X * P`. If it was `P = X * P` then, the Verilog will connect `P` with itself, which wouldn't make sense physically.



## Something else Example

