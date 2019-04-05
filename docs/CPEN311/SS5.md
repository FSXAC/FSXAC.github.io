---
date: 2018-01-18
categories: CPEN 311
title: Datapath Continued
author: Muchen he
---



- toc
{:toc}


## Blocking and Non-blocking Assignments

### Blocking Assignments

**Blocking**: evaluation and assignments are immediate

```verilog
// Example
always_comb begin
  x = a | b;
  y = a ^ b ^ c;
  z = b & ~c;
end
```

The "assignments" will hook up the wires

### Non-Blocking Assignments

**Non-blocking**: all assignments deferred until all right-hand sides have been evaluated

```verilog
// Example
always_ff @(posedge clk) begin
  x <= a | b;
  y <= a ^ b ^ c;
  z <= b & ~c;
end
```

In terms of the hardware semantics, the registers are all in parallel. Essentially, `a`, `b` and `c` will all be evaluated first, then the `x`, `y`, and `z` are scheduled and evaluated simultaneously at the  "end" of the clock cycle. 

> **Note** that in both cases, `x`, `y`, and `z` are declared as `reg` in Verilog. However, in the first *blocking* code, the assignments won't be synthesized to to a register. In the second one, the assignments will be synthesized to flip-flops because we need the clock to update the values at the end. Also flip-flops are needed to hold memory.

### Rule of Thumb

- Use `<=` for assignments for registers in sequential blocks
- Use `=` for assignments to r`reg` variables in combinational block
- **Do not mix both one always block**

---

# Lab 2

**Reuleaux Triangle**: A special triangular round shape that has constant width no matter how to measure it

**Goal**: Draw a *Reauleaux Triangle*



## Datapath Methods

There are two methods of datapath:

1. **Explicit State Machine / Datapath Method**: Design datapath and controller separately (like lab 1)
2. **Implicit Datapath Method**: Specify state machine, but for each state, describe data operations to be performed in that state

### Explicit State Machine / Datapath Method

1. Design Datapath
   - Determine all storage elements, operators
   - Create network connecting all the elements and identify input / outputs
   - Describe datapath in Verilog
2. State Machine (Controller design)
   - Figure out what to do in each cycle
   - Create a state machine that produces output for control signals
   - Describe controller in Verilog
3. Create top-level design that connects datapath and controller

## Tasks

### Task 2 - Fill the Screen

Need to turn on each pixel one at a time. Some pseudo code:

```
for yp = 0 to 119 {
  for xp = 0 to 159 {
    turn on pixel at (xp, yp) with color (xp mod 8)
  }
}
```

Notice that this will take a lot of cycles. The first approach would be to build a state machine. But there are too many states. So let's use a `for` loop.

So consider this following naïve implementation:

```verilog
integer ix, iy;

always_ff @(posedge(CLOCK_50))
  for (iy = 0; iy < 120; iy = iy + 1) begin
    for (ix = 0; ix < 160; ix + ix + 1) begin
      x <= ix;
      y <= iy;
      color <= ix % 8;
      plot <= 1;
      @ (posedge (CLOCK_50)); // Sneak a clock cycle in here
    end
  end
end
```

We're trying to control all pixels in a single clock cycle. So only the last assignment to `x`. `y`, etc. are applies. So how to get around this? For *lab 2*, **method 1** is recommended.

A better method utilizes counters using registers. 

### Taking the Modulo

If we want to take a modulo of 8, notice that 8 is $2^3$. So all we need to do is take the lower 3 bits in the binary. 

### Divide by Base 2

Use right shift by $n$ to divide by $2^n$.

### Drawing a Line

If we want to draw a line from (0, 100) to (100, 0). Possible implementation could be:

```
for yp = 0 to 119 {
  for xp = 0 to 119 {
    turn on pixel(xp, yp) with color 0;
  }
}

xp = 0; yp = 100;
while (xp != 101) {
  turn on pixle(xp, yp) with color 1;
  xp = xp + 1;
  yp = yp - 1;
}
```

**How will this change our datapath?**

We added a subtraction block and a comparator block.

Notice that this only works for perfectly diagonal line.

### Drawing a Circle

`Insert pseudo for circle`

1. Start with clearing the screen datapath
2. Figure what needs to be added for datapath 
3. Figure out any extra states

**Do we need more storage?**

Yes. When drawing a circle using the above described algorithm, we need to store `crit`



