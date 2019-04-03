---
title: Combinational Logic
date: 2018-01-05
categories: CPEN 311
---

Digital logic blocks consists of *combinational logic* and *sequential logic*.

Combinational logic blocks are based on combinational logic -- where the output is a function of only current inputs. They have no memory or history of past operations or states. Thus combinational logic blocks are constructed using only boolean logic gates but not flip-flops (since FFs are used for storing memory).

Combination blocks are used for, but not limited to:
- 7-segment display
- Multiplexers
- Game logic

## Example of Basic Combinational Logic in Verilog

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
