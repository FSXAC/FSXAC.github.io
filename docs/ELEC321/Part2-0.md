---
title: Probability Review
date: 2017-10-20
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

## Axioms of Probability

$\Omega$ is the set of all possible outcomes. An event is a subset of $\Omega$.

1. Probability must be between 0 and 1: $0\leq \mathbb P(A) \leq 1$ for any event $A$
2. If events $A$ and $B$ are mutually exclusive ($A \cap B=\emptyset$) then $\mathbb P(A\cup B)=\mathbb P(A) + \mathbb P(B)$
3. The probability of the sample space is $\mathbb P(\Omega)=1$ (always will happen) similarly, the probability of the empty set is $\mathbb P(\emptyset)=1$.


## Events

### Mutually Exclusive

Events $A$ and $B$ are <u>mutually exclusive</u> if and only if $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)$. 

### Independent

Events $A$ and $B$ are <u>independent</u> if and only if $\mathbb P(A\cap B)=\mathbb P(A)\mathbb P(B)$.

### Conditional Probability

Probability of event $A$ given $B$ is $\mathbb P(A|B)=\frac{\mathbb P(A\cap B)}{\mathbb P(B)}$, $\mathbb P(B)\neq 0$.

### Total Probability

For all mutually exclusive events $B_i$ that **partitions** $\Omega$, the probability of event $A$ is $\mathbb P(A)=\sum A\cap B_i$.

## Random Variables

**Random variable** maps outcomes $\omega \in \Omega$ of a probabilistic experiment to a real number $X(\omega)\in\mathbb R$

### Cumulative Distribution Functions

$$
F_X(x)=\mathbb P(X(\omega) \leq x) \quad\text{for any } x\in \mathbb R
$$

Properties:

1. $F_X(-\infty)=0, F(\infty)=1$
2. $\mathbb P(X\in (a, b])=\mathbb P(a<X\leq b)=F_X(b)-F_X(a)$
3. $F_X(x)$ is non-decreasing $x$



`something betewen here`

