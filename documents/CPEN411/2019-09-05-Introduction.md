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