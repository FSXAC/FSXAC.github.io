---
title: Introduction
date: 2019-09-05
updated: 2019-09-05
categories: CPEN 411
---


- toc
{:toc}

# Why Architecture?

**Dennard scaling** describes that more frequency and power usage increase linearly. But this is no longer true, which is why clock frequencies have plateaued. **Moore’s Law** describes the number of transistors in a given area doubles every two years. This is coming to an end too.

We need more computation.

To make things faster, we need more “clever” architecture.

# Architecture Design Process

```flow
op1=>operation: Simple performance model
op2=>operation: Detailed performance model
op3=>operation: HDL performance model
op4=>operation: Circuit/layout desgin
op5=>operation: Verification
op6=>operation: FAB

op1->op2->op3->op4->op5->op6
```

A set of benchmarks and and performance evaluations are applied in the first three steps. Most design iterations also happen in the first three steps before design team continue to circuit layout designs.

# Performance

## Measuring Performance

We use **benchmarks** which are based on real applications and application suites. At high level, we may look at space-time complexity or magnitude (big-O, etc.); on lower level, we may look at frequency.

In architecture, we look a mixture of high and low level performance metrics.

**Kernels** may also be used as “representations” of parts of real applications. They’re easier and quicker to set up and run but are often do not reflect representatively of the entire app.

## Benchmarks

**TPC** benchmarks used for monetary transaction applications, latency is important in this benchmark.

**SPLASH**, **PARSEC** are open source benchmarks, the former is more for scienctific computing tasks, and the latter is more oreitned towards desktop PCs.

## Performance Metrics

Gflops and Tflops, gigaflops, teraflops

Mips

### MIPS

Micro-instructions per second

How do we compare benchmarks from one machine to another? Suppose Machine A has ISA “A” of 10 MIPS, and Machine B has ISA “B” with 5 MIPS.

The performance could be affected by the instruction set encodings. For example RISC instruction sets ….



### CPU Performace Equation

CPU time  = cpu clock cycl e* clock cycle time

Cpu clock cylce breaks down into two parts: instruction count multiplied by cycles per instruciton

Breaking it further:

CPU time = seconds / program = instructions / program * clock cycles / instruction * time / cycle

`continue from slides`

CPU time = sum_i=1^n IC_i times C P I_i * clock cycle time `to latex`

---

Branches make up control flow logic. Suppose an application has a lot of cerntain type of branch, then we can predict the behaviour of the program and pre-fetch the relevant data in the computer architecture.

We need load or store instructions to access and modify memory. When we deal with IO or high-level interfacing, we are writing into memory or disk.

it is uncommon to have this (`insert table from sldies`) distribution of type of instructions.

## Comparing Performance

X is n times faster than Y:

exectuion time of Y / execution time of X = n

Throughput of X is n times faster than Y:

tasks per unit of time for X / tasks per unit of time for Y = n

---

So if we take the arithmetic mean for average exevution time, then we are giving more weight ot logner running programs.

We can also get weighed arithmetic mean, and emphasize on the applications that are more important. To determine which applications are important, some of the factors include usage time, required resources, etc.

## Speedup

Suppose:

|           | A    | B    |
| --------- | ---- | ---- |
| Program 1 | 5    | 4    |
| Program 2 | 3    | 6    |

Speed up of A to B in program 1? 4/5 (slower)

Speed up of A to B in program 2? 6/3 (twice as fast)

Average speed up of A to B? (4/5+6/3)/2 = 1.4

Sum of average of A to B? (4+6)/(5+3)=1.25

It is recommended to use **geometric means** because it deals better with numbers with very different magnitudes. Before we apply geometric mean, we must **normalize** the execution time. **Do not** use arithmetic mean for normalized execution times.
$$
\sqrt[\leftroot{-2}\uproot{2}a]{\prod}
$$

## CPI/IPC

Cycles per instruction

Instruction per cycle

Average CPI is given by Sum(CPI_i)/n

but arithmetic mean of the IPC is not proportional to average CPI

For average ICP, we must use **harmonic mean**.

We need average CPI to compute average execution time. 

Suppose we have machine A and B, we obtain average execution time for A and B for a bunch of applications. We will obtain an array of speedups for each application. Then we take the geometric mean of all the speed ups.

harmonic mean:
$$
n\over{\frac 1{cpi_1}+\frac 1{cpi_2}+\dots}
$$
