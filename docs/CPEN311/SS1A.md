---
title: Combinational Logic
date: 2019-04-03
categories: CPEN 311
---

- toc
{:toc}

Digital logic blocks consists of *combinational logic* and *sequential logic*.

Combinational logic blocks are based on combinational logic -- where the output is a function of only current inputs. They have no memory or history of past operations or states. Thus combinational logic blocks are constructed using only boolean logic gates but not flip-flops (since FFs are used for storing memory).

Combination blocks are used for, but not limited to:
- 7-segment display
- Multiplexers
- Game logic

## Basic Combinational Logic in Verilog

```verilog
module MY_SYSTEM(A, B, C);
	input A, B;
	output C;

	assign C = A ^ B;
endmodule 
```

Use `wire` if we want to connect intermediate signals:

```verilog
module MY_SYSTEM_2(A, B, C);
	input A, B;
	output C;

	wire S0, S1;

	assign S0 = A & ~B;
	assign S1 = ~A & B;
	assign C = S1 | S0;
endmodule
```

## Recipe to Create Combinational Components

1. Determine the boolean equation for each output
2. Write the boolena equation as concurrent signal/wire assignments.

Since all logic is stateless, the outputs change based on the changes in the inputs. We need to wrap these logic in an `always` block along with the **sensitivity list**.

```verilog
always @(/* sensitivity list */)
begin
	/* combinational stements */
end
```

All input signals that are involved in the combinational logic are required to be in the sensitivity list.

```verilog
module MY_AND(A, B, C);
	input A, B;
	output C;
	reg C;

	always @(A or B)
		C = A & B;
endmodule
```

In this case, signal change events of A and B should cause C to be "re-evaluated" since we are essentially "reading" the signals A and B. Note that we used `reg C` to declare a wire, not a register so that it could be used within the `always` block.

In SystemVerilog we use `logic` instead of `reg` which is less confusing. In addition, we also use `always_comb` block as it's less ambiguous.

```verilog
module MY_AND(A, B, C);
	input logic A, B;
	output logic C;

	always_comb
		C = A & B;
endmodule
``` 

## Multiplexers

Multiplexers (MUX) are used to select one of the input bits to be carried over -- or "decision making". They are made of combinational logic.

Here is an example implemenation of a MUX in SystemVerilog:

**Example**

```verilog
module mux(input [3:0] X, input [1:0] SW, output Y);
    always_comb
        case (SW)
            2'b00: Y = X[0];
            2'b01: Y = X[1];
            2'b10: Y = X[2];
            2'b11: Y = X[3];
        endcase
endmodule
```

Here, we set the output based on the control input `SW`. 

Alternatively, we could also use *if/else* statements or other logic operators or conditional statements such as `?`.

Note that in this example provided, we covered all permutations/cases of the combinational logic in the `always_comb` block. If we don't want to write out all the cases either because it's too much or too redundant, we could use `default`:

```verilog
module mux(input [3:0] X, input [1:0] SW, output Y);
    always_comb
        case (SW)
            2'b01: Y = X[1];
            2'b10: Y = X[2];
            2'b11: Y = X[3];
            default: Y = X[0];
        endcase
endmodule
```
This means for any case not covered in the case statement, we will default `Y = X[0]`.

**Warning**: failure to cover all cases could lead to the synthesizer interpreting the verilog code as logic with memory, and make **inferred latches**. This is not the desired hardware, which is not good.