---
title: Probability
date: 2017-09-13
categories: ELEC 321
use_math: true
---

- toc
{:toc}

## Course Info

*Office Hour*: Monday 14:00 - 15:00 ESB 3134
ruben@stat.ubc.ca

## Basics

**Random Experiments** - Outcome cannot be predicted

**Sample Space** - List of possible outcomes of a random experiment (usually denoted by $$\Omega$$)

**Event** - Subset of sample space (usually denoted by $$A, B, C, D, \dotsc$$)

> **Example**
>
> Sample space $$\Omega = \{1, 2, 3, 4\}$$
>
> $$A\subset\Omega=\{1,2\}$$
>
> Event $$A$$ occurs when $$\omega\in A$$ where $$\omega\in\Omega$$

## Set Operations

**Union (OR)** - $$\bigcup$$ or $$\bigvee$$

$$\displaystyle\bigcup_{i=1}^{n}A_i=A_1\cup A_2\cup A_3\cup\dotsb\cup A_n$$

**Intersection (AND)** - $$\bigcap$$ or $$\bigwedge$$

**Complement (NOT)** - $$^c$$

### Disjoint

Occurs when there is no intersection of events. Empty is usually denoted using $$\emptyset$$

## Sigma Fields

Sigma field is a collection of events (denoted by $$\sigma$$-field or $$F$$). It is the domain for a probability function.

A sigma field must satisfy three conditions:

1. $$\emptyset\in F$$ and $$\Omega\in F$$
2. $$A\in F\implies A^c\in F$$
3. $$A_n\in F\implies \bigcup^{\infty}_{n=1}A_n\in F$$

> **Example**: rolling a dice
>
> The sample space would be each side of the dice:
>
> $$\Omega=\{1,2,3,4,5,6\}$$
>
> Let's say we have the event A for rolling a low number, B for rolling even numbers, and C for rolling any number less than 5.
>
> $$A=\{1,2,3\}, B=\{2,4,6\}, C=\{1,2,3,4\}$$
>
> The number of subsets possible from the sample space is $$2^6 = 36$$ (the number of possible subsets of any set is 2 to the power of number of elements in the set).
>
> $$\mathcal F=\{\emptyset, \{1\}, \{2\},\dotsc,\{1,2,3,4,5,6\} \}$$
>
> We can say:
>
> - $$1\in A$$
> - $$\{1\}\in\mathcal F$$
> - $$A\subset C$$

## Probability Function

The probability function ($$P:F\rightarrow[0, 1]$$) operates on sets and we want the probability of events happening in a sample space.

There is three property / axiom with the probability function:

1. $$P(\Omega)=1$$ ($$\Omega$$ will always occur)
2. $$P(A)\geq0$$ for all $$A\in F$$
3. $$A_n$$ (assuming disjoint (i.e. $$A_1$$ is not intersecting $$A_2$$)) $$\implies P(\bigcup^\infty_{n=1}A_n)=\sum^\infty_{n=1}P(A_n)$$

**Probability Space**: ($$\Omega$$, $$F$$, $$P$$)

The probability space is a tuple of the sample space, all possible events, and all defined probabilities of these events.

> **Example**: proving $$P(A^c) = 1-P(A)$$
>
> $$A^c\cup A = \Omega$$
>
> $$\implies P(A^c)+P(A)=P(\Omega)=1$$
>
> $$\implies P(A^c)=1-P(A)$$
>
> First, we know that $$A\cup A^c=\Omega$$ (it is in $$A$$ or it is not) so we can apply the probability function which yields line 2. Since $$A$$ and $$A^c$$ is disjoint, we follow axiom 3 and add the probability of event $$A$$ and probability of not event $$A$$ together. This equals to the probability of the sample space $$\Omega$$ which is 1. Thus, using algebra we show that the probability of $$A$$ is 100% minus the probability of $$A$$ not occurring.

> **Example**: proving $$A\subset B \implies P(A)\leq P(B)$$
>
> $$A\cup A^c=\Omega, B\cap\Omega=B$$
>
> $$B\cap(A\cup A^c)=B$$
>
> $$(B\cup A)\cap(B\cup A^c)=A\cup(B\cap A^c)=B$$
>
> $$P[A\cup(B\cap A^c)]=P(A)+P(B\cap A^c)=P(B)$$
>
> $$\implies P(A)\leq P(B)$$
>
> Again, starting off with $$A\cup A^c=\Omega$$, we also know that $$B\cap\Omega=B$$ (In fact, any event intersecting with the sample space is just the event itself). 
>
> Substituting $$\Omega$$ with expression in line 1, we get line 2. We can then distribute the intersection (on the outside) and we get the line 3. We may also re-express it as $$A\cup(B\cap A^c)$$ which also equals to $$B$$ when expanded. 
>
> Now we operate the probability function on both sides (as shown in line 4). Rearranging the terms and we get $$P(A)=P(B)-P(B\cap A^c)$$ and since the probability of any event (as described above) must be greater than or equal to 0, we can conclude that $$P(A)\leq P(B)$$.

> **Example**: proving $$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$
>
> In this case, $$A$$ and $$B$$ are not necessary disjoint.
>
> $$A\cup B=A\cup(B\cap A^c)$$
>
> $$\implies P(A\cup B)=P(A)+P(B\cap A^c)$$
>
> The union of two events equals to the union of one event plus the second event (**inclusion**) that's not overlapping with the first event (**subtract intersection**)(hence $$B\cap A^c$$ because it means any part of $$B$$ that is not overlapping $$A$$). This is the *inclusion-exclusion* formula. See below for more.
>
> $$P(B)=P(B\cap A^c)+P(B\cap A)$$
>
> $$\implies P(B\cap A^c)=P(B)-P(B\cap A)$$
>
> Similarly, event $$B$$ can be broken down into the part that is exclusive $$B$$ and the part that overlaps with $$A$$. We operate the probability function and get line 3. Rearrange and we can find the probability of exclusive $$B$$ or $$B\cap A^c$$.
>
> Combining line 2 and line 4 we get:
>
> $$P(A\cup B) = P(A) + P(B) - P(B\cap A)$$

> **Example**: proving $$P(A\cup B \cup C)=P(A)+P(B)+P(C)-[P(A\cap B) + P(A \cap C) + P(B \cap C)]+P(A \cap B\cap C)$$
>
> Same as above, this is using the *inclusion-exclusion* formula. See below for more.

## Boole's Inequality

Boole's inequality is defined as follows:

$$
\mathrm{P}(\bigcup^n_{i=1}A_i)\leq\sum^n_{i=1}\mathrm{P}(A_i)
$$

This means that if there are a bunch of events that exist in the sigma field, the probability of any one event occurring must be less than or equal to the sum of the probability of each event. This is because the *union* of all events might contain overlap.

If all outcomes are equally likely, then the probability of an event is defined by number of outcomes in the event over number of outcomes in the sample space:

