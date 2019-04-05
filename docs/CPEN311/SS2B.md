---
title: Hierarchy
date: 2019-04-04
categories: CPEN 311
---

- toc
{:toc}

## Module Structures

Hierarchy is necessary because we are working with different layers of hardware. Thus abstraction is needed in order to remain sane.

The upper level modules connects the lower moduels together. We need to:

- Specify which lower level subcomponents we want to use.
- Specify how they are connected (use `wire` or `logic`).

Here's an example of making a top-level module using smaller modules:

```verilog
module top(X, Y, Z);
    input X, Y;
    output Z;

    wire S0, S1;

    INV_GATE U0(X, S0);
    AND_GATE U1(S0, X, S1);
    INV_GATE U2(S1, Z);
endmodule
```

### Larger Projects

In larger projects, it is essential to keep a clean hierarchy of modules for benefits to organization, testing, and debugging.

Typically:
- Highest level should consist of major units of design (CPU, memory, etc.).
- Lowest level should consist of simple combinational and sequential logic blocks.

## Specify Module Input and Output

The input and output to the module looks like parameters/arguments for a programming language.

### Positional

We can specify the IO by matching the order that it is defined in the module.

If `AND_GATE` is defined as

```verilog
module AND_GATE(A, B, A_AND_B);
```

Then

```verilog
AND_GATE U1(S0, Y, S1)
```

is using positional IO where `S0` is connected to `A`, `Y` is connected to `B` and the output `A_AND_B` is connected to `S1`.

### By Parameter Name

We can use `.X(Y)` to connect the modules.

```verilog
AND_GATE U1(.A(S0), A_AND_B(S1), .B(Y));
```

Notice that the order doesn't matter. Typically specifying IO by parameter name is prefered because it's more explicit and less error-prone.