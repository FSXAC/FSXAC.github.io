---
date: 2018-03-23
categories: CPEN 311
title:  High Level Synthesis
author: Muchen He
---



- toc
{:toc}

## High Level Synthesis

### Allocation

Consider we need to use adders and store the results into some register, we could save an adder and add a MUX. However, consider that MUX is often bigger than adders.

This is useful though for larger components such as division and multiplier components. However, tools will often not share these blocks because FPGAs has many built in multiplier and divider blocks.



### Scheduling

This is an optimization problem.

`WIP`

### Binding

`WIP`



OpenCL has a specific syntax to describe parallel operations.

**Pragma**: an annotation inserted in the C code that tells what the hardware should look like. Some pragma exmaples:

- PIPELINE: pipeline a loop
- UNROLL: unroll a loop
- ARRAY_PARTITION: partition an arrayu into multiple arrays for parallel access
- ARRAY_MAP: map multiple arrays into a single array
- INLINE: inline a function
- LATENCY: set the scheduling latency
- ALLOCATION: set the # of hardware instances