$$
P(A)=\frac{\text{# of occurance in A}}{\text{# of occurance in }\Omega}
$$

### Proof of Boole's Inequality

We use the [inclusion-exclusion](#inclusion-exclusion-formula) property: $$\mathbb P(A\cup B)=\mathbb P(A) + \mathbb P(B) - \mathbb P(A\cap B)$$.

$$\displaystyle\mathbb P\left(\bigcup_{i=1}^{n+1}A_i\right)=\mathbb P\left(\bigcup_{i=1}^n A_i\right)+\mathbb P\left(A_{n+1}\right)-\mathbb P\left(\bigg(\bigcup_{i=1}^nA_i\bigg)\cap A_{n+1} \right)$$

The probability of any of the $$n+1$$ events occurring is the probability of any of the $$n$$ events happening plus probability of the $$(n+1)$$-th event occurring. Then exclude any overlap between any of the previous events and $$n+1$$-th event.

> **Example**: n=2
>
> $$\mathbb P(A_1\cup A_2 \cup A_3)=\mathbb P(A_1\cup A_2)+\mathbb P(A_{3})-\mathbb P((A_1\cup A_2)\cap A_3)$$
>
> We notice that the first term of the RHS can be broken down the same way.

Continuing the proof, we know that $$\mathbb P((\cup_{i=1}^n A_i)\cap A_{n+1})\geq 0$$, so we can rewrite the expression to be

$$\mathbb P\left(\bigcup_{i+1}^{n+1}A_i\right)\leq\mathbb P\left(\bigcup_{i=1}^n A_i\right)+\mathbb P(A_{n+1})$$

And for some fucking reason the first term of the RHS just becomes a summation...

$$\mathbb P\left(\bigcup_{i+1}^{n+1}A_i\right)\leq\sum_{i=1}^n\mathbb P(A_i)+\mathbb P(A_{n+1})=\sum_{i=1}^{n+1}\mathbb P(A_i)$$

## Inclusion-Exclusion Formula

Let $$\mathcal J_n$$ be a sorted subset of the set $$\{1, 2, 3, \cdots,n\}$$. We write $$\lvert \mathcal J_n\rvert$$ to denote the cardinality (number of elements) in $$\mathcal J$$. The $$n=3$$, then:

$$\lvert \mathcal J_3\rvert=1\implies\mathcal J_3=\{1\},\{2\},\{3\}$$

$$\lvert \mathcal J_3\rvert=2\implies\mathcal J_3=\{1,2\},\{1,3\},\{2,3\}$$

$$\lvert \mathcal J_3\rvert=3\implies\mathcal J_3=\{1,2,3,4,5,6\}$$

This notation allows us to write the inclusion-exclusion formula:

$$
\mathrm P(\cup_{i=1}^nA_i)=\sum_{j=1}^n(-1)^{j-1}\sum_{\mathcal \lvert J_n\rvert=j}\mathrm P(\cap_{i\in\mathcal J_n}A_i)
$$

Given $$n$$ is the size of a set, this formula expands to:

$$
\sum_{1\leq i\leq n}\mathrm P (A_i)
$$

$$
-\sum_{1\leq i \leq j\leq n}\mathrm P(A_i\cap A_j)
$$

$$
+\sum_{1\leq i\lt j\lt k \leq n}\mathrm P(A_i\cap A_j\cap A_k)
$$

$$
\dots+(1)^{n-1}\mathrm P(A_1\cap A_2\cdots\cap A_n)
$$

For complete proof, go to [proof on course website](https://www.stat.ubc.ca/~ruben/Stat321Website/Tutorials/Inclusion_Exclusion.pdf).

## Random Permutations

**Definition of Permutation**: A permutation of a set $$\{1,2,3,\dotsc,n\}$$ is a one to one function $$g$$ from $$\{1,2,3,\dotsc,n\}$$ onto itself:

$$
g:\{1,2,3,\dotsc,n\}\rightarrow\{1,2,3,\dots,n\}
$$

An example would be $$\{1,2,3,4,5\}\rightarrow\{4,1,3,5,2\}$$. Notice that the third element (3) did not change, this is a *fix point* (satisfies $$g(i)=i$$).

There are $$n!$$ number of all possible permutations. Since they are all equally likely, the probability of any given one is $$\frac 1 {n!}$$.

The probability of a single number ($$A_i$$) being a fix point is given by factorial of numbers left, divided by total possible permutations:

$$
\mathrm P (A_i)=\frac{(n-1)!}{n!}=\frac 1 n, \quad 1\leq i\leq n
$$

The probability of two numbers ($$A_i$$ and $$A_j$$, both being a fix point is similar:

$$
\mathrm P(A_i\cap A_j)=\frac{(n-2)!}{n!}=\frac 1 {n(n-1)},\quad1\leq i\leq j\leq n
$$

### Zero Fix Points

**Problem**: Calculate the probability of zero fix points in a random permutation.

**Solution**: 

- Let $$A_i$$ be a single fix point
- Let $$B^0_n$$ be the resulting set that has 0 fix points

By using logic, we can conclude that $$B^0_n=(\cup^n_{i=1}A_i)^c=\cap^n_{i=0}A_i^c$$, which basically says that all elements must not be fix points.

Using one of the axioms, we can say the probability of having $$B^0_n$$ equals to 1 minus the probability of not having $$B^0_n$$:

$$
\mathrm P(B^0_n)=\mathrm P((\cup^n_{i=0}A_i)^c)\\
=1-\mathrm P(\cup^n_{i=1}A_i)
$$

Applying the *inclusive-exclusive* formula on the second term, and we get:

$$
=1-\left[\sum^n_{j=1}{(-1)^{j-1}\left(\sum_{\lvert \mathcal J_n\rvert=j}\mathrm P(\cap_{i\in\mathcal J_n}A_i)\right)}\right]
$$

The nested summation term can be expressed as (**IDK WHY DON'T ASK ME**):

$$
\sum_{\lvert \mathcal J_n\rvert=j}\mathrm P(\cap_{i\in\mathcal J_n}A_i)=\left( \begin{array}{c} n\\j\end{array}\right)\frac {(n-j)!} {n!}\\
=\frac {n!} {(n-j)!} \frac{(n-j)!}{j!n!}\\
=\frac 1 {j!}
$$

Putting all together, the probability of 0 fixed points can be evaluated. The probability as $$n\rightarrow\infty$$ is $$e^{-1}$$. But of course, most of the time, we are dealing with a truncated series, so it's not exactly $$e^{-1}$$.

$$
\mathrm P (B^0_n)=1-\sum^n_{j=1}(-1)^{j-1}\frac 1 {j!}\\
= 1-1+\frac 1 {2!} - \frac 1 {3!} +\dotsc+(-1)^{n-1}\frac 1 {n!}\\
=\sum^n_{j=0}(-1)^j\frac 1 {j!}\\
\approx e^{-1}
$$

### Any Fix Points

**Problem**: (Identical to above), instead of looking for 0 fix points, we want to find the probability of $$1\lt k \leq n$$ fix points in a random permutation (more general).

**Solution**:

$$
\mathrm P(B^k_n)=\sum_{j=0}^{n-k}(-1)^{j-1}\frac 1 {j!}
$$

**Notice** that if $$n-k=1$$, then the probability of $$k$$ fix points is 0. 