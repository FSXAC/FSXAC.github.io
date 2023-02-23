---
date: 2018-01-18
categories: CPEN 311
title: More Complex Datapath
author: Muchen he
---



- toc
{:toc}


**Learning Objectives**

1. Multi-cycle example
2. More complex datapath and controller
3. Alternative way to describe datapath / control circuits

## Sorting

There are two approaches to sorting::

1. Combinational (big)
2. Multi-cycle (small but takes longer)

Factors that affect this decision depends on the data to be sorted

### Combinational Approach

`insert block impl from page 6`

Using **subtraction** can tell us whether if a number is larger than the other.

**What happens when we want to compare more than two numbers?**

`insert block from page 7`

Notice that it's not very space efficient.

#### Problems

- Amount of logic grows quickly as number of numbers needed to be sorted increases

### Multi-Cycle

Given an array `R`, a particular algorithm would be:

```
for i in 0 to K-2:
	A = Ri
	for j in i+1 to K-1:
		B = Rj
		if B < B:
			Ri = B
			Rj = A
			A = Ri
```

This is not synthesizable because there is no registers (no clocks), and also if it's used in combinatory logic, the synthesizer will unroll the `for` loop.

We need states for storing values into `A` and `B`. We also need counters.

`A` and `B` won't change every cycle, so we need an `enable` signal. A `select` signal is needed to selected the corresponding counter. After comparing the numbers, the output need to be fed back to input. As a result, all the input registers (array) needs `enable` signals too. The enable signal is determined by the counters.

Don't forget that the counters also need to be initialized. Compare the inner counter to see if the inner loop is done. Also use a comparator on the outer loop to know if the sort is done or not.

Finally, we need a way to initialize the input registers, as well as a way to read out all the values from the registers.

#### State Machine

`state diagram from page 32`
