---
title: Markov Process
date: 2017-11-21
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

> **Note**: this page is quite empty, visit the [tutorial page on Markov Processes](T12) and [review problem](review) for more in-depth explanation and practice of Markov chains.

**Example**: Rating migration of bonds
$$
\mathbb P(X_{n+2}=\text{default}|X_n=\text{AAA})\\
=\sum_{i\in\mathcal S}\mathbb P(X_{n+2}=\text{default},X_{n+1}=i|X_n=\text{AAA})\\
=\sum_{i\in\mathcal S}\mathbb P(X_{n+2}=\text{default}|X_{n+1}=i,X_n=\text{AAA})\cdot\mathbb P(X_{n+1}=i|X_n=\text{AAA})
$$
Where $\mathcal S$ is the state space: $\{\text{AAA. AA,}\dotsc,\text{default}\}$. 

Since $\mathbb P(A|C)=\sum_B \mathbb P(A,B|C)$ and $\mathbb P(A,B|C)=\mathbb P(A|B,C)\mathbb P(B|C)$, 

Thus
$$
=\sum_{i\in\mathcal S}\mathbb P(X_{n+2}=\text{default}|X_{n+1}=i)\cdot\mathbb P(X_{n+1}=i|X_n=\text{AAA})
$$
Now we may list the probabilities and add them

| $i$      | Probability from $i$ to default (in second year): $\mathbb P(X_{n+2}=\text{default}|X_{n+1}=i)$ | Probability from AAA to $i$: $\mathbb P(X_{n+1}=i|X_n=\text{AAA})$ |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| AAA      | 0                                                            | 0.9366                                                       |
| AA       | 0.0002                                                       | 0.0583                                                       |
| A        | 0.0004                                                       | 0.0040                                                       |
| $\vdots$ | $\vdots$                                                     | $\vdots$                                                     |
| default  | 1                                                            | 0                                                            |

## Markov Chains Simulation