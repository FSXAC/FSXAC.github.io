---
date: 2018-01-29
categories: CPEN 311
title: Verilog Operations
author: Muchen he
---



- toc
{:toc}


## Loop Statements

Traditionally when we want to iterate, we use a counter. A **behavior for-loop** has the structure as follows

```
for (<initial>; <expression>; <step>)
begin
	<something>
end
```

A for loop can only be synthesized inside a process/always block because it is a **sequential statement**. It synthesizes when the loop range is constant at compile time, and does not contain WAIT statements.

The synthesizer will **unroll** every statements inside the for loop.

For example, some for loop code might be

```Verilog
for (...) begin
  P = P ^ SW[i]
end
```

unrolls into

```verilog
P = P ^ SW[0];
P = P ^ SW[1];
P = P ^ SW[2];
```

Note that this example could be replaced by `P=^SW`

**Let's consider the 'power of' circuit again**. 

Writing out using for loops, we get

```
for (i=0; i < 3; i=i+1)
	P = P * X;
```

This will be unrolled to

```verilog
always @(X)
  begin
    P = 1;
    P = P * X;
    P = P * X;
    P = P * X;
  end
endmodule
```

We **cannot** create hardware for an arbitrary number of exponents. Since we need a real, constant number in the for loop during compile time. 

> Loop isn't a iterative events happening over time. It is just a shortcut to make writing hardware easier.

> Loops are very useful in simulations and test benches to make life easier.

## Generate Statements

Consider a problem where we have a bunch of multiplexers:

`screenshot`

It becomes really tedious when we have much more components to add and connect. 

```verilog
genvar i;

generate
  for (i=0; i<4; i=i+1) begin: big_mux
    mux_4to1 mux(W[4*i], W[4*i+1], W[4*i+1], W[4*i+2], W[4*i+3], S[1:0], M[i]);
  end
endgenerate
```

> Notice that the assignment for `mux` ports depends on `i`. And that `W` is concatenated beforehand.

Similar to for loops, the generate statements will unroll it. But for loop is **sequential**, and generate statement is concurrent, meaning that all modules are placed at the same time in parallel.

An example of a useful scenario to use generate statements is an **adder**. 

`adder block`

> Note that we can also use conditional statements in the generate statement.

## Tristate Logic

Normally when we have some kind of wire, it could be driven by some gate or input signal. Sometimes it is useful to have a *bus* where multiple module is connected to the same wire. Typically, there a module is driving the bus, and some other module that is connected to the bus is listening. 

So the three states corresponding to:

- Bus is driven to 0
- Bus is driven to 1
- Bus is left floating

What happens when the same wire is being driven by two sources? We don't know. 

`page 28`

When Verilog sees `0` and `1` driven into the same signal, it sets the value of the signal to `X`, which means the state is **unknown**. Note that in the real circuit, the node will always have some voltage.

`page 30`

Quartus synthesizer will thrown an error (`Cant resolve multiple constant drivers for net`).

Some how we need a control to say which one is actually driving it. Hence the **tristate driver**

### Tristate Driver

`page 32`

If `enable` is high, `out` is driven with the value on `in`, if `enable` is low, the output is not being driven. Not being driven can be denoted as `Z` in simulation.

The truth table is as:

| `in` | `enable` | `out` |
| ---- | -------- | ----- |
| 0    | 0        | Z     |
| 0    | 1        | 0     |
| 1    | 0        | Z     |
| 1    | 1        | 1     |

Verilog example:

```verilog
module tristate_driver9(I, ENABLE, F);
  input I, ENABLE;
  output reg F;
  
  always @(*)
    if (ENABLE == 1)
      F <= I;
  	else
      F <= 1'bz;
endmodule
```

`page 37`

### What actually happen in FPGA's?

People typically do not use tristate logic in their designs (because of speed issues). Modern FPGAs actually have no facility for implementing tristate drivers. (Synthesizer like Quartus will try to convert the tristate logic into multiplexer networks).

However, tristate is still used in off-chip I/O. 